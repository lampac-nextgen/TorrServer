import { describe, expect, it } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { GETTING_INFO, PRELOAD, WORKING } from 'shared/torrent/states'

import { shouldShowTorrentCacheProgress, torrentCacheProgressPercent } from './torrentCardProgress'

const torrent = (partial: Partial<TorrentStat>): TorrentStat =>
  ({ hash: 'abc', ...partial }) as TorrentStat

describe('torrentCacheProgressPercent', () => {
  it('returns null without fill or window', () => {
    expect(torrentCacheProgressPercent(torrent({}))).toBeNull()
    expect(torrentCacheProgressPercent(torrent({ preloaded_bytes: 10 }))).toBeNull()
    expect(torrentCacheProgressPercent(torrent({ preload_size: 100 }))).toBeNull()
  })

  it('uses preloaded_bytes / preload_size', () => {
    expect(
      torrentCacheProgressPercent(torrent({ preloaded_bytes: 25, preload_size: 100 })),
    ).toBe(25)
  })

  it('caps at 100 when cache exceeds preload window', () => {
    expect(
      torrentCacheProgressPercent(torrent({ preloaded_bytes: 400, preload_size: 100 })),
    ).toBe(100)
  })

  it('falls back to CacheSize when preload_size missing', () => {
    expect(torrentCacheProgressPercent(torrent({ preloaded_bytes: 64 }), 256)).toBe(25)
  })
})

describe('shouldShowTorrentCacheProgress', () => {
  it('hides 100% for idle torrents', () => {
    expect(shouldShowTorrentCacheProgress(100, torrent({ stat: undefined }))).toBe(false)
  })

  it('shows 100% while WORKING / PRELOAD / GETTING_INFO', () => {
    expect(shouldShowTorrentCacheProgress(100, torrent({ stat: WORKING }))).toBe(true)
    expect(shouldShowTorrentCacheProgress(100, torrent({ stat: PRELOAD }))).toBe(true)
    expect(shouldShowTorrentCacheProgress(100, torrent({ stat: GETTING_INFO }))).toBe(true)
  })

  it('shows partial progress always', () => {
    expect(shouldShowTorrentCacheProgress(42, torrent({}))).toBe(true)
  })
})
