import type { TorrentStat } from 'shared/api/types'
import { GETTING_INFO, PRELOAD, WORKING } from 'shared/torrent/states'

/**
 * Preload/cache window progress (not full-torrent BytesCompleted).
 * Server sets `preloaded_bytes` from cache.Filled while active; `preload_size` is the preload target.
 * Falls back to settings CacheSize when preload_size is unset so WORKING torrents still show a fill %.
 */
export function torrentCacheProgressPercent(
  torrent: TorrentStat,
  cacheCapacity?: number | null,
): number | null {
  const filled = torrent.preloaded_bytes ?? 0
  if (filled <= 0) return null
  const windowSize =
    torrent.preload_size && torrent.preload_size > 0
      ? torrent.preload_size
      : cacheCapacity && cacheCapacity > 0
        ? cacheCapacity
        : 0
  if (windowSize <= 0) return null
  const pct = Math.min(100, Math.round((filled / windowSize) * 100))
  return pct > 0 ? pct : null
}

/** Show chip/bar while filling, and keep 100% visible for active torrents (cache often saturates preload window). */
export function shouldShowTorrentCacheProgress(percent: number | null, torrent: TorrentStat): boolean {
  if (percent == null) return false
  if (percent < 100) return true
  const stat = torrent.stat
  return stat === WORKING || stat === PRELOAD || stat === GETTING_INFO
}
