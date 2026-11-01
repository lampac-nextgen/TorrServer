import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

import { THEME_PALETTE_SWATCHES } from './paletteSwatches'
import { THEME_PALETTE_IDS } from './useThemePreference'

const SRC = resolve(__dirname, '../..')
const LOCALES = ['en', 'ru', 'ua', 'bg', 'fr', 'ro', 'zh']
const css = readFileSync(resolve(SRC, 'index.css'), 'utf8')

const labelKey = (id: string) => `ThemePalette${id.charAt(0).toUpperCase()}${id.slice(1)}`

describe('theme palettes stay in sync', () => {
  it('has a swatch for every palette and no extras', () => {
    expect(Object.keys(THEME_PALETTE_SWATCHES).sort()).toEqual([...THEME_PALETTE_IDS].sort())
  })

  it('has a light and a dark CSS block for every palette', () => {
    for (const id of THEME_PALETTE_IDS) {
      expect(css, `:root palette ${id}`).toContain(`:root[data-palette='${id}']`)
      expect(css, `.dark palette ${id}`).toContain(`.dark[data-palette='${id}']`)
    }
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

  it('keeps WCAG AA contrast for text, accent buttons and header in every palette and mode', () => {
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
    const failures: string[] = []
    const blocks = css.matchAll(/(:root|\.dark)(?:,\s*\n(?:\.dark|:root))?\[data-palette='(\w+)'\]\s*\{([^}]*)\}/g)
    let seen = 0
    for (const [, scope, id, body] of blocks) {
      seen++
      const v: Record<string, string> = {}
      for (const d of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) v[d[1]] = d[2]
      const mode = scope === '.dark' ? 'dark' : 'light'
      const checks: [string, string, string, number][] = [
        ['foreground/background', v.foreground, v.background, 4.5],
        ['foreground/surface', v.foreground, v.surface, 4.5],
        ['muted/surface', v.muted, v.surface, 4.5],
        ['accent-foreground/accent', v['accent-foreground'], v.accent, 4.5],
        ['accent/surface', v.accent, v.surface, 3],
        ['header-foreground/header', v['app-header-foreground'], v['app-header'], 4.5],
      ]
      for (const [name, a, b, min] of checks) {
        const r = ratio(a, b)
        if (r < min) failures.push(`${id} ${mode} ${name} ${r.toFixed(2)} < ${min}`)
      }
    }
    expect(seen).toBe(THEME_PALETTE_IDS.length * 2)
    expect(failures).toEqual([])
  })
})
