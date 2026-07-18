import { alphaCss } from './color'

/**
 * MatriX brand — modern greenfield palette (not a port of legacy #323637/#545a5e mud).
 * Light: cool mint surfaces + vivid brand green.
 * Dark: green-ink surfaces (near-black with green chroma), bright accents for contrast.
 */
export const brand = {
  green: '#00a572',
  greenHover: '#008f63',
  greenDeep: '#0a5c42',
  greenBright: '#2ecf9a',
  greenSoft: '#d8f3e8',
  greenMist: '#eef7f2',
  ink: '#0b1210',
  inkElevated: '#131c18',
  inkSoft: '#1a2620',
  inkBorder: '#2a3b32',
  cream: '#f7fbf9',
  textLight: '#0f1915',
  textDark: '#e6f2ec',
  textMutedLight: '#5a7268',
  textMutedDark: '#8fafa0',
  danger: '#e05555',
  warning: '#e0a040',
  info: '#3d9edd',
} as const

export const themeColors = {
  light: {
    app: {
      headerToggleColor: brand.green,
      appSecondaryColor: brand.greenMist,
      sidebarBGColor: '#14201b',
      sidebarFillColor: '#d4ebe0',
      paperColor: '#ffffff',
    },
    torrentCard: {
      accentCardColor: brand.greenDeep,
      buttonBGColor: brand.greenHover,
      cardPrimaryColor: brand.green,
      cardSecondaryColor: '#9fd4b8',
      cardSurfaceColor: brand.cream,
    },
    dialogTorrentDetailsContent: {
      posterBGColor: '#9fd4b8',
      gradientStartColor: brand.greenSoft,
      gradientEndColor: '#bfe8d4',
      cacheSectionBGColor: '#c5e9d6',
      widgetFontColor: brand.greenDeep,
      titleFontColor: brand.textLight,
      subNameFontColor: brand.textMutedLight,
      torrentFilesSectionBGColor: brand.cream,
      bufferTrailStartColor: '#c5e6d4',
      bufferTrailEndColor: '#b5dec9',
      bufferEmptyTrackColor: brand.greenMist,
      bufferTrackBorderColor: brand.greenHover,
    },
    detailedView: {
      gradientStartColor: brand.greenSoft,
      gradientEndColor: '#bfe8d4',
      cacheSectionBGColor: '#ffffff',
    },
    addDialog: {
      gradientStartColor: brand.greenSoft,
      gradientEndColor: '#bfe8d4',
      fontColor: brand.textLight,
      notificationErrorBGColor: '#e8c4b0',
      notificationSuccessBGColor: '#a8dcc0',
      languageSwitchBGColor: brand.green,
      languageSwitchFontColor: '#ffffff',
      posterBGColor: '#9fd4b8',
      separatorColor: alphaCss(brand.greenDeep, 0.12),
      dropzoneBorderColor: alphaCss(brand.greenDeep, 0.18),
      dropzoneHoverBGColor: alphaCss(brand.green, 0.06),
    },
    torrentFunctions: {
      fontColor: brand.textLight,
    },
    table: {
      defaultPrimaryColor: brand.green,
      defaultSecondaryColor: brand.greenHover,
      defaultTertiaryColor: '#03aa89',
      rowBGColor: brand.cream,
      viewedRowBGColor: '#dcebe3',
      dividerColor: '#c5d9ce',
      rowFontColor: brand.textLight,
      shortTableButtonsBGColor: brand.cream,
      outlinedButtonBorderColor: alphaCss(brand.green, 0.4),
      viewedPrimaryColor: '#6b857a',
      viewedSecondaryColor: '#7a9288',
      viewedTertiaryColor: '#8a9f96',
    },
    settingsDialog: {
      contentBG: brand.cream,
      footerBG: '#ffffff',
      separatorColor: alphaCss(brand.greenDeep, 0.12),
      cacheBeforeReaderColor: '#b3dfc9',
      cacheAfterReaderColor: brand.green,
      preloadCacheBorderColor: brand.inkSoft,
      preloadCacheFontColor: brand.textLight,
      storageSelectedBG: brand.inkSoft,
      storageUnselectedBG: '#dce8e2',
      storageSelectedIcon: brand.greenSoft,
      storageUnselectedIcon: brand.inkSoft,
    },
    aboutDialog: {
      bandBG: brand.greenSoft,
      bandFontColor: brand.greenDeep,
    },
  },
  dark: {
    app: {
      headerToggleColor: brand.greenBright,
      appSecondaryColor: brand.ink,
      sidebarBGColor: '#080d0b',
      sidebarFillColor: '#c5ddd2',
      paperColor: brand.inkElevated,
    },
    torrentCard: {
      accentCardColor: '#075a40',
      buttonBGColor: brand.greenHover,
      cardPrimaryColor: brand.greenBright,
      cardSecondaryColor: brand.inkBorder,
      cardSurfaceColor: brand.inkSoft,
    },
    dialogTorrentDetailsContent: {
      posterBGColor: brand.inkBorder,
      gradientStartColor: '#15241e',
      gradientEndColor: '#1a2e26',
      cacheSectionBGColor: '#1e3028',
      widgetFontColor: brand.textMutedDark,
      titleFontColor: brand.textDark,
      subNameFontColor: brand.textMutedDark,
      torrentFilesSectionBGColor: '#101816',
      bufferTrailStartColor: '#24382f',
      bufferTrailEndColor: '#2a4036',
      bufferEmptyTrackColor: brand.inkElevated,
      bufferTrackBorderColor: brand.greenBright,
    },
    detailedView: {
      gradientStartColor: '#15241e',
      gradientEndColor: '#1a2e26',
      cacheSectionBGColor: brand.inkSoft,
    },
    addDialog: {
      gradientStartColor: '#15241e',
      gradientEndColor: '#1a2e26',
      fontColor: brand.textDark,
      notificationErrorBGColor: '#8b2e38',
      notificationSuccessBGColor: '#1e3028',
      languageSwitchBGColor: brand.greenHover,
      languageSwitchFontColor: brand.textDark,
      posterBGColor: brand.inkBorder,
      separatorColor: alphaCss(brand.greenBright, 0.14),
      dropzoneBorderColor: alphaCss(brand.greenBright, 0.28),
      dropzoneHoverBGColor: alphaCss(brand.greenBright, 0.08),
    },
    torrentFunctions: {
      fontColor: brand.textDark,
    },
    table: {
      defaultPrimaryColor: brand.green,
      defaultSecondaryColor: brand.greenHover,
      defaultTertiaryColor: brand.greenBright,
      rowBGColor: alphaCss('#1a2620', 0.9),
      viewedRowBGColor: alphaCss('#24382f', 0.95),
      dividerColor: brand.inkBorder,
      rowFontColor: brand.textDark,
      shortTableButtonsBGColor: brand.inkSoft,
      outlinedButtonBorderColor: alphaCss(brand.greenBright, 0.4),
      viewedPrimaryColor: '#4a6558',
      viewedSecondaryColor: '#557064',
      viewedTertiaryColor: '#607b6f',
    },
    settingsDialog: {
      contentBG: brand.inkSoft,
      footerBG: brand.inkElevated,
      separatorColor: alphaCss(brand.greenBright, 0.14),
      cacheBeforeReaderColor: '#2a4036',
      cacheAfterReaderColor: brand.greenBright,
      preloadCacheBorderColor: brand.greenBright,
      preloadCacheFontColor: brand.textDark,
      storageSelectedBG: brand.greenHover,
      storageUnselectedBG: brand.inkBorder,
      storageSelectedIcon: brand.textDark,
      storageUnselectedIcon: brand.textMutedDark,
    },
    aboutDialog: {
      bandBG: brand.inkSoft,
      bandFontColor: brand.textDark,
    },
  },
} as const

export type ThemeScheme = keyof typeof themeColors

export function getThemeColors(mode: 'light' | 'dark') {
  return themeColors[mode]
}

/** MUI primary/secondary/text anchors. Dark primary stays brand-bright for AppBar contrast. */
export const mainColors = {
  light: {
    primary: brand.green,
    secondary: brand.greenHover,
    labels: brand.textLight,
    labelsMuted: brand.textMutedLight,
  },
  dark: {
    primary: brand.green,
    secondary: brand.greenBright,
    labels: brand.textDark,
    labelsMuted: brand.textMutedDark,
  },
} as const
