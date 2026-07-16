import { mainColors, themeColors } from './colors'

export type ThemeModeName = 'light' | 'dark'

export default function getStyledComponentsTheme(type: ThemeModeName) {
  return { ...themeColors[type], ...mainColors[type] }
}
