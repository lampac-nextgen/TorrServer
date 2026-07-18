/**
 * Design-system SSOT for TorrServer web (Wave 1 — MatriX green on MUI 6).
 * Prefer these constants / CSS vars over one-off rem/px in components.
 */

export const FONT_STACK =
  "'Open Sans', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

/** Letter-spacing brand default (master). */
export const LETTER_SPACING = '-0.1px'

export const typography = {
  /** Card / dialog section labels (UPPERCASE meta) */
  label: '0.625rem', // 10px
  /** Dense stats / compact card body */
  meta: '0.6875rem', // 11px
  /** Default UI body */
  body: '0.875rem', // 14px
  /** Card titles, list primary */
  title: '0.8125rem', // 13px
  /** Dialog headers, app bar */
  heading: '1rem', // 16px
  /** Card action buttons */
  button: '0.75rem', // 12px
  buttonDense: '0.6875rem', // 11px
  buttonPhone: '0.625rem', // 10px
} as const

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const

export const radius = {
  sm: 5,
  md: 8,
  lg: 12,
} as const

/** Minimum touch target on mobile (px). */
export const TOUCH_TARGET_PX = 44

/**
 * Chrome bands — bottom nav is a fixed 90px band that *includes* safe-area padding
 * (master PWA pattern). Header is 60 + safe-top via CSS vars.
 */
export const MOBILE_BOTTOM_NAV_PX = 90
export const MOBILE_HEADER_PX = 60

export const mobileBottomNavHeight = `${MOBILE_BOTTOM_NAV_PX}px`
export const mobileHeaderHeight = `${MOBILE_HEADER_PX}px`

/** CSS custom properties injected by GlobalStyle (reference for styled/MUI). */
export const cssVar = {
  safeTop: 'var(--safe-top)',
  safeBottom: 'var(--safe-bottom)',
  chromeTop: 'var(--app-chrome-top)',
  chromeBottom: 'var(--app-chrome-bottom)',
  fontLabel: 'var(--ts-font-label)',
  fontMeta: 'var(--ts-font-meta)',
  fontBody: 'var(--ts-font-body)',
  fontTitle: 'var(--ts-font-title)',
  fontHeading: 'var(--ts-font-heading)',
  fontButton: 'var(--ts-font-button)',
  spaceXs: 'var(--ts-space-xs)',
  spaceSm: 'var(--ts-space-sm)',
  spaceMd: 'var(--ts-space-md)',
  spaceLg: 'var(--ts-space-lg)',
  radiusSm: 'var(--ts-radius-sm)',
  radiusMd: 'var(--ts-radius-md)',
  radiusLg: 'var(--ts-radius-lg)',
  touch: 'var(--ts-touch)',
} as const
