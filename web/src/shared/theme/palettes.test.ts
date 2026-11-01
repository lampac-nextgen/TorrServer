import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import data from './palettes.json'
import { PALETTE_TOKENS, renderPalettesCss } from './palettesCss.mjs'
import { THEME_PALETTE_SWATCHES } from './paletteSwatches'
import { THEME_PALETTE_IDS } from './useThemePreference'

const SRC = resolve(__dirname, '../..')
const LOCALES = ['en', 'ru', 'ua', 'bg', 'fr', 'ro', 'zh']

const labelKey = (id: string) => `ThemePalette${id.charAt(0).toUpperCase()}${id.slice(1)}`

const lum = (h: string) => {
  const c = [1, 3, 5]
    .map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

const oklab = (h: string) => {
  const lin = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  const [r, g, b] = [lin(1), lin(3), lin(5)]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}
const deltaE = (a: string, b: string) => Math.hypot(...oklab(a).map((v, i) => v - oklab(b)[i]))

describe('theme palettes stay in sync', () => {
  it('lists the same palette ids in palettes.json and the TS union', () => {
    expect(data.palettes.map(p => p.id).sort()).toEqual([...THEME_PALETTE_IDS].sort())
    expect(THEME_PALETTE_IDS).toContain(data.default)
    expect(Object.keys(THEME_PALETTE_SWATCHES).sort()).toEqual([...THEME_PALETTE_IDS].sort())
  })

  it('defines every token as a hex color (rail foreground may be rgba) in both modes', () => {
    for (const p of data.palettes) {
      for (const mode of ['light', 'dark'] as const) {
        const tokens = p[mode] as Record<string, string>
        expect(Object.keys(tokens).sort(), `${p.id} ${mode}`).toEqual([...PALETTE_TOKENS].sort())
        for (const key of PALETTE_TOKENS) {
          const re = key === 'app-rail-foreground' ? /^(#[0-9a-f]{6}|rgba\(.+\))$/i : /^#[0-9a-f]{6}$/i
          expect(tokens[key], `${p.id} ${mode} --${key}`).toMatch(re)
        }
      }
    }
  })

  it('keeps palettes.generated.css in sync with palettes.json (run `yarn gen:palettes`)', () => {
    const css = readFileSync(resolve(SRC, 'palettes.generated.css'), 'utf8')
    expect(css).toBe(renderPalettesCss(data))
  })

  it.each(LOCALES)('has a label for every palette in %s', locale => {
    const dict = JSON.parse(readFileSync(resolve(SRC, `locales/${locale}/translation.json`), 'utf8')) as Record<
      string,
      unknown
    >
    for (const id of THEME_PALETTE_IDS) {
      expect(typeof dict[labelKey(id)], `${locale}:${labelKey(id)}`).toBe('string')
    }
  })

  it('keeps WCAG AA contrast for text, accent, status colors and header in every palette and mode', () => {
    const failures: string[] = []
    for (const p of data.palettes) {
      for (const mode of ['light', 'dark'] as const) {
        const v = p[mode] as Record<string, string>
        const checks: [string, string, string, number][] = [
          ['foreground/background', v.foreground, v.background, 4.5],
          ['foreground/surface', v.foreground, v.surface, 4.5],
          ['foreground/surface-tertiary', v.foreground, v['surface-tertiary'], 4.5],
          ['muted/surface', v.muted, v.surface, 4.5],
          ['muted/surface-tertiary', v.muted, v['surface-tertiary'], 4.5],
          ['accent-foreground/accent', v['accent-foreground'], v.accent, 4.5],
          ['accent/surface', v.accent, v.surface, 3],
          ['accent/background', v.accent, v.background, 3],
          ['accent/surface-tertiary', v.accent, v['surface-tertiary'], 4.5],
          ['accent-secondary/surface', v['accent-secondary'], v.surface, 3],
          ['danger/surface', v.danger, v.surface, 3],
          ['danger-foreground/danger', v['danger-foreground'], v.danger, 4.5],
          ['warning-foreground/warning', v['warning-foreground'], v.warning, 4.5],
          ['success-foreground/success', v['success-foreground'], v.success, 4.5],
          ['warning/surface', v.warning, v.surface, 3],
          ['header-foreground/header', v['app-header-foreground'], v['app-header'], 4.5],
        ]
        for (const [name, a, b, min] of checks) {
          const r = ratio(a, b)
          if (r < min) failures.push(`${p.id} ${mode} ${name} ${r.toFixed(2)} < ${min}`)
        }
      }
    }
    expect(failures).toEqual([])
  })

  it('keeps accent and accent-secondary visibly different (OKLab ΔE ≥ 0.1) in every palette and mode', () => {
    const close: string[] = []
    for (const p of data.palettes) {
      for (const mode of ['light', 'dark'] as const) {
        const v = p[mode] as Record<string, string>
        const d = deltaE(v.accent, v['accent-secondary'])
        if (d < 0.1) close.push(`${p.id} ${mode} ΔE ${d.toFixed(3)}`)
      }
    }
    expect(close).toEqual([])
  })
})
