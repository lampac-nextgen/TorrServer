import { createTheme, useMediaQuery, type PaletteMode, type Theme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { mainColors, themeColors } from './colors'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]
export type ResolvedThemeMode = typeof THEME_MODES.LIGHT | typeof THEME_MODES.DARK

/** Shared layout breakpoint (matches MUI theme `md`). Use for shell drawer + fullscreen dialogs. */
export const LAYOUT_MOBILE_MAX = 930
export const LAYOUT_MOBILE_MEDIA = `(max-width: ${LAYOUT_MOBILE_MAX}px)`

const typography = { fontFamily: 'Open Sans, sans-serif' }

export const darkTheme = createTheme({
  typography,
  palette: {
    mode: THEME_MODES.DARK,
    primary: { main: mainColors.dark.primary },
    secondary: { main: mainColors.dark.secondary },
  },
})

export const lightTheme = createTheme({
  typography,
  palette: {
    mode: THEME_MODES.LIGHT,
    primary: { main: mainColors.light.primary },
    secondary: { main: mainColors.light.secondary },
  },
})

export const useMaterialUITheme = (): [boolean, ThemePreference, (mode: ThemePreference) => void, Theme] => {
  const savedThemeMode = localStorage.getItem('themeMode') as ThemePreference | null
  const isSystemModeDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (savedThemeMode === THEME_MODES.DARK) return true
    if (savedThemeMode === THEME_MODES.LIGHT) return false
    return isSystemModeDark
  })
  const [currentThemeMode, setCurrentThemeMode] = useState<ThemePreference>(savedThemeMode || THEME_MODES.AUTO)

  const updateThemeMode = (mode: ThemePreference) => {
    setCurrentThemeMode(mode)
    localStorage.setItem('themeMode', mode)
  }

  useEffect(() => {
    if (currentThemeMode === THEME_MODES.LIGHT) setIsDarkMode(false)
    if (currentThemeMode === THEME_MODES.DARK) setIsDarkMode(true)
    if (currentThemeMode === THEME_MODES.AUTO) setIsDarkMode(isSystemModeDark)
  }, [isSystemModeDark, currentThemeMode])

  const theme: ResolvedThemeMode = isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography,
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 930,
            lg: 1200,
            xl: 1536,
          },
        },
        palette: {
          mode: theme as PaletteMode,
          primary: { main: mainColors[theme].primary },
          secondary: { main: mainColors[theme].secondary },
        },
        components: {
          MuiButton: {
            defaultProps: {
              disableElevation: true,
            },
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
              },
              sizeSmall: {
                minHeight: 36,
              },
              sizeMedium: {
                minHeight: 44,
              },
              sizeLarge: {
                minHeight: 44,
              },
            },
          },
          MuiAlert: {
            defaultProps: {
              variant: 'filled',
            },
          },
          MuiTypography: {
            styleOverrides: {
              h6: {
                fontSize: '1.0rem',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: themeColors[theme].app.paperColor,
                backgroundImage: 'none',
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                color: mainColors[theme].labels,
              },
            },
          },
          MuiFormControlLabel: {
            styleOverrides: {
              labelPlacementStart: {
                display: 'flex',
                justifyContent: 'space-between',
                marginInlineStart: 0,
                marginTop: 6,
                marginBottom: 2,
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: mainColors[theme].labels,
                marginBottom: 8,
                '&.Mui-focused': {
                  color: mainColors[theme].labels,
                },
              },
            },
          },
          MuiFormGroup: {
            styleOverrides: {
              root: {
                '& .MuiFormHelperText-root': {
                  marginTop: -8,
                },
              },
            },
          },
        },
      }),
    [theme],
  )

  return [isDarkMode, currentThemeMode, updateThemeMode, muiTheme]
}
