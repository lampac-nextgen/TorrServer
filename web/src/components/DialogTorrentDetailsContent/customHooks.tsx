import { useEffect, useRef, useState } from 'react'
import { cacheHost, settingsHost } from 'utils/Hosts'
import axios from 'axios'
import type { BTSets, CacheMapItem, TorrentCache } from 'types/api'

export const useUpdateCache = (hash?: string) => {
  const [cache, setCache] = useState<TorrentCache>({})
  const componentIsMounted = useRef(true)
  const timerID = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(
    () => () => {
      // this function is required to notify "updateCache" when NOT to make state update
      componentIsMounted.current = false
    },
    [],
  )

  useEffect(() => {
    if (hash) {
      timerID.current = setInterval(() => {
        const updateCache = (newCache: TorrentCache) => componentIsMounted.current && setCache(newCache)

        axios
          .post(cacheHost(), { action: 'get', hash })
          .then(({ data }) => updateCache(data))
          // empty cache if error
          .catch(() => updateCache({}))
      }, 100)
    } else if (timerID.current) clearInterval(timerID.current)

    return () => {
      if (timerID.current) clearInterval(timerID.current)
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
