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
}

declare const data: CaseItem[]
export { data }

export default createContentLoader('**/cases/*.md', {
  transform(raw): CaseItem[] {
    return raw
      .filter(r => !r.url.endsWith('/cases/') && !r.url.endsWith('/cases/index'))
      .map(r => {
        const fm = r.frontmatter
        const section = r.url.split('/cases/')[0]?.split('/').pop() || ''
        const { title, year, ...rest } = fm
        return {
          title: title || r.url.split('/').pop()?.replace('.html', '') || '未命名',
          url: r.url,
          year: String(year || ''),
          meta: rest || {},
          section
        }
      })
      .sort((a, b) => String(b.year || '').localeCompare(String(a.year || '')))
  }
})
