import { createTheme, useMediaQuery, type PaletteMode, type Theme } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { mainColors, themeColors } from './colors'
import { BP, MEDIA_SHORT_VIEWPORT, queryMax } from './breakpoints'
import './mui-augmentation'

export { BP, mediaMax, queryMax, MEDIA_SHORT_VIEWPORT } from './breakpoints'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]
export type ResolvedThemeMode = typeof THEME_MODES.LIGHT | typeof THEME_MODES.DARK

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

const typography = {
  fontFamily: 'Open Sans, sans-serif',
}

export const darkTheme = createTheme({
  typography,
  palette: {
    mode: THEME_MODES.DARK,
    primary: { main: mainColors.dark.primary },
    secondary: { main: mainColors.dark.secondary },
    background: {
      default: themeColors.dark.app.appSecondaryColor,
      paper: themeColors.dark.app.paperColor,
    },
  },
})

export const lightTheme = createTheme({
  typography,
  palette: {
    mode: THEME_MODES.LIGHT,
    primary: { main: mainColors.light.primary },
    secondary: { main: mainColors.light.secondary },
    background: {
      default: themeColors.light.app.appSecondaryColor,
      paper: themeColors.light.app.paperColor,
    },
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
            sm: BP.compact,
            md: BP.mobile,
            lg: BP.list3,
            xl: 1536,
          },
        },
        palette: {
          mode: theme as PaletteMode,
          primary: { main: mainColors[theme].primary },
          secondary: { main: mainColors[theme].secondary },
          // MUI 6 dark default is #121212 — master used gray paper/secondary, not Material black.
          background: {
            default: themeColors[theme].app.appSecondaryColor,
            paper: themeColors[theme].app.paperColor,
          },
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
                  letterSpacing: '0.01em',
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
                  [`@media ${queryMax('list3')}, ${MEDIA_SHORT_VIEWPORT}`]: {
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    minHeight: 40,
                    padding: '6px 6px',
                    '& .MuiButton-startIcon': {
                      display: 'none',
                    },
                  },
                  [`@media ${queryMax('mobile')}`]: {
                    fontSize: '0.75rem',
                    fontWeight: 400,
                  },
                  [`@media ${queryMax('phone')}`]: {
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    padding: '6px 8px',
                    minHeight: 40,
                  },
                },
              },
            ],
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                [`@media ${queryMax('mobile')}`]: {
                  minWidth: 44,
                  minHeight: 44,
                },
              },
              sizeMedium: {
                width: 36,
                height: 36,
                [`@media ${queryMax('mobile')}`]: {
                  width: 44,
                  height: 44,
                },
              },
              sizeSmall: {
                width: 32,
                height: 32,
                [`@media ${queryMax('mobile')}`]: {
                  width: 44,
                  height: 44,
                },
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
                fontSize: 12,
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
                fontSize: '1rem',
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
