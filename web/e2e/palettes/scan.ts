import type { Locator, Page } from '@playwright/test'

export interface Finding {
  screen: string
  selector: string
  text: string
  ratio: number
  min: number
  fg: string
  bg: string
}

/** Resolve any CSS colour (computed, color-mix, oklch…) to `#rrggbb` via a 1px canvas. */
export function hexOf(target: Locator, prop: 'backgroundColor' | 'color' = 'backgroundColor'): Promise<string> {
  return target.evaluate((el, p) => {
    const ctx = document.createElement('canvas').getContext('2d')!
    ctx.fillStyle = getComputedStyle(el)[p as 'color']
    ctx.fillRect(0, 0, 1, 1)
    const d = ctx.getImageData(0, 0, 1, 1).data
    return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('')
  }, prop)
}

/** Runs in the page: text nodes whose colour/background contrast is under AA. */
export interface Unmeasured {
  selector: string
  text: string
  fg: string
  min: number
  rect: { x: number; y: number; w: number; h: number }
}

export async function scanContrast(page: Page, screen: string, unmeasured?: Unmeasured[]): Promise<Finding[]> {
  const result = await page.evaluate(() => {
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
    const skipped: {
      selector: string
      text: string
      fg: string
      min: number
      rect: { x: number; y: number; w: number; h: number }
    }[] = []
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
      if (!bg) {
        const size0 = parseFloat(cs.fontSize)
        const bold0 = parseInt(cs.fontWeight, 10) >= 700
        const fg0 = rgba(cs.color)
        skipped.push({
          selector: sel(el),
          text: text.slice(0, 40),
          fg: hex(fg0),
          min: size0 >= 24 || (size0 >= 18.66 && bold0) ? 3 : 4.5,
          rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        })
        continue
      }
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
    return { out, skipped }
  })
  unmeasured?.push(...result.skipped)
  return result.out.map(f => ({ screen, ...f }))
}

/**
 * Text over images/gradients: decode a viewport screenshot and compare the text colour with the
 * dominant backdrop colour inside each text box.
 */
export async function pixelContrast(page: Page, screen: string, items: Unmeasured[]): Promise<Finding[]> {
  if (!items.length) return []
  const png = (await page.screenshot()).toString('base64')
  const dpr = await page.evaluate(() => devicePixelRatio)
  const out = await page.evaluate(
    async ({ png, items, dpr }) => {
      const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${png}`)).blob())
      const cv = document.createElement('canvas')
      cv.width = bmp.width
      cv.height = bmp.height
      const ctx = cv.getContext('2d', { willReadFrequently: true })!
      ctx.drawImage(bmp, 0, 0)
      const lum = (r: number, g: number, b: number) => {
        const f = [r, g, b].map(v => {
          const s = v / 255
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]
      }
      const res: { selector: string; text: string; ratio: number; min: number; fg: string; bg: string }[] = []
      for (const it of items) {
        const x0 = Math.max(0, Math.floor(it.rect.x * dpr))
        const y0 = Math.max(0, Math.floor(it.rect.y * dpr))
        const x1 = Math.min(cv.width, Math.ceil((it.rect.x + it.rect.w) * dpr))
        const y1 = Math.min(cv.height, Math.ceil((it.rect.y + it.rect.h) * dpr))
        if (x1 - x0 < 2 || y1 - y0 < 2) continue
        const fr = parseInt(it.fg.slice(1, 3), 16)
        const fgc = parseInt(it.fg.slice(3, 5), 16)
        const fb = parseInt(it.fg.slice(5, 7), 16)
        const fgl = lum(fr, fgc, fb)
        // Backdrop = dominant colour of the box once glyph-like pixels (close to the text colour) are dropped.
        const d = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data
        const buckets = new Map<number, { n: number; r: number; g: number; b: number }>()
        for (let i = 0; i < d.length; i += 8) {
          if (Math.abs(d[i] - fr) + Math.abs(d[i + 1] - fgc) + Math.abs(d[i + 2] - fb) < 60) continue
          const key = ((d[i] >> 4) << 8) | ((d[i + 1] >> 4) << 4) | (d[i + 2] >> 4)
          const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 }
          e.n++
          e.r += d[i]
          e.g += d[i + 1]
          e.b += d[i + 2]
          buckets.set(key, e)
        }
        let top: { n: number; r: number; g: number; b: number } | null = null
        for (const e of buckets.values()) if (!top || e.n > top.n) top = e
        if (!top) continue
        const [br, bg, bb] = [top.r / top.n, top.g / top.n, top.b / top.n]
        const l = lum(br, bg, bb)
        const worst = (Math.max(l, fgl) + 0.05) / (Math.min(l, fgl) + 0.05)
        const worstHex = '#' + [br, bg, bb].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')
        if (worst < it.min) {
          res.push({
            selector: it.selector,
            text: it.text,
            ratio: Math.round(worst * 100) / 100,
            min: it.min,
            fg: it.fg,
            bg: worstHex,
          })
        }
      }
      return res
    },
    { png, items, dpr },
  )
  return out.map(f => ({ screen: `${screen} (pixels)`, ...f }))
}

/**
 * Keyboard-focus indicator of the active element: an outline or box-shadow ring must exist and
 * contrast ≥ 3 with the surface behind it. Returns a finding, or null when fine.
 */
export async function checkFocusRing(page: Page, screen: string): Promise<Finding | null> {
  const r = await page.evaluate(() => {
    const el = document.activeElement
    if (!el || el === document.body) return null
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!
    const rgba = (css: string) => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = css
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      return [d[0], d[1], d[2], d[3] / 255]
    }
    const lum = (c: number[]) => {
      const f = c.slice(0, 3).map(v => {
        const s = v / 255
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]
    }
    const cs = getComputedStyle(el)
    const candidates: string[] = []
    if (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) candidates.push(cs.outlineColor)
    if (cs.boxShadow !== 'none') {
      candidates.push(...(cs.boxShadow.match(/(?:rgba?|color|oklch|oklab)\([^)]+\)/g) ?? []))
    }
    let bg: number[] = [255, 255, 255, 1]
    const layers: number[][] = []
    for (let n: Element | null = el.parentElement; n; n = n.parentElement) {
      const c = rgba(getComputedStyle(n).backgroundColor)
      if (c[3] > 0) layers.push(c)
      if (c[3] === 1) break
    }
    for (const l of layers.reverse()) bg = [0, 1, 2].map(i => l[i] * l[3] + bg[i] * (1 - l[3])).concat([1])
    const name = el.tagName.toLowerCase() + (el.getAttribute('aria-label') ? `[${el.getAttribute('aria-label')}]` : '')
    let best = 0
    let bestRing = 'none'
    for (const css of candidates) {
      const rc = rgba(css)
      if (rc[3] < 0.3) continue
      const comp = [0, 1, 2].map(i => rc[i] * rc[3] + bg[i] * (1 - rc[3]))
      const [x, y] = [lum(comp), lum(bg)]
      const r = (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
      if (r > best) {
        best = r
        bestRing = css
      }
    }
    return { name, ratio: best, ring: bestRing }
  })
  if (!r || r.ratio >= 3) return null
  return {
    screen,
    selector: r.name,
    text: `focus ring: ${r.ring.slice(0, 40)}`,
    ratio: Math.round(r.ratio * 100) / 100,
    min: 3,
    fg: '',
    bg: '',
  }
}

/** Wait until nothing visible is mid-fade: Web Animations done and every element's effective opacity settled. */
export async function settleUi(page: Page): Promise<void> {
  await page.evaluate(() =>
    Promise.race([
      Promise.all(document.getAnimations().map(a => a.finished.catch(() => undefined))),
      new Promise(r => setTimeout(r, 1500)),
    ]),
  )
  let prev = ''
  for (let i = 0; i < 20; i++) {
    const now = await page.evaluate(() => {
      const parts: string[] = []
      for (const el of document.querySelectorAll('.torrent-card, [role="dialog"], .modal__dialog, main')) {
        let o = 1
        for (let n: Element | null = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity)
        parts.push(o.toFixed(2))
      }
      return parts.join(',')
    })
    if (now === prev && !now.split(',').some(v => v !== '1.00')) return
    prev = now
    await page.waitForTimeout(100)
  }
}
