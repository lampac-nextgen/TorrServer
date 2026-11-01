// CI gate: a small slice of the palette matrix (full run: `yarn test:e2e:palettes`).
// Catches the regressions that cost us real-device screenshots: palette not applied, dialogs or
// sticky bars off-token, and low-contrast text on the library and details screens.
import { expect, test } from '../fixtures/mock-test'
import { fixtureDragon, fixtureDragonCacheRich, fixtureRichLibrary } from '../fixtures/mocks'
import { detailsModal, openDetails } from '../fixtures/helpers'
import { hexOf, pixelContrast, scanContrast, settleUi, type Unmeasured } from '../palettes/scan'

import data from '../../src/shared/theme/palettes.json' with { type: 'json' }

const SMOKE = ['nextgen', 'forest', 'mono', 'contrast']

test.use({
  mockOptions: {
    library: [fixtureDragon, ...fixtureRichLibrary],
    torrent: fixtureDragon,
    cache: fixtureDragonCacheRich,
  },
})

for (const id of SMOKE) {
  for (const mode of ['light', 'dark'] as const) {
    test(`palette ${id} · ${mode}: tokens applied, AA text, dialog surfaces`, async ({ page }) => {
      const tokens = data.palettes.find(p => p.id === id)![mode] as Record<string, string>
      await page.emulateMedia({ colorScheme: mode })
      await page.addInitScript(
        ([palette, scheme]) => {
          localStorage.setItem('ts-color-palette', palette)
          localStorage.setItem('ts-color-scheme', scheme)
        },
        [id, mode],
      )
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await expect(page.locator('.torrent-card').first()).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.dataset.palette)).toBe(id)

      const problems: unknown[] = []
      for (const screen of ['library', 'details']) {
        if (screen === 'details') {
          await openDetails(page, fixtureDragon.title)
          await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')
          const dialogBg = await hexOf(detailsModal(page))
          expect(
            [tokens.surface, tokens['surface-secondary']].map(h => h.toLowerCase()),
            'dialog off-token',
          ).toContain(dialogBg)
          expect(
            await hexOf(detailsModal(page).locator('div.border-t.border-border').last()),
            'action bar off-token',
          ).toBe(dialogBg)
        }
        await settleUi(page)
        const unmeasured: Unmeasured[] = []
        problems.push(
          ...(await scanContrast(page, screen, unmeasured)),
          ...(await pixelContrast(page, screen, unmeasured)),
        )
      }
      expect(problems).toEqual([])
    })
  }
}
