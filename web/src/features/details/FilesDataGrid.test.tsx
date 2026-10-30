// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { PlayableFile } from 'shared/api/types'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import FilesDataGrid, { type FilesDataGridProps } from './FilesDataGrid'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const copy = vi.hoisted(() => vi.fn())
vi.mock('shared/lib/clipboard', () => ({ copyToClipboard: copy }))
vi.mock('features/player/VideoPlayer', () => ({ default: () => <div data-testid='video-player' /> }))

const files: PlayableFile[] = [
  { id: 1, path: 'Show/Show.S01E01.1080p.mkv', length: 1_000_000 },
  { id: 2, path: 'Show/Show.S01E02.1080p.mkv', length: 2_000_000 },
  { id: 3, path: 'Show/Show.S02E01.720p.mp4', length: 3_000_000 },
]

let net: NetworkMock | undefined

beforeEach(() => {
  copy.mockReset()
  copy.mockResolvedValue(undefined)
  localStorage.clear()
  net = mockNetwork(req => {
    const path = pathOf(req.url)
    if (path === '/mediabase') return { base: 'https://tv.lan:8443' }
    if (path.startsWith('/gst/settings')) return { built_in: false }
    if (path === '/viewed') return {}
    if (path.startsWith('/stream')) return {}
    return undefined
  })
})

afterEach(() => {
  net?.restore()
  net = undefined
})

const mount = (props: Partial<FilesDataGridProps> = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <FilesDataGrid hash={HASH} displayName='Show' playableFileList={files} {...props} />
    </ModalOpenProvider>,
  )

describe('FilesDataGrid rows', () => {
  it('says so when there is nothing playable', () => {
    mount({ playableFileList: [] })
    expect(screen.getByText('No playable files in this torrent')).toBeTruthy()
  })

  it('renders one row per playable file, each with content-visibility: auto', () => {
    mount()
    const cards = document.querySelectorAll('div[class*="border-l"]')
    expect(cards).toHaveLength(3)
    for (const card of cards) {
      expect(card.className).toContain('[content-visibility:auto]')
      expect(card.className).toContain('[contain-intrinsic-size:')
    }
  })

  it('labels episodes E01.. and shows season, resolution and size', () => {
    mount()
    const first = document.querySelector('div[class*="border-l"]') as HTMLElement
    expect(first.textContent).toContain('E01')
    expect(first.textContent).toContain('Season 1')
    expect(first.textContent).toContain('1080p')
  })

  it('filters to the selected season', () => {
    mount({ selectedSeason: 2, seasonAmount: [1, 2] })
    expect(document.querySelectorAll('div[class*="border-l"]')).toHaveLength(1)
    expect(screen.getByText(/720p/)).toBeTruthy()
  })

  it('marks viewed rows and clears one mark through /viewed, then notifies the parent', async () => {
    const onViewedChange = vi.fn()
    mount({ viewedFileList: [2], onViewedChange })
    await userEvent.click(screen.getByRole('button', { name: /Viewed/ }))
    await waitFor(() => expect(onViewedChange).toHaveBeenCalledTimes(1))
    const call = net!.requests.find(r => r.method === 'POST' && pathOf(r.url) === '/viewed')
    expect(call?.body).toEqual({ action: 'rem', hash: HASH, file_index: 2 })
  })
})

describe('FilesDataGrid links', () => {
  it('preload hits /stream?link&index&preload with no filename segment', async () => {
    mount()
    await userEvent.click(screen.getAllByRole('button', { name: 'Preload' })[1])
    await waitFor(() => expect(net!.requests.some(r => r.url.includes('preload'))).toBe(true))
    const url = new URL(net!.requests.find(r => r.url.includes('preload'))!.url)
    expect(url.pathname).toBe('/stream')
    expect(url.searchParams.get('link')).toBe(HASH)
    expect(url.searchParams.get('index')).toBe('2')
    expect(url.search).toMatch(/&preload$/)
  })

  it('copy link uses the /mediabase origin with the encoded filename; open link stays on the page origin', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    mount({ playableFileList: [{ id: 9, path: "A/It's #1 (100%).mp4", length: 5 }] })
    // wait for /mediabase to land
    await waitFor(() => expect(net!.requests.some(r => r.url.endsWith('/mediabase'))).toBe(true))
    await new Promise(resolve => setTimeout(resolve, 30))

    await userEvent.click(screen.getByRole('button', { name: 'Copy URL' }))
    const copied = new URL(copy.mock.calls[0][0])
    expect(copied.origin).toBe('https://tv.lan:8443')
    expect(copied.pathname).toBe('/stream/It%27s%20%231%20%28100%25%29.mp4')
    expect(copied.searchParams.get('index')).toBe('9')

    await userEvent.click(screen.getByRole('button', { name: 'Open link' }))
    const opened = new URL(open.mock.calls[0][0] as string)
    expect(opened.origin).toBe(window.location.origin)
    expect(opened.pathname).toBe(copied.pathname)
  })

  it('Play with the default (built-in) preference opens the player for that file', async () => {
    mount()
    await userEvent.click(screen.getAllByRole('button', { name: 'Play' })[0])
    expect(await screen.findByTestId('video-player')).toBeTruthy()
  })

  it('Media info opens the dialog for the row and probes /ffp for that file index', async () => {
    net!.restore()
    net = mockNetwork(req => {
      const path = pathOf(req.url)
      if (path.startsWith('/ffp/')) return { streams: [], format: {} }
      if (path.startsWith('/gst/settings')) return { built_in: false }
      return path === '/mediabase' ? { base: '' } : undefined
    })
    mount()
    await userEvent.click(screen.getAllByRole('button', { name: 'Media info' })[2])
    await waitFor(() => expect(net!.requests.some(r => r.url.includes(`/ffp/${HASH}/3`))).toBe(true))
  })
})
