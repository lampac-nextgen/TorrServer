// @vitest-environment happy-dom
import axios from 'axios'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

import type { TorrentStat } from 'shared/api/types'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { renderWithProviders } from '@/test/renderWithProviders'

import MultiAddDialog from './MultiAddDialog'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }) }))

// Parsing a real .torrent is parse-torrent's job. Here each file name maps to a fixed hash and title.
const hashOf = (file: File) => file.name.replace(/\.torrent$/, '').padEnd(40, '0')
vi.mock('shared/lib/torrentHelpers', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/torrentHelpers')>()),
  parseTorrentInfoHash: vi.fn(async (file: File) => hashOf(file)),
  parseTorrentTitle: vi.fn((file: File, cb: (r: { parsedTitle: string; originalName: string }) => void) =>
    cb({ parsedTitle: `Parsed ${file.name.replace(/\.torrent$/, '')}`, originalName: file.name }),
  ),
  getMoviePosters: vi.fn().mockResolvedValue(null),
}))

const file = (name: string) => new File(['d4:infod4:name1:aee'], name, { type: 'application/x-bittorrent' })
const row = (hash: string, extra: Partial<TorrentStat> = {}): TorrentStat =>
  ({ hash, title: hash, stat: 0, ...extra }) as unknown as TorrentStat

let library: TorrentStat[]
/** Names of uploaded files that the server should reject. */
let failing: Set<string>
const uploads = () =>
  vi
    .mocked(axios.post)
    .mock.calls.filter(([url]) => String(url).endsWith('/torrent/upload'))
    .map(([, form]) => form as FormData)
const listCalls = () =>
  vi.mocked(axios.post).mock.calls.filter(([, body]) => (body as { action?: string })?.action === 'list').length

beforeEach(() => {
  library = []
  failing = new Set()
  vi.mocked(axios.post).mockReset()
  vi.mocked(axios.get).mockReset().mockResolvedValue({ data: {} })
  for (const fn of [toast, toast.success, toast.error, toast.warning]) vi.mocked(fn).mockClear()
  vi.mocked(axios.post).mockImplementation(async (url, body) => {
    if (String(url).endsWith('/torrent/upload')) {
      const f = (body as FormData).get('file') as File
      if (failing.has(f.name))
        throw { isAxiosError: true, message: 'Request failed', response: { status: 500, data: { error: 'boom' } } }
      const added = row(hashOf(f))
      library = [...library, added]
      return { data: added }
    }
    if ((body as { action?: string }).action === 'list') return { data: library }
    return { data: null }
  })
})

function renderDialog(names: string[]) {
  const onClose = vi.fn()
  const utils = renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <MultiAddDialog files={names.map(file)} open onClose={onClose} />
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )
  return { onClose, ...utils }
}

const addAll = async (count: number) => {
  const button = await screen.findByRole('button', { name: `Add (${count})` })
  await waitFor(() =>
    expect(button.hasAttribute('disabled') || button.getAttribute('aria-disabled') === 'true').toBe(false),
  )
  await userEvent.click(button)
}

describe('MultiAddDialog', () => {
  it('lists each dropped file with its parsed title and counts them in the heading and button', async () => {
    renderDialog(['alpha.torrent', 'beta.torrent'])
    expect(await screen.findByDisplayValue('Parsed alpha')).toBeTruthy()
    expect(screen.getByDisplayValue('Parsed beta')).toBeTruthy()
    expect(screen.getByText(/Add new torrent \(2\)/)).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Add (2)' })).toBeTruthy()
  })

  it('uploads every file with its (edited) title, then closes and reports success', async () => {
    const { onClose, queryClient } = renderDialog(['alpha.torrent', 'beta.torrent'])
    const title = await screen.findByDisplayValue('Parsed alpha')
    await userEvent.clear(title)
    await userEvent.type(title, 'My Alpha')
    await addAll(2)

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
    expect(uploads().map(form => [(form.get('file') as File).name, form.get('title'), form.get('save')])).toEqual([
      ['alpha.torrent', 'My Alpha', 'true'],
      ['beta.torrent', 'Parsed beta', 'true'],
    ])
    expect(toast.success).toHaveBeenCalledWith('Torrent added', expect.anything())
    expect(toast.warning).not.toHaveBeenCalled()
    expect(queryClient.getQueryData<TorrentStat[]>(['torrents'])?.map(r => r.hash)).toEqual(
      expect.arrayContaining([hashOf(file('alpha.torrent')), hashOf(file('beta.torrent'))]),
    )
  })

  it('reports a partial failure: warns, stays open, and retries only the file that failed', async () => {
    failing = new Set(['beta.torrent'])
    const { onClose } = renderDialog(['alpha.torrent', 'beta.torrent'])
    await addAll(2)

    await waitFor(() => expect(toast.warning).toHaveBeenCalledTimes(1))
    expect(onClose).not.toHaveBeenCalled()
    expect(uploads()).toHaveLength(2)
    // Only the failed file is still addable.
    expect(await screen.findByRole('button', { name: 'Add (1)' })).toBeTruthy()

    failing.clear()
    await addAll(1)
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
    expect(uploads().map(form => (form.get('file') as File).name)).toEqual([
      'alpha.torrent',
      'beta.torrent',
      'beta.torrent',
    ])
  })

  it('shows an error and stays open when every upload fails', async () => {
    failing = new Set(['alpha.torrent', 'beta.torrent'])
    const { onClose } = renderDialog(['alpha.torrent', 'beta.torrent'])
    await addAll(2)

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error', expect.anything()))
    expect(onClose).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
    expect(await screen.findByRole('button', { name: 'Add (2)' })).toBeTruthy()
  })

  it('skips a file whose hash is already in the library and does not upload it', async () => {
    library = [row(hashOf(file('beta.torrent')), { title: 'Beta in library' })]
    renderDialog(['alpha.torrent', 'beta.torrent'])

    expect(await screen.findByText(/Beta in library/)).toBeTruthy()
    await addAll(1)
    await waitFor(() => expect(uploads()).toHaveLength(1))
    expect((uploads()[0].get('file') as File).name).toBe('alpha.torrent')
  })

  it('removes a row, and closes once nothing addable is left', async () => {
    const { onClose } = renderDialog(['alpha.torrent'])
    await screen.findByDisplayValue('Parsed alpha')
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onClose).toHaveBeenCalled()
    expect(uploads()).toEqual([])
  })

  it('does not start a second list poll of its own', async () => {
    renderDialog(['alpha.torrent'])
    await screen.findByDisplayValue('Parsed alpha')
    // One query observer (useTorrentsQuery) means one initial list GET, not one per component.
    await waitFor(() => expect(listCalls()).toBe(1))
  })
})
