import { useEffect, useMemo, useRef, useState } from 'react'
import { cacheHost, settingsHost } from 'utils/Hosts'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import type { BTSets, CacheMapItem, CachePiece, TorrentCache } from 'types/api'

/** Same cadence as classic TorrServer (master). */
const CACHE_POLL_MS = 100

/** Cap canvas cells so huge torrents stay interactive (master drew 1:1 and could freeze). */
export const SNAKE_MAX_CELLS = 4000

const cacheVisualEqual = (a: TorrentCache, b: TorrentCache) =>
  a.Filled === b.Filled &&
  a.Capacity === b.Capacity &&
  a.PiecesCount === b.PiecesCount &&
  a.PiecesLength === b.PiecesLength &&
  isEqual(a.Pieces, b.Pieces) &&
  isEqual(a.Readers, b.Readers)

export const useUpdateCache = (hash?: string) => {
  const [cache, setCache] = useState<TorrentCache>({})
  const componentIsMounted = useRef(true)
  const timerID = useRef<ReturnType<typeof setInterval> | null>(null)
  const inFlight = useRef(false)
  const cacheRef = useRef<TorrentCache>({})

  useEffect(
    () => () => {
      componentIsMounted.current = false
    },
    [],
  )

  useEffect(() => {
    if (!hash) {
      if (timerID.current) clearInterval(timerID.current)
      return undefined
    }

    const fetchCache = () => {
      if (document.hidden || inFlight.current) return
      inFlight.current = true
      axios
        .post(cacheHost(), { action: 'get', hash })
        .then(({ data }) => {
          if (!componentIsMounted.current) return
          const next = (data || {}) as TorrentCache
          if (cacheVisualEqual(cacheRef.current, next)) return
          cacheRef.current = next
          setCache(next)
        })
        .catch(() => {
          if (!componentIsMounted.current) return
          if (cacheVisualEqual(cacheRef.current, {})) return
          cacheRef.current = {}
          setCache({})
        })
        .finally(() => {
          inFlight.current = false
        })
    }

    fetchCache()
    timerID.current = setInterval(fetchCache, CACHE_POLL_MS)

    const onVisibility = () => {
      if (!document.hidden) fetchCache()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (timerID.current) clearInterval(timerID.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [hash])

  return cache
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
 * Build snake cells. Uses sparse Pieces (O(cached pieces)), not a full PiecesCount scan.
 * When count > maxCells, buckets pieces so the canvas stays bounded.
 */
export const buildCacheDrawMap = (cache: TorrentCache, maxCells = SNAKE_MAX_CELLS): CacheMapItem[] => {
  const count = cache.PiecesCount ?? 0
  if (count <= 0) return []

  const bucketSize = Math.max(1, Math.ceil(count / Math.max(1, maxCells)))
  const numBuckets = Math.ceil(count / bucketSize)
  const map: CacheMapItem[] = new Array(numBuckets)

  for (let i = 0; i < numBuckets; i++) {
    map[i] = { percentage: 0, priority: 0 }
  }

  forEachPiece(cache.Pieces, (id, piece) => {
    if (id < 0 || id >= count) return
    const bucket = Math.floor(id / bucketSize)
    const cell = map[bucket]
    if (!cell) return
    const length = piece.Length || 0
    const percentage = length > 0 ? ((piece.Size || 0) / length) * 100 : 0
    if (percentage > cell.percentage) cell.percentage = percentage
    const priority = piece.Priority || 0
    if (priority > cell.priority) cell.priority = priority
  })

  for (const reader of cache.Readers || []) {
    if (reader.Reader != null && reader.Reader >= 0 && reader.Reader < count) {
      const cell = map[Math.floor(reader.Reader / bucketSize)]
      if (cell) cell.isReader = true
    }
    if (reader.Start == null || reader.End == null) continue
    const start = Math.max(0, reader.Start)
    const end = Math.min(count, reader.End)
    if (end <= start) continue
    const startBucket = Math.floor(start / bucketSize)
    const endBucket = Math.floor((end - 1) / bucketSize)
    for (let b = startBucket; b <= endBucket && b < numBuckets; b++) {
      map[b].isReaderRange = true
    }
  }

  return map
}

/** Sync map build (master used useEffect+setState → extra frame). */
export const useCreateCacheMap = (cache: TorrentCache, maxCells = SNAKE_MAX_CELLS) =>
  useMemo(() => buildCacheDrawMap(cache, maxCells), [cache, maxCells])

export const useGetSettings = () => {
  const [settings, setSettings] = useState<BTSets | undefined>()
  useEffect(() => {
    let cancelled = false
    axios.post(settingsHost(), { action: 'get' }).then(({ data }) => {
      if (!cancelled) setSettings(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return settings
}
