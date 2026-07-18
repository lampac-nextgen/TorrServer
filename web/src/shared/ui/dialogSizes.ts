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

/** Mid-width sheet (add / search style dialogs). */
export const DIALOG_SHEET_M: CSSProperties = {
  minWidth: 'min(92vw, 48rem)',
  maxWidth: 'min(92vw, 48rem)',
  width: 'min(92vw, 48rem)',
}

/** Default player window — wide 16:9-friendly rectangle (not a tiny square). */
export const PLAYER_DIALOG_NORMAL: CSSProperties = {
  minWidth: 'min(94vw, 64rem)',
  maxWidth: 'min(94vw, 64rem)',
  width: 'min(94vw, 64rem)',
}

/** Expanded player sheet — near-viewport cinema width. */
export const PLAYER_DIALOG_EXPANDED: CSSProperties = {
  minWidth: 'min(96vw, 80rem)',
  maxWidth: 'min(96vw, 80rem)',
  width: 'min(96vw, 80rem)',
}

/** Mobile immersive player — edge-to-edge viewport, no letterbox chrome. */
export const PLAYER_DIALOG_MOBILE: CSSProperties = {
  width: '100%',
  maxWidth: '100%',
  minWidth: '100%',
  height: '100dvh',
  maxHeight: '100dvh',
  borderRadius: 0,
}

/** Sheet L + stable height so short tabs (Storage) don't collapse the window. */
export const DIALOG_SETTINGS: CSSProperties = {
  ...DIALOG_SHEET_L,
  minHeight: 'min(78dvh, 44rem)',
}

/** Details sheet — fixed height so Overview / Files / Cache tabs don't resize the window. */
export const DIALOG_DETAILS: CSSProperties = {
  ...DIALOG_SHEET_L,
  height: 'min(88dvh, 52rem)',
  maxHeight: 'min(88dvh, 52rem)',
  minHeight: 'min(88dvh, 52rem)',
}

/** Full cache-map workspace stacked above Details. */
export const DIALOG_CACHE: CSSProperties = {
  minWidth: 'min(96vw, 80rem)',
  maxWidth: 'min(96vw, 80rem)',
  width: 'min(96vw, 80rem)',
  height: 'min(92dvh, 56rem)',
  maxHeight: 'min(92dvh, 56rem)',
  minHeight: 'min(92dvh, 56rem)',
}
