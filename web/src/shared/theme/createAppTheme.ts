import './mui-augmentation'
import { createTheme } from '@mui/material/styles'

import { brand, mainColors, themeColors } from './colors'
import { alphaCss } from './color'
import { BP, MEDIA_SHORT_VIEWPORT, queryMax } from './breakpoints'
import { FONT_STACK, LETTER_SPACING, TOUCH_TARGET_PX, radius, typography as typeScale } from './tokens'

const typography = {
  fontFamily: FONT_STACK,
  fontSize: 14,
  htmlFontSize: 16,
  body1: {
    fontSize: typeScale.body,
    letterSpacing: LETTER_SPACING,
  },
  body2: {
    fontSize: typeScale.meta,
    letterSpacing: LETTER_SPACING,
  },
  button: {
    fontSize: typeScale.button,
    letterSpacing: LETTER_SPACING,
  },
  h6: {
    fontSize: typeScale.heading,
    fontWeight: 600,
    letterSpacing: LETTER_SPACING,
  },
}

const breakpoints = {
  values: {
    xs: 0,
    sm: BP.compact,
    md: BP.dialog,
    lg: BP.list3,
    xl: 1536,
  },
}

const sharedComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: 'var(--ts-palette-background-default)',
        color: 'var(--ts-palette-text-primary)',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundImage: 'none',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: radius.md,
        textTransform: 'none' as const,
      },
      sizeSmall: { minHeight: 32 },
      sizeMedium: { minHeight: 36 },
      sizeLarge: { minHeight: 40 },
    },
    variants: [
      {
        props: { variant: 'cardAction' as const },
        style: ({ theme }: { theme: { palette: { mode: string } } }) => {
          const card = themeColors[theme.palette.mode === 'dark' ? 'dark' : 'light'].torrentCard
          return {
            backgroundColor: card.buttonBGColor,
            color: '#fff',
            flex: '1 1 0',
            minHeight: 40,
            minWidth: 0,
            width: '100%',
            borderRadius: 0,
            textTransform: 'uppercase' as const,
            justifyContent: 'flex-start',
            fontSize: typeScale.button,
            fontWeight: 600,
            letterSpacing: '0.02em',
            lineHeight: 1.15,
            padding: '6px 12px',
            boxShadow: 'none',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            '&:hover': {
              backgroundColor: card.accentCardColor,
              boxShadow: 'none',
            },
            '&:active': { transform: 'none', backgroundColor: card.accentCardColor },
            '&.Mui-disabled': { color: '#fff', opacity: 0.75 },
            '& .MuiButton-startIcon': {
              marginRight: 8,
              marginLeft: 0,
              '& > *:nth-of-type(1)': { fontSize: 18 },
            },
            [`@media ${queryMax('list3')}, ${MEDIA_SHORT_VIEWPORT}`]: {
              justifyContent: 'center',
              fontSize: typeScale.buttonDense,
              minHeight: 40,
              padding: '6px 6px',
              '& .MuiButton-startIcon': { display: 'none' },
            },
            [`@media ${queryMax('mobile')}`]: {
              fontSize: typeScale.buttonDense,
              minHeight: TOUCH_TARGET_PX,
              borderRadius: radius.sm,
              flex: '1 1 auto',
            },
            [`@media ${queryMax('phone')}`]: {
              fontSize: typeScale.buttonPhone,
              padding: '6px 8px',
              minHeight: TOUCH_TARGET_PX,
            },
          }
        },
      },
    ],
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        [`@media ${queryMax('mobile')}`]: {
          minWidth: TOUCH_TARGET_PX,
          minHeight: TOUCH_TARGET_PX,
        },
      },
      sizeMedium: {
        width: 36,
        height: 36,
        [`@media ${queryMax('mobile')}`]: {
          width: TOUCH_TARGET_PX,
          height: TOUCH_TARGET_PX,
        },
      },
      sizeSmall: {
        width: 32,
        height: 32,
        [`@media ${queryMax('mobile')}`]: {
          width: TOUCH_TARGET_PX,
          height: TOUCH_TARGET_PX,
        },
      },
    },
  },
  MuiAlert: { defaultProps: { variant: 'filled' as const } },
  MuiChip: {
    defaultProps: { size: 'small' as const },
    styleOverrides: {
      root: { fontWeight: 500 },
      sizeSmall: { height: 22, fontSize: 12 },
    },
  },
  MuiToggleButton: {
    styleOverrides: { root: { textTransform: 'none' as const } },
  },
  MuiTypography: {
    styleOverrides: {
      h6: {
        fontSize: typeScale.heading,
        fontWeight: 600,
        lineHeight: 1.3,
        [`@media ${queryMax('mobile')}`]: { fontSize: typeScale.body },
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: { fontSize: typeScale.body },
      secondary: { fontSize: typeScale.button },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        [`@media ${queryMax('mobile')}`]: { minHeight: TOUCH_TARGET_PX },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundImage: 'none',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundImage: 'none',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      labelPlacementStart: {
        display: 'flex',
        justifyContent: 'space-between',
        marginInlineStart: 0,
        marginTop: 4,
        marginBottom: 4,
      },
    },
  },
  MuiSwitch: {
    defaultProps: { color: 'secondary' as const },
    styleOverrides: {
      root: {
        padding: 8,
      },
    },
  },
  MuiFormGroup: {
    styleOverrides: {
      root: {
        '& .MuiFormHelperText-root': { marginTop: 0, marginBottom: 8 },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: 'var(--ts-palette-divider)',
      },
    },
  },
}

function schemePalette(mode: 'light' | 'dark') {
  const main = mainColors[mode]
  const app = themeColors[mode].app
  const isDark = mode === 'dark'

  return {
    primary: {
      main: main.primary,
      dark: isDark ? brand.greenHover : brand.greenDeep,
      light: isDark ? brand.greenBright : '#33b88a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: main.secondary,
      dark: isDark ? brand.green : brand.greenDeep,
      light: isDark ? '#7aecc0' : '#4db380',
      contrastText: isDark ? brand.ink : '#ffffff',
    },
    error: { main: brand.danger },
    warning: { main: brand.warning },
    info: { main: brand.info },
    success: { main: brand.green },
    background: {
      default: app.appSecondaryColor,
      paper: app.paperColor,
    },
    text: {
      primary: main.labels,
      secondary: main.labelsMuted,
      disabled: alphaCss(main.labels, 0.38),
    },
    divider: isDark ? alphaCss(brand.greenBright, 0.14) : alphaCss(brand.greenDeep, 0.12),
    action: {
      active: isDark ? brand.greenBright : brand.greenHover,
      hover: alphaCss(main.primary, isDark ? 0.1 : 0.06),
      selected: alphaCss(main.primary, isDark ? 0.18 : 0.1),
      disabled: alphaCss(main.labels, 0.3),
      disabledBackground: alphaCss(main.labels, 0.12),
    },
  }
}

/** Single MUI 9 theme with CSS variables + light/dark color schemes (MatriX). */
export function createAppTheme() {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: 'class',
      cssVarPrefix: 'ts',
    },
    colorSchemes: {
      light: { palette: schemePalette('light') },
      dark: { palette: schemePalette('dark') },
    },
    typography,
    breakpoints,
    components: sharedComponents,
  })
}
