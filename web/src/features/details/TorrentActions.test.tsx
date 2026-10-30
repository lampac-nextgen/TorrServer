// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { PlayableFile, TorrentStat } from 'shared/api/types'
import { TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type MockHandler, type NetworkMock } from '@/test/network'
import { makeTestQueryClient, renderWithProviders } from '@/test/renderWithProviders'

import TorrentActions, { type TorrentActionsProps } from './TorrentActions'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const copy = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))
vi.mock('features/player/VideoPlayer', () => ({ default: () => null }))

const one: PlayableFile[] = [{ id: 1, path: 'Movie/Big Movie (2020).mp4', length: 10 }]
const many: PlayableFile[] = [
  { id: 1, path: 'Show/Show.S01E01.mkv', length: 10 },
  { id: 2, path: 'Show/Show.S01E02.mkv', length: 10 },
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

beforeEach(() => {
  copy.mockReset()
  copy.mockResolvedValue(undefined)
  localStorage.clear()
})

afterEach(() => {
  net?.restore()
  net = undefined
})

const mount = (props: Partial<TorrentActionsProps> = {}, queryClient = makeTestQueryClient()) => {
  const all: TorrentActionsProps = {
    hash: HASH,
    name: 'Big Movie (2020)',
    playableFileList: one,
    setViewedFileList: vi.fn(),
    ...props,
  }
  const view = renderWithProviders(
    <ModalOpenProvider>
      <TorrentActions {...all} />
    </ModalOpenProvider>,
    { queryClient },
  )
  return { ...view, props: all }
}

const mediaBaseLoaded = async () => {
  await waitFor(() => expect(net!.requests.some(r => r.url.endsWith('/mediabase'))).toBe(true))
  await new Promise(resolve => setTimeout(resolve, 30))
}

const torrentsPosts = () => net!.requests.filter(r => r.method === 'POST' && pathOf(r.url) === '/torrents')

describe('TorrentActions playlist link', () => {
  it('points at the m3u on the /mediabase origin, with the name encoded and the flags valueless', async () => {
    install()
    mount({ name: 'Big Movie #1 (2020)' })
    await mediaBaseLoaded()
    const anchor = (await screen.findAllByRole('link'))[0] as HTMLAnchorElement
    const url = new URL(anchor.href)
    expect(url.origin).toBe('https://tv.lan:8443')
    expect(url.pathname).toBe('/stream/Big%20Movie%20%231%20%282020%29.m3u')
    expect(url.searchParams.get('link')).toBe(HASH)
    expect(url.search).toContain('&m3u&fn=file.m3u')
    expect(anchor.rel).toContain('noopener')
  })

  it('a series with progress offers From Latest File (&fromlast) next to the full playlist', async () => {
    install()
    mount({ playableFileList: many, viewedFileList: [1], name: 'Show' })
    await mediaBaseLoaded()
    const latest = screen.getByRole('link', { name: 'From Latest File' }) as HTMLAnchorElement
    expect(latest.href).toMatch(/&fromlast$/)
    expect(screen.getByText(/Latest file played/i)).toBeTruthy()
  })

  it('a series without progress shows only the full playlist', async () => {
    install()
    mount({ playableFileList: many, name: 'Show' })
    await mediaBaseLoaded()
    expect(screen.queryByRole('link', { name: 'From Latest File' })).toBeNull()
  })

  it('hints at external players until one is enabled', () => {
    install()
    mount()
    expect(screen.getByText(/enable in Settings/)).toBeTruthy()
  })
})

describe('TorrentActions share menu', () => {
  const openShare = async () => {
    await userEvent.click(screen.getAllByRole('button', { name: 'Share' })[0])
  }

  it('single-file torrents can copy the stream link on the media base', async () => {
    install()
    mount()
    await mediaBaseLoaded()
    await openShare()
    await userEvent.click(await screen.findByRole('menuitem', { name: /Copy URL/ }))
    const url = new URL(copy.mock.calls[0][0])
    expect(url.origin).toBe('https://tv.lan:8443')
    expect(url.pathname).toBe('/stream/Big%20Movie%20%282020%29.mp4')
    expect(url.searchParams.get('index')).toBe('1')
  })

  it('multi-file torrents have no single stream link to copy', async () => {
    install()
    mount({ playableFileList: many })
    await openShare()
    await screen.findByRole('menuitem', { name: /Copy Magnet/ })
    expect(screen.queryByRole('menuitem', { name: /Copy URL/ })).toBeNull()
  })

  it('copies the magnet, the hash and the torrs link', async () => {
    install()
    mount({ torrsHash: 'torrshash' })
    await openShare()
    await userEvent.click(await screen.findByRole('menuitem', { name: /Copy Magnet/ }))
    expect(copy).toHaveBeenLastCalledWith(`magnet:?xt=urn:btih:${HASH}&dn=Big%20Movie%20(2020)`)
    await openShare()
    await userEvent.click(await screen.findByRole('menuitem', { name: /Copy InfoHash/ }))
    expect(copy).toHaveBeenLastCalledWith(HASH)
    await openShare()
    await userEvent.click(await screen.findByRole('menuitem', { name: /web\+torrs/ }))
    expect(String(copy.mock.calls.at(-1)?.[0])).toMatch(/^web\+torrs:\/\//)
  })
})

describe('TorrentActions drop / delete / clear views', () => {
  const confirm = async (button: string) => {
    await userEvent.click(screen.getByRole('button', { name: button }))
    return within(await screen.findByRole('dialog'))
  }

  it('asks before dropping; Cancel sends nothing', async () => {
    install()
    mount()
    const dialog = await confirm('Reset Torrent')
    expect(dialog.getByText('Drop this torrent from memory?')).toBeTruthy()
    await userEvent.click(dialog.getByRole('button', { name: 'Cancel' }))
    expect(torrentsPosts()).toHaveLength(0)
  })

  it('drop marks the card IN_DB at once, posts action drop, invalidates the list and calls onDropped', async () => {
    install()
    const queryClient = makeTestQueryClient()
    queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, [
      { hash: HASH, stat: 3, download_speed: 99 } as TorrentStat,
    ])
    const onDropped = vi.fn()
    mount({ onDropped }, queryClient)
    const dialog = await confirm('Reset Torrent')
    await userEvent.click(dialog.getByRole('button', { name: 'OK' }))
    expect(queryClient.getQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY)?.[0]).toMatchObject({
      stat: 5,
      download_speed: 0,
    })
    await waitFor(() => expect(onDropped).toHaveBeenCalledTimes(1))
    expect(torrentsPosts()[0].body).toEqual({ action: 'drop', hash: HASH })
  })

  it('a failed drop puts the previous list back and does not close details', async () => {
    install(req => (req.method === 'POST' && pathOf(req.url) === '/torrents' ? { status: 500 } : undefined))
    const queryClient = makeTestQueryClient()
    const before = [{ hash: HASH, stat: 3, download_speed: 99 } as TorrentStat]
    queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, before)
    const onDropped = vi.fn()
    mount({ onDropped }, queryClient)
    const dialog = await confirm('Reset Torrent')
    await userEvent.click(dialog.getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(queryClient.getQueryData(TORRENTS_QUERY_KEY)).toEqual(before))
    expect(onDropped).not.toHaveBeenCalled()
  })

  it('delete removes the card optimistically, posts action rem and calls onDeleted', async () => {
    install()
    const queryClient = makeTestQueryClient()
    queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, [
      { hash: HASH } as TorrentStat,
      { hash: 'other' } as TorrentStat,
    ])
    const onDeleted = vi.fn()
    mount({ onDeleted }, queryClient)
    const dialog = await confirm('Delete')
    await userEvent.click(dialog.getByRole('button', { name: 'OK' }))
    expect(queryClient.getQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY)?.map(item => item.hash)).toEqual(['other'])
    await waitFor(() => expect(onDeleted).toHaveBeenCalledTimes(1))
    expect(torrentsPosts()[0].body).toEqual({ action: 'rem', hash: HASH })
  })

  it('remove views posts file_index -1 and empties the viewed list', async () => {
    install()
    const setViewedFileList = vi.fn()
    mount({ setViewedFileList, viewedFileList: [1] })
    const dialog = await confirm('Remove View States')
    await userEvent.click(dialog.getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(setViewedFileList).toHaveBeenCalledWith(undefined))
    const call = net!.requests.find(r => pathOf(r.url) === '/viewed')
    expect(call?.body).toEqual({ action: 'rem', hash: HASH, file_index: -1 })
  })
})
