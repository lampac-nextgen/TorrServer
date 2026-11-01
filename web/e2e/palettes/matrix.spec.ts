// Palette matrix: every palette × light/dark on the main screens.
//
//   yarn test:e2e:palettes                       # all palettes (needs the embedded build: make webgen)
//   PALETTES=nextgen,neon yarn test:e2e:palettes # a subset
//   yarn palettes:report                         # summarize + contact sheet at e2e/.artifacts/palettes/index.html
//
// Each screen is screenshotted and scanned for text whose contrast against its effective
// background is below WCAG AA. Findings go to e2e/.artifacts/palettes/report/<id>-<mode>.json.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Page } from '@playwright/test'

import { expect, test } from '../fixtures/mock-test'
import { fixtureDragon, fixtureDragonCache } from '../fixtures/mocks'
import { detailsModal, openDetails } from '../fixtures/helpers'

const here = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(here, '../.artifacts/palettes')
const data = JSON.parse(fs.readFileSync(path.resolve(here, '../../src/shared/theme/palettes.json'), 'utf8')) as {
  palettes: { id: string; light: Record<string, string>; dark: Record<string, string> }[]
}

const only = (process.env.PALETTES || '').split(',').filter(Boolean)
const ids = data.palettes.map(p => p.id).filter(id => !only.length || only.includes(id))
const byId = Object.fromEntries(data.palettes.map(p => [p.id, p]))

test.use({ mockOptions: { library: [fixtureDragon], torrent: fixtureDragon, cache: fixtureDragonCache } })

interface Finding {
  screen: string
  selector: string
  text: string
  ratio: number
  min: number
  fg: string
  bg: string
}

/** Runs in the page: text nodes whose colour/background contrast is under AA. */
async function scanContrast(page: Page, screen: string): Promise<Finding[]> {
  const found = await page.evaluate(() => {
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
    const rgba = (css: string): [number, number, number, number] => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = '#000'
      ctx.fillStyle = css
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      return [d[0], d[1], d[2], d[3] / 255]
    }
    const over = (top: number[], base: number[]): [number, number, number, number] => {
      const a = top[3] + base[3] * (1 - top[3])
      if (a === 0) return [0, 0, 0, 0]
      const c = (i: number) => (top[i] * top[3] + base[i] * base[3] * (1 - top[3])) / a
      return [c(0), c(1), c(2), a]
    }
    const lum = (c: number[]) => {
      const f = c.slice(0, 3).map(v => {
        const s = v / 255
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]
    }
    const ratio = (a: number[], b: number[]) => {
      const [x, y] = [lum(a), lum(b)]
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
    }
    const hex = (c: number[]) =>
      '#' +
      c
        .slice(0, 3)
        .map(v => Math.round(v).toString(16).padStart(2, '0'))
        .join('')
    const sel = (el: Element) => {
      const cls = [...el.classList]
        .filter(c => !/^[\w-]*:|\d/.test(c))
        .slice(0, 2)
        .join('.')
      return el.tagName.toLowerCase() + (cls ? '.' + cls : '')
    }

    /** Effective background; null when an image/gradient sits behind the text (can't be measured). */
    const backdrop = (el: Element): number[] | null => {
      const layers: number[][] = []
      for (let n: Element | null = el; n; n = n.parentElement) {
        const cs = getComputedStyle(n)
        if (cs.backgroundImage !== 'none') return null
        const bg = rgba(cs.backgroundColor)
        if (bg[3] > 0) layers.push(bg)
        if (bg[3] === 1) break
      }
      let acc: number[] = rgba(getComputedStyle(document.documentElement).backgroundColor)
      if (acc[3] < 1) acc = over(acc, [255, 255, 255, 1])
      for (const l of layers.reverse()) acc = over(l, acc)
      return acc
    }

    const out: { selector: string; text: string; ratio: number; min: number; fg: string; bg: string }[] = []
    const seen = new Set<string>()
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = (node.textContent || '').trim()
      const el = node.parentElement
      if (!text || !el) continue
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue
      const r = el.getBoundingClientRect()
      if (r.width <= 2 || r.height <= 2 || r.bottom < 0 || r.top > innerHeight) continue
      if (el.closest('[disabled],[aria-disabled="true"],[inert],[aria-hidden="true"]')) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === 'hidden' || cs.display === 'none') continue
      let opacity = 1
      for (let n: Element | null = el; n; n = n.parentElement) opacity *= parseFloat(getComputedStyle(n).opacity)
      if (opacity < 0.05) continue
      const bg = backdrop(el)
      if (!bg) continue
      const fgRaw = rgba(cs.color)
      const fg = over([fgRaw[0], fgRaw[1], fgRaw[2], fgRaw[3] * opacity], bg)
      const size = parseFloat(cs.fontSize)
      const bold = parseInt(cs.fontWeight, 10) >= 700
      const min = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5
      const ratioV = ratio(fg, bg)
      if (ratioV >= min) continue
      const key = sel(el) + '|' + text.slice(0, 24)
      if (seen.has(key)) continue
      seen.add(key)
      out.push({
        selector: sel(el),
        text: text.slice(0, 40),
        ratio: Math.round(ratioV * 100) / 100,
        min,
        fg: hex(fg),
        bg: hex(bg),
      })
    }
    return out
  })
  return found.map(f => ({ screen, ...f }))
}

for (const id of ids) {
  for (const mode of ['light', 'dark'] as const) {
    test(`${id} · ${mode}`, async ({ page }, testInfo) => {
      testInfo.setTimeout(120_000)
      const pal = byId[id]
      await page.emulateMedia({ colorScheme: mode })
      await page.addInitScript(
        ([palette, scheme]) => {
          localStorage.setItem('ts-color-palette', palette)
          localStorage.setItem('ts-color-scheme', scheme)
        },
        [id, mode],
      )
      fs.mkdirSync(path.join(OUT, 'report'), { recursive: true })
      const findings: Finding[] = []
      const snap = async (screen: string) => {
        await page.waitForTimeout(250)
        await page.screenshot({ path: path.join(OUT, `${id}-${mode}-${screen}.png`) })
        findings.push(...(await scanContrast(page, screen)))
      }

      await page.goto('/', { waitUntil: 'domcontentloaded' })
      await expect(page.locator('.torrent-card').first()).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.dataset.palette)).toBe(id)
      expect(await page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(mode === 'dark')
      await snap('library')

      await openDetails(page, fixtureDragon.title)
      await expect.poll(() => detailsModal(page).evaluate(el => getComputedStyle(el).transform)).toBe('none')
      // The dialog surface must come from the palette (HeroUI's zinc overlay would not).
      const tokens = pal[mode] as Record<string, string>
      const dialogBg = await detailsModal(page).evaluate(el => {
        const ctx = document.createElement('canvas').getContext('2d')!
        ctx.fillStyle = getComputedStyle(el).backgroundColor
        ctx.fillRect(0, 0, 1, 1)
        const d = ctx.getImageData(0, 0, 1, 1).data
        return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('')
      })
      const expected = [tokens.surface, tokens['surface-secondary']].map(h => h.toLowerCase())
      expect.soft(expected, `details dialog background ${dialogBg}`).toContain(dialogBg)
      // The sticky action bar must blend into the dialog instead of showing as a band.
      const footerBg = await detailsModal(page)
        .locator('div.border-t.border-border')
        .last()
        .evaluate(el => {
          const ctx = document.createElement('canvas').getContext('2d')!
          ctx.fillStyle = getComputedStyle(el).backgroundColor
          ctx.fillRect(0, 0, 1, 1)
          const d = ctx.getImageData(0, 0, 1, 1).data
          return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('')
        })
      expect.soft(footerBg, 'details action bar background matches the dialog').toBe(dialogBg)
      // Icon-only buttons have no text node for the scan: check own colour vs own background.
      for (const variant of ['danger', 'primary']) {
        const btn = detailsModal(page).locator(`.button--${variant}`).first()
        if (!(await btn.count())) continue
        const ratio = await btn.evaluate(el => {
          const ctx = document.createElement('canvas').getContext('2d')!
          const px = (css: string) => {
            ctx.clearRect(0, 0, 1, 1)
            ctx.fillStyle = css
            ctx.fillRect(0, 0, 1, 1)
            return [...ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)].map(v => {
              const c = v / 255
              return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
            })
          }
          const l = (c: number[]) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
          const cs = getComputedStyle(el)
          const [a, b] = [l(px(cs.color)), l(px(cs.backgroundColor))]
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
        })
        expect.soft(ratio, `${variant} button colour contrast`).toBeGreaterThanOrEqual(4.5)
      }
      const tabs = page.locator('.ts-details-tabs [role="tab"]')
      for (const [i, screen] of ['files', 'stats', 'cache'].entries()) {
        await tabs.nth(i).click()
        await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true')
        await snap(`details-${screen}`)
      }
      await page.keyboard.press('Escape')
      await expect(detailsModal(page)).toBeHidden()

      await page.getByRole('button', { name: 'Settings' }).first().click()
      await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
      await snap('settings')

      fs.writeFileSync(path.join(OUT, 'report', `${id}-${mode}.json`), JSON.stringify({ id, mode, findings }, null, 2))
      // Advisory: surfaced in the report and on the test, not a gate.
      expect.soft(findings, `${findings.length} low-contrast text nodes`).toEqual([])
    })
  }
}
