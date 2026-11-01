// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '../../test/renderWithProviders'
import type { TorrentStat } from 'shared/api/types'

import { TorrentProgressStrip } from './SwarmStatsPanel'

const torrent = { hash: 'h', torrent_size: 1000, loaded_size: 500 } as TorrentStat

describe('TorrentProgressStrip', () => {
  it('fills the Loaded bar to the loaded percentage and tones the buffer bar with accent-secondary', () => {
    const { container } = renderWithProviders(<TorrentProgressStrip torrent={torrent} cache={null} />)
    const bars = [...container.querySelectorAll<HTMLElement>('div[style*="width"]')]
    expect(bars).toHaveLength(2)
    expect(bars[0].style.width).toBe('50%')
    expect(bars[0].className).toContain('bg-accent')
    expect(bars[0].className).not.toContain('bg-accent-secondary')
    expect(bars[1].className).toContain('bg-accent-secondary')
  })
})
