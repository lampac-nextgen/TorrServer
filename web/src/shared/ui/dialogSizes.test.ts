import { describe, expect, it } from 'vitest'

import {
  DIALOG_SETTINGS,
  DIALOG_SHEET_L,
  DIALOG_SHEET_M,
  PLAYER_DIALOG_EXPANDED,
  PLAYER_DIALOG_NORMAL,
} from './dialogSizes'

describe('dialogSizes', () => {
  it('exports canonical sheet widths for large and medium dialogs', () => {
    expect(DIALOG_SHEET_L.width).toBe('min(92vw, 72rem)')
    expect(DIALOG_SHEET_M.width).toBe('min(92vw, 48rem)')
  })

  it('extends the large sheet with a stable settings height', () => {
    expect(DIALOG_SETTINGS.minWidth).toBe(DIALOG_SHEET_L.minWidth)
    expect(DIALOG_SETTINGS.minHeight).toBe('min(78dvh, 44rem)')
  })

  it('exports player normal and expanded sizes', () => {
    expect(PLAYER_DIALOG_NORMAL.width).toBe('min(94vw, 64rem)')
    expect(PLAYER_DIALOG_EXPANDED.width).toBe('min(96vw, 80rem)')
  })
})
