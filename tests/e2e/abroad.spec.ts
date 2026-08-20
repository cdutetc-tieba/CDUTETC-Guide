import { expect, test } from '@playwright/test'

test.describe('abroad cases', () => {
  test('keeps the filters and clearly marks the two placeholders', async ({ page }) => {
    await page.goto('/leap/abroad/cases/')

    const filters = page.locator('.cases-dropdown-trigger')
    await expect(filters).toHaveCount(3)
    await expect(filters.nth(0)).toContainText('毕业时间')
    await expect(filters.nth(1)).toContainText('地区')
    await expect(filters.nth(2)).toContainText('专业方向')

    const cards = page.locator('.cases-card')
    await expect(cards).toHaveCount(2)
    await expect(page.locator('.cases-card-status')).toHaveCount(2)
    await expect(page.locator('.cases-card-status')).toHaveText(['示例占位', '示例占位'])
    await expect(page.locator('.cases-card-title', { hasText: '参考案例' })).toHaveCount(0)
  })
})

test.describe('abroad guide', () => {
  test('exposes the geographic guide and language exam structure without page overflow', async ({
    page,
  }) => {
    await page.goto('/leap/abroad/guide/')

    await expect(page.getByRole('heading', { level: 1, name: '留学指南/北/西/东' })).toBeVisible()
    await expect(page.getByRole('link', { name: '英国', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: '日本', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: '澳大利亚', exact: true })).toBeVisible()

    await page.goto('/leap/abroad/language-test/')
    await expect(page.getByRole('heading', { level: 1, name: '语言考试总览' })).toBeVisible()
    await expect(page.getByRole('link', { name: '雅思 IELTS', exact: true })).toBeVisible()
    await expect(page.getByRole('link', { name: '托福 TOEFL iBT', exact: true })).toBeVisible()

    const hasPageOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(hasPageOverflow).toBe(false)
  })

  test('renders country directories and university pages', async ({ page }) => {
    const countryChecks = [
      {
        path: '/leap/abroad/guide/europe/western-europe/uk/',
        heading: '英国',
        university: '纽卡斯尔大学',
        sidebarPath: ['留学', '留学指南/北/西/东', '欧洲', '西欧', '英国'],
      },
      {
        path: '/leap/abroad/guide/europe/southern-europe/italy/',
        heading: '意大利',
        university: '都灵理工大学',
        sidebarPath: ['留学', '留学指南/北/西/东', '欧洲', '南欧', '意大利'],
      },
      {
        path: '/leap/abroad/guide/asia/east-asia/japan/',
        heading: '日本',
        university: '北陆先端科学技术大学院大学 JAIST',
        sidebarPath: ['留学', '留学指南/北/西/东', '亚洲', '东亚', '日本'],
      },
    ]

    for (const check of countryChecks) {
      await page.goto(check.path)
      await expect(page.getByRole('heading', { level: 1, name: check.heading })).toBeVisible()
      await expect(page.getByRole('link', { name: check.university, exact: true })).toBeVisible()

      const sidebar = page.locator('.VPSidebar')
      const mobileSidebarButton = page.getByRole('button', { name: 'Menu', exact: true })
      if (await mobileSidebarButton.isVisible()) {
        await mobileSidebarButton.click()
      }
      for (const section of check.sidebarPath) {
        const sectionLabel = sidebar.getByText(section, { exact: true })
        await sectionLabel.locator('..').locator('..').getByRole('button').dispatchEvent('click')
      }
      await expect(
        sidebar.getByRole('link', { name: check.university, exact: true }),
      ).toHaveCount(1)

      const hasPageOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      expect(hasPageOverflow).toBe(false)
    }

    await page.goto(
      '/leap/abroad/guide/europe/southern-europe/italy/politecnico-di-torino',
    )
    await expect(page.getByRole('heading', { level: 1, name: '都灵理工大学' })).toBeVisible()
    await expect(page.getByText('QS 2027：=206')).toBeVisible()
  })
})
