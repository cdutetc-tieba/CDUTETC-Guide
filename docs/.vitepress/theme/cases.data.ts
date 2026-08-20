import { createContentLoader } from 'vitepress'

interface CaseMeta {
  [key: string]: string
}

interface CaseItem {
  title: string
  url: string
  year: string
  meta: CaseMeta
  section: string
  placeholder: boolean
}

declare const data: CaseItem[]
export { data }

export default createContentLoader('**/cases/*.md', {
  transform(raw): CaseItem[] {
    return raw
      .filter(r => {
        return !r.url.endsWith('/cases/') && !r.url.endsWith('/cases/index') && !r.url.endsWith('/cases/_category.html') && !r.url.endsWith('/cases/_category')
      })
      .map(r => {
        const fm = r.frontmatter
        const section = r.url.split('/cases/')[0]?.split('/').pop() || ''
        const { title, year, placeholder, ...rest } = fm
        return {
          title: title || r.url.split('/').pop()?.replace('.html', '') || '未命名',
          url: r.url,
          year: String(year || ''),
          meta: rest || {},
          section,
          placeholder: placeholder === true
        }
      })
      .sort((a, b) => {
        if (a.placeholder !== b.placeholder) return a.placeholder ? 1 : -1
        return String(b.year || '').localeCompare(String(a.year || ''))
      })
  }
})
