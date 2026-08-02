import { expect, test } from '@playwright/test'

const pages = [
  { name: 'home', path: '/' },
  { name: 'article', path: '/survival/academics/gpa-guide' },
]

for (const target of pages) {
  test(`${target.name} has a stable responsive layout`, async ({ page }) => {
    await page.goto(target.path)
    await page.locator('body').waitFor()

    await expect(page).toHaveScreenshot(`${target.name}.png`, {
      animations: 'disabled',
      fullPage: true,
    })
  })
}
