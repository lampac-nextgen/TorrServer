import data from './palettes.json'
import type { ThemePalette } from './useThemePreference'

export const PALETTE_GROUPS = ['brand', 'neutral', 'warm', 'cool', 'green', 'vivid', 'accessible'] as const
export type PaletteGroup = (typeof PALETTE_GROUPS)[number]

interface Entry {
  id: ThemePalette
  group: PaletteGroup
  hidden?: boolean
}
const entries = data.palettes as unknown as Entry[]

/**
 * Palettes for pickers, grouped. Hidden palettes (retired near-duplicates) stay fully defined so a
 * stored choice keeps working, but are only listed while they are the one in use.
 */
export function groupedPalettes(current?: ThemePalette): { group: PaletteGroup; ids: ThemePalette[] }[] {
  return PALETTE_GROUPS.map(group => ({
    group,
    ids: entries.filter(e => e.group === group && (!e.hidden || e.id === current)).map(e => e.id),
  })).filter(g => g.ids.length > 0)
}

/** Flat, grouped-order list for menus. */
export const pickerPaletteIds = (current?: ThemePalette): ThemePalette[] => groupedPalettes(current).flatMap(g => g.ids)
