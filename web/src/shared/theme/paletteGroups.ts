import data from './palettes.json'
import type { ThemePalette } from './useThemePreference'

export const PALETTE_GROUPS = ['brand', 'neutral', 'warm', 'cool', 'green', 'vivid', 'accessible'] as const
export type PaletteGroup = (typeof PALETTE_GROUPS)[number]

interface Entry {
  id: ThemePalette
  group: PaletteGroup
}
const entries = data.palettes as unknown as Entry[]

/** Palettes for pickers, grouped in a fixed order. */
export function groupedPalettes(): { group: PaletteGroup; ids: ThemePalette[] }[] {
  return PALETTE_GROUPS.map(group => ({ group, ids: entries.filter(e => e.group === group).map(e => e.id) })).filter(
    g => g.ids.length > 0,
  )
}

/** Flat, grouped-order list for menus. */
export const pickerPaletteIds = (): ThemePalette[] => groupedPalettes().flatMap(g => g.ids)
