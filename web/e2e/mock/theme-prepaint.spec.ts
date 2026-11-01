// A stored palette/brightness must be on <html> before the app bundle runs, otherwise the first
// paint flashes the default palette. The bundle is blocked here, so only index.html can set it.
import { expect, test } from '../fixtures/mock-test'

for (const [palette, scheme, dark] of [
  ['forest', 'dark', true],
  ['amber', 'light', false],
  ['contrast', 'system', true],
] as const) {
  test(`stored ${palette}/${scheme} is applied before the bundle loads`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.addInitScript(
      ([p, s]) => {
        localStorage.setItem('ts-color-palette', p)
        localStorage.setItem('ts-color-scheme', s)
      },
      [palette, scheme],
    )
    await page.route(/\/static\/index-[^/]+\.js$/, route => route.abort())
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    const state = await page.evaluate(() => ({
      palette: document.documentElement.dataset.palette,
      dark: document.documentElement.classList.contains('dark'),
    }))
    expect(state).toEqual({ palette, dark })
  })
}
