// Manual screenshot matrix: library chrome + Settings on phone / tablet / desktop (dark).
//
//   yarn test:e2e:shots                                   # embedded build, mocked API
//   TORRSERVER_URL=http://127.0.0.1:3000 yarn test:e2e:shots   # a running server or `yarn dev`
//
// Images are attached to the test and written under e2e/.artifacts/results.
import { test as mocked, expect } from '../fixtures/mock-test'

const liveUrl = process.env.TORRSERVER_URL || process.env.WEB_URL || ''

const VIEWPORTS = [
  { id: 'phone', width: 390, height: 844, phone: true },
  { id: 'tablet', width: 768, height: 1024, phone: false },
  { id: 'desktop', width: 1440, height: 900, phone: false },
]

mocked.use({ colorScheme: 'dark' })

for (const vp of VIEWPORTS) {
  mocked(`${vp.id}: library and settings`, async ({ page }, testInfo) => {
    if (liveUrl) await page.unrouteAll() // use the real API instead of the stubs
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.goto(liveUrl ? liveUrl.replace(/\/$/, '') + '/' : '/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('.torrent-card').first()).toBeVisible({ timeout: 45_000 })
    await testInfo.attach(`${vp.id}-library`, { body: await page.screenshot(), contentType: 'image/png' })

    if (vp.phone) {
      await page.locator('.ts-bottom-nav').getByRole('button', { name: 'More' }).click()
      await page.locator('.ts-sheet-modal').getByRole('button', { name: 'Settings' }).click()
    } else {
      await page.getByRole('button', { name: 'Settings' }).first().click()
    }
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
    await testInfo.attach(`${vp.id}-settings`, { body: await page.screenshot(), contentType: 'image/png' })
  })
}
