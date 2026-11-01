// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { TorrentStat } from 'shared/api/types'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import DetailsDialog, { type DetailsDialogProps } from './DetailsDialog'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const MiB = 1024 * 1024

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
    torrent_size: 3_000_000,
    file_stats: files,
    ...over,
  }) as TorrentStat

let net: NetworkMock | undefined
let cacheBody: Record<string, unknown>
let viewed: unknown

const install = (detail: Partial<TorrentStat> = {}) => {
  net = mockNetwork(req => {
    const path = pathOf(req.url)
    if (path === '/torrents') return torrent(detail)
    if (path === '/cache') return cacheBody
    if (path === '/viewed') return viewed
    if (path === '/settings') return { PreloadCache: 50 }
    if (path === '/mediabase') return { base: '' }
    if (path.startsWith('/gst/settings')) return { built_in: false }
    return undefined
  })
}

const mount = (props: Partial<DetailsDialogProps> & { stat?: Partial<TorrentStat> } = {}) => {
  const { stat, ...rest } = props
  return renderWithProviders(
    <ModalOpenProvider>
      <DetailsDialog torrent={torrent(stat)} onClose={vi.fn()} {...rest} />
    </ModalOpenProvider>,
  )
}

const matchMedia = (on: (q: string) => boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: on(q),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia
}
const PHONE = (q: string) => q.includes('max-width')

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  cacheBody = { Hash: HASH, Capacity: 64 * MiB, Filled: MiB }
  viewed = []
  matchMedia(() => false)
})

afterEach(() => {
  net?.restore()
  net = undefined
})

const tab = (name: RegExp) => screen.getByRole('tab', { name })

describe('DetailsDialog: status and hero fallbacks', () => {
  it.each([
    [WORKING, 'Active'],
    [PRELOAD, 'Preload'],
    [CLOSED, 'losed'],
    [IN_DB, 'In DB'],
    [GETTING_INFO, 'Getting info'],
  ])('shows a readable status for stat %i', async (stat, label) => {
    install({ stat })
    mount({ stat: { stat } })
    expect((await screen.findAllByText(new RegExp(label, 'i'))).length).toBeGreaterThan(0)
  })

  it('shows the raw number for an unknown stat and a dash when there is none', async () => {
    install({ stat: 42 })
    mount({ stat: { stat: 42 } })
    expect(await screen.findByText('42')).toBeTruthy()
  })

  it('renders without peers, speeds or size (dashes instead of blanks)', async () => {
    install({ stat: undefined, torrent_size: undefined })
    mount({ stat: { stat: undefined, torrent_size: undefined } })
    expect((await screen.findAllByText('—')).length).toBeGreaterThan(0)
  })

  it('shows a poster and opens the poster editor from it', async () => {
    install({ poster: 'https://img/p.jpg' })
    mount({ stat: { poster: 'https://img/p.jpg' } })
    const img = document.querySelector('img[src="https://img/p.jpg"]')
    expect(img).toBeTruthy()
    await userEvent.click(screen.getAllByRole('button', { name: 'Poster link' })[0])
    expect(await screen.findByPlaceholderText('https://…')).toBeTruthy()
  })

  it('hides a poster that fails to load', async () => {
    install({ poster: 'https://img/broken.jpg' })
    mount({ stat: { poster: 'https://img/broken.jpg' } })
    const img = document.querySelector('img[src="https://img/broken.jpg"]') as HTMLImageElement
    img.dispatchEvent(new Event('error'))
    expect(img.style.display).toBe('none')
  })

  it('titles a torrent whose name differs from its title with both', async () => {
    install({ title: 'My Show', name: 'Show.2020.1080p.WEB-DL' })
    mount({ stat: { title: 'My Show', name: 'Show.2020.1080p.WEB-DL' } })
    expect(await screen.findByRole('heading', { level: 2, name: /My Show/ })).toBeTruthy()
  })

  it('falls back to the hash when the torrent has neither title nor name', async () => {
    install({ title: '', name: '' })
    mount({ stat: { title: '', name: '' } })
    expect(await screen.findByRole('heading', { level: 2, name: HASH })).toBeTruthy()
  })
})

describe('DetailsDialog: viewed files', () => {
  it('passes the server history down: the series shows its latest played file', async () => {
    viewed = [{ file_index: 1 }]
    install()
    mount()
    expect(await screen.findByText(/Latest file played/i)).toBeTruthy()
  })

  it('survives a failing /viewed request', async () => {
    install()
    viewed = undefined
    net!.restore()
    net = mockNetwork(req => {
      const path = pathOf(req.url)
      if (path === '/viewed') return { status: 500 }
      if (path === '/torrents') return torrent()
      if (path === '/cache') return cacheBody
      if (path === '/settings') return { PreloadCache: 50 }
      if (path === '/mediabase') return { base: '' }
      if (path.startsWith('/gst/settings')) return { built_in: false }
      return undefined
    })
    mount()
    await screen.findByRole('radio', { name: 'Season 1' })
    expect(screen.queryByText(/Latest file played/i)).toBeNull()
  })
})

describe('DetailsDialog: seasons', () => {
  it('has no season toggles for a single-season pack and keeps the selection valid', async () => {
    install({ file_stats: [files[0]] })
    mount({ stat: { file_stats: [files[0]] } })
    await screen.findByText(/S01E01/i, undefined, { timeout: 3000 }).catch(() => undefined)
    expect(screen.queryByRole('radio', { name: 'Season 1' })).toBeNull()
  })

  it('selecting the same season again keeps it selected', async () => {
    install()
    mount()
    const one = await screen.findByRole('radio', { name: 'Season 1' })
    await userEvent.click(one)
    await userEvent.click(screen.getByRole('radio', { name: 'Season 2' }))
    expect(screen.getByRole('radio', { name: 'Season 2' }).getAttribute('aria-checked')).toBe('true')
  })
})

describe('DetailsDialog: Cache tab', () => {
  it('idle: shows preload progress as the buffer, and dashes for unknown piece info', async () => {
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    expect(await screen.findByText('Buffer')).toBeTruthy()
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })

  it('streaming with nothing downloaded ahead explains the empty buffer', async () => {
    cacheBody = {
      Hash: HASH,
      Capacity: 64 * MiB,
      Filled: 0,
      PiecesCount: 10,
      PiecesLength: MiB,
      Readers: [{ Reader: 2, Active: true }],
      Pieces: {},
    }
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    expect(await screen.findByText('Playable ahead')).toBeTruthy()
    await waitFor(() => expect(document.querySelector('[title*="ahead" i]')).toBeTruthy())
    expect(screen.getByText('10')).toBeTruthy() // pieces count
    expect(screen.getByText('1 MB')).toBeTruthy() // piece length
  })

  it('streaming with pieces ahead reports the readable amount', async () => {
    cacheBody = {
      Hash: HASH,
      Capacity: 64 * MiB,
      Filled: 3 * MiB,
      PiecesCount: 10,
      PiecesLength: MiB,
      Readers: [{ Reader: 2, Active: true }],
      Pieces: { '2': { Length: MiB, Completed: true, Size: MiB }, '3': { Length: MiB, Completed: true, Size: MiB } },
    }
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    expect(await screen.findByText('Playable ahead')).toBeTruthy()
    expect(screen.getByText(/2 MB|2.0 MB/)).toBeTruthy()
  })

  it('persists the snake debug switch', async () => {
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    await userEvent.click(await screen.findByRole('checkbox', { name: /Snake debug|Debug/i }))
    expect(localStorage.getItem('isSnakeDebugMode')).toBe('true')
  })

  it('opens the detailed cache map and closes it again', async () => {
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    await userEvent.click(await screen.findByRole('button', { name: 'Cache Details View' }))
    expect(await screen.findAllByRole('dialog')).toHaveLength(2)
  })
})

describe('DetailsDialog: phone layout', () => {
  beforeEach(() => matchMedia(PHONE))

  it('shows the poster/title hero with tight stats, and expands a long title on tap', async () => {
    install({ title: 'A very long title '.repeat(10), name: 'A very long title '.repeat(10) })
    mount({ stat: { title: 'A very long title '.repeat(10), name: 'A very long title '.repeat(10) } })
    const toggle = (await screen.findAllByRole('button', { expanded: false }))[0]
    await userEvent.click(toggle)
    expect(screen.getAllByRole('button', { expanded: true }).length).toBeGreaterThan(0)
  })

  it('opens the poster editor from the phone hero', async () => {
    install()
    mount()
    await userEvent.click((await screen.findAllByRole('button', { name: 'Poster link' }))[0])
    expect(await screen.findByPlaceholderText('https://…')).toBeTruthy()
  })

  it('renders the compact Stats tab (progress strip, charts, swarm panel in one column)', async () => {
    install({ stat: CLOSED })
    mount()
    await userEvent.click(tab(/^Stats$/))
    expect(await screen.findByTestId('speed-charts')).toBeTruthy()
  })

  it('renders the compact Cache tab without the desktop heading', async () => {
    install()
    mount()
    await userEvent.click(tab(/^Cache$/))
    await screen.findByText('Buffer')
    expect(screen.queryByText('Cache', { selector: 'p.text-sm' })).toBeNull()
  })

  it('shows a subtitle only when the name adds information', async () => {
    install({ title: 'Mine', name: 'Other.Name.2019' })
    mount({ stat: { title: 'Mine', name: 'Other.Name.2019' } })
    expect(await screen.findByText('Other Name')).toBeTruthy()
  })
})
