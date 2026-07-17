import { describe, expect, it } from 'vitest'
import type { TorrentCache } from 'types/api'

import {
  buildCacheDrawModel,
  buildFocusModel,
  clampReaderRangeInclusive,
  forEachPieceInReaderRange,
  resolveFocusWindow,
} from './buildCacheMap'

describe('clampReaderRangeInclusive', () => {
  it('treats End as inclusive and clamps to piecesCount', () => {
    expect(clampReaderRangeInclusive(2, 5, 10)).toEqual({ start: 2, end: 5 })
    expect(clampReaderRangeInclusive(0, 0, 10)).toEqual({ start: 0, end: 0 })
    expect(clampReaderRangeInclusive(-3, 99, 10)).toEqual({ start: 0, end: 9 })
  })

  it('returns null for empty or inverted ranges', () => {
    expect(clampReaderRangeInclusive(5, 2, 10)).toBeNull()
    expect(clampReaderRangeInclusive(null, 2, 10)).toBeNull()
    expect(clampReaderRangeInclusive(1, 2, 0)).toBeNull()
  })
})

describe('forEachPieceInReaderRange', () => {
  it('visits every id including End', () => {
    const ids: number[] = []
    forEachPieceInReaderRange(3, 5, 20, id => ids.push(id))
    expect(ids).toEqual([3, 4, 5])
  })
})

describe('buildCacheDrawModel', () => {
  it('returns empty model for zero pieces', () => {
    const model = buildCacheDrawModel({ PiecesCount: 0 }, 100)
    expect(model.cells).toEqual([])
    expect(model.bucketSize).toBe(1)
  })

  it('keeps 1:1 when pieces fit budget', () => {
    const cache: TorrentCache = {
      PiecesCount: 4,
      PiecesLength: 100,
      Pieces: {
        0: { Size: 100, Length: 100, Priority: 2 },
        2: { Size: 50, Length: 100, Priority: 5 },
      },
      Readers: [{ Reader: 2, Start: 1, End: 3 }],
    }
    const model = buildCacheDrawModel(cache, 100)
    expect(model.bucketSize).toBe(1)
    expect(model.cells).toHaveLength(4)
    expect(model.cells[0].percentage).toBe(100)
    expect(model.cells[0].completed).toBe(true)
    expect(model.cells[0].priority).toBe(2)
    expect(model.cells[1].percentage).toBe(0)
    expect(model.cells[2].percentage).toBe(50)
    expect(model.cells[2].isReader).toBe(true)
    expect(model.cells[1].isReaderRange).toBe(true)
    expect(model.cells[3].isReaderRange).toBe(true)
    expect(model.cells[0].pieceStart).toBe(0)
    expect(model.cells[0].pieceEnd).toBe(0)
  })

  it('merges adjacent pieces with byte-accurate fill', () => {
    const cache: TorrentCache = {
      PiecesCount: 6,
      PiecesLength: 100,
      Pieces: {
        0: { Size: 100, Length: 100 },
        1: { Size: 0, Length: 100 },
        2: { Size: 50, Length: 100 },
      },
    }
    // budget 3 → bucketSize 2 → 3 cells covering [0-1],[2-3],[4-5]
    const model = buildCacheDrawModel(cache, 3)
    expect(model.bucketSize).toBe(2)
    expect(model.cells).toHaveLength(3)
    // bucket0: 100/200 = 50%
    expect(model.cells[0].percentage).toBe(50)
    expect(model.cells[0].pieceStart).toBe(0)
    expect(model.cells[0].pieceEnd).toBe(1)
    // bucket1: 50/200 = 25%
    expect(model.cells[1].percentage).toBe(25)
    expect(model.cells[1].pieceStart).toBe(2)
    expect(model.cells[1].pieceEnd).toBe(3)
  })

  it('marks inclusive End piece as range', () => {
    const cache: TorrentCache = {
      PiecesCount: 5,
      PiecesLength: 10,
      Readers: [{ Reader: 0, Start: 2, End: 2 }],
    }
    const model = buildCacheDrawModel(cache, 100)
    expect(model.cells[2].isReaderRange).toBe(true)
    expect(model.cells[1].isReaderRange).toBe(false)
    expect(model.cells[3].isReaderRange).toBe(false)
  })
})

describe('resolveFocusWindow / buildFocusModel', () => {
  it('centers window on reader and stays in bounds', () => {
    const cache: TorrentCache = {
      PiecesCount: 100,
      PiecesLength: 1024,
      Capacity: 10 * 1024,
      Readers: [{ Reader: 50, Start: 40, End: 60 }],
    }
    const window = resolveFocusWindow(cache, 20)
    expect(window).not.toBeNull()
    expect(window!.start).toBeGreaterThanOrEqual(0)
    expect(window!.end).toBeLessThan(100)
    expect(window!.readerPiece).toBe(50)
    expect(window!.end - window!.start + 1).toBeGreaterThanOrEqual(20)
    // Reader should sit near the middle of the window
    const mid = (window!.start + window!.end) / 2
    expect(Math.abs(mid - 50)).toBeLessThanOrEqual(2)
  })

  it('builds 1:1 cells with priorities including empty Size=0 entries', () => {
    const cache: TorrentCache = {
      PiecesCount: 20,
      PiecesLength: 100,
      Capacity: 500,
      Pieces: {
        8: { Size: 100, Length: 100, Priority: 2 },
        9: { Size: 0, Length: 100, Priority: 5 },
      },
      Readers: [{ Reader: 9, Start: 7, End: 11 }],
    }
    const model = buildFocusModel(cache, 10)
    expect(model.bucketSize).toBe(1)
    expect(model.cells.length).toBeGreaterThan(0)
    const readerCell = model.cells.find(c => c.isReader)
    expect(readerCell).toBeDefined()
    expect(readerCell!.pieceStart).toBe(9)
    expect(readerCell!.priority).toBe(5)
    expect(readerCell!.percentage).toBe(0)
  })
})
