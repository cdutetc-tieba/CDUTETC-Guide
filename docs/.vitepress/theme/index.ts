import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Giscus from './Giscus.vue'
import Watermark from './Watermark.vue'
import CasesFilter from './CasesFilter.vue'
import Amap from './Amap.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CasesFilter', CasesFilter)
    app.component('Amap', Amap)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Giscus),
      'layout-bottom': () => h(Watermark)
    })
  }
} satisfies Theme
