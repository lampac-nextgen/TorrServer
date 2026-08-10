import { describe, expect, it } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import {
  BUFFER_TARGET_FLOOR_BYTES,
  bufferFillPercent,
  formatBufferFilledLabel,
  formatCacheFilledLabel,
  getPeerString,
  resolveBufferTargetBytes,
} from './format'

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

describe('formatCacheFilledLabel', () => {
  it('returns null for incomplete input', () => {
    expect(formatCacheFilledLabel(null, 100)).toBeNull()
    expect(formatCacheFilledLabel(10, 0)).toBeNull()
  })

  it('omits percent until over capacity by default', () => {
    const label = formatCacheFilledLabel(50, 100)
    expect(label).toContain('/')
    expect(label).not.toMatch(/%/)
  })

  it('shows raw filled when over capacity and appends percent', () => {
    const label = formatCacheFilledLabel(274, 256)
    expect(label).toMatch(/107%/)
    expect(label).not.toMatch(/^256 /)
  })

  it('always appends percent when requested', () => {
    const label = formatCacheFilledLabel(50, 100, { percent: 'always' })
    expect(label).toMatch(/50%/)
  })
})

describe('resolveBufferTargetBytes', () => {
  it('floors at 32 MiB', () => {
    expect(resolveBufferTargetBytes(16 * 1024 * 1024, 50)).toBe(BUFFER_TARGET_FLOOR_BYTES)
  })

  it('uses Capacity × PreloadCache% when above floor', () => {
    const capacity = 256 * 1024 * 1024
    expect(resolveBufferTargetBytes(capacity, 50)).toBe(capacity * 0.5)
  })
})

describe('formatBufferFilledLabel', () => {
  it('orders filled before target', () => {
    const label = formatBufferFilledLabel(10 * 1024 * 1024, 32 * 1024 * 1024, { percent: 'always' })
    expect(label).toMatch(/31%/)
    expect(label).toContain('/')
  })

  it('caps percent at 100 when filled exceeds target', () => {
    const label = formatBufferFilledLabel(267 * 1024 * 1024, 64 * 1024 * 1024, { percent: 'always' })
    expect(label).toMatch(/100%/)
    expect(label).not.toMatch(/418%/)
  })

  it('computes capped percent', () => {
    expect(bufferFillPercent(40, 32)).toBe(100)
    expect(bufferFillPercent(16, 32)).toBe(50)
  })
})
