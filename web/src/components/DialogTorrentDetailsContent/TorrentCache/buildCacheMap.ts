import type { CacheMapItem, CachePiece, TorrentCache } from 'types/api'

/** Soft caps — prefer finer buckets so fill progress stays visible on huge torrents. */
export const SNAKE_MAX_CELLS_DETAILED = 6000
export const SNAKE_MAX_CELLS_MINI = 900

/** Focus / detailed strip target rows around the reader (1:1, no LOD). */
export const SNAKE_FOCUS_TARGET_ROWS = 28

export interface CacheDrawModel {
  cells: CacheMapItem[]
  piecesCount: number
  /** Pieces merged into one cell when > 1 (full-torrent LOD). */
  bucketSize: number
  /** Inclusive piece range covered by cells[0]..cells[n-1]. */
  windowStart?: number
  windowEnd?: number
}

/**
 * Reader.End is inclusive (matches Go `inRanges`: ind >= Start && ind <= End).
 * Returns clamped [start, end] or null if the range is empty / invalid.
 */
export const clampReaderRangeInclusive = (
  start: number | null | undefined,
  end: number | null | undefined,
  piecesCount: number,
): { start: number; end: number } | null => {
  if (start == null || end == null || piecesCount <= 0) return null
  const s = Math.max(0, Math.min(piecesCount - 1, Math.floor(start)))
  const e = Math.max(0, Math.min(piecesCount - 1, Math.floor(end)))
  if (e < s) return null
  return { start: s, end: e }
}

/** Iterate every piece id in an inclusive reader range. */
export const forEachPieceInReaderRange = (
  start: number | null | undefined,
  end: number | null | undefined,
  piecesCount: number,
  fn: (pieceId: number) => void,
) => {
  const range = clampReaderRangeInclusive(start, end, piecesCount)
  if (!range) return
  for (let id = range.start; id <= range.end; id++) fn(id)
}

export const forEachPiece = (pieces: TorrentCache['Pieces'], fn: (id: number, piece: CachePiece) => void) => {
  if (!pieces) return
  if (Array.isArray(pieces)) {
    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i]
      if (piece) fn(i, piece)
    }
    return
  }
  for (const [key, piece] of Object.entries(pieces)) {
    if (!piece) continue
    const id = Number(key)
    if (Number.isFinite(id)) fn(id, piece)
  }
}

const pieceFillPercentage = (piece: CachePiece | undefined, pieceLength: number): number => {
  if (!piece) return 0
  const length = piece.Length || pieceLength || 0
  const rawSize = piece.Size || 0
  if (length <= 0) return rawSize > 0 ? 100 : 0
  const size = Math.min(rawSize, length)
  return Math.min(100, (size / length) * 100)
}

const cellFromPiece = (
  id: number,
  piece: CachePiece | undefined,
  pieceLength: number,
  isReader: boolean,
  isReaderRange: boolean,
): CacheMapItem => {
  const percentage = pieceFillPercentage(piece, pieceLength)
  const completed = Boolean(piece?.Completed) || percentage >= 100
  return {
    percentage: completed ? 100 : percentage,
    priority: piece?.Priority || 0,
    completed,
    isReader,
    isReaderRange,
    pieceStart: id,
    pieceEnd: id,
  }
}

/**
 * Full-torrent snake model: always covers 0..PiecesCount-1.
 * If there are more pieces than maxCells, adjacent pieces are merged with
 * byte-accurate fill (Size/Length) — global cache picture stays correct.
 */
export const buildCacheDrawModel = (cache: TorrentCache, maxCells: number): CacheDrawModel => {
  const piecesCount = cache.PiecesCount ?? 0
  if (piecesCount <= 0 || maxCells < 1) {
    return { cells: [], piecesCount, bucketSize: 1, windowStart: 0, windowEnd: -1 }
  }

  const budget = Math.max(1, Math.min(maxCells, SNAKE_MAX_CELLS_DETAILED))
  const bucketSize = Math.max(1, Math.ceil(piecesCount / budget))
  const numBuckets = Math.ceil(piecesCount / bucketSize)
  const pieceLength = cache.PiecesLength || 0

  const filled = new Float64Array(numBuckets)
  const capacity = new Float64Array(numBuckets)
  const priority = new Int16Array(numBuckets)
  const readerBits = new Uint8Array(numBuckets)
  const rangeBits = new Uint8Array(numBuckets)

  if (pieceLength > 0) {
    for (let b = 0; b < numBuckets; b++) {
      const pieceStart = b * bucketSize
      const pieceEnd = Math.min(pieceStart + bucketSize, piecesCount)
      capacity[b] = (pieceEnd - pieceStart) * pieceLength
    }
  }

  forEachPiece(cache.Pieces, (id, piece) => {
    if (id < 0 || id >= piecesCount) return
    const bucket = Math.floor(id / bucketSize)
    const length = piece.Length || pieceLength || 0
    const rawSize = piece.Size || 0
    const size = length > 0 ? Math.min(rawSize, length) : rawSize
    filled[bucket] += size

    if (pieceLength <= 0 && length > 0) capacity[bucket] += length

    const prio = piece.Priority || 0
    if (prio > priority[bucket]) priority[bucket] = prio
  })

  for (const reader of cache.Readers || []) {
    if (reader.Reader != null && reader.Reader >= 0 && reader.Reader < piecesCount) {
      readerBits[Math.floor(reader.Reader / bucketSize)] = 1
    }
    forEachPieceInReaderRange(reader.Start, reader.End, piecesCount, id => {
      rangeBits[Math.floor(id / bucketSize)] = 1
    })
  }

  const cells: CacheMapItem[] = new Array(numBuckets)
  for (let b = 0; b < numBuckets; b++) {
    const cap = capacity[b]
    let percentage = 0
    if (cap > 0) percentage = Math.min(100, (filled[b] / cap) * 100)
    // Only mark complete when the bucket is truly full — keeps near-end fill visible.
    const completed = cap > 0 && filled[b] >= cap - 0.5
    const pieceStart = b * bucketSize
    const pieceEnd = Math.min(pieceStart + bucketSize, piecesCount) - 1

    cells[b] = {
      percentage: completed ? 100 : percentage,
      priority: priority[b],
      completed,
      isReader: Boolean(readerBits[b]),
      isReaderRange: Boolean(rangeBits[b]),
      pieceStart,
      pieceEnd,
    }
  }

  return {
    cells,
    piecesCount,
    bucketSize,
    windowStart: 0,
    windowEnd: piecesCount - 1,
  }
}

/** Alias — overview = full-torrent LOD model. */
export const buildOverviewModel = buildCacheDrawModel

export interface FocusWindow {
  start: number
  end: number
  readerPiece: number
}

/**
 * Sliding 1:1 window around the primary reader.
 * `visibleCells` ≈ cols × focusRows — how many piece cells fit in the view.
 */
export const resolveFocusWindow = (cache: TorrentCache, visibleCells: number): FocusWindow | null => {
  const piecesCount = cache.PiecesCount ?? 0
  if (piecesCount <= 0) return null

  const readers = cache.Readers || []
  let readerPiece = 0
  if (readers.length > 0) {
    let minReader = piecesCount
    for (const r of readers) {
      if (r.Reader != null && r.Reader >= 0 && r.Reader < piecesCount && r.Reader < minReader) {
        minReader = r.Reader
      }
    }
    readerPiece = minReader < piecesCount ? minReader : 0
  }

  const pieceLength = cache.PiecesLength || 0
  const capacityPieces =
    pieceLength > 0 ? Math.max(1, Math.round((cache.Capacity || 0) / pieceLength)) : visibleCells

  // Prefer cache-capacity window, but never smaller than what fits on screen.
  let windowSize = Math.max(visibleCells, Math.min(capacityPieces * 2, piecesCount))
  windowSize = Math.min(piecesCount, Math.max(1, windowSize))

  // Center on reader so fill ahead/behind is equally visible.
  let start = readerPiece - Math.floor(windowSize / 2)
  if (start < 0) start = 0
  let end = start + windowSize - 1
  if (end >= piecesCount) {
    end = piecesCount - 1
    start = Math.max(0, end - windowSize + 1)
  }

  return { start, end, readerPiece }
}

/**
 * 1:1 focus model for debug: one cell per piece in [window.start, window.end].
 */
export const buildFocusModel = (cache: TorrentCache, visibleCells: number): CacheDrawModel => {
  const piecesCount = cache.PiecesCount ?? 0
  const window = resolveFocusWindow(cache, visibleCells)
  if (!window || piecesCount <= 0) {
    return { cells: [], piecesCount, bucketSize: 1, windowStart: 0, windowEnd: -1 }
  }

  const pieceLength = cache.PiecesLength || 0
  const pieceById = new Map<number, CachePiece>()
  forEachPiece(cache.Pieces, (id, piece) => {
    if (id >= window.start && id <= window.end) pieceById.set(id, piece)
  })

  const readerSet = new Set<number>()
  const rangeSet = new Set<number>()
  for (const reader of cache.Readers || []) {
    if (reader.Reader != null && reader.Reader >= window.start && reader.Reader <= window.end) {
      readerSet.add(reader.Reader)
    }
    forEachPieceInReaderRange(reader.Start, reader.End, piecesCount, id => {
      if (id >= window.start && id <= window.end) rangeSet.add(id)
    })
  }

  const cells: CacheMapItem[] = []
  for (let id = window.start; id <= window.end; id++) {
    cells.push(cellFromPiece(id, pieceById.get(id), pieceLength, readerSet.has(id), rangeSet.has(id)))
  }

  return {
    cells,
    piecesCount,
    bucketSize: 1,
    windowStart: window.start,
    windowEnd: window.end,
  }
}

/** How many cells fit while keeping readable piece size (~20px). */
export const resolveCellBudget = (containerWidth: number, isMini: boolean): number => {
  if (isMini) return SNAKE_MAX_CELLS_MINI
  if (!containerWidth || containerWidth <= 0) return 2400

  // Match detailed pieceSize + gap (20+4); more pieces → LOD merge, not tinier squares.
  const cellFootprint = 20 + 4
  const cols = Math.max(1, Math.floor(containerWidth / cellFootprint))
  // More rows → finer buckets on 50k–100k piece torrents (scroll instead of huge merge).
  const targetRows = 70
  return Math.min(SNAKE_MAX_CELLS_DETAILED, Math.max(cols * 28, cols * targetRows))
}

/** Visible cell budget for the focus strip (cols × rows). */
export const resolveFocusVisibleCells = (containerWidth: number): number => {
  if (!containerWidth || containerWidth <= 0) return 40 * SNAKE_FOCUS_TARGET_ROWS
  const cellFootprint = 20 + 4
  const cols = Math.max(1, Math.floor(containerWidth / cellFootprint))
  return cols * SNAKE_FOCUS_TARGET_ROWS
}
