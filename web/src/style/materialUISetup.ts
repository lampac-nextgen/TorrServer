import { useColorScheme, type Theme } from '@mui/material/styles'
import { useCallback } from 'react'

import { createAppTheme } from 'shared/theme/createAppTheme'
import { BP, queryMax } from './breakpoints'
import './mui-augmentation'

export { BP, mediaMax, queryMax, MEDIA_SHORT_VIEWPORT } from './breakpoints'
export { createAppTheme } from 'shared/theme/createAppTheme'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'system',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]
export type ResolvedThemeMode = 'light' | 'dark'

/** Compat aliases — prefer `BP` / `mediaMax` / `queryMax`. */
export const LAYOUT_PHONE_MAX = BP.phone
export const LAYOUT_PHONE_MEDIA = queryMax('phone')
export const LAYOUT_COMPACT_MAX = BP.compact
export const LAYOUT_COMPACT_MEDIA = queryMax('compact')
export const LAYOUT_MOBILE_MAX = BP.mobile
export const LAYOUT_MOBILE_MEDIA = queryMax('mobile')
export const LAYOUT_LIST_1COL_MAX = BP.mobile
export const LAYOUT_LIST_1COL_MEDIA = queryMax('mobile')
export const LAYOUT_LIST_2COL_MAX = BP.list2
export const LAYOUT_LIST_2COL_MEDIA = queryMax('list2')
export const LAYOUT_DIALOG_FULLSCREEN_MAX = BP.dialog
export const LAYOUT_DIALOG_FULLSCREEN_MEDIA = queryMax('dialog')
export const LAYOUT_LIST_3COL_MAX = BP.list3
export const LAYOUT_LIST_3COL_MEDIA = queryMax('list3')

/** Singleton app theme (cssVariables + colorSchemes). */
export const appTheme: Theme = createAppTheme()

/** @deprecated Prefer appTheme */
export const darkTheme = appTheme
/** @deprecated Prefer appTheme */
export const lightTheme = appTheme

/**
 * Must be called under ThemeProvider with colorSchemes.
 * Returns [isDark, preference, setPreference].
 */
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
