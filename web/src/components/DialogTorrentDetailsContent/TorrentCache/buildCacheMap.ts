import type { CacheMapItem, CachePiece, TorrentCache } from 'types/api'

/** Soft caps — real budget is chosen from viewport density in the component. */
export const SNAKE_MAX_CELLS_DETAILED = 12000
export const SNAKE_MAX_CELLS_MINI = 1600

export interface CacheDrawModel {
  cells: CacheMapItem[]
  piecesCount: number
  /** Pieces merged into one cell when > 1 (full-torrent LOD). */
  bucketSize: number
}

const forEachPiece = (pieces: TorrentCache['Pieces'], fn: (id: number, piece: CachePiece) => void) => {
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

/**
 * Full-torrent snake model: always covers 0..PiecesCount.
 * If there are more pieces than maxCells, adjacent pieces are merged with
 * byte-accurate fill (Size/Length) — global cache picture stays correct.
 */
export const buildCacheDrawModel = (cache: TorrentCache, maxCells: number): CacheDrawModel => {
  const piecesCount = cache.PiecesCount ?? 0
  if (piecesCount <= 0 || maxCells < 1) {
    return { cells: [], piecesCount, bucketSize: 1 }
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
    if (reader.Start == null || reader.End == null) continue
    const start = Math.max(0, reader.Start)
    const end = Math.min(piecesCount, reader.End)
    if (end <= start) continue
    const startBucket = Math.floor(start / bucketSize)
    const endBucket = Math.floor((end - 1) / bucketSize)
    for (let b = startBucket; b <= endBucket; b++) rangeBits[b] = 1
  }

  const cells: CacheMapItem[] = new Array(numBuckets)
  for (let b = 0; b < numBuckets; b++) {
    const cap = capacity[b]
    let percentage = 0
    if (cap > 0) percentage = Math.min(100, (filled[b] / cap) * 100)
    if (percentage >= 99.5) percentage = 100

    cells[b] = {
      percentage,
      priority: priority[b],
      completed: percentage >= 100,
      isReader: Boolean(readerBits[b]),
      isReaderRange: Boolean(rangeBits[b]),
    }
  }

  return { cells, piecesCount, bucketSize }
}

/** How many cells we can paint for the current width without freezing the UI. */
export const resolveCellBudget = (containerWidth: number, isMini: boolean): number => {
  if (isMini) return SNAKE_MAX_CELLS_MINI
  if (!containerWidth || containerWidth <= 0) return 6000

  const minPiece = 7
  const gap = 2
  const cols = Math.max(1, Math.floor(containerWidth / (minPiece + gap)))
  // ~100 rows of detail is enough for overview + scroll; hard cap for main-thread budget.
  return Math.min(SNAKE_MAX_CELLS_DETAILED, Math.max(cols * 48, cols * 100))
}
