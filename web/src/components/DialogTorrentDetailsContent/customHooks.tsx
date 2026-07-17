import { useEffect, useMemo, useRef, useState } from 'react'
import { cacheHost, settingsHost } from 'utils/Hosts'
import axios from 'axios'
import type { BTSets, TorrentCache } from 'types/api'

import {
  buildCacheDrawModel,
  buildFocusModel,
  resolveCellBudget,
  type CacheDrawModel,
} from './TorrentCache/buildCacheMap'

/** Active fill cadence (classic TorrServer). */
const CACHE_POLL_ACTIVE_MS = 100
/** Idle cadence when cache snapshot is unchanged. */
const CACHE_POLL_IDLE_MS = 400
/** Switch to idle after this many unchanged polls. */
const CACHE_IDLE_AFTER_MS = 2000

export { resolveCellBudget }

const readersFingerprint = (readers: TorrentCache['Readers']) => {
  if (!readers?.length) return ''
  return readers.map(r => `${r.Reader ?? ''}:${r.Start ?? ''}-${r.End ?? ''}`).join('|')
}

const piecesFingerprint = (pieces: TorrentCache['Pieces']) => {
  if (!pieces) return ''
  if (Array.isArray(pieces)) {
    let acc = ''
    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i]
      if (!p) continue
      acc += `${i}:${p.Size ?? 0}:${p.Priority ?? 0};`
    }
    return acc
  }
  let acc = ''
  for (const [key, p] of Object.entries(pieces)) {
    if (!p) continue
    acc += `${key}:${p.Size ?? 0}:${p.Priority ?? 0};`
  }
  return acc
}

const cacheVisualEqual = (a: TorrentCache, b: TorrentCache) =>
  a.Filled === b.Filled &&
  a.Capacity === b.Capacity &&
  a.PiecesCount === b.PiecesCount &&
  a.PiecesLength === b.PiecesLength &&
  readersFingerprint(a.Readers) === readersFingerprint(b.Readers) &&
  piecesFingerprint(a.Pieces) === piecesFingerprint(b.Pieces)

export const useUpdateCache = (hash?: string) => {
  const [cache, setCache] = useState<TorrentCache>({})
  const componentIsMounted = useRef(true)
  const timerID = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inFlight = useRef(false)
  const cacheRef = useRef<TorrentCache>({})
  const lastChangeAt = useRef(Date.now())
  const pollMs = useRef(CACHE_POLL_ACTIVE_MS)

  useEffect(
    () => () => {
      componentIsMounted.current = false
    },
    [],
  )

  useEffect(() => {
    if (!hash) {
      if (timerID.current) clearTimeout(timerID.current)
      return undefined
    }

    let cancelled = false

    const scheduleNext = () => {
      if (cancelled) return
      timerID.current = setTimeout(fetchCache, pollMs.current)
    }

    const fetchCache = () => {
      if (cancelled || document.hidden || inFlight.current) {
        scheduleNext()
        return
      }
      inFlight.current = true
      axios
        .post(cacheHost(), { action: 'get', hash })
        .then(({ data }) => {
          if (!componentIsMounted.current || cancelled) return
          const next = (data || {}) as TorrentCache
          if (cacheVisualEqual(cacheRef.current, next)) {
            if (Date.now() - lastChangeAt.current >= CACHE_IDLE_AFTER_MS) {
              pollMs.current = CACHE_POLL_IDLE_MS
            }
            return
          }
          lastChangeAt.current = Date.now()
          pollMs.current = CACHE_POLL_ACTIVE_MS
          cacheRef.current = next
          setCache(next)
        })
        .catch(() => {
          if (!componentIsMounted.current || cancelled) return
          if (cacheVisualEqual(cacheRef.current, {})) return
          lastChangeAt.current = Date.now()
          pollMs.current = CACHE_POLL_ACTIVE_MS
          cacheRef.current = {}
          setCache({})
        })
        .finally(() => {
          inFlight.current = false
          scheduleNext()
        })
    }

    fetchCache()

    const onVisibility = () => {
      if (!document.hidden) {
        pollMs.current = CACHE_POLL_ACTIVE_MS
        fetchCache()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      if (timerID.current) clearTimeout(timerID.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [hash])

  return cache
}

export const useCreateCacheMap = (cache: TorrentCache, maxCells: number): CacheDrawModel =>
  useMemo(() => buildCacheDrawModel(cache, maxCells), [cache, maxCells])

export const useCreateFocusMap = (cache: TorrentCache, visibleCells: number): CacheDrawModel =>
  useMemo(() => buildFocusModel(cache, visibleCells), [cache, visibleCells])

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
