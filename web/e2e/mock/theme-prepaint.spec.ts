// A stored palette/brightness must be on <html> before the app bundle runs, otherwise the first
// paint flashes the default palette. The bundle is blocked here, so only index.html can set it.
import { expect, test } from '../fixtures/mock-test'

import data from '../../src/shared/theme/palettes.json' with { type: 'json' }

for (const [palette, scheme, dark, resolved] of [
  ['forest', 'dark', true],
  ['amber', 'light', false],
  ['contrast', 'system', true],
  ['mint', 'dark', true, 'forest'],
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
    expect(state).toEqual({ palette: resolved ?? palette, dark })

    // theme-color follows the palette header before the bundle runs, too.
    const entry = data.palettes.find(p => p.id === (resolved ?? palette))!
    const color = await page.evaluate(() => document.querySelector<HTMLMetaElement>('meta#ts-theme-color')?.content)
    expect(color).toBe(dark ? entry.dark['app-header'] : entry.light['app-header'])
  })
}
