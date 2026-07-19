import { describe, expect, it } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { getPeerString } from './format'

const torrent = (overrides: Partial<TorrentStat> = {}): TorrentStat => ({ hash: 'abc', ...overrides })

describe('getPeerString', () => {
  it('returns null when torrent is missing', () => {
    expect(getPeerString(null)).toBeNull()
    expect(getPeerString(undefined)).toBeNull()
  })

  it('returns em dash when active peers are unknown', () => {
    expect(getPeerString(torrent())).toBe('—')
  })

  it('formats active/total peers and seeders', () => {
    expect(getPeerString(torrent({ active_peers: 5, total_peers: 12, connected_seeders: 3 }))).toBe('5/12 · 3')
  })

  it('defaults missing totals and seeders to zero', () => {
    expect(getPeerString(torrent({ active_peers: 2 }))).toBe('2/0 · 0')
  })
})
