import { mainColors, themeColors } from 'style/colors'

export const alphaCss = (color: string, alpha: number) =>
  `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`

type ThemeLike = { palette?: { mode?: string } }

export const resolveThemeColors = (theme: ThemeLike) => {
  const mode = theme.palette?.mode === 'dark' ? 'dark' : 'light'
  return { ...themeColors[mode], ...mainColors[mode] }
}
