import './mui-augmentation'
import { createTheme } from '@mui/material/styles'

import { mainColors, themeColors } from './colors'
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
            minHeight: 36,
            minWidth: 0,
            width: '100%',
            borderRadius: radius.sm,
            textTransform: 'uppercase' as const,
            justifyContent: 'flex-start',
            fontSize: typeScale.button,
            fontWeight: 400,
            letterSpacing: '0.01em',
            padding: '0 10px',
            boxShadow: 'none',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            '&:hover': {
              backgroundColor: card.accentCardColor,
              boxShadow: 'none',
            },
            '&:active': { transform: 'scale(0.98)' },
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
  MuiFormGroup: {
    styleOverrides: {
      root: {
        '& .MuiFormHelperText-root': { marginTop: -8 },
      },
    },
  },
}

/** Single MUI 9 theme with CSS variables + light/dark color schemes (MatriX). */
export function createAppTheme() {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: 'class',
      cssVarPrefix: 'ts',
    },
    colorSchemes: {
      light: {
        palette: {
          primary: { main: mainColors.light.primary },
          secondary: { main: mainColors.light.secondary },
          background: {
            default: themeColors.light.app.appSecondaryColor,
            paper: themeColors.light.app.paperColor,
          },
          text: { primary: mainColors.light.labels },
        },
      },
      dark: {
        palette: {
          primary: { main: mainColors.dark.primary },
          secondary: { main: mainColors.dark.secondary },
          background: {
            default: themeColors.dark.app.appSecondaryColor,
            paper: themeColors.dark.app.paperColor,
          },
          text: { primary: mainColors.dark.labels },
        },
      },
    },
    typography,
    breakpoints,
    components: sharedComponents,
  })
}
