import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import type { TorrentCache } from 'shared/api/types'
import { cacheHost } from 'shared/api/hosts'

import { buildFocusModel, type CacheDrawModel } from './buildCacheMap'
import { cacheVisualEqual, cheapPiecesFingerprint, cheapReadersFingerprint } from './cacheFingerprint'

/** Active cadence while pieces/readers change — snake must track piece fill live. */
const CACHE_POLL_ACTIVE_MS = 100
/** Quiet cadence after no visual changes and no readers. */
const CACHE_POLL_IDLE_MS = 1000
/** Switch to idle after this many ms without visual changes (and no readers). */
const CACHE_IDLE_AFTER_MS = 2000

export interface UseUpdateCacheOptions {
  /** When false, polling stops. Defaults to true when hash is set. */
  enabled?: boolean
  /** When false, never uses the 100ms active cadence (idle/slow only). Default true. */
  fast?: boolean
}

/**
 * Poll `/cache` for the snake visualization.
 * Active (~100ms) while pieces/readers change; idle (~1s) after quiet + no readers.
 * Keeps the last good snapshot on error; pauses timers while `document.hidden`.
 */
export const useUpdateCache = (hash?: string, options?: UseUpdateCacheOptions) => {
  const enabled = options?.enabled ?? true
  const fast = options?.fast ?? true
  const [cache, setCache] = useState<TorrentCache>({})
  const componentIsMounted = useRef(true)
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inFlight = useRef(false)
  const cacheRef = useRef<TorrentCache>({})
  const lastChangeAt = useRef(0)
  const pollMs = useRef(CACHE_POLL_ACTIVE_MS)

  useEffect(
    () => () => {
      componentIsMounted.current = false
    },
    [],
  )

  useEffect(() => {
    if (!hash || !enabled) {
      if (timerID.current) clearTimeout(timerID.current)
      return undefined
    }

    let cancelled = false
    pollMs.current = fast ? CACHE_POLL_ACTIVE_MS : CACHE_POLL_IDLE_MS

    const scheduleNext = () => {
      if (cancelled) return
      timerID.current = setTimeout(fetchCache, pollMs.current)
    }

    const fetchCache = () => {
      if (cancelled || inFlight.current) return
      if (document.hidden) return
      inFlight.current = true
      axios
        .post(cacheHost(), { action: 'get', hash })
        .then(({ data }) => {
          if (!componentIsMounted.current || cancelled) return
          const next = (data || {}) as TorrentCache
          const hasReaders = (next.Readers?.length ?? 0) > 0
          if (cacheVisualEqual(cacheRef.current, next)) {
            if (fast) {
              const quiet = Date.now() - lastChangeAt.current >= CACHE_IDLE_AFTER_MS
              pollMs.current = !hasReaders && quiet ? CACHE_POLL_IDLE_MS : CACHE_POLL_ACTIVE_MS
            }
            return
          }
          lastChangeAt.current = Date.now()
          pollMs.current = fast ? CACHE_POLL_ACTIVE_MS : CACHE_POLL_IDLE_MS
          cacheRef.current = next
          setCache(next)
        })
        .catch(() => {
          if (!componentIsMounted.current || cancelled) return
          pollMs.current = CACHE_POLL_IDLE_MS
        })
        .finally(() => {
          inFlight.current = false
          if (!document.hidden) scheduleNext()
        })
    }

    fetchCache()

    const onVisibility = () => {
      if (document.hidden) {
        if (timerID.current) clearTimeout(timerID.current)
        return
      }
      pollMs.current = fast ? CACHE_POLL_ACTIVE_MS : CACHE_POLL_IDLE_MS
      fetchCache()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      if (timerID.current) clearTimeout(timerID.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [hash, enabled, fast])

  return cache
}

/**
 * Sticky 1:1 focus window. Camera is React state so budget changes clear sticky
 * start immediately and dead-zone re-centers without ref-during-render.
 */
export const useCreateFocusMap = (cache: TorrentCache, visibleCells: number): CacheDrawModel => {
  const [camera, setCamera] = useState<{ budget: number; start?: number }>({ budget: visibleCells })
  const lastStart = camera.budget === visibleCells ? camera.start : undefined

  const model = useMemo(
    () =>
      buildFocusModel(cache, visibleCells, {
        lastWindowStart: lastStart,
      }),
    [cache, visibleCells, lastStart],
  )

  useEffect(() => {
    if (model.windowStart == null || model.windowEnd == null || model.windowEnd < model.windowStart) return
    // Sticky camera across poll ticks; skip update when unchanged to avoid loops.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- persist focus window between cache polls
    setCamera(prev => {
      if (prev.budget === visibleCells && prev.start === model.windowStart) return prev
      return { budget: visibleCells, start: model.windowStart }
    })
  }, [model.windowStart, model.windowEnd, visibleCells])

  return model
}

// Re-export fingerprints for memo consumers that previously inlined them.
export { cheapPiecesFingerprint, cheapReadersFingerprint }
