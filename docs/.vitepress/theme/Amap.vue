<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { Layers3, List, RotateCcw, X } from '@lucide/vue'

const props = defineProps({
  center: { type: Array, default: () => [103.731, 29.56] },
  zoom: { type: Number, default: 16 },
  markers: { type: Array, default: () => [] },
  height: { type: String, default: '500px' },
  dark: { type: Boolean, default: null },
  showControls: { type: Boolean, default: true },
  fallbackImage: { type: String, default: '/images/校园路引.jpg' },
})

const { isDark: siteIsDark } = useData()
const mapRef = ref(null)
const loadState = ref('loading')
const errorMessage = ref('')
const isSatellite = ref(false)
const activeCategories = ref(new Set())
const selectedMarker = ref(null)
const isListOpen = ref(false)

let map = null
let AMap = null
let satelliteLayer = null
let roadNetLayer = null
let mapClickHandler = null
let injectedContentObserver = null
const markerInstances = []

const categories = computed(() => {
  const result = new Map()
  props.markers.forEach((marker) => {
    const key = marker.category || 'default'
    if (!result.has(key)) {
      result.set(key, {
        key,
        label: marker.categoryLabel || key,
        color: marker.categoryColor || '#9f2d24',
      })
    }
  })
  return [...result.values()]
})

const effectiveDark = computed(() => props.dark ?? siteIsDark.value)
const visibleMarkers = computed(() => {
  if (activeCategories.value.size === 0) return props.markers
  return props.markers.filter((marker) => activeCategories.value.has(marker.category || 'default'))
})

function markerKey(marker) {
  return marker.id || `${marker.title}-${marker.position.join(',')}`
}

function showAllCategories() {
  activeCategories.value = new Set()
}

function toggleCategory(key) {
  if (activeCategories.value.size === 0) {
    activeCategories.value = new Set([key])
    return
  }

  const next = new Set(activeCategories.value)
  if (next.has(key)) next.delete(key)
  else next.add(key)

  activeCategories.value = next.size === categories.value.length ? new Set() : next
}

function resetView() {
  if (!map) return
  map.setZoomAndCenter(props.zoom, props.center)
  closeDetails()
}

function toggleSatellite() {
  isSatellite.value = !isSatellite.value
  if (!satelliteLayer) return

  if (isSatellite.value) {
    satelliteLayer.show()
    roadNetLayer?.show()
  } else {
    satelliteLayer.hide()
    roadNetLayer?.hide()
  }
}

function toggleList() {
  isListOpen.value = !isListOpen.value
  if (isListOpen.value) closeDetails()
}

function closeDetails() {
  selectedMarker.value = null
  updateMarkerSelection()
}

function selectMarker(marker, shouldFocus = false) {
  selectedMarker.value = marker
  isListOpen.value = false
  updateMarkerSelection()

  if (map && shouldFocus) {
    map.setZoomAndCenter(Math.max(map.getZoom(), 18), marker.position)
  } else if (map) {
    map.panTo(marker.position)
  }
}

function updateMarkerSelection() {
  const selectedKey = selectedMarker.value ? markerKey(selectedMarker.value) : null
  markerInstances.forEach(({ element, data }) => {
    const selected = markerKey(data) === selectedKey
    element.classList.toggle('is-selected', selected)
    element.setAttribute('aria-pressed', String(selected))
  })
}

function loadScript(src) {
  if (window.AMapLoader) return Promise.resolve()
  if (window.__amapLoaderPromise) return window.__amapLoaderPromise

  window.__amapLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      existing.addEventListener('load', resolve, { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })

  return window.__amapLoaderPromise
}

function createMarker(marker) {
  const element = document.createElement('button')
  const core = document.createElement('span')

  element.type = 'button'
  element.className = 'guide-map-marker'
  element.dataset.label = marker.title || '校园地点'
  element.title = marker.title || '校园地点'
  element.setAttribute('aria-label', `查看${marker.title || '校园地点'}详情`)
  element.setAttribute('aria-pressed', 'false')
  element.style.setProperty('--marker-color', marker.categoryColor || '#9f2d24')

  core.className = 'guide-map-marker-core'
  element.appendChild(core)

  const instance = new AMap.Marker({
    position: marker.position,
    content: element,
    offset: new AMap.Pixel(-17, -17),
    title: marker.title,
    zIndex: 110,
  })

  element.addEventListener('click', (event) => {
    event.stopPropagation()
    selectMarker(marker)
  })
  instance.on('click', () => selectMarker(marker))

  return { instance, element, data: marker }
}

function renderMarkers() {
  if (!map || !AMap) return

  markerInstances.forEach(({ instance }) => map.remove(instance))
  markerInstances.length = 0

  visibleMarkers.value.forEach((marker) => {
    const entry = createMarker(marker)
    map.add(entry.instance)
    markerInstances.push(entry)
  })

  if (
    selectedMarker.value &&
    !visibleMarkers.value.some((marker) => markerKey(marker) === markerKey(selectedMarker.value))
  ) {
    selectedMarker.value = null
  }
  updateMarkerSelection()
}

function repairInjectedAccessibility() {
  if (!mapRef.value) return

  mapRef.value.querySelectorAll('iframe:not([title])').forEach((frame) => {
    frame.title = '高德地图交互层'
  })
  mapRef.value.querySelectorAll('img:not([alt])').forEach((image) => {
    image.alt = ''
  })
}

function observeInjectedContent() {
  injectedContentObserver?.disconnect()
  repairInjectedAccessibility()
  injectedContentObserver = new MutationObserver(repairInjectedAccessibility)
  injectedContentObserver.observe(mapRef.value, { childList: true, subtree: true })
}

async function initMap() {
  loadState.value = 'loading'
  errorMessage.value = ''

  try {
    window._AMapSecurityConfig = {
      securityJsCode: '71fbb5a216b52ec052db6610497c17a9',
    }

    await loadScript('https://webapi.amap.com/loader.js')

    AMap = await window.AMapLoader.load({
      key: '886bba5547c550066d9a0200f47fb12b',
      version: '2.0',
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
    })

    await nextTick()
    map = new AMap.Map(mapRef.value, {
      viewMode: '2D',
      zoom: props.zoom,
      center: props.center,
      mapStyle: 'amap://styles/whitesmoke',
      showLabel: true,
    })

    map.addControl(new AMap.Scale())
    map.addControl(new AMap.ToolBar({ position: 'RT', liteStyle: true }))

    satelliteLayer = new AMap.TileLayer.Satellite({ visible: false })
    roadNetLayer = new AMap.TileLayer.RoadNet({ visible: false })
    map.add([satelliteLayer, roadNetLayer])

    mapClickHandler = () => closeDetails()
    map.on('click', mapClickHandler)
    renderMarkers()
    observeInjectedContent()
    loadState.value = 'ready'
  } catch (error) {
    console.error('[Amap] 地图加载失败', error)
    errorMessage.value = '交互地图暂时无法加载，请稍后重试。'
    loadState.value = 'error'
  }
}

async function retryMap() {
  if (map) map.destroy()
  map = null
  await initMap()
}

watch(visibleMarkers, () => renderMarkers())

onMounted(() => initMap())
onBeforeUnmount(() => {
  injectedContentObserver?.disconnect()
  if (map && mapClickHandler) map.off('click', mapClickHandler)
  if (map) map.destroy()
  map = null
})
</script>

<template>
  <section
    class="campus-map"
    :class="{ 'is-dark': effectiveDark, 'is-satellite': isSatellite }"
    :style="{ '--map-height': height }"
    aria-label="校园地点交互地图"
  >
    <div v-if="showControls" class="campus-map-toolbar">
      <div class="campus-map-toolbar-heading">
        <span class="campus-map-toolbar-title">地点类型</span>
        <div class="campus-map-toolbar-meta">
          <span class="campus-map-count" aria-live="polite"
            >{{ visibleMarkers.length }} 个地点</span
          >
          <div class="campus-map-actions">
            <button
              class="campus-map-icon-button"
              :class="{ active: isListOpen }"
              :aria-pressed="isListOpen"
              title="地点列表"
              aria-label="打开地点列表"
              @click="toggleList"
            >
              <List :size="18" :stroke-width="1.8" />
            </button>
            <button
              class="campus-map-icon-button"
              :class="{ active: isSatellite }"
              :aria-pressed="isSatellite"
              title="切换卫星图层"
              aria-label="切换卫星图层"
              @click="toggleSatellite"
            >
              <Layers3 :size="18" :stroke-width="1.8" />
            </button>
            <button
              class="campus-map-icon-button"
              title="重置地图视野"
              aria-label="重置地图视野"
              @click="resetView"
            >
              <RotateCcw :size="18" :stroke-width="1.8" />
            </button>
          </div>
        </div>
      </div>

      <div class="campus-map-filters" role="group" aria-label="筛选地点类型">
        <button
          class="campus-map-filter"
          :class="{ active: activeCategories.size === 0 }"
          :aria-pressed="activeCategories.size === 0"
          @click="showAllCategories"
        >
          全部地点
        </button>
        <button
          v-for="category in categories"
          :key="category.key"
          class="campus-map-filter"
          :class="{ active: activeCategories.has(category.key) }"
          :style="{ '--category-color': category.color }"
          :aria-pressed="activeCategories.has(category.key)"
          @click="toggleCategory(category.key)"
        >
          <span class="campus-map-filter-mark" aria-hidden="true"></span>
          {{ category.label }}
        </button>
      </div>
    </div>

    <div class="campus-map-stage">
      <div ref="mapRef" class="campus-map-canvas"></div>

      <div v-if="loadState === 'loading'" class="campus-map-status" role="status">
        <span class="campus-map-loading-mark" aria-hidden="true"></span>
        正在加载校园地图
      </div>

      <div v-if="loadState === 'error'" class="campus-map-error" role="alert">
        <img :src="fallbackImage" alt="校园静态示意图" />
        <div class="campus-map-error-copy">
          <strong>地图加载失败</strong>
          <span>{{ errorMessage }}</span>
          <button @click="retryMap">重新加载</button>
        </div>
      </div>

      <aside
        v-if="isListOpen && loadState === 'ready'"
        class="campus-map-list-panel"
        aria-label="地点列表"
      >
        <div class="campus-map-panel-heading">
          <div>
            <strong>地点列表</strong>
            <span>{{ visibleMarkers.length }} 个地点</span>
          </div>
          <button class="campus-map-close" aria-label="关闭地点列表" @click="isListOpen = false">
            <X :size="18" :stroke-width="1.8" />
          </button>
        </div>
        <div class="campus-map-list-items">
          <button
            v-for="marker in visibleMarkers"
            :key="markerKey(marker)"
            class="campus-map-list-item"
            @click="selectMarker(marker, true)"
          >
            <span
              class="campus-map-list-mark"
              :style="{ background: marker.categoryColor || '#9f2d24' }"
              aria-hidden="true"
            ></span>
            <span>
              <strong>{{ marker.title }}</strong>
              <small>{{ marker.categoryLabel || marker.category || '校园地点' }}</small>
            </span>
          </button>
        </div>
      </aside>

      <aside
        v-if="selectedMarker && loadState === 'ready'"
        class="campus-map-detail"
        aria-live="polite"
      >
        <span
          class="campus-map-detail-mark"
          :style="{ background: selectedMarker.categoryColor || '#9f2d24' }"
          aria-hidden="true"
        ></span>
        <div class="campus-map-detail-copy">
          <span class="campus-map-detail-category">
            {{ selectedMarker.categoryLabel || selectedMarker.category || '校园地点' }}
          </span>
          <strong>{{ selectedMarker.title }}</strong>
          <p v-if="selectedMarker.desc">{{ selectedMarker.desc }}</p>
          <div v-if="selectedMarker.tags?.length" class="campus-map-detail-tags">
            <span v-for="tag in selectedMarker.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <button class="campus-map-close" aria-label="关闭地点详情" @click="closeDetails">
          <X :size="18" :stroke-width="1.8" />
        </button>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.campus-map {
  margin: 24px 0 30px;
  border: 1px solid var(--vp-c-divider);
  border-top: 3px solid var(--site-red);
  border-radius: 4px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.campus-map-toolbar {
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.campus-map-toolbar-heading,
.campus-map-panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.campus-map-toolbar-heading {
  margin-bottom: 10px;
}

.campus-map-toolbar-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.campus-map-toolbar-title,
.campus-map-panel-heading strong {
  font-size: 13px;
  font-weight: 850;
}

.campus-map-count,
.campus-map-panel-heading span {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.campus-map-filters {
  display: flex;
  min-width: 0;
  gap: 5px;
  flex-wrap: wrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.campus-map-filters::-webkit-scrollbar {
  display: none;
}

.campus-map-filter,
.campus-map-icon-button,
.campus-map-close,
.campus-map-list-item,
.campus-map-error button {
  appearance: none;
  border: 0;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.campus-map-filter {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 7px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-size: 12px;
  font-weight: 650;
  line-height: 1;
  white-space: nowrap;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    color 160ms ease;
}

.campus-map-filter:hover {
  border-color: var(--vp-c-text-2);
  color: var(--vp-c-text-1);
}

.campus-map-filter.active {
  border-color: var(--category-color, var(--site-red));
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--category-color, var(--site-red)) 13%, var(--vp-c-bg));
}

.campus-map-filter-mark {
  width: 4px;
  height: 14px;
  margin-right: 7px;
  background: var(--category-color, var(--site-red));
}

.campus-map-actions {
  display: flex;
  gap: 5px;
  flex: 0 0 auto;
}

.campus-map-icon-button,
.campus-map-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
}

.campus-map-icon-button:hover,
.campus-map-icon-button.active,
.campus-map-close:hover {
  border-color: var(--site-red);
  color: var(--site-red);
}

.campus-map-stage {
  position: relative;
  isolation: isolate;
  background: var(--vp-c-bg-alt);
}

.campus-map-canvas,
.campus-map-error {
  width: 100%;
  height: min(var(--map-height), 66vh);
  min-height: 400px;
}

.campus-map-status,
.campus-map-error {
  position: absolute;
  inset: 0;
  z-index: 20;
}

.campus-map-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  font-size: 13px;
}

.campus-map-loading-mark {
  width: 10px;
  height: 10px;
  background: var(--site-red);
  animation: map-pulse 900ms ease-in-out infinite alternate;
}

.campus-map-error {
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--vp-c-bg-alt);
}

.campus-map-error img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.16;
  filter: grayscale(1);
}

.campus-map-error-copy {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 320px;
  padding: 24px;
  text-align: center;
}

.campus-map-error-copy strong {
  font-size: 18px;
}

.campus-map-error-copy span {
  margin: 6px 0 16px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.campus-map-error button {
  padding: 8px 14px;
  border: 1px solid var(--site-red);
  border-radius: 2px;
  color: var(--site-red);
  background: var(--vp-c-bg);
  font-size: 13px;
  font-weight: 700;
}

.campus-map-list-panel,
.campus-map-detail {
  position: absolute;
  z-index: 15;
  border: 1px solid color-mix(in srgb, var(--site-ink) 28%, transparent);
  border-radius: 3px;
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
  box-shadow: 0 12px 36px rgba(15, 17, 18, 0.18);
  backdrop-filter: blur(10px);
}

.campus-map-list-panel {
  top: 14px;
  right: 14px;
  width: min(300px, calc(100% - 28px));
  max-height: calc(100% - 28px);
  overflow: hidden;
}

.campus-map-panel-heading {
  padding: 12px 12px 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.campus-map-panel-heading > div {
  display: flex;
  flex-direction: column;
}

.campus-map-panel-heading .campus-map-close,
.campus-map-detail .campus-map-close {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
}

.campus-map-list-items {
  max-height: calc(var(--map-height) - 82px);
  overflow-y: auto;
}

.campus-map-list-item {
  display: grid;
  grid-template-columns: 5px 1fr;
  width: 100%;
  gap: 11px;
  padding: 11px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  background: transparent;
}

.campus-map-list-item:hover,
.campus-map-list-item:focus-visible {
  background: var(--vp-c-bg-soft);
}

.campus-map-list-mark {
  width: 5px;
  height: 100%;
  min-height: 32px;
}

.campus-map-list-item strong,
.campus-map-list-item small {
  display: block;
}

.campus-map-list-item strong {
  font-size: 13px;
  line-height: 1.4;
}

.campus-map-list-item small {
  margin-top: 3px;
  color: var(--vp-c-text-3);
  font-size: 11px;
}

.campus-map-detail {
  bottom: 14px;
  left: 14px;
  display: grid;
  grid-template-columns: 5px minmax(0, 1fr) auto;
  width: min(360px, calc(100% - 28px));
  gap: 13px;
  padding: 14px;
}

.campus-map-detail-mark {
  width: 5px;
  min-height: 100%;
}

.campus-map-detail-copy {
  min-width: 0;
}

.campus-map-detail-category {
  display: block;
  margin-bottom: 2px;
  color: var(--vp-c-text-3);
  font-size: 11px;
  font-weight: 700;
}

.campus-map-detail-copy strong {
  display: block;
  font-size: 16px;
  line-height: 1.35;
}

.campus-map-detail-copy p {
  margin: 6px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.55;
}

.campus-map-detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 9px;
}

.campus-map-detail-tags span {
  padding: 2px 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

:global(.guide-map-marker) {
  position: relative;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 2px solid #f3efe3;
  border-radius: 50%;
  background: var(--marker-color);
  box-shadow: 0 3px 10px rgba(15, 17, 18, 0.28);
  cursor: pointer;
  transition:
    transform 150ms ease,
    box-shadow 150ms ease;
}

:global(.guide-map-marker::after) {
  position: absolute;
  bottom: calc(100% + 7px);
  left: 50%;
  max-width: 180px;
  padding: 5px 7px;
  border: 1px solid rgba(21, 23, 24, 0.22);
  border-radius: 2px;
  color: #151718;
  background: rgba(242, 238, 228, 0.96);
  box-shadow: 0 4px 12px rgba(15, 17, 18, 0.14);
  content: attr(data-label);
  font:
    700 12px/1.25 system-ui,
    sans-serif;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 4px);
  transition:
    opacity 120ms ease,
    transform 120ms ease;
  white-space: nowrap;
}

:global(.guide-map-marker:hover),
:global(.guide-map-marker:focus-visible),
:global(.guide-map-marker.is-selected) {
  z-index: 20;
  box-shadow:
    0 0 0 4px color-mix(in srgb, var(--marker-color) 24%, transparent),
    0 4px 12px rgba(15, 17, 18, 0.32);
  outline: none;
  transform: scale(1.08);
}

:global(.guide-map-marker:hover::after),
:global(.guide-map-marker:focus-visible::after),
:global(.guide-map-marker.is-selected::after) {
  opacity: 1;
  transform: translate(-50%, 0);
}

:global(.guide-map-marker-core) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f3efe3;
}

.campus-map :deep(.amap-logo),
.campus-map :deep(.amap-copyright) {
  opacity: 0.72;
}

.campus-map :deep(.amap-toolbar) {
  border: 1px solid rgba(21, 23, 24, 0.2);
  border-radius: 2px;
  box-shadow: none;
}

.campus-map-filter:focus-visible,
.campus-map-icon-button:focus-visible,
.campus-map-close:focus-visible,
.campus-map-error button:focus-visible {
  outline: 2px solid var(--site-red);
  outline-offset: 2px;
}

.is-dark .campus-map-list-panel,
.is-dark .campus-map-detail {
  border-color: rgba(242, 238, 224, 0.22);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.42);
}

.is-dark .campus-map-canvas {
  background: #171a1b;
}

.is-dark:not(.is-satellite) .campus-map-canvas :deep(.amap-layer) {
  filter: invert(0.88) hue-rotate(180deg) brightness(0.84) saturate(0.62) contrast(0.9);
}

@keyframes map-pulse {
  from {
    opacity: 0.35;
    transform: scale(0.75);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 640px) {
  .campus-map {
    margin: 20px 0 26px;
  }

  .campus-map-toolbar {
    padding: 12px 10px 10px;
  }

  .campus-map-filters {
    margin: 0 -10px;
    padding: 0 10px 2px;
    flex-wrap: nowrap;
  }

  .campus-map-filter {
    min-height: 40px;
    padding-right: 12px;
    padding-left: 12px;
    font-size: 13px;
  }

  .campus-map-icon-button {
    width: 40px;
    height: 40px;
  }

  .campus-map-canvas,
  .campus-map-error {
    height: min(var(--map-height), 62vh);
    min-height: 430px;
  }

  .campus-map-list-panel {
    inset: 10px 10px auto;
    width: auto;
    max-height: calc(100% - 20px);
  }

  .campus-map-list-items {
    max-height: calc(min(var(--map-height), 62vh) - 74px);
  }

  .campus-map-detail {
    right: 10px;
    bottom: 10px;
    left: 10px;
    width: auto;
    padding: 12px;
  }

  :global(.guide-map-marker::after) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campus-map-loading-mark,
  .campus-map-filter,
  :global(.guide-map-marker),
  :global(.guide-map-marker::after) {
    animation: none;
    transition: none;
  }
}
</style>
