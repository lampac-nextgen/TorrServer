// @vitest-environment happy-dom
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithApp } from '@/test/renderWithApp'

import AddDialog from './AddDialog'

const api = vi.hoisted(() => ({ addTorrent: vi.fn(), refreshTorrentsList: vi.fn() }))
const library = vi.hoisted(() => ({ data: [] as { hash: string }[] }))
const helpers = vi.hoisted(() => ({
  getMoviePosters: vi.fn(),
  parseSourceInfoHash: vi.fn(),
  parseTorrentTitle: vi.fn(),
}))
const toast = vi.hoisted(() => vi.fn())

vi.mock('shared/api/torrents', () => api)
vi.mock('shared/hooks/useTorrentsQuery', () => ({ useTorrentsQuery: () => ({ data: library.data }) }))
vi.mock('shared/lib/torrentHelpers', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/torrentHelpers')>()),
  ...helpers,
}))
vi.mock('./MultiAddDialog', () => ({
  default: ({ files, onClose }: { files: File[]; onClose: () => void }) => (
    <div data-testid='multi'>
      {files.map(f => f.name).join(',')}
      <button onClick={onClose}>multi-close</button>
    </div>
  ),
}))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const HASH = 'c12fe1c06bba254a9dc9f519b335aa7c1367a88a'
const MAGNET = `magnet:?xt=urn:btih:${HASH}&dn=Some+Show`

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.clearAllMocks()
  library.data = []
  api.addTorrent.mockResolvedValue([])
  api.refreshTorrentsList.mockResolvedValue(undefined)
  helpers.getMoviePosters.mockResolvedValue(['https://img/p1.jpg', 'https://img/p2.jpg'])
  helpers.parseSourceInfoHash.mockResolvedValue(HASH)
  helpers.parseTorrentTitle.mockImplementation((_s: string, cb: (r: { parsedTitle: string }) => void) =>
    cb({ parsedTitle: 'Some Show' }),
  )
})

afterEach(() => {
  vi.useRealTimers()
  Object.defineProperty(window.navigator, 'userAgent', { value: 'Mozilla/5.0 happy-dom', configurable: true })
  Object.defineProperty(window.navigator, 'platform', { value: '', configurable: true })
})

const settle = (ms = 800) => act(() => vi.advanceTimersByTimeAsync(ms))

function open() {
  const onClose = vi.fn()
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
  renderWithApp(<AddDialog open onClose={onClose} />)
  return { onClose, user }
}

const source = () => screen.getByRole('textbox', { name: 'Torrent source' })

describe('AddDialog: title and posters', () => {
  it('fills the title from the parsed source, finds posters and preselects the first', async () => {
    const { user } = open()
    await user.type(source(), MAGNET)
    await settle(400) // parse debounce fills the title
    await settle(600) // then the poster debounce fires

    expect((screen.getByLabelText('Title') as HTMLInputElement).value).toBe('Some Show')
    expect(helpers.getMoviePosters).toHaveBeenCalledWith('Some Show', 'en')
    const thumbs = document.querySelectorAll<HTMLButtonElement>('button[aria-pressed]')
    expect(thumbs).toHaveLength(2)
    expect(thumbs[0].getAttribute('aria-pressed')).toBe('true')

    await user.click(thumbs[1])
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(api.addTorrent).toHaveBeenCalled())
    expect(api.addTorrent).toHaveBeenCalledWith(
      expect.objectContaining({ link: MAGNET, title: 'Some Show', poster: 'https://img/p2.jpg' }),
    )
  })

  it('does not overwrite a title the user typed', async () => {
    const { user } = open()
    const title = screen.getByLabelText('Title')
    await user.type(title, 'Mine')
    await user.type(source(), MAGNET)
    await settle()
    expect((title as HTMLInputElement).value).toBe('Mine')
    expect(helpers.parseTorrentTitle).not.toHaveBeenCalled()
  })

  it('shows the duplicate warning only for a hash that is already in the library', async () => {
    library.data = [{ hash: HASH.toUpperCase() }]
    const { user } = open()
    await user.type(source(), MAGNET)
    await settle()
    expect(screen.getByText(/already/i)).toBeTruthy()

    helpers.parseSourceInfoHash.mockResolvedValue(null)
    fireEvent.change(source(), { target: { value: `${MAGNET}&x=1` } })
    await settle()
    expect(screen.queryByText(/already/i)).toBeNull()
  })

  it('ignores a late poster search result after the title changed', async () => {
    let resolveFirst!: (u: string[]) => void
    helpers.getMoviePosters.mockImplementationOnce(() => new Promise<string[]>(r => (resolveFirst = r)))
    const { user } = open()
    const title = screen.getByLabelText('Title')
    await user.type(title, 'First title')
    await settle(500)
    await user.clear(title)
    await user.type(title, 'Second title')
    await settle(500)
    await act(async () => resolveFirst(['https://img/stale.jpg']))
    expect(document.querySelector('img[src="https://img/stale.jpg"]')).toBeNull()
  })
})

describe('AddDialog: files', () => {
  const pick = async (files: File[]) => {
    const input = document.querySelector('input[type=file]') as HTMLInputElement
    fireEvent.change(input, { target: { files } })
    await settle(50)
  }

  // The dropzone filters by MIME/extension itself; only iOS (no accept) lets a wrong file reach our check.
  it('rejects files that are not .torrent on iOS, where the picker cannot filter', async () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', configurable: true })
    Object.defineProperty(window.navigator, 'platform', { value: 'iPhone', configurable: true })
    open()
    await pick([new File(['x'], 'notes.txt')])
    expect(toast).toHaveBeenCalledWith('error', 'Wrong torrent source')
    expect(screen.queryByTestId('multi')).toBeNull()
  })

  it('hands .torrent files to the multi-add dialog and closes both', async () => {
    const { onClose, user } = open()
    await pick([new File(['x'], 'a.TORRENT'), new File(['x'], 'b.txt')])
    expect(screen.getByTestId('multi').textContent).toContain('a.TORRENT')
    expect(screen.getByTestId('multi').textContent).not.toContain('b.txt')
    await user.click(screen.getByText('multi-close'))
    expect(onClose).toHaveBeenCalled()
  })
})

describe('AddDialog: errors', () => {
  it('shows the server error message when add fails', async () => {
    api.addTorrent.mockRejectedValue(new Error('bad magnet'))
    const { user, onClose } = open()
    await user.type(source(), MAGNET)
    await settle()
    await user.click(screen.getByRole('button', { name: 'Add' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', 'bad magnet'))
    expect(onClose).not.toHaveBeenCalled()
  })
})
