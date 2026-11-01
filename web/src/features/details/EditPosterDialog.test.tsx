// @vitest-environment happy-dom
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { TorrentStat } from 'shared/api/types'
import { renderWithApp } from '@/test/renderWithApp'

import EditPosterDialog from './EditPosterDialog'

const api = vi.hoisted(() => ({ updateTorrent: vi.fn(), TORRENTS_QUERY_KEY: ['torrents'] }))
const toast = vi.hoisted(() => vi.fn())
vi.mock('shared/api/torrents', () => api)
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const torrent = { hash: 'h'.repeat(40), title: 'Dune', category: 'movie', poster: 'https://img/old.jpg' } as TorrentStat

beforeEach(() => {
  vi.clearAllMocks()
  api.updateTorrent.mockResolvedValue(undefined)
})

function open(t: TorrentStat = torrent) {
  const onClose = vi.fn()
  const utils = renderWithApp(<EditPosterDialog torrent={t} open onClose={onClose} />)
  return { onClose, user: userEvent.setup(), ...utils }
}

describe('EditPosterDialog', () => {
  it('prefills the current poster URL', async () => {
    open()
    expect(((await screen.findByRole('textbox')) as HTMLInputElement).value).toBe('https://img/old.jpg')
  })

  it('saves a trimmed URL while keeping title and category, then refreshes both caches', async () => {
    const { user, onClose, queryClient } = open()
    const spy = vi.spyOn(queryClient, 'invalidateQueries')
    fireEvent.change(await screen.findByRole('textbox'), { target: { value: '  https://img/new.jpg ' } })
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(api.updateTorrent).toHaveBeenCalledWith({
      hash: torrent.hash,
      title: 'Dune',
      category: 'movie',
      poster: 'https://img/new.jpg',
    })
    expect(spy).toHaveBeenCalledWith({ queryKey: ['torrents'] })
    expect(spy).toHaveBeenCalledWith({ queryKey: ['torrent', torrent.hash] })
    expect(toast).toHaveBeenCalledWith('success', 'Saved')
  })

  it('falls back to the name or hash as title and omits an empty category', async () => {
    const { user } = open({ hash: 'a'.repeat(40), name: 'file.mkv' } as TorrentStat)
    await user.click(await screen.findByRole('button', { name: 'Save' }))
    await waitFor(() => expect(api.updateTorrent).toHaveBeenCalled())
    expect(api.updateTorrent.mock.calls[0][0]).toMatchObject({ title: 'file.mkv', category: undefined, poster: '' })
  })

  it('shows an error toast and stays open when saving fails', async () => {
    api.updateTorrent.mockRejectedValue(new Error('nope'))
    const { user, onClose } = open()
    await user.click(await screen.findByRole('button', { name: 'Save' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', expect.any(String)))
    expect(onClose).not.toHaveBeenCalled()
  })
})
