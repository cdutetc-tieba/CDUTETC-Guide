import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const pages = [
  '/',
  '/design-preview',
  '/survival/academics/gpa-guide',
  '/survival/campus-map/',
  '/leap/abroad/cases/'
]

for (const path of pages) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => document.fonts.ready.then(() => undefined))

    const results = await new AxeBuilder({ page }).analyze()
    const blockingViolations = results.violations.filter(
      ({ impact }) => impact === 'serious' || impact === 'critical'
    )

    expect(blockingViolations).toEqual([])
  })
}
