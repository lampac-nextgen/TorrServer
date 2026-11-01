import data from './palettes.json'
import type { ThemePalette } from './useThemePreference'

/** Light-mode accent + header chips for palette pickers (derived from palettes.json). */
export const THEME_PALETTE_SWATCHES = Object.fromEntries(
  data.palettes.map(p => [p.id, { accent: p.light.accent, header: p.light['app-header'] }]),
) as Record<ThemePalette, { accent: string; header: string }>
