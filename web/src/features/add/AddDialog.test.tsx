// @vitest-environment happy-dom
import axios from 'axios'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

import type { TorrentStat } from 'shared/api/types'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { renderWithProviders } from '@/test/renderWithProviders'

import AddDialog from './AddDialog'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }) }))
// TMDB is a third-party host; the poster search is not under test here.
vi.mock('shared/lib/torrentHelpers', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/torrentHelpers')>()),
  getMoviePosters: vi.fn().mockResolvedValue(null),
}))

const HASH = 'c12fe1c06bba254a9dc9f519b335aa7c1367a88a'
const MAGNET = `magnet:?xt=urn:btih:${HASH}&dn=Some+Show&tr=udp%3A%2F%2Ftracker.example%3A80`

const row = (hash: string): TorrentStat => ({ hash, title: hash, stat: 0 }) as unknown as TorrentStat

let library: TorrentStat[]
const posts = () =>
  vi
    .mocked(axios.post)
    .mock.calls.map(([, body]) => body as Record<string, unknown>)
    .filter(body => body.action !== 'list')

function mockServer(onAdd: () => unknown = () => ({ data: row(HASH) })) {
  vi.mocked(axios.post).mockImplementation(async (_url, body) => {
    const action = (body as { action?: string }).action
    if (action === 'list') return { data: library }
    if (action === 'add') return onAdd()
    return { data: null }
  })
}

function renderDialog(props: Partial<React.ComponentProps<typeof AddDialog>> = {}) {
  const onClose = vi.fn()
  const utils = renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <AddDialog open onClose={onClose} {...props} />
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )
  return { onClose, ...utils }
}

const sourceField = () => screen.getByRole('textbox', { name: 'Torrent source' })
const disabled = (el: HTMLElement) => el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true'
const addButton = () => screen.getByRole('button', { name: 'Add' })

beforeEach(() => {
  library = []
  vi.mocked(axios.post).mockReset()
  vi.mocked(axios.get).mockReset().mockResolvedValue({ data: {} })
  for (const fn of [toast, toast.success, toast.error, toast.warning]) vi.mocked(fn).mockClear()
  mockServer()
})

afterEach(() => vi.restoreAllMocks())

describe('AddDialog', () => {
  it('keeps Add disabled until a source is typed, and rejects a non-torrent string', async () => {
    renderDialog()
    expect(disabled(addButton())).toBe(true)

    await userEvent.type(sourceField(), 'not a torrent')
    expect(disabled(addButton())).toBe(true)
    expect(screen.getByText('Wrong torrent source')).toBeTruthy()
    expect(posts()).toEqual([])
  })

  it.each([
    ['magnet link', MAGNET, MAGNET],
    ['40-hex infohash', HASH, HASH],
    ['magnet with &amp; from pasted HTML', `${MAGNET}&amp;x.pe=1.2.3.4:5`, `${MAGNET}&amp;x.pe=1.2.3.4:5`],
    ['http torrent URL', 'https://example.org/a.torrent', 'https://example.org/a.torrent'],
  ])('accepts a %s and posts action add with save_to_db', async (_name, typed, sent) => {
    const { onClose } = renderDialog()
    await userEvent.type(sourceField(), `  ${typed}  `)
    await userEvent.click(addButton())

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
    expect(posts()).toEqual([
      { action: 'add', link: sent, title: undefined, category: undefined, poster: '', save_to_db: true, timestamp: undefined },
    ])
    expect(toast.success).toHaveBeenCalledWith('Torrent added', expect.anything())
  })

  it('turns a torrs:// link carrying a bare infohash into a magnet, and passes a packed token through', async () => {
    const { onClose } = renderDialog()
    await userEvent.type(sourceField(), `torrs://${HASH.toUpperCase()}`)
    await userEvent.click(addButton())
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(posts()[0].link).toBe(`magnet:?xt=urn:btih:${HASH}&dn=${HASH}`)
  })

  it('normalizes web+torrs:// to torrs:// for the API', async () => {
    const { onClose } = renderDialog()
    await userEvent.type(sourceField(), 'web+torrs://packedtoken123')
    await userEvent.click(addButton())
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(posts()[0].link).toBe('torrs://packedtoken123')
  })

  it('sends save_to_db false when the switch is turned off', async () => {
    const { onClose } = renderDialog()
    await userEvent.type(sourceField(), HASH)
    await userEvent.click(screen.getByRole('switch', { name: 'Save to library' }))
    await userEvent.click(addButton())
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(posts()[0].save_to_db).toBe(false)
  })

  it('seeds the field from initialSource', () => {
    renderDialog({ initialSource: MAGNET })
    expect((sourceField() as HTMLTextAreaElement).value).toBe(MAGNET)
  })

  it('flags a hash already in the library and blocks the add', async () => {
    library = [row(HASH.toUpperCase())]
    renderDialog()
    // Let the library query settle so the duplicate check sees it.
    await waitFor(() => expect(axios.post).toHaveBeenCalled())
    await userEvent.type(sourceField(), MAGNET)

    expect(await screen.findByText('This torrent is already in database')).toBeTruthy()
    expect(disabled(addButton())).toBe(true)
    expect(posts()).toEqual([])
  })

  it('on a 400 shows the server error and keeps the dialog open with the input intact', async () => {
    mockServer(() => {
      throw { isAxiosError: true, message: 'Request failed', response: { status: 400, data: { error: 'bad magnet: no infohash' } } }
    })
    const { onClose } = renderDialog()
    await userEvent.type(sourceField(), MAGNET)
    await userEvent.click(addButton())

    await waitFor(() => expect(toast.error).toHaveBeenCalled())
    expect(toast.error).toHaveBeenCalledWith('bad magnet: no infohash', expect.anything())
    expect(onClose).not.toHaveBeenCalled()
    expect((sourceField() as HTMLTextAreaElement).value).toBe(MAGNET)
    await waitFor(() => expect(disabled(addButton())).toBe(false))
  })

  it('puts the added row in the library cache without waiting for the list GET', async () => {
    // The follow-up list GET is slow: it still answers with the old library.
    let added = false
    mockServer(() => {
      added = true
      return { data: row(HASH) }
    })
    const answer = vi.mocked(axios.post).getMockImplementation()!
    vi.mocked(axios.post).mockImplementation((url, body, config) =>
      added && (body as { action?: string }).action === 'list' ? new Promise(() => {}) : answer(url, body, config),
    )
    const { onClose, queryClient } = renderDialog()
    await userEvent.type(sourceField(), HASH)
    await userEvent.click(addButton())
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    expect(queryClient.getQueryData<TorrentStat[]>(['torrents'])?.map(item => item.hash)).toContain(HASH)
  })
})
