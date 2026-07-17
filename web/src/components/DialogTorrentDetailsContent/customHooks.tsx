import { useEffect, useRef, useState } from 'react'
import { cacheHost, settingsHost } from 'utils/Hosts'
import axios from 'axios'
import type { BTSets, CacheMapItem, TorrentCache } from 'types/api'

/** Match classic TorrServer realtime feel without overloading the UI thread. */
const CACHE_POLL_MS = 250

export const useUpdateCache = (hash?: string) => {
  const [cache, setCache] = useState<TorrentCache>({})
  const componentIsMounted = useRef(true)
  const timerID = useRef<ReturnType<typeof setInterval> | null>(null)
  const inFlight = useRef(false)

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
          if (componentIsMounted.current) setCache(data)
        })
        .catch(() => {
          if (componentIsMounted.current) setCache({})
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

export const useCreateCacheMap = (cache: TorrentCache) => {
  const [cacheMap, setCacheMap] = useState<CacheMapItem[]>([])

  useEffect(() => {
    const { PiecesCount = 0, Pieces, Readers } = cache

    const map: CacheMapItem[] = []
    const pieces = Pieces || {}

    for (let i = 0; i < PiecesCount; i++) {
      const piece = Array.isArray(pieces) ? pieces[i] : pieces[String(i)]
      const { Size, Length, Priority } = piece || {}

      const newPiece: CacheMapItem & { id: number } = {
        id: i,
        percentage: Length ? ((Size || 0) / Length) * 100 : 0,
        priority: Priority || 0,
      }

      ;(Readers || []).forEach(r => {
        if (i === r.Reader) newPiece.isReader = true
        if (r.Start != null && r.End != null && i >= r.Start && i < r.End) newPiece.isReaderRange = true
      })

      map.push(newPiece)
    }
    setCacheMap(map)
  }, [cache])

  return cacheMap
}

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
