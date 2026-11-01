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
})
