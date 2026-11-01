// Palette matrix: every palette × light/dark on the main screens, desktop and phone.
//
//   yarn test:e2e:palettes                       # all palettes (needs the embedded build: make webgen)
//   PALETTES=nextgen,neon yarn test:e2e:palettes # a subset
//   yarn palettes:report                         # summarize + contact sheet at e2e/.artifacts/palettes/index.html
//
// Each screen is screenshotted and scanned for text whose contrast against its effective
// background is below WCAG AA; keyboard focus rings and key surfaces (dialog, sticky bars, buttons)
// are checked against the palette tokens. Findings go to
// e2e/.artifacts/palettes/report/<id>-<mode>-<viewport>.json.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { devices, type Page } from '@playwright/test'

import { expect, test } from '../fixtures/mock-test'
import { fixtureDragon, fixtureDragonCacheRich, fixtureRichLibrary } from '../fixtures/mocks'
import { detailsModal, openDetails } from '../fixtures/helpers'
import { checkFocusRing, hexOf, pixelContrast, scanContrast, settleUi, type Finding, type Unmeasured } from './scan'

const here = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(here, '../.artifacts/palettes')
const data = JSON.parse(fs.readFileSync(path.resolve(here, '../../src/shared/theme/palettes.json'), 'utf8')) as {
  palettes: { id: string; light: Record<string, string>; dark: Record<string, string> }[]
}

const only = (process.env.PALETTES || '').split(',').filter(Boolean)
const ids = data.palettes.map(p => p.id).filter(id => !only.length || only.includes(id))
const byId = Object.fromEntries(data.palettes.map(p => [p.id, p]))
const MODES = ['light', 'dark'] as const

// Chromium emulation of the phone (the project only installs Chromium), so drop the WebKit default.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { defaultBrowserType: _browser, ...iPhone } = devices['iPhone 16 Pro Max']

const library = [fixtureDragon, ...fixtureRichLibrary]

/** Set palette + scheme before the app boots, and return a recorder bound to this run. */
async function prepare(
  page: Page,
  id: string,
  mode: (typeof MODES)[number],
  viewport: string,
  media: { forcedColors?: 'active'; contrast?: 'more' } = {},
) {
  await page.emulateMedia({ colorScheme: mode, ...media })
  await page.addInitScript(
    ([palette, scheme]) => {
      localStorage.setItem('ts-color-palette', palette)
      localStorage.setItem('ts-color-scheme', scheme)
    },
    [id, mode],
  )
  fs.mkdirSync(path.join(OUT, 'report'), { recursive: true })
  const findings: Finding[] = []
  return {
    findings,
    snap: async (screen: string) => {
      await settleUi(page)
      await page.screenshot({ path: path.join(OUT, `${id}-${mode}-${viewport}-${screen}.png`) })
      const unmeasured: Unmeasured[] = []
      findings.push(...(await scanContrast(page, `${viewport}:${screen}`, unmeasured)))
      findings.push(...(await pixelContrast(page, `${viewport}:${screen}`, unmeasured)))
    },
    finish: () => {
      fs.writeFileSync(
        path.join(OUT, 'report', `${id}-${mode}-${viewport}.json`),
        JSON.stringify({ id, mode, viewport, findings }, null, 2),
      )
      // Advisory: surfaced in the report and on the test, not a gate.
      expect.soft(findings, `${findings.length} findings`).toEqual([])
    },
  }
}

async function expectPalette(page: Page, id: string, mode: string) {
  await expect(page.locator('.torrent-card').first()).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.dataset.palette)).toBe(id)
  expect(await page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(mode === 'dark')
}

async function closeDialog(page: Page) {
  await page.keyboard.press('Escape')
  const gone = await page
    .getByRole('dialog')
    .waitFor({ state: 'detached', timeout: 1500 })
    .then(() => true)
    .catch(() => false)
  if (!gone) await page.getByRole('dialog').getByRole('button', { name: 'Close' }).first().click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
}

test.describe('desktop', () => {
  test.use({ mockOptions: { library, torrent: fixtureDragon, cache: fixtureDragonCacheRich } })

  for (const id of ids) {
    for (const mode of MODES) {
      test(`${id} · ${mode}`, async ({ page }, testInfo) => {
        testInfo.setTimeout(180_000)
        const pal = byId[id]
        const tokens = pal[mode] as Record<string, string>
        const { findings, snap, finish } = await prepare(page, id, mode, 'desktop')

        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await expectPalette(page, id, mode)
        await snap('library')

        await openDetails(page, fixtureDragon.title)
        await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')

        // Dialog surface and its sticky action bar must come from the palette (HeroUI's zinc would not).
        const dialogBg = await hexOf(detailsModal(page))
        const expected = [tokens.surface, tokens['surface-secondary']].map(h => h.toLowerCase())
        expect.soft(expected, `details dialog background ${dialogBg}`).toContain(dialogBg)
        const footerBg = await hexOf(detailsModal(page).locator('div.border-t.border-border').last())
        expect.soft(footerBg, 'details action bar background matches the dialog').toBe(dialogBg)

        // Icon-only buttons have no text node for the scan: check own colour vs own background.
        for (const variant of ['danger', 'primary']) {
          const btn = detailsModal(page).locator(`.button--${variant}`).first()
          if (!(await btn.count())) continue
          const [fg, bg] = [await hexOf(btn, 'color'), await hexOf(btn)]
          const lum = (h: string) => {
            const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
            const f = c.map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
            return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]
          }
          const ratio = (Math.max(lum(fg), lum(bg)) + 0.05) / (Math.min(lum(fg), lum(bg)) + 0.05)
          expect.soft(ratio, `${variant} button colour contrast`).toBeGreaterThanOrEqual(4.5)
        }

        const tabs = page.locator('.ts-details-tabs [role="tab"]')
        for (const [i, screen] of ['files', 'stats', 'cache'].entries()) {
          await tabs.nth(i).click()
          await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true')
          await snap(`details-${screen}`)
          if (screen === 'cache') {
            // The snake must actually paint (cached, partial, window, reader cells → several colours).
            const colours = await page
              .locator('.ts-details-cache-snake canvas')
              .first()
              .evaluate(c => {
                const cv = c as HTMLCanvasElement
                const d = cv.getContext('2d')!.getImageData(0, 0, cv.width, cv.height).data
                const seen = new Set<number>()
                for (let i = 0; i < d.length; i += 4 * 7) seen.add((d[i] << 16) | (d[i + 1] << 8) | d[i + 2])
                return seen.size
              })
            expect.soft(colours, 'cache snake paints several colours').toBeGreaterThan(3)
          }
        }

        // Hover and keyboard focus on the file rows.
        await tabs.nth(0).click()
        const play = detailsModal(page).locator('.button--primary').first()
        await play.hover()
        await snap('details-hover')
        await play.focus()
        await page.keyboard.press('Tab')
        await page.waitForTimeout(400) // focus ring transitions in
        const ring = await checkFocusRing(page, 'desktop:details-focus')
        if (ring) findings.push(ring)
        await snap('details-focus')
        await closeDialog(page)

        await page.getByRole('button', { name: 'Settings' }).first().click()
        await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
        await snap('settings')
        await closeDialog(page)

        for (const [screen, name] of [
          ['about', 'About'],
          ['status', 'Server Status'],
          ['add', 'Add'],
          ['search', 'Search'],
        ] as const) {
          await page.getByRole('button', { name, exact: true }).first().click()
          await expect(page.getByRole('dialog')).toBeVisible()
          await snap(screen)
          await closeDialog(page)
        }

        finish()
      })
    }
  }
})

test.describe('phone', () => {
  test.use({
    ...iPhone,
    locale: 'en-US',
    mockOptions: { library, torrent: fixtureDragon, cache: fixtureDragonCacheRich },
  })

  for (const id of ids) {
    for (const mode of MODES) {
      test(`${id} · ${mode}`, async ({ page }, testInfo) => {
        testInfo.setTimeout(120_000)
        const { snap, finish } = await prepare(page, id, mode, 'phone')

        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await expectPalette(page, id, mode)
        await snap('library')

        await openDetails(page, fixtureDragon.title)
        await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')
        const tabs = page.locator('.ts-details-tabs [role="tab"]')
        for (const [i, screen] of ['files', 'cache'].entries()) {
          await tabs.nth(i * 2).click()
          await snap(`details-${screen}`)
        }
        await closeDialog(page)

        await page.locator('.ts-bottom-nav').getByRole('button', { name: 'More' }).click()
        await page.locator('.ts-sheet-modal').getByRole('button', { name: 'Settings' }).click()
        await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
        await snap('settings')

        finish()
      })
    }
  }
})

test.describe('login', () => {
  test.use({ mockOptions: { requireAuth: true } })

  for (const id of ids) {
    for (const mode of MODES) {
      test(`${id} · ${mode}`, async ({ page }) => {
        const { snap, finish } = await prepare(page, id, mode, 'login')
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await expect(page.locator('input[name="username"]')).toBeVisible({ timeout: 20_000 })
        expect(await page.evaluate(() => document.documentElement.dataset.palette)).toBe(id)
        await snap('login')
        finish()
      })
    }
  }
})

// Accessibility media: forced colors (Windows high contrast) and prefers-contrast: more.
const A11Y_PALETTES = ['nextgen', 'mono', 'contrast'].filter(id => ids.includes(id))

test.describe('forced colors', () => {
  test.use({ mockOptions: { library, torrent: fixtureDragon, cache: fixtureDragonCacheRich } })

  for (const id of A11Y_PALETTES) {
    for (const mode of MODES) {
      test(`${id} · ${mode}`, async ({ page }, testInfo) => {
        testInfo.setTimeout(120_000)
        const { findings, snap, finish } = await prepare(page, id, mode, 'forced-colors', { forcedColors: 'active' })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await expectPalette(page, id, mode)
        await snap('library')
        await openDetails(page, fixtureDragon.title)
        await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')
        for (const [i, screen] of ['files', 'stats', 'cache'].entries()) {
          await page.locator('.ts-details-tabs [role="tab"]').nth(i).click()
          await snap(`details-${screen}`)
          // Bar fills / swatches must stay visible: a real colour that differs from what is behind them.
          const hidden = await page.evaluate(() =>
            [...document.querySelectorAll<HTMLElement>('.ts-forced-fill')]
              .filter(el => el.getBoundingClientRect().width > 1)
              .filter(el => {
                const own = getComputedStyle(el).backgroundColor
                const behind = getComputedStyle(el.parentElement!).backgroundColor
                return own === 'rgba(0, 0, 0, 0)' || own === behind
              })
              .map(el => el.className.slice(0, 60)),
          )
          expect.soft(hidden, `forced-colors: invisible fills on ${screen}`).toEqual([])
        }
        await page.locator('.ts-details-tabs [role="tab"]').first().click()
        await detailsModal(page).locator('.button--primary').first().focus()
        await page.keyboard.press('Tab')
        await page.waitForTimeout(400)
        const ring = await checkFocusRing(page, 'forced-colors:details-focus')
        if (ring) findings.push(ring)
        await snap('details-focus')
        finish()
      })
    }
  }
})

test.describe('prefers-contrast: more', () => {
  test.use({ mockOptions: { library, torrent: fixtureDragon, cache: fixtureDragonCacheRich } })

  for (const id of A11Y_PALETTES) {
    for (const mode of MODES) {
      test(`${id} · ${mode}`, async ({ page }, testInfo) => {
        testInfo.setTimeout(120_000)
        const { snap, finish } = await prepare(page, id, mode, 'contrast-more', { contrast: 'more' })
        await page.goto('/', { waitUntil: 'domcontentloaded' })
        await expectPalette(page, id, mode)
        // The override block must be active: muted/border are derived from foreground, not the palette hex.
        const vars = await page.evaluate(() => {
          const cs = getComputedStyle(document.documentElement)
          return { muted: cs.getPropertyValue('--muted'), border: cs.getPropertyValue('--border') }
        })
        expect.soft(vars.muted, '--muted overridden').toContain('color-mix')
        expect.soft(vars.border, '--border overridden').toContain('color-mix')
        await snap('library')
        await openDetails(page, fixtureDragon.title)
        await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')
        await snap('details-files')
        finish()
      })
    }
  }
})
