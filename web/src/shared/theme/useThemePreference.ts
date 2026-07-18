import { useColorScheme } from '@mui/material/styles'
import { useCallback } from 'react'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'system',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]

/** Must be called under ThemeProvider with colorSchemes. */
export function useThemePreference(): [boolean, ThemePreference, (mode: ThemePreference) => void] {
  const { mode, setMode, systemMode } = useColorScheme()

  const updateThemeMode = useCallback(
    (next: ThemePreference) => {
      setMode(next)
    },
    [setMode],
  )

  const resolvedDark =
    mode === 'dark' || (mode === 'system' && systemMode === 'dark') || (mode == null && systemMode === 'dark')

  const currentPreference: ThemePreference =
    mode === 'light' ? THEME_MODES.LIGHT : mode === 'dark' ? THEME_MODES.DARK : THEME_MODES.AUTO

  return [Boolean(resolvedDark), currentPreference, updateThemeMode]
}
