import { describe, expect, it } from 'vitest'

import { fitPieceMetricsToArea, SNAKE_MAX_PIECE_SIZE } from './snakeSettings'

const base = { pieceSize: 20, gap: 4 }

const gridFits = (
  metrics: { pieceSize: number; gap: number },
  width: number,
  height: number,
  cellCount: number,
): boolean => {
  const stride = metrics.pieceSize + metrics.gap
  return Math.floor(width / stride) * Math.floor(height / stride) >= cellCount
}

describe('fitPieceMetricsToArea', () => {
  it('grows cells so a small window fills a large pane', () => {
    const metrics = fitPieceMetricsToArea(base, 700, 420, 145)
    expect(metrics.pieceSize).toBeGreaterThan(base.pieceSize)
    expect(metrics.pieceSize).toBeLessThanOrEqual(SNAKE_MAX_PIECE_SIZE)
    // Everything must still fit — growing may not push cells off the grid.
    expect(gridFits(metrics, 700, 420, 145)).toBe(true)
  })

  it('leaves less than one row of slack after growing', () => {
    const width = 700
    const height = 420
    const metrics = fitPieceMetricsToArea(base, width, height, 145)
    const stride = metrics.pieceSize + metrics.gap
    const rowsUsed = Math.ceil(145 / Math.floor(width / stride))
    expect(height - rowsUsed * stride).toBeLessThan(stride)
  })

  it('keeps the base size when the window already fills the pane', () => {
    // 20 + 4 stride over 480x240 gives 20 x 10 = 200 cells; asking for all of them
    // leaves no room to grow.
    expect(fitPieceMetricsToArea(base, 480, 240, 200)).toEqual(base)
  })

  it('never returns cells smaller than the base', () => {
    const metrics = fitPieceMetricsToArea(base, 300, 120, 5000)
    expect(metrics).toEqual(base)
  })

  it('returns the base for degenerate input', () => {
    expect(fitPieceMetricsToArea(base, 0, 420, 145)).toEqual(base)
    expect(fitPieceMetricsToArea(base, 700, 0, 145)).toEqual(base)
    expect(fitPieceMetricsToArea(base, 700, 420, 0)).toEqual(base)
  })

  it('caps growth so a handful of pieces do not become huge blocks', () => {
    const metrics = fitPieceMetricsToArea(base, 1400, 900, 4)
    expect(metrics.pieceSize).toBe(SNAKE_MAX_PIECE_SIZE)
  })
})
