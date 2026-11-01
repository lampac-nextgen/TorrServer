// @vitest-environment happy-dom
import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, screen, waitFor } from '@testing-library/react'

import { LibraryHeaderSlotHost, LibraryHeaderSlotProvider } from 'app/LibraryHeaderSlot'
import type { TorrentStat } from 'shared/api/types'
import {
  requestDownloadAllPlaylists,
  requestOpenExportLibrary,
  requestOpenImportLibrary,
} from 'shared/lib/libraryEvents'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { renderWithProviders } from '@/test/renderWithProviders'

import TorrentsPage from './TorrentsPage'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}))
const toast = vi.hoisted(() => vi.fn())
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))
const playlist = vi.hoisted(() => ({ openPlaylistLink: vi.fn() }))
vi.mock('shared/lib/openBrowser', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/lib/openBrowser')>()),
  openPlaylistLink: playlist.openPlaylistLink,
}))

const library = [
  { hash: 'a'.repeat(40), title: 'Alpha', stat: 5, timestamp: 1, category: 'movie' },
] as unknown as TorrentStat[]

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('{}', { status: 200 })),
  )
  vi.mocked(axios.get).mockReset().mockResolvedValue({ data: {} })
  vi.mocked(axios.post)
    .mockReset()
    .mockImplementation(async (_u, body) => ({ data: (body as { action?: string })?.action === 'list' ? library : [] }))
})

afterEach(() => vi.unstubAllGlobals())

function render(props: Partial<React.ComponentProps<typeof TorrentsPage>> = {}) {
  return renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <LibraryHeaderSlotProvider>
          <LibraryHeaderSlotHost />
          <TorrentsPage sortABC={false} sortCategory='all' {...props} />
        </LibraryHeaderSlotProvider>
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )
}

describe('TorrentsPage: app-wide library events', () => {
  it('opens the import dialog on request', async () => {
    render()
    await screen.findByText('Alpha')
    act(() => requestOpenImportLibrary())
    expect(await screen.findByText('Import Library')).toBeTruthy()
  })

  it('opens the export dialog with the whole library on request', async () => {
    render()
    await screen.findByText('Alpha')
    act(() => requestOpenExportLibrary())
    expect(await screen.findByText('Export Library')).toBeTruthy()
    expect(await screen.findByText('1 torrents in library')).toBeTruthy()
  })

  it('opens the empty-library dialogs too', async () => {
    vi.mocked(axios.post).mockImplementation(async () => ({ data: [] }))
    render()
    await screen.findByText('No torrents added')
    act(() => requestOpenImportLibrary())
    expect(await screen.findByText('Import Library')).toBeTruthy()
  })

  it.each([
    ['copied', 'success'],
    ['error', 'error'],
  ])('reports a %s playlist delivery with a %s toast', async (kind, severity) => {
    playlist.openPlaylistLink.mockResolvedValue(kind)
    render()
    await screen.findByText('Alpha')
    act(() => requestDownloadAllPlaylists())
    await waitFor(() => expect(toast).toHaveBeenCalledWith(severity, expect.any(String)))
    expect(playlist.openPlaylistLink).toHaveBeenCalledWith(expect.stringContaining('/playlistall/all.m3u'))
  })

  it('stays silent when the playlist simply opened in a tab', async () => {
    playlist.openPlaylistLink.mockResolvedValue('opened')
    render()
    await screen.findByText('Alpha')
    act(() => requestDownloadAllPlaylists())
    await waitFor(() => expect(playlist.openPlaylistLink).toHaveBeenCalled())
    expect(toast).not.toHaveBeenCalled()
  })
})
