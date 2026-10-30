// @vitest-environment happy-dom
import axios from 'axios'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

import type { TorrentStat } from 'shared/api/types'
import { magnetFromHash } from 'shared/lib/posterPlay'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { renderWithProviders } from '@/test/renderWithProviders'

import TorrentCardActions from './TorrentCardActions'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    isCancel: () => false,
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}))
vi.mock('sonner', () => ({ toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn(), warning: vi.fn() }) }))

const copyToClipboard = vi.fn<(text: string) => Promise<void>>()
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: (text: string) => copyToClipboard(text) }))

const HASH = 'd'.repeat(40)
const torrent = { hash: HASH, title: 'Some Show', stat: 3, download_speed: 10 } as unknown as TorrentStat

const bodies = () => vi.mocked(axios.post).mock.calls.map(([, body]) => body as { action?: string; hash?: string })

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response('{}', { status: 200 })),
  )
  copyToClipboard.mockReset().mockResolvedValue()
  for (const fn of [toast, toast.success, toast.error, toast.warning]) vi.mocked(fn).mockClear()
  vi.mocked(axios.get).mockReset().mockResolvedValue({ data: {} })
  vi.mocked(axios.post).mockReset().mockResolvedValue({ data: null })
})
afterEach(() => vi.unstubAllGlobals())

function renderActions(props: Partial<React.ComponentProps<typeof TorrentCardActions>> = {}) {
  const onDetails = vi.fn()
  const utils = renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <TorrentCardActions torrent={torrent} onDetails={onDetails} {...props} />
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )
  return { onDetails, ...utils }
}

const openMenu = () => userEvent.click(screen.getByRole('button', { name: 'Actions' }))
const item = (name: string) => screen.findByRole('menuitem', { name })

describe('TorrentCardActions menu', () => {
  it('opens details from the menu', async () => {
    const { onDetails } = renderActions()
    await openMenu()
    await userEvent.click(await item('Details'))
    expect(onDetails).toHaveBeenCalledTimes(1)
  })

  it('offers Edit only when the card can edit', async () => {
    const first = renderActions()
    await openMenu()
    await item('Details')
    expect(screen.queryByRole('menuitem', { name: 'Edit torrent' })).toBeNull()
    first.unmount()

    const onEdit = vi.fn()
    renderActions({ onEdit })
    await openMenu()
    await userEvent.click(await item('Edit torrent'))
    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('copies the hash and the magnet and confirms with a toast', async () => {
    renderActions()
    await openMenu()
    await userEvent.click(await item('Copy InfoHash'))
    await waitFor(() => expect(copyToClipboard).toHaveBeenCalledWith(HASH))
    expect(toast.success).toHaveBeenCalledWith('Copied', expect.anything())

    await openMenu()
    await userEvent.click(await item('Copy Magnet'))
    await waitFor(() => expect(copyToClipboard).toHaveBeenCalledWith(magnetFromHash(HASH, 'Some Show')))
    expect(copyToClipboard.mock.calls.at(-1)?.[0]).toMatch(new RegExp(`^magnet:\\?xt=urn:btih:${HASH}`))
  })

  it('shows an error toast when the clipboard refuses', async () => {
    copyToClipboard.mockRejectedValue(new Error('denied'))
    renderActions()
    await openMenu()
    await userEvent.click(await item('Copy InfoHash'))
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error', expect.anything()))
    expect(toast.success).not.toHaveBeenCalled()
  })

  it('copies a share link in the web+torrs form', async () => {
    renderActions()
    await openMenu()
    await userEvent.click(await item('Copy web+torrs://'))
    await waitFor(() => expect(copyToClipboard).toHaveBeenCalledWith(`web+torrs://${HASH}`))
  })
})

describe('TorrentCardActions drop and delete', () => {
  it('names the action in the confirm dialog: drop vs delete', async () => {
    renderActions()
    await openMenu()
    await userEvent.click(await item('Reset Torrent'))
    expect(await screen.findByText('Drop this torrent from memory?')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(screen.queryByText('Drop this torrent from memory?')).toBeNull())

    await openMenu()
    await userEvent.click(await item('Delete'))
    expect(await screen.findByText('Delete Torrent?')).toBeTruthy()
    expect(bodies().filter(b => b.action)).toEqual([])
  })

  it('drop posts { action: drop, hash } and keeps the row in the cache as idle', async () => {
    const { queryClient } = renderActions()
    queryClient.setQueryData(['torrents'], [torrent])
    await openMenu()
    await userEvent.click(await item('Reset Torrent'))
    await userEvent.click(await screen.findByRole('button', { name: 'OK' }))

    await waitFor(() => expect(bodies()).toContainEqual({ action: 'drop', hash: HASH }))
    expect(bodies().some(b => b.action === 'rem')).toBe(false)
    expect(queryClient.getQueryData<TorrentStat[]>(['torrents'])?.[0]).toMatchObject({
      hash: HASH,
      stat: 5,
      download_speed: 0,
    })
  })

  it('delete posts { action: rem, hash } and removes the row from the cache', async () => {
    const { queryClient } = renderActions()
    queryClient.setQueryData(['torrents'], [torrent])
    await openMenu()
    await userEvent.click(await item('Delete'))
    await userEvent.click(await screen.findByRole('button', { name: 'OK' }))

    await waitFor(() => expect(bodies()).toContainEqual({ action: 'rem', hash: HASH }))
    expect(bodies().some(b => b.action === 'drop')).toBe(false)
    expect(toast.success).toHaveBeenCalled()
  })

  it('restores the cached row and shows an error when the server rejects drop', async () => {
    vi.mocked(axios.post).mockRejectedValue({ isAxiosError: true, message: 'x', response: { status: 500 } })
    const { queryClient } = renderActions()
    queryClient.setQueryData(['torrents'], [torrent])
    await openMenu()
    await userEvent.click(await item('Reset Torrent'))
    await userEvent.click(await screen.findByRole('button', { name: 'OK' }))

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith('Error', expect.anything()))
    expect(queryClient.getQueryData<TorrentStat[]>(['torrents'])).toEqual([torrent])
  })
})
