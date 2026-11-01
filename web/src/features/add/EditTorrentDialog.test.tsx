// @vitest-environment happy-dom
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { renderWithApp } from '@/test/renderWithApp'

import EditTorrentDialog from './EditTorrentDialog'

const api = vi.hoisted(() => ({ updateTorrent: vi.fn(), TORRENTS_QUERY_KEY: ['torrents'] }))
const helpers = vi.hoisted(() => ({ getMoviePosters: vi.fn() }))
const toast = vi.hoisted(() => vi.fn())

vi.mock('shared/api/torrents', () => api)
vi.mock('shared/lib/torrentHelpers', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/torrentHelpers')>()),
  getMoviePosters: helpers.getMoviePosters,
}))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const HASH = '0123456789abcdef0123456789abcdef01234567'
const torrent = {
  hash: HASH,
  title: 'Dune Part Two',
  name: 'dune.mkv',
  category: 'movie',
  poster: 'https://img/own.jpg',
} as TorrentStat

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.clearAllMocks()
  api.updateTorrent.mockResolvedValue(undefined)
  helpers.getMoviePosters.mockResolvedValue(['https://img/t1.jpg', 'https://img/t2.jpg'])
})

afterEach(() => vi.useRealTimers())

const settle = () => act(() => vi.advanceTimersByTimeAsync(500))

async function open(t: TorrentStat | null = torrent) {
  const onClose = vi.fn()
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  const utils = renderWithApp(<EditTorrentDialog torrent={t} open onClose={onClose} />)
  return { onClose, user, ...utils }
}

describe('EditTorrentDialog', () => {
  it('hydrates the form from the torrent and shows its hash', async () => {
    await open()
    expect(await screen.findByText(HASH)).toBeTruthy()
    expect((screen.getByLabelText('Title') as HTMLInputElement).value).toBe('Dune Part Two')
  })

  it('searches TMDB for the title and lists the current poster first', async () => {
    await open()
    await settle()
    expect(helpers.getMoviePosters).toHaveBeenCalledWith('Dune Part Two', 'en')
    const imgs = await screen.findAllByRole('button', { pressed: true })
    expect(imgs.length).toBe(1)
    expect(document.querySelectorAll('img').length).toBe(3) // own + 2 found
  })

  it('picking a thumbnail changes the poster that will be saved', async () => {
    const { user } = await open()
    await settle()
    const thumbs = document.querySelectorAll<HTMLButtonElement>('button[aria-pressed]')
    await user.click(thumbs[1])
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(api.updateTorrent).toHaveBeenCalled())
    expect(api.updateTorrent.mock.calls[0][0].poster).toBe('https://img/t1.jpg')
  })

  it('saves the edited title and category, invalidates the list and closes', async () => {
    const { user, onClose, queryClient } = await open()
    const spy = vi.spyOn(queryClient, 'invalidateQueries')
    await settle()
    const title = screen.getByLabelText('Title')
    fireEvent.change(title, { target: { value: '  New title  ' } })
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(api.updateTorrent).toHaveBeenCalledWith({
      hash: HASH,
      title: 'New title',
      category: 'movie',
      poster: 'https://img/own.jpg',
    })
    expect(spy).toHaveBeenCalledWith({ queryKey: ['torrents'] })
    expect(toast).toHaveBeenCalledWith('success', 'Saved')
  })

  it('falls back to the torrent name, then the hash, for an empty title', async () => {
    const { user } = await open({ ...torrent, title: '' } as TorrentStat)
    await settle()
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: '   ' } })
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(api.updateTorrent).toHaveBeenCalled())
    expect(api.updateTorrent.mock.calls[0][0].title).toBe('dune.mkv')
  })

  it('reports a failed save and keeps the dialog open', async () => {
    api.updateTorrent.mockRejectedValue(new Error('403'))
    const { user, onClose } = await open()
    await settle()
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', expect.any(String)))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not search for a one-letter title and tolerates a failed search result', async () => {
    helpers.getMoviePosters.mockResolvedValue(null)
    await open({ ...torrent, title: 'X', poster: '' } as TorrentStat)
    await settle()
    expect(helpers.getMoviePosters).not.toHaveBeenCalled()
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Valid title' } })
    await settle()
    expect(helpers.getMoviePosters).toHaveBeenCalledWith('Valid title', 'en')
  })

  it('renders nothing without a torrent', async () => {
    await open(null)
    expect(screen.queryByText('Edit torrent')).toBeNull()
  })
})
