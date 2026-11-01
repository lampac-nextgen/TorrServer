import data from './palettes.json'
import type { ThemePalette } from './useThemePreference'

export interface PaletteSwatch {
  accent: string
  header: string
  darkAccent: string
  darkHeader: string
}

/** Accent + header chips for both modes (derived from palettes.json). */
export const THEME_PALETTE_SWATCHES = Object.fromEntries(
  data.palettes.map(p => [
    p.id,
    {
      accent: p.light.accent,
      header: p.light['app-header'],
      darkAccent: p.dark.accent,
      darkHeader: p.dark['app-header'],
    },
  ]),
) as Record<ThemePalette, PaletteSwatch>

/** One chip showing the light variant on the left and the dark one on the right. */
export function swatchBackground(s: PaletteSwatch): string {
  const half = (header: string, accent: string) => `linear-gradient(135deg, ${header} 0 52%, ${accent} 52% 100%)`
  return `${half(s.header, s.accent)} 0 0 / 50% 100% no-repeat, ${half(s.darkHeader, s.darkAccent)} 100% 0 / 50% 100% no-repeat`
}
