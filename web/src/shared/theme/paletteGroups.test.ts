import { describe, expect, it } from 'vitest'

import data from './palettes.json'
import { groupedPalettes, pickerPaletteIds, PALETTE_GROUPS } from './paletteGroups'
import { THEME_PALETTE_IDS, type ThemePalette } from './useThemePreference'

const entries = data.palettes as unknown as { id: ThemePalette; group: string }[]

describe('palette groups', () => {
  it('assigns every palette to a known group', () => {
    for (const e of entries) expect(PALETTE_GROUPS as readonly string[], e.id).toContain(e.group)
  })

  it('lists each palette exactly once, grouped', () => {
    const ids = pickerPaletteIds()
    expect(new Set(ids).size).toBe(ids.length)
    expect([...ids].sort()).toEqual([...THEME_PALETTE_IDS].sort())
    expect(groupedPalettes().flatMap(g => g.ids)).toEqual(ids)
  })
})

describe('retired palette aliases', () => {
  const aliases = data.aliases as Record<string, string>

  it('point at existing palettes, never at another alias or themselves', () => {
    for (const [from, to] of Object.entries(aliases)) {
      expect(THEME_PALETTE_IDS as string[], `${from} -> ${to}`).toContain(to)
      expect(aliases[to], `${to} must not be an alias`).toBeUndefined()
      expect(THEME_PALETTE_IDS as string[], `${from} is retired`).not.toContain(from)
    }
  })
})
