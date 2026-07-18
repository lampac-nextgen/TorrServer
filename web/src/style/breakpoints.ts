/**
 * Canonical layout scale for TorrServer web.
 * Use `mediaMax` / `queryMax` everywhere — do not hardcode px in @media rules.
 *
 * Values follow master adaptive cuts (700 / 840 / 970 / 1100 / 1260).
 */
export const BP = {
  /** Master: densest card button gap */
  narrow: 340,
  /** Master: densest card type */
  micro: 410,
  /** Phones — 2×2 file actions / densest UI */
  phone: 420,
  /** Forms densify (≈ MUI sm) */
  compact: 600,
  /** Shell drawer + torrent list 1-column (master) */
  mobile: 700,
  /** Master torrent-card densify (poster/type) */
  cardDense: 770,
  /** Details poster stack / padding densify (master 840) */
  tablet: 840,
  /** Dialog fullscreen (master MUI md ≈ 960) */
  dialog: 960,
  /** File list → short cards */
  shortTable: 970,
  /** Torrent list 2 columns */
  list2: 1100,
  /** Torrent list 3 columns + card compact ladder */
  list3: 1260,
  /** Large desktop nudge (poster align) */
  desktop: 1280,
} as const

export type Breakpoint = keyof typeof BP

export const bp = (name: Breakpoint): number => BP[name]

/** CSS `@media (max-width: Npx)` for styled-components. */
export const mediaMax = (name: Breakpoint): string => `@media (max-width: ${BP[name]}px)`

/** Media query string for MUI `useMediaQuery` / Emotion. */
export const queryMax = (name: Breakpoint): string => `(max-width: ${BP[name]}px)`

/** Landscape / short viewport — card compact (master). */
export const MEDIA_SHORT_VIEWPORT = '(max-height: 500px)'
