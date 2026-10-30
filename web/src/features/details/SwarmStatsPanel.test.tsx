// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'

import type { TorrentStat } from 'shared/api/types'
import { renderWithProviders } from '@/test/renderWithProviders'

import SwarmStatsPanel, { TorrentProgressStrip } from './SwarmStatsPanel'

const torrent = (over: Partial<TorrentStat> = {}): TorrentStat => ({ hash: 'h', ...over }) as TorrentStat

const MB = 1024 * 1024

describe('TorrentProgressStrip', () => {
  it('shows loaded bytes against the total with a percentage', () => {
    renderWithProviders(<TorrentProgressStrip torrent={torrent({ loaded_size: 50 * MB, torrent_size: 200 * MB })} />)
    expect(screen.getByText(/50(\.0)? MB \/ 200(\.0)? MB · 25%/)).toBeTruthy()
  })

  it('shows a dash for nothing loaded and no size', () => {
    renderWithProviders(<TorrentProgressStrip torrent={torrent()} />)
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })

  it('idle: the buffer meter is preload progress against PreloadCache % of capacity', () => {
    renderWithProviders(
      <TorrentProgressStrip
        torrent={torrent()}
        cache={{ Hash: 'h', Capacity: 100 * MB, Filled: 25 * MB }}
        preloadCachePercent={50}
      />,
    )
    // 25 of the 50 MB target
    expect(screen.getByText('Buffer')).toBeTruthy()
    expect(screen.getByText(/50%/)).toBeTruthy()
  })

  it('never lets the bar overflow past 100%', () => {
    const { container } = renderWithProviders(
      <TorrentProgressStrip
        torrent={torrent()}
        cache={{ Hash: 'h', Capacity: 100 * MB, Filled: 100 * MB }}
        preloadCachePercent={10}
      />,
    )
    const widths = [...container.querySelectorAll<HTMLElement>('[style*="width"]')].map(el =>
      parseFloat(el.style.width),
    )
    expect(widths.every(w => w >= 0 && w <= 100)).toBe(true)
  })
})

describe('SwarmStatsPanel', () => {
  it('lists transfer rows and the four peer counters', () => {
    renderWithProviders(
      <SwarmStatsPanel
        torrent={torrent({ active_peers: 4, connected_seeders: 2, pending_peers: 7, half_open_peers: 1 })}
      />,
    )
    expect(screen.getAllByTitle('Active: 4').length).toBeGreaterThan(0)
    expect(screen.getAllByTitle('Seeders: 2').length).toBeGreaterThan(0)
    expect(screen.getAllByTitle('Pending peers: 7').length).toBeGreaterThan(0)
    expect(screen.getAllByTitle('Half-open peers: 1').length).toBeGreaterThan(0)
  })

  it('shows optional rows only when they are positive, plus cache readers and piece facts', () => {
    renderWithProviders(
      <SwarmStatsPanel
        torrent={torrent({ chunks_read: 12, chunks_written: 0, duration_seconds: 3725, bit_rate: '8 Mb/s' })}
        cacheReaders={3}
        cache={{ Hash: 'h', PiecesCount: 640, PiecesLength: 4 * MB }}
      />,
    )
    expect(screen.getByText('12')).toBeTruthy()
    expect(screen.getByText('640')).toBeTruthy()
    expect(screen.getByText('1:02:05')).toBeTruthy()
    expect(screen.getByText('8 Mb/s')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
    // a zero counter is not rendered as a row
    expect(screen.getByText('Chunks read')).toBeTruthy()
    expect(screen.queryByText('Chunks written')).toBeNull()
  })

  it('formats durations under an hour as m:ss', () => {
    renderWithProviders(<SwarmStatsPanel torrent={torrent({ duration_seconds: 65 })} />)
    expect(screen.getByText('1:05')).toBeTruthy()
  })

  it('unframed drops the outer panel', () => {
    const { container } = renderWithProviders(<SwarmStatsPanel torrent={torrent()} framed={false} />)
    expect((container.firstElementChild as HTMLElement).className).not.toContain('border')
  })
})
