/**
 * Canonical layout scale for TorrServer web.
 */
export const BP = {
  narrow: 340,
  micro: 410,
  phone: 420,
  compact: 600,
  mobile: 700,
  cardDense: 770,
  tablet: 840,
  dialog: 960,
  shortTable: 970,
  list2: 1100,
  list3: 1260,
  desktop: 1280,
} as const

export type Breakpoint = keyof typeof BP

export const bp = (name: Breakpoint): number => BP[name]

export const mediaMax = (name: Breakpoint): string => `@media (max-width: ${BP[name]}px)`

export const queryMax = (name: Breakpoint): string => `(max-width: ${BP[name]}px)`

export const MEDIA_SHORT_VIEWPORT = '(max-height: 500px)'
