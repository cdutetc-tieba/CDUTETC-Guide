<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useData } from 'vitepress'
import { data as allCases } from './cases.data'

const { page } = useData()

const currentSection = computed(() => {
  const parts = page.value.relativePath.split('/')
  const idx = parts.indexOf('cases')
  return idx > 0 ? parts[idx - 1] : ''
})

const GROUPS = {
  region: {
    '亚洲': ['中国香港', '日本', '韩国', '新加坡', '马来西亚'],
    '欧洲': ['英国', '德国', '法国', '荷兰', '北欧'],
    '北美洲': ['美国', '加拿大'],
    '大洋洲': ['澳大利亚', '新西兰']
  },
  major: {
    '计算机系': ['软件工程', '计算机科学与技术', '网络工程', '数据科学'],
    '经管系': ['会计学', '工商管理', '电子商务', '市场营销'],
    '机电系': ['机械工程', '电气工程', '自动化', '智能制造'],
    '土木系': ['土木工程', '工程管理', '建筑学'],
    '外语系': ['英语', '日语', '翻译'],
    '艺术系': ['视觉传达', '环境设计', '数字媒体']
  },
  industry: {
    '科技互联网': ['互联网', '软件', '人工智能', '半导体'],
    '金融商贸': ['银行', '证券', '电商', '外贸'],
    '传统行业': ['制造业', '建筑', '能源', '医药'],
    '公共事业': ['教育', '政府', '事业单位']
  }
}

const LAYERS = {
  abroad: [
    { key: 'region', label: '地区' },
    { key: 'major', label: '专业方向' }
  ],
  postgraduate: [
    { key: 'target', label: '目标层次' },
    { key: 'major', label: '报考方向' },
    { key: 'zone', label: '选区' },
    { key: 'degree', label: '培养目标' },
    { key: 'cross', label: '是否跨考' }
  ],
  employment: [
    { key: 'industry', label: '行业' },
    { key: 'type', label: '岗位类型' }
  ]
}

const layers = computed(() => {
  const sectionLayers = LAYERS[currentSection.value] || []
  return [{ key: 'year', label: '毕业时间' }, ...sectionLayers]
})

const cases = computed(() => allCases.filter(c => c.section === currentSection.value))

const layerOptions = computed(() => {
  const result = {}
  for (const layer of layers.value) {
    const set = new Set()
    cases.value.forEach(c => {
      const raw = layer.key === 'year' ? c.year : c.meta?.[layer.key]
      const val = raw != null ? String(raw) : null
      if (val) set.add(val)
    })
    const CUSTOM_ORDER = {
      target: ['985', '211', '双一流', '双非'],
      zone: ['A区', 'B区'],
      cross: ['本专业', '跨考'],
      degree: ['专硕', '学硕']
    }
    const arr = [...set].map(String)
    result[layer.key] = CUSTOM_ORDER[layer.key]
      ? CUSTOM_ORDER[layer.key].filter(v => arr.includes(v))
      : arr.sort((a, b) => b.localeCompare(a))
  }
  return result
})

function getGroupedOptions(key) {
  const groups = GROUPS[key]
  const available = (layerOptions.value && layerOptions.value[key]) || []
  if (!groups) return null

  const result = []
  for (const [group, items] of Object.entries(groups)) {
    const matched = items.filter(i => available.includes(i))
    if (matched.length > 0) {
      result.push({ group, items: matched })
    }
  }
  const grouped = Object.values(groups).flat()
  const ungrouped = available.filter(v => !grouped.includes(v))
  if (ungrouped.length > 0) {
    result.push({ group: '其他', items: ungrouped })
  }
  return result.length > 0 ? result : null
}

const activeFilters = ref({})

function toggleOption(key, value) {
  const current = new Set(activeFilters.value[key] || [])
  if (current.has(value)) current.delete(value)
  else current.add(value)
  activeFilters.value = { ...activeFilters.value, [key]: current }
}

function toggleGroup(key, groupItems) {
  const current = new Set(activeFilters.value[key] || [])
  const allSelected = groupItems.every(i => current.has(i))
  if (allSelected) {
    groupItems.forEach(i => current.delete(i))
  } else {
    groupItems.forEach(i => current.add(i))
  }
  activeFilters.value = { ...activeFilters.value, [key]: current }
}

function groupState(key, groupItems) {
  const selected = activeFilters.value[key]
  if (!selected || selected.size === 0) return 'none'
  const count = groupItems.filter(i => selected.has(i)).length
  if (count === 0) return 'none'
  if (count === groupItems.length) return 'all'
  return 'partial'
}

function isActive(key, value) {
  return activeFilters.value[key]?.has(value) || false
}

function selectedCount(key) {
  return activeFilters.value[key]?.size || 0
}

const filtered = computed(() => {
  return cases.value.filter(c => {
    return layers.value.every(layer => {
      const selected = activeFilters.value[layer.key]
      if (!selected || selected.size === 0) return true
      const raw = layer.key === 'year' ? c.year : c.meta?.[layer.key]
      const val = raw != null ? String(raw) : null
      return selected.has(val)
    })
  })
})

function clearAll() {
  activeFilters.value = {}
}

const hasActive = computed(() => Object.values(activeFilters.value).some(s => s && s.size > 0))

// ---- 下拉显隐 ----
const openKey = ref(null)
const rootRef = ref(null)

function toggleDropdown(key) {
  openKey.value = openKey.value === key ? null : key
}

function onDocClick(e) {
  if (rootRef.value && !rootRef.value.contains(e.target)) {
    openKey.value = null
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

// 分组展开/折叠
const expandedGroups = ref({})

function toggleExpand(key, group) {
  const k = `${key}::${group}`
  expandedGroups.value = { ...expandedGroups.value, [k]: !expandedGroups.value[k] }
}

function isExpanded(key, group) {
  return expandedGroups.value[`${key}::${group}`] || false
}

function setIndeterminate(el, value) {
  if (el) el.indeterminate = value
}
</script>

<template>
  <div class="cases-filter" ref="rootRef">
    <div class="cases-selects">
      <div v-for="layer in layers" :key="layer.key" class="cases-dropdown-wrap">
        <button
          class="cases-dropdown-trigger"
          :class="{ active: selectedCount(layer.key) > 0, open: openKey === layer.key }"
          @click.stop="toggleDropdown(layer.key)"
        >
          {{ layer.label }}
          <span v-if="selectedCount(layer.key) > 0" class="cases-dropdown-count">{{ selectedCount(layer.key) }}</span>
          <span class="cases-dropdown-arrow">▾</span>
        </button>
        <div v-if="openKey === layer.key" class="cases-dropdown-menu">
          <template v-if="getGroupedOptions(layer.key)">
            <div v-for="g in getGroupedOptions(layer.key)" :key="g.group" class="cases-group">
              <div class="cases-group-header" @click="toggleExpand(layer.key, g.group)">
                <span class="cases-group-check" @click.stop="toggleGroup(layer.key, g.items)">
                  <input
                    type="checkbox"
                    :checked="groupState(layer.key, g.items) === 'all'"
                    :ref="el => setIndeterminate(el, groupState(layer.key, g.items) === 'partial')"
                  />
                </span>
                <span class="cases-group-name">{{ g.group }}</span>
                <span class="cases-group-count">{{ g.items.filter(i => isActive(layer.key, i)).length || '' }}</span>
                <span class="cases-group-arrow" :class="{ open: isExpanded(layer.key, g.group) }">▸</span>
              </div>
              <div v-show="isExpanded(layer.key, g.group)" class="cases-group-body">
                <label v-for="opt in g.items" :key="opt" class="cases-dropdown-item">
                  <input type="checkbox" :checked="isActive(layer.key, opt)" @change="toggleOption(layer.key, opt)" />
                  <span>{{ opt }}</span>
                </label>
              </div>
            </div>
          </template>
          <template v-else>
            <label v-for="opt in (layerOptions[layer.key] || [])" :key="opt" class="cases-dropdown-item">
              <input type="checkbox" :checked="isActive(layer.key, opt)" @change="toggleOption(layer.key, opt)" />
              <span>{{ opt }}</span>
            </label>
          </template>
        </div>
      </div>
      <button v-if="hasActive" class="cases-clear" @click="clearAll">清除筛选</button>
    </div>
    <div class="cases-list">
      <a v-for="c in filtered" :key="c.url" class="cases-card" :href="c.url">
        <div class="cases-card-title">{{ c.title }}</div>
        <div class="cases-card-meta">
          <span v-if="c.year" class="cases-card-tag">{{ c.year }}</span>
          <template v-for="layer in layers" :key="layer.key">
            <span v-if="layer.key !== 'year' && c.meta?.[layer.key]" class="cases-card-tag">{{ c.meta[layer.key] }}</span>
          </template>
        </div>
      </a>
      <div v-if="!filtered.length" class="cases-empty">暂无案例，欢迎投稿！</div>
    </div>
  </div>
</template>

<style scoped>
.cases-filter {
  margin-top: 16px;
  position: relative;
}
.cases-selects {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.cases-dropdown-wrap {
  position: relative;
}
.cases-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.cases-dropdown-trigger:hover,
.cases-dropdown-trigger.open {
  border-color: var(--vp-c-brand-1);
}
.cases-dropdown-trigger.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.cases-dropdown-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
}
.cases-dropdown-arrow {
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.cases-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 100;
  min-width: 220px;
  max-width: 90vw;
  max-height: 360px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 6px 0;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.cases-group {
  padding-bottom: 2px;
}
.cases-group + .cases-group {
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 2px;
  padding-top: 2px;
}
.cases-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}
.cases-group-header:hover {
  background: var(--vp-c-bg-soft);
}
.cases-group-check {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.cases-group-check input[type='checkbox'] {
  accent-color: var(--vp-c-brand-1);
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.cases-group-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  flex: 1;
}
.cases-group-count {
  font-size: 11px;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  min-width: 12px;
  text-align: right;
}
.cases-group-arrow {
  font-size: 12px;
  color: var(--vp-c-text-3);
  transition: transform 0.2s;
}
.cases-group-arrow.open {
  transform: rotate(90deg);
}
.cases-group-body {
  padding-bottom: 4px;
}
.cases-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px 7px 40px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
}
.cases-dropdown-item:hover {
  background: var(--vp-c-bg-soft);
}
.cases-dropdown-item input[type='checkbox'] {
  accent-color: var(--vp-c-brand-1);
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.cases-clear {
  padding: 6px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-danger-1);
  background: transparent;
  color: var(--vp-c-danger-1);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.cases-clear:hover {
  background: var(--vp-c-danger-soft);
}
.cases-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cases-card {
  display: block;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none !important;
  color: inherit;
  transition: all 0.2s;
}
.cases-card:hover {
  text-decoration: none !important;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.cases-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}
.cases-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}
.cases-card-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}
.cases-empty {
  text-align: center;
  padding: 40px 0;
  color: var(--vp-c-text-3);
  font-size: 14px;
}
</style>
