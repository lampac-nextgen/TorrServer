import { describe, expect, it } from 'vitest'

import data from './palettes.json'
import { groupedPalettes, pickerPaletteIds, PALETTE_GROUPS } from './paletteGroups'
import { THEME_PALETTE_IDS, type ThemePalette } from './useThemePreference'

const entries = data.palettes as unknown as { id: ThemePalette; group: string; hidden?: boolean }[]

describe('palette groups', () => {
  it('assigns every palette to a known group', () => {
    for (const e of entries) expect(PALETTE_GROUPS as readonly string[], e.id).toContain(e.group)
  })

  it('lists each visible palette exactly once, in group order', () => {
    const ids = pickerPaletteIds()
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.sort()).toEqual(
      entries
        .filter(e => !e.hidden)
        .map(e => e.id)
        .sort(),
    )
  })

  it('never hides the default palette', () => {
    expect(entries.find(e => e.id === data.default)?.hidden).toBeFalsy()
  })

  it('keeps hidden palettes valid and shows one only while it is in use', () => {
    const hidden = entries.filter(e => e.hidden)
    expect(hidden.length).toBeGreaterThan(0)
    for (const e of hidden) {
      expect(THEME_PALETTE_IDS, e.id).toContain(e.id)
      expect(pickerPaletteIds()).not.toContain(e.id)
      expect(pickerPaletteIds(e.id)).toContain(e.id)
      expect(groupedPalettes(e.id).find(g => g.group === e.group)?.ids).toContain(e.id)
    }
  })
})
