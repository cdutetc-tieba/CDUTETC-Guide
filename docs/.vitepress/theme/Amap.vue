<script setup>
import { onMounted, ref, watch, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  center: { type: Array, default: () => [103.731, 29.560] },
  zoom: { type: Number, default: 16 },
  markers: { type: Array, default: () => [] },
  height: { type: String, default: '420px' },
  dark: { type: Boolean, default: null },
  showControls: { type: Boolean, default: true }
})

const mapRef = ref(null)
let map = null
let AMap = null
let satelliteLayer = null
let roadNetLayer = null
let infoWindow = null

const isSatellite = ref(false)
const activeCategories = ref(new Set())
const markerInstances = []

// 从 markers 提取所有分类
const categories = computed(() => {
  const map = new Map()
  props.markers.forEach(m => {
    const cat = m.category || 'default'
    if (!map.has(cat)) {
      map.set(cat, {
        key: cat,
        label: m.categoryLabel || cat,
        color: m.categoryColor || '#1890ff'
      })
    }
  })
  return [...map.values()]
})

const isDark = computed(() => {
  if (props.dark !== null) return props.dark
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
})

const visibleMarkers = computed(() => {
  if (activeCategories.value.size === 0) return props.markers
  return props.markers.filter(m => activeCategories.value.has(m.category || 'default'))
})

function toggleCategory(key) {
  const s = new Set(activeCategories.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  activeCategories.value = s
}

function toggleSatellite() {
  isSatellite.value = !isSatellite.value
  if (satelliteLayer) {
    if (isSatellite.value) {
      satelliteLayer.show()
      roadNetLayer?.show()
    } else {
      satelliteLayer.hide()
      roadNetLayer?.hide()
    }
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}

function buildInfoContent(m) {
  let html = `<div style="min-width:180px;max-width:280px;">`
  html += `<div style="font-size:15px;font-weight:600;margin-bottom:6px;">${m.title || ''}</div>`
  if (m.desc) html += `<div style="font-size:13px;color:#666;line-height:1.5;margin-bottom:6px;">${m.desc}</div>`
  if (m.tags && m.tags.length) {
    html += `<div style="display:flex;flex-wrap:wrap;gap:4px;">`
    m.tags.forEach(t => {
      html += `<span style="font-size:11px;padding:2px 6px;border-radius:10px;background:#f0f0f0;color:#666;">${t}</span>`
    })
    html += `</div>`
  }
  html += `</div>`
  return html
}

function createMarkerIcon(m) {
  const color = m.categoryColor || '#1890ff'
  const label = m.title || ''
  const html = `
    <div style="position:relative;cursor:pointer;">
      <div style="width:28px;height:28px;background:${color};border-radius:50%;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;">
        <div style="width:8px;height:8px;background:#fff;border-radius:50%;"></div>
      </div>
      <div style="position:absolute;top:-24px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:12px;font-weight:600;color:#333;background:rgba(255,255,255,0.92);padding:2px 6px;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.12);">${label}</div>
    </div>
  `
  return new AMap.Marker({
    position: m.position,
    content: html,
    offset: new AMap.Pixel(-14, -14),
    title: m.title
  })
}

async function initMap() {
  window._AMapSecurityConfig = {
    securityJsCode: '71fbb5a216b52ec052db6610497c17a9'
  }

  await loadScript('https://webapi.amap.com/loader.js')

  AMap = await window.AMapLoader.load({
    key: '886bba5547c550066d9a0200f47fb12b',
    version: '2.0',
    plugins: ['AMap.InfoWindow', 'AMap.Scale', 'AMap.ToolBar']
  })

  map = new AMap.Map(mapRef.value, {
    viewMode: '2D',
    zoom: props.zoom,
    center: props.center,
    mapStyle: isDark.value ? 'amap://styles/dark' : 'amap://styles/normal'
  })

  map.addControl(new AMap.Scale())
  map.addControl(new AMap.ToolBar({ position: 'RT' }))

  satelliteLayer = new AMap.TileLayer.Satellite({ visible: false })
  roadNetLayer = new AMap.TileLayer.RoadNet({ visible: false })
  map.add([satelliteLayer, roadNetLayer])

  infoWindow = new AMap.InfoWindow({
    isCustom: true,
    offset: new AMap.Pixel(0, -20),
    autoMove: true
  })

  renderMarkers()
}

function renderMarkers() {
  markerInstances.forEach(m => map.remove(m))
  markerInstances.length = 0

  visibleMarkers.value.forEach(m => {
    const marker = createMarkerIcon(m)

    if (m.title || m.desc || m.info) {
      marker.on('click', () => {
        const content = m.info || buildInfoContent(m)
        infoWindow.setContent(`<div style="padding:10px 14px;font-size:14px;line-height:1.6;background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);max-width:280px;">${content}</div>`)
        infoWindow.open(map, marker.getPosition())
      })
    }

    map.add(marker)
    markerInstances.push(marker)
  })
}

watch(visibleMarkers, () => { if (map) renderMarkers() })
watch(isDark, (val) => { if (map) map.setMapStyle(val ? 'amap://styles/dark' : 'amap://styles/normal') })

onMounted(() => initMap())
onBeforeUnmount(() => { if (map) { map.destroy(); map = null } })
</script>

<template>
  <div class="amap-wrapper">
    <div v-if="showControls" class="amap-toolbar">
      <div class="amap-filters">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="amap-cat-btn"
          :class="{ active: activeCategories.size === 0 || activeCategories.has(cat.key) }"
          :style="{
            '--cat-color': cat.color,
            borderColor: (activeCategories.size === 0 || activeCategories.has(cat.key)) ? cat.color : 'var(--vp-c-divider)',
            background: (activeCategories.size === 0 || activeCategories.has(cat.key)) ? cat.color + '12' : 'transparent'
          }"
          @click="toggleCategory(cat.key)"
        >
          <span class="amap-cat-dot" :style="{ background: cat.color }"></span>
          <span>{{ cat.label }}</span>
        </button>
      </div>
      <button class="amap-sat-btn" :class="{ active: isSatellite }" @click="toggleSatellite">卫星图</button>
    </div>
    <div ref="mapRef" class="amap-container" :style="{ height }"></div>
  </div>
</template>

<style scoped>
.amap-wrapper {
  margin: 16px 0;
}
.amap-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}
.amap-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1;
}
.amap-cat-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 100px;
  border: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.6;
}
.amap-cat-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--cat-color);
}
.amap-cat-btn.active {
  color: var(--cat-color);
  border-color: var(--cat-color);
  background: color-mix(in srgb, var(--cat-color) 8%, transparent);
  font-weight: 500;
}
.amap-cat-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.amap-sat-btn {
  padding: 3px 10px;
  border-radius: 100px;
  border: 1.5px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  white-space: nowrap;
  line-height: 1.6;
}
.amap-sat-btn:hover,
.amap-sat-btn.active {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.amap-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}
</style>
