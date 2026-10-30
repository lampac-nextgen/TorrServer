// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { TorrentStat } from 'shared/api/types'
import { CLOSED, GETTING_INFO, IN_DB, WORKING } from 'shared/torrent/states'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import DetailsDialog, { type DetailsDialogProps } from './DetailsDialog'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'

const cachePolls = vi.hoisted(() => [] as Array<{ hash?: string; fast?: boolean }>)
vi.mock('shared/cache/useUpdateCache', async importOriginal => {
  const actual = await importOriginal<typeof import('shared/cache/useUpdateCache')>()
  return {
    ...actual,
    useUpdateCache: (hash?: string, options?: { enabled?: boolean; fast?: boolean }) => {
      cachePolls.push({ hash, fast: options?.fast })
      return actual.useUpdateCache(hash, options)
    },
  }
})
vi.mock('features/player/VideoPlayer', () => ({ default: () => null }))
vi.mock('./SpeedCharts', () => ({ default: () => <div data-testid='speed-charts' /> }))

const files = [
  { id: 1, path: 'Show/Show.S01E01.mkv', length: 1_000_000 },
  { id: 2, path: 'Show/Show.S02E01.mkv', length: 2_000_000 },
]

const torrent = (over: Partial<TorrentStat> = {}): TorrentStat =>
  ({
    hash: HASH,
    title: 'Show',
    name: 'Show',
    stat: WORKING,
    download_speed: 1024 * 1024,
    upload_speed: 0,
    torrent_size: 3_000_000,
    file_stats: files,
    ...over,
  }) as TorrentStat

let net: NetworkMock | undefined

beforeEach(() => {
  cachePolls.length = 0
  localStorage.clear()
  sessionStorage.clear()
})

afterEach(() => {
  net?.restore()
  net = undefined
})

const install = (detail: Partial<TorrentStat> = {}) => {
  net = mockNetwork(req => {
    const path = pathOf(req.url)
    if (path === '/torrents') return torrent(detail)
    if (path === '/cache') return { Hash: HASH, Capacity: 64 * 1024 * 1024, Filled: 1024 * 1024 }
    if (path === '/viewed') return []
    if (path === '/settings') return { PreloadCache: 50 }
    if (path === '/mediabase') return { base: '' }
    if (path.startsWith('/gst/settings')) return { built_in: false }
    return undefined
  })
  return net
}

const mount = (props: Partial<DetailsDialogProps> & { stat?: Partial<TorrentStat> } = {}) => {
  const { stat, ...rest } = props
  return renderWithProviders(
    <ModalOpenProvider>
      <DetailsDialog torrent={torrent(stat)} onClose={vi.fn()} {...rest} />
    </ModalOpenProvider>,
  )
}

const lastFast = () => cachePolls.at(-1)?.fast
const count = (path: string) => net!.requests.filter(r => pathOf(r.url) === path).length
const tab = (name: RegExp) => screen.getByRole('tab', { name })

describe('DetailsDialog: /cache cadence follows the visible surface', () => {
  it('idle on the Files tab, fast on Cache, idle again on Stats', async () => {
    install()
    mount()
    await screen.findByRole('tab', { name: /Files|Torrent content/i })
    expect(lastFast()).toBe(false)

    await userEvent.click(tab(/^Cache$/))
    await waitFor(() => expect(lastFast()).toBe(true))

    await userEvent.click(tab(/^Stats$/))
    await waitFor(() => expect(lastFast()).toBe(false))

    // the hero cache tile is on every tab, so it polls for the whole life of the dialog
    expect(cachePolls.every(call => call.hash === HASH)).toBe(true)
  })

  it('the detailed cache-map modal switches to the fast poll, closing it goes back to idle', async () => {
    install()
    mount()
    await userEvent.click(tab(/^Stats$/))
    await userEvent.click(tab(/^Cache$/))
    await userEvent.click(tab(/^Stats$/))
    await waitFor(() => expect(lastFast()).toBe(false))
    // the map button lives on the Cache tab
    await userEvent.click(tab(/^Cache$/))
    await userEvent.click(await screen.findByRole('button', { name: /detail/i }))
    await waitFor(() => expect(lastFast()).toBe(true))
    await userEvent.click(tab(/^Stats$/))
    await waitFor(() => expect(lastFast()).toBe(true))
  })

  it('stops polling /cache and /torrents after unmount (drop during playback leaves no timer)', async () => {
    install()
    const view = mount()
    await waitFor(() => expect(count('/cache')).toBeGreaterThan(0))
    view.unmount()
    const cache = count('/cache')
    const detail = count('/torrents')
    await new Promise(resolve => setTimeout(resolve, 400))
    expect(count('/cache')).toBe(cache)
    expect(count('/torrents')).toBe(detail)
  })
})

describe('DetailsDialog: content', () => {
  it('shows hero stats and the file rows', async () => {
    install()
    mount()
    // 1 MiB/s is shown in bits
    expect((await screen.findAllByText(/^8 \S*bps$/i)).length).toBeGreaterThan(0)
    await waitFor(() => expect(document.querySelectorAll('div[class*="border-l"]').length).toBeGreaterThan(0))
  })

  it('offers season toggles for a multi-season pack and filters rows', async () => {
    install()
    mount()
    const season2 = await screen.findByRole('radio', { name: 'Season 2' })
    await userEvent.click(season2)
    await waitFor(() => expect(document.querySelectorAll('div[class*="border-l"]')).toHaveLength(1))
  })

  it('an IN_DB torrent with no known files shows the persisted placeholder, not "no files"', async () => {
    install({ stat: IN_DB, file_stats: [], data: undefined })
    mount({ stat: { stat: IN_DB, file_stats: [], data: undefined } })
    expect(await screen.findByLabelText('In DB')).toBeTruthy()
    expect(screen.queryByText('No playable files in this torrent')).toBeNull()
  })

  it('getting-info shows a busy placeholder', async () => {
    install({ stat: GETTING_INFO, file_stats: [] })
    mount({ stat: { stat: GETTING_INFO, file_stats: [] } })
    const busy = await screen.findByLabelText(/Getting|info/i)
    expect(busy.getAttribute('aria-busy')).toBe('true')
  })

  it('Edit appears only when the parent can edit, and passes the torrent', async () => {
    install()
    const onEdit = vi.fn()
    const { unmount } = mount({ onEdit })
    await userEvent.click(await screen.findByRole('button', { name: /edit/i }))
    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ hash: HASH }))
    unmount()
    mount()
    expect(screen.queryByRole('button', { name: /edit/i })).toBeNull()
  })

  it('the Stats tab renders the progress strip, charts and swarm panel', async () => {
    install({ stat: CLOSED })
    mount()
    await userEvent.click(tab(/^Stats$/))
    expect(await screen.findByTestId('speed-charts')).toBeTruthy()
    expect(screen.getByText('Loaded')).toBeTruthy()
  })
})
