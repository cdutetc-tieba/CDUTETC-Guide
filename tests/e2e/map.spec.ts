import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/survival/campus-map/', { waitUntil: 'domcontentloaded' })
})

test('filters campus locations with an explicit all-locations state', async ({ page }) => {
  const map = page.getByRole('region', { name: '校园地点交互地图' })
  const allLocations = map.getByRole('button', { name: '全部地点' })
  const landmarks = map.getByRole('button', { name: '地标', exact: true })

  await expect(map.getByText('14 个地点', { exact: true }).first()).toBeVisible()
  await expect(allLocations).toHaveAttribute('aria-pressed', 'true')

  await landmarks.click()
  await expect(map.getByText('2 个地点', { exact: true }).first()).toBeVisible()
  await expect(landmarks).toHaveAttribute('aria-pressed', 'true')
  await expect(allLocations).toHaveAttribute('aria-pressed', 'false')

  await allLocations.click()
  await expect(map.getByText('14 个地点', { exact: true }).first()).toBeVisible()
})

test('opens the location list and selects a location detail', async ({ page }) => {
  const map = page.getByRole('region', { name: '校园地点交互地图' })

  await map.getByRole('button', { name: '打开地点列表' }).click()
  await expect(map.getByRole('complementary', { name: '地点列表' })).toBeVisible()

  await map.getByRole('button', { name: '图书馆 学习场所' }).click()
  await expect(map.getByRole('complementary', { name: '地点列表' })).toBeHidden()
  await expect(map.getByText('学校图书馆，自习需早到占座')).toBeVisible()
  await expect(map.getByRole('button', { name: '关闭地点详情' })).toBeVisible()
})
