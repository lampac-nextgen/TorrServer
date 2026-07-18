import type { CSSProperties } from 'react'

/**
 * Canonical desktop dialog widths. Applied via inline `style` on Modal.Dialog /
 * AppDialog `dialogStyle` — HeroUI size ceilings live in CSS layers, so utilities
 * alone cannot widen past `lg`.
 */
export const DIALOG_SHEET_L: CSSProperties = {
  minWidth: 'min(92vw, 72rem)',
  maxWidth: 'min(92vw, 72rem)',
  width: 'min(92vw, 72rem)',
}

export const DIALOG_SHEET_M: CSSProperties = {
  minWidth: 'min(92vw, 48rem)',
  maxWidth: 'min(92vw, 48rem)',
  width: 'min(92vw, 48rem)',
}

/** Default player window — wider rectangle than HeroUI `lg`, not near-fullscreen. */
export const PLAYER_DIALOG_NORMAL: CSSProperties = {
  minWidth: 'min(92vw, 56rem)',
  maxWidth: 'min(92vw, 56rem)',
  width: 'min(92vw, 56rem)',
}

/** Expanded player sheet — matches Details/Search sheet L. */
export const PLAYER_DIALOG_EXPANDED: CSSProperties = {
  ...DIALOG_SHEET_L,
}

/** Sheet L + stable height so short tabs (Storage) don't collapse the window. */
export const DIALOG_SETTINGS: CSSProperties = {
  ...DIALOG_SHEET_L,
  minHeight: 'min(78dvh, 44rem)',
}
