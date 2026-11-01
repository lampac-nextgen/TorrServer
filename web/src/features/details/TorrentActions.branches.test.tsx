// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { PlayableFile } from 'shared/api/types'
import { OPEN_SETTINGS_EVENT } from 'shared/lib/settingsEvents'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import { mockNetwork, pathOf, type MockHandler, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import TorrentActions, { type TorrentActionsProps } from './TorrentActions'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const copy = vi.hoisted(() => vi.fn())
const toast = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))
vi.mock('features/player/VideoPlayer', () => ({ default: () => null }))
vi.mock('sonner', () => ({
  toast: Object.assign((m: string) => toast('info', m), {
    success: (m: string) => toast('success', m),
    error: (m: string) => toast('error', m),
    warning: (m: string) => toast('warning', m),
  }),
}))

const one: PlayableFile[] = [{ id: 1, path: 'Movie/Big Movie (2020).mp4', length: 10 }]
const many: PlayableFile[] = [
  { id: 1, path: 'Show/Show.S01E01.mkv', length: 10 },
  { id: 2, path: 'Show/Show.S02E05.mkv', length: 10 },
]

let net: NetworkMock | undefined
const install = (extra?: MockHandler) => {
  net = mockNetwork(async req => {
    if (extra) {
      const reply = await extra(req)
      if (reply !== undefined) return reply
    }
    const path = pathOf(req.url)
    if (path === '/mediabase') return { base: 'https://tv.lan:8443' }
    if (path.startsWith('/gst/settings')) return { built_in: false }
    if (path === '/torrents' || path === '/viewed') return {}
    return undefined
  })
}

const mount = (props: Partial<TorrentActionsProps> = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <TorrentActions
          hash={HASH}
          name='Big Movie (2020)'
          playableFileList={one}
          setViewedFileList={vi.fn()}
          {...props}
        />
      </AppSnackbarProvider>
    </ModalOpenProvider>,
  )

const phone = (on: boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: on && q.includes('max-width'),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  vi.clearAllMocks()
  copy.mockResolvedValue(undefined)
  localStorage.clear()
  phone(false)
})

afterEach(() => {
  net?.restore()
  net = undefined
})

const menuItem = async (trigger: string, item: string | RegExp) => {
  await userEvent.click(screen.getAllByRole('button', { name: trigger })[0])
  await userEvent.click(await screen.findByRole('menuitem', { name: item }))
}

describe('TorrentActions: copy failures', () => {
  it.each(['Copy Magnet', 'Copy InfoHash', 'web[+]torrs'])(
    'reports an error when "%s" cannot reach the clipboard',
    async item => {
      install()
      copy.mockRejectedValue(new Error('denied'))
      mount()
      await menuItem('Share', new RegExp(item))
      await waitFor(() => expect(toast).toHaveBeenCalledWith('error', 'Error'))
    },
  )

  it('reports an error when the stream link cannot be copied', async () => {
    install()
    copy.mockRejectedValue(new Error('denied'))
    mount()
    await menuItem('Share', /Copy URL/)
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', 'Error'))
  })

  it('confirms a successful copy', async () => {
    install()
    mount()
    await menuItem('Share', /Copy InfoHash/)
    await waitFor(() => expect(toast).toHaveBeenCalledWith('success', 'Copied'))
    expect(copy).toHaveBeenCalledWith(HASH)
  })
})

describe('TorrentActions: confirmations', () => {
  const open = async (button: string) => {
    await userEvent.click(screen.getByRole('button', { name: button }))
    return within(await screen.findByRole('dialog'))
  }

  it('remove views: confirms with a success toast', async () => {
    install()
    const setViewedFileList = vi.fn()
    mount({ viewedFileList: [1], setViewedFileList })
    await userEvent.click((await open('Remove View States')).getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('success', 'Remove View States'))
    expect(setViewedFileList).toHaveBeenCalledWith(undefined)
  })

  it('remove views: keeps the list and shows an error when the server refuses', async () => {
    install(req => (pathOf(req.url) === '/viewed' ? { status: 500 } : undefined))
    const setViewedFileList = vi.fn()
    mount({ viewedFileList: [1], setViewedFileList })
    await userEvent.click((await open('Remove View States')).getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', 'Error'))
    expect(setViewedFileList).not.toHaveBeenCalled()
  })

  it('delete: rolls the card back and keeps details open on failure', async () => {
    install(req => (req.method === 'POST' && pathOf(req.url) === '/torrents' ? { status: 500 } : undefined))
    const onDeleted = vi.fn()
    mount({ onDeleted })
    await userEvent.click((await open('Delete')).getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(toast).toHaveBeenCalledWith('error', 'Error'))
    expect(onDeleted).not.toHaveBeenCalled()
  })

  it('drop and delete confirmations use the danger action, views use the primary one', async () => {
    install()
    mount()
    const del = await open('Delete')
    expect(del.getByText(/Delete this torrent/)).toBeTruthy()
    await userEvent.click(del.getByRole('button', { name: 'Cancel' }))
  })
})

describe('TorrentActions: series progress and hints', () => {
  it('names the latest played episode with its season', async () => {
    install()
    mount({ playableFileList: many, viewedFileList: [2] })
    expect(await screen.findByText(/Latest file played/i)).toBeTruthy()
    expect(screen.getByText(/Season 2 · Episode 5/)).toBeTruthy()
  })

  it('shows a series without any progress as a single playlist button', async () => {
    install()
    mount({ playableFileList: many })
    expect(screen.queryByText(/Latest file played/i)).toBeNull()
    expect(screen.queryByRole('link', { name: 'From Latest File' })).toBeNull()
  })

  it('shows the external-players hint, which opens the App settings tab', async () => {
    install()
    const seen: unknown[] = []
    window.addEventListener(OPEN_SETTINGS_EVENT, e => seen.push((e as CustomEvent).detail))
    mount()
    await userEvent.click(await screen.findByRole('button', { name: /Open in VLC/i }))
    expect(seen).toEqual(['app'])
  })

  it('hides the hint when the file list is still unknown', async () => {
    install()
    mount({ playableFileList: [] })
    expect(screen.queryByRole('button', { name: /Open in VLC/i })).toBeNull()
  })
})

describe('TorrentActions: phone layout', () => {
  beforeEach(() => phone(true))

  it('uses icon-only buttons with accessible names', async () => {
    install()
    mount()
    for (const name of ['Share', 'Reset Torrent', 'Remove View States', 'Delete'])
      expect(screen.getByRole('button', { name })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Share' }).textContent).toBe('')
  })

  it('collapses the two series playlist links into one menu when there is progress', async () => {
    install()
    mount({ playableFileList: many, viewedFileList: [1] })
    await userEvent.click((await screen.findAllByRole('button', { name: /playlist/i }))[0])
    const items = await screen.findAllByRole('menuitem')
    expect(items.map(i => i.textContent)).toEqual(expect.arrayContaining([expect.stringContaining('From Latest File')]))
    expect(items.some(i => (i as HTMLAnchorElement).href?.includes('&fromlast'))).toBe(true)
  })
})
