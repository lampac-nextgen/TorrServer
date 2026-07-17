import { useEffect, useMemo, useRef, useState } from 'react'
import { cacheHost, settingsHost } from 'utils/Hosts'
import axios from 'axios'
import isEqual from 'lodash/isEqual'
import type { BTSets, TorrentCache } from 'types/api'

import {
  buildCacheDrawModel,
  resolveCellBudget,
  type CacheDrawModel,
} from './TorrentCache/buildCacheMap'

/** Same cadence as classic TorrServer (master). */
const CACHE_POLL_MS = 100

export { resolveCellBudget }

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

export const useCreateCacheMap = (cache: TorrentCache, maxCells: number): CacheDrawModel =>
  useMemo(() => buildCacheDrawModel(cache, maxCells), [cache, maxCells])

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
