// @vitest-environment happy-dom
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { SearchResultItem, TorznabUrl } from 'shared/api/types'
import { renderWithApp } from '@/test/renderWithApp'

import SearchDialog from './SearchDialog'

const search = vi.hoisted(() => ({
  searchTorznab: vi.fn(),
  searchRutor: vi.fn(),
  fetchTorznabCaps: vi.fn(),
}))
const settings = vi.hoisted(() => ({ getSettings: vi.fn() }))
const torrents = vi.hoisted(() => ({ addTorrent: vi.fn(), refreshTorrentsList: vi.fn() }))
const posters = vi.hoisted(() => ({ getMoviePosters: vi.fn() }))
const toast = vi.hoisted(() => ({ fn: vi.fn() }))

vi.mock('shared/api/search', () => search)
vi.mock('shared/api/settings', () => settings)
vi.mock('shared/api/torrents', () => torrents)
vi.mock('shared/lib/torrentHelpers', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/torrentHelpers')>()),
  getMoviePosters: posters.getMoviePosters,
}))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast.fn('info', m), {
    success: (m: string) => toast.fn('success', m),
    error: (m: string) => toast.fn('error', m),
    warning: (m: string) => toast.fn('warning', m),
  }),
}))

const indexer: TorznabUrl = { Host: 'https://idx.test/', Key: 'k', Name: 'Idx' } as TorznabUrl
const hit = (n: number, over: Partial<SearchResultItem> = {}): SearchResultItem =>
  ({
    Title: `Movie ${n}`,
    Hash: `h${n}`.padEnd(40, '0'),
    Magnet: `magnet:?xt=urn:btih:h${n}`,
    Size: `${n} GB`,
    Seed: n,
    Peer: n * 2,
    ...over,
  }) as SearchResultItem

function load(over: Record<string, unknown> = {}) {
  settings.getSettings.mockResolvedValue({
    EnableTorznabSearch: true,
    EnableRutorSearch: true,
    TorznabUrls: [indexer],
    ...over,
  })
}

async function renderOpen() {
  const onClose = vi.fn()
  const user = userEvent.setup()
  renderWithApp(<SearchDialog open onClose={onClose} />)
  await screen.findByText('Search Torrents')
  return { user, onClose }
}

const off = (el: HTMLElement) => (el as HTMLInputElement).disabled || el.getAttribute('aria-disabled') === 'true'
const queryBox = () => screen.getByPlaceholderText('Search movies, shows...')
const searchButton = () => screen.getByRole('button', { name: 'Search' })

async function runQuery(user: ReturnType<typeof userEvent.setup>, q = 'matrix') {
  await waitFor(() => expect(off(queryBox())).toBe(false))
  await user.type(queryBox(), q)
  await user.click(searchButton())
}

beforeEach(() => {
  vi.clearAllMocks()
  load()
  search.searchTorznab.mockResolvedValue([])
  search.searchRutor.mockResolvedValue([])
  search.fetchTorznabCaps.mockResolvedValue({
    categories: [{ id: '2000', name: 'Movies', subcats: [] }],
    limits: { default: 2 },
  })
  torrents.addTorrent.mockResolvedValue([])
  torrents.refreshTorrentsList.mockResolvedValue(undefined)
  posters.getMoviePosters.mockResolvedValue(null)
})

describe('SearchDialog: sources', () => {
  it('explains when no search source is enabled', async () => {
    load({ EnableTorznabSearch: false, EnableRutorSearch: false })
    await renderOpen()
    expect(await screen.findByText(/No search sources enabled/)).toBeTruthy()
    expect(off(queryBox())).toBe(true)
  })

  it('explains when Torznab is on without indexers', async () => {
    load({ EnableRutorSearch: false, TorznabUrls: [] })
    await renderOpen()
    expect(await screen.findByText(/no indexers are configured/)).toBeTruthy()
  })

  it('survives a failing settings request by disabling search', async () => {
    settings.getSettings.mockRejectedValue(new Error('down'))
    await renderOpen()
    await waitFor(() => expect(off(queryBox())).toBe(true))
  })
})

describe('SearchDialog: searching', () => {
  it('queries every source for All Trackers and merges duplicates, best seeds first', async () => {
    search.searchTorznab.mockResolvedValue([hit(1), hit(2)])
    search.searchRutor.mockResolvedValue([hit(2), hit(3)])
    const { user } = await renderOpen()
    await runQuery(user)

    expect(await screen.findByText('Movie 3')).toBeTruthy()
    expect(screen.getByText('3 results')).toBeTruthy()
    expect(search.searchTorznab).toHaveBeenCalledWith('matrix', expect.objectContaining({ signal: expect.anything() }))
    expect(search.searchRutor).toHaveBeenCalledWith('matrix', expect.anything())
    const titles = screen.getAllByText(/^Movie \d$/).map(n => n.textContent)
    expect(titles).toEqual(['Movie 3', 'Movie 2', 'Movie 1'])
  })

  it('searches on Enter and ignores a blank query', async () => {
    search.searchRutor.mockResolvedValue([hit(1)])
    load({ EnableTorznabSearch: false })
    const { user } = await renderOpen()
    await waitFor(() => expect(off(queryBox())).toBe(false))
    expect(off(searchButton())).toBe(true)
    await user.type(queryBox(), 'dune{Enter}')
    expect(await screen.findByText('Movie 1')).toBeTruthy()
    expect(search.searchTorznab).not.toHaveBeenCalled()
  })

  it('shows an empty state when nothing matches', async () => {
    const { user } = await renderOpen()
    await runQuery(user, 'zzz')
    expect(await screen.findByText('No results')).toBeTruthy()
  })

  it('shows the error with a retry that searches again', async () => {
    search.searchTorznab.mockRejectedValue(new Error('indexer down'))
    search.searchRutor.mockRejectedValue(new Error('indexer down'))
    const { user } = await renderOpen()
    await runQuery(user)
    expect(await screen.findByText('indexer down')).toBeTruthy()
    expect(toast.fn).toHaveBeenCalledWith('error', 'indexer down')

    search.searchTorznab.mockResolvedValue([hit(1)])
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByText('Movie 1')).toBeTruthy()
  })

  it('keeps partial results when one source fails', async () => {
    search.searchTorznab.mockRejectedValue(new Error('idx down'))
    search.searchRutor.mockResolvedValue([hit(1)])
    const { user } = await renderOpen()
    await runQuery(user)
    expect(await screen.findByText('Movie 1')).toBeTruthy()
  })

  it('toggles the sort direction and switches the sort field', async () => {
    search.searchTorznab.mockResolvedValue([hit(1), hit(9)])
    load({ EnableRutorSearch: false })
    const { user } = await renderOpen()
    await runQuery(user)
    await screen.findByText('Movie 9')

    const order = () => screen.getAllByText(/^Movie \d$/).map(n => n.textContent)
    expect(order()).toEqual(['Movie 9', 'Movie 1'])
    await user.click(screen.getByRole('radio', { name: 'Seeds' }).closest('label,button,div') as HTMLElement)
    expect(order()).toEqual(['Movie 1', 'Movie 9'])
    await user.click(screen.getByRole('radio', { name: 'Size' }).closest('label,button,div') as HTMLElement)
    expect(order()).toEqual(['Movie 9', 'Movie 1'])
    await user.click(screen.getByRole('radio', { name: 'Peers' }).closest('label,button,div') as HTMLElement)
    expect(order()).toEqual(['Movie 9', 'Movie 1'])
  })
})

describe('SearchDialog: adding', () => {
  it('adds a hit with a TMDB poster and refreshes the library', async () => {
    search.searchTorznab.mockResolvedValue([hit(1, { Title: 'Dune 2021 1080p [x]' })])
    load({ EnableRutorSearch: false })
    posters.getMoviePosters.mockResolvedValue(['https://img/p.jpg'])
    const { user } = await renderOpen()
    await runQuery(user)
    await user.click(await screen.findByRole('button', { name: 'Add' }))

    await waitFor(() => expect(torrents.addTorrent).toHaveBeenCalled())
    expect(torrents.addTorrent).toHaveBeenCalledWith({
      link: 'magnet:?xt=urn:btih:h1',
      title: 'Dune 2021 1080p [x]',
      poster: 'https://img/p.jpg',
    })
    expect(torrents.refreshTorrentsList).toHaveBeenCalled()
    await waitFor(() => expect(toast.fn).toHaveBeenCalledWith('success', 'Torrent added'))
  })

  it('keeps the hit poster and reports a failed add', async () => {
    search.searchTorznab.mockResolvedValue([hit(1, { Poster: 'https://own/p.jpg' })])
    load({ EnableRutorSearch: false })
    torrents.addTorrent.mockRejectedValue(new Error('no'))
    const { user } = await renderOpen()
    await runQuery(user)
    await user.click(await screen.findByRole('button', { name: 'Add' }))
    await waitFor(() => expect(toast.fn).toHaveBeenCalledWith('error', expect.any(String)))
    expect(posters.getMoviePosters).not.toHaveBeenCalled()
    expect(torrents.addTorrent).toHaveBeenCalledWith(expect.objectContaining({ poster: 'https://own/p.jpg' }))
  })
})

describe('SearchDialog: single tracker paging', () => {
  it('loads caps for the chosen indexer and pages with Load more', async () => {
    search.searchTorznab.mockResolvedValueOnce([hit(1), hit(2)]).mockResolvedValueOnce([hit(3)])
    load({ EnableRutorSearch: false })
    const { user } = await renderOpen()
    await waitFor(() => expect(off(queryBox())).toBe(false))

    await user.click(screen.getByRole('button', { name: /Tracker/ }))
    await user.click(await screen.findByRole('option', { name: 'Idx' }))
    await waitFor(() => expect(search.fetchTorznabCaps).toHaveBeenCalledWith(0, expect.anything()))

    await user.type(queryBox(), 'x')
    await user.click(searchButton())
    expect(await screen.findByText('Movie 2')).toBeTruthy()
    expect(search.searchTorznab).toHaveBeenLastCalledWith(
      'x',
      expect.objectContaining({ index: 0, offset: 0, limit: 2 }),
    )

    await user.click(await screen.findByRole('button', { name: 'Load more' }))
    expect(await screen.findByText('Movie 3')).toBeTruthy()
    expect(search.searchTorznab).toHaveBeenLastCalledWith(
      'x',
      expect.objectContaining({ index: 0, offset: 2, limit: 2 }),
    )
    expect(within(document.body).queryByRole('button', { name: 'Load more' })).toBeNull()
  })

  it('searches RuTor alone when only RuTor is enabled', async () => {
    search.searchRutor.mockResolvedValue([hit(1)])
    load({ EnableTorznabSearch: false })
    const { user } = await renderOpen()
    await runQuery(user)
    expect(await screen.findByText('Movie 1')).toBeTruthy()
    expect(search.searchRutor).toHaveBeenCalledTimes(1)
  })
})
