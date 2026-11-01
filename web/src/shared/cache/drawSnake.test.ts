// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import type { CacheMapItem } from 'shared/api/types'

import { drawSnake, hitTestSnakeCell, setupHiDpiCanvas } from './drawSnake'

function fakeCtx() {
  const calls: Record<string, unknown[][]> = {}
  const record = (name: string) =>
    vi.fn((...args: unknown[]) => {
      ;(calls[name] ||= []).push(args)
    })
  const ctx = {
    clearRect: record('clearRect'),
    fillRect: record('fillRect'),
    strokeRect: record('strokeRect'),
    strokeText: record('strokeText'),
    fillText: record('fillText'),
    setLineDash: record('setLineDash'),
    setTransform: record('setTransform'),
  } as unknown as CanvasRenderingContext2D & Record<string, unknown>
  return { ctx, calls }
}

const base = { canvasWidth: 100, canvasHeight: 40, piecesInOneRow: 4, pieceSize: 20, gap: 2, startingX: 0 }

describe('drawSnake', () => {
  it('clears the canvas and draws one cell per piece', () => {
    const { ctx, calls } = fakeCtx()
    drawSnake({
      ...base,
      ctx,
      cells: [{ percentage: 0, priority: 0 }, {} as CacheMapItem],
      theme: 'dark',
      variant: 'default',
    })
    expect(calls.clearRect).toHaveLength(1)
    expect(calls.strokeRect).toHaveLength(2)
    expect(ctx.imageSmoothingEnabled).toBe(false)
  })

  it('paints partial pieces from the bottom and completed ones in full', () => {
    const { ctx, calls } = fakeCtx()
    drawSnake({
      ...base,
      ctx,
      cells: [
        { percentage: 50, priority: 0 },
        { percentage: 100, priority: 0 },
        { completed: true, percentage: 0, priority: 0 },
      ],
      theme: 'light',
      variant: 'default',
    })
    const rects = calls.fillRect.map(a => a as number[])
    // Partial piece: empty background, then a half-height fill anchored at the bottom.
    expect(rects.some(([, y, w, h]) => w === 20 && h === 10 && y === 10)).toBe(true)
    // Completed pieces fill the whole cell.
    expect(rects.filter(([, , w, h]) => w === 20 && h === 20).length).toBeGreaterThanOrEqual(4)
  })

  it('outlines the reader head, draws an idle head dashed and faint', () => {
    const { ctx, calls } = fakeCtx()
    drawSnake({
      ...base,
      ctx,
      cells: [
        { percentage: 0, priority: 0, isReader: true },
        { percentage: 0, priority: 0, isReader: true, isReaderIdle: true },
        { percentage: 0, priority: 0, isReaderRange: true },
      ],
      theme: 'dark',
      variant: 'default',
    })
    expect(calls.setLineDash).toHaveLength(2) // dash on, dash off
    expect(calls.strokeRect.length).toBeGreaterThanOrEqual(3)
    expect(ctx.globalAlpha).toBe(1)
  })

  it('labels priorities in debug mode only', () => {
    const quiet = fakeCtx()
    const loud = fakeCtx()
    const cells: CacheMapItem[] = [
      { percentage: 0, priority: 1 },
      { percentage: 0, priority: 2 },
    ]
    drawSnake({ ...base, ctx: quiet.ctx, cells, theme: 'dark', variant: 'default' })
    drawSnake({
      ...base,
      ctx: loud.ctx,
      cells,
      theme: 'light',
      variant: 'default',
      isSnakeDebugMode: true,
      isMini: true,
    })
    expect(quiet.calls.fillText).toBeUndefined()
    expect(loud.calls.fillText?.length ?? 0).toBeGreaterThan(0)
    expect(loud.calls.strokeText?.length).toBe(loud.calls.fillText?.length)
  })
})

describe('setupHiDpiCanvas', () => {
  it('caps devicePixelRatio at 2 and sizes the CSS box', () => {
    const canvas = document.createElement('canvas')
    const setTransform = vi.fn()
    canvas.getContext = (() => ({ setTransform })) as unknown as typeof canvas.getContext
    Object.defineProperty(window, 'devicePixelRatio', { value: 3, configurable: true })
    const ctx = setupHiDpiCanvas(canvas, 100, 50)
    expect(ctx).toBeTruthy()
    expect(canvas.width).toBe(200)
    expect(canvas.height).toBe(100)
    expect(canvas.style.width).toBe('100px')
    expect(setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0)
  })

  it('does not reallocate the bitmap when the size is unchanged', () => {
    const canvas = document.createElement('canvas')
    canvas.getContext = (() => ({ setTransform: () => {} })) as unknown as typeof canvas.getContext
    Object.defineProperty(window, 'devicePixelRatio', { value: 1, configurable: true })
    setupHiDpiCanvas(canvas, 80, 40)
    let writes = 0
    let w = canvas.width
    Object.defineProperty(canvas, 'width', { get: () => w, set: v => ((w = v), writes++), configurable: true })
    setupHiDpiCanvas(canvas, 80, 40)
    expect(writes).toBe(0)
  })

  it('returns null without a 2d context', () => {
    const canvas = document.createElement('canvas')
    canvas.getContext = (() => null) as unknown as typeof canvas.getContext
    expect(setupHiDpiCanvas(canvas, 10, 10)).toBeNull()
  })
})

describe('hitTestSnakeCell', () => {
  const args = { piecesInOneRow: 3, pieceSize: 10, gap: 2, startingX: 5, cellCount: 5 }

  it('maps points to cell indexes', () => {
    expect(hitTestSnakeCell(6, 1, args)).toBe(0)
    expect(hitTestSnakeCell(5 + 12 + 1, 1, args)).toBe(1)
    expect(hitTestSnakeCell(6, 13, args)).toBe(3)
  })

  it('rejects gaps, margins, outside columns and indexes past the last cell', () => {
    expect(hitTestSnakeCell(5 + 11, 1, args)).toBe(-1) // gap
    expect(hitTestSnakeCell(1, 1, args)).toBe(-1) // left of startingX
    expect(hitTestSnakeCell(6, -1, args)).toBe(-1)
    expect(hitTestSnakeCell(5 + 3 * 12 + 1, 1, args)).toBe(-1) // column 3
    expect(hitTestSnakeCell(5 + 2 * 12 + 1, 13, args)).toBe(-1) // index 5 >= cellCount
  })

  it('rejects degenerate layouts', () => {
    expect(hitTestSnakeCell(1, 1, { ...args, piecesInOneRow: 0 })).toBe(-1)
    expect(hitTestSnakeCell(1, 1, { ...args, cellCount: 0 })).toBe(-1)
    expect(hitTestSnakeCell(1, 1, { ...args, pieceSize: 0 })).toBe(-1)
  })
})
