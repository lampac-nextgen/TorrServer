import { createTheme, useMediaQuery, type PaletteMode, type Theme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { mainColors, themeColors } from './colors'
import './mui-augmentation'

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
  const card = themeColors[theme].torrentCard

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
                minHeight: 32,
              },
              sizeMedium: {
                minHeight: 36,
              },
              sizeLarge: {
                minHeight: 40,
              },
            },
            variants: [
              {
                props: { variant: 'cardAction' },
                style: {
                  backgroundColor: card.buttonBGColor,
                  color: '#fff',
                  minHeight: 36,
                  minWidth: 0,
                  width: '100%',
                  borderRadius: 5,
                  textTransform: 'uppercase',
                  justifyContent: 'flex-start',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  padding: '0 10px',
                  boxShadow: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation',
                  '&:hover': {
                    backgroundColor: card.accentCardColor,
                    boxShadow: 'none',
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                  '&.Mui-disabled': {
                    color: '#fff',
                    opacity: 0.75,
                  },
                  '& .MuiButton-startIcon': {
                    marginRight: 8,
                    marginLeft: 0,
                    '& > *:nth-of-type(1)': {
                      fontSize: 18,
                    },
                  },
                  '@media (max-width: 1260px), (max-height: 500px)': {
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    padding: '6px 8px',
                    '& .MuiButton-startIcon': {
                      display: 'none',
                    },
                  },
                  '@media (max-width: 770px)': {
                    fontSize: '0.7rem',
                  },
                  '@media (max-width: 420px)': {
                    fontSize: '0.65rem',
                    padding: '6px 4px',
                  },
                },
              },
            ],
          },
          MuiIconButton: {
            styleOverrides: {
              sizeMedium: {
                width: 36,
                height: 36,
              },
              sizeSmall: {
                width: 32,
                height: 32,
              },
            },
          },
          MuiAlert: {
            defaultProps: {
              variant: 'filled',
            },
          },
          MuiChip: {
            defaultProps: {
              size: 'small',
            },
            styleOverrides: {
              root: {
                fontWeight: 500,
              },
              sizeSmall: {
                height: 22,
                fontSize: 11,
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              h6: {
                fontSize: '0.9375rem',
                fontWeight: 600,
              },
              body1: {
                fontSize: '0.875rem',
              },
              body2: {
                fontSize: '0.8125rem',
              },
            },
          },
          MuiListItemText: {
            styleOverrides: {
              primary: {
                fontSize: '0.875rem',
              },
              secondary: {
                fontSize: '0.75rem',
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
    [theme, card],
  )

  return [isDarkMode, currentThemeMode, updateThemeMode, muiTheme]
}
