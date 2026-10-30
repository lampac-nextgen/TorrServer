// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { PlayableFile } from 'shared/api/types'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type MockHandler, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import type { VideoPlayerProps } from './VideoPlayer'
import { usePlayLauncher, type UsePlayLauncherArgs } from './usePlayLauncher'

const playerProps = vi.hoisted(() => ({
  current: null as null | Record<string, unknown>,
  closed: 0,
}))

vi.mock('features/player/VideoPlayer', () => ({
  default: (props: VideoPlayerProps) => {
    playerProps.current = props as unknown as Record<string, unknown>
    return <div data-testid='video-player'>{props.title}</div>
  },
}))

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'

const mp4: PlayableFile = {
  id: 1,
  path: 'Show/Ep #1 (100%)!.mp4',
  length: 1024,
}
const mkv: PlayableFile = { id: 2, path: 'Show/Show.S01E02.mkv', length: 2048 }

let net: NetworkMock | undefined

interface Setup {
  gst?: { built_in: boolean; config?: Record<string, unknown> }
  trackTimecode?: boolean
  viewed?: Array<{ file_index: number; timecode: number }>
  subs?: Array<{ lang: string; url: string }>
  tracks?: Array<Record<string, unknown>>
  detail?: Record<string, unknown>
}

const install = (setup: Setup = {}, extra?: MockHandler) => {
  net = mockNetwork(async req => {
    const path = pathOf(req.url)
    if (extra) {
      const reply = await extra(req)
      if (reply !== undefined) return reply
    }
    if (path.startsWith('/gst/settings')) return setup.gst ?? { built_in: false }
    if (path.startsWith('/settings')) return { TrackTimecode: Boolean(setup.trackTimecode) }
    if (path.startsWith('/viewed')) return setup.viewed ?? []
    if (path.startsWith('/subs/')) return setup.subs ?? []
    if (path.includes('/probe')) return { Tracks: setup.tracks ?? [] }
    if (path.startsWith('/torrents')) return setup.detail ?? { hash: HASH, file_stats: [] }
    return undefined
  })
  return net
}

function Harness(props: Partial<UsePlayLauncherArgs> & { files?: PlayableFile[] }) {
  const { files = [mp4], ...rest } = props
  const launcher = usePlayLauncher({
    hash: HASH,
    displayName: 'My Show',
    knownPlayableFiles: files,
    ...rest,
  })
  return (
    <>
      <button onClick={launcher.handlePlay}>play-all</button>
      <button onClick={() => launcher.playFile(files[0])}>play-first</button>
      <button onClick={() => launcher.resolvePlayableFile(file => handoff(file))}>handoff</button>
      {launcher.playerModals}
    </>
  )
}

const handoff = vi.fn()

const mount = (props: Parameters<typeof Harness>[0] = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <Harness {...props} />
    </ModalOpenProvider>,
  )

beforeEach(() => {
  playerProps.current = null
  handoff.mockReset()
  localStorage.clear()
})

afterEach(() => {
  net?.restore()
  net = undefined
})

describe('usePlayLauncher: progressive stream', () => {
  it('plays an mp4 through /stream on the page origin with link, index and filename encoded', async () => {
    const network = install()
    mount()
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')

    const src = String(playerProps.current?.videoSrc)
    const url = new URL(src)
    expect(url.origin).toBe(window.location.origin)
    // basename only, RFC 3986 encoded: space, #, (, ), %, !
    expect(url.pathname).toBe('/stream/Ep%20%231%20%28100%25%29%21.mp4')
    expect(url.searchParams.get('link')).toBe(HASH)
    expect(url.searchParams.get('index')).toBe('1')
    // `play` is a valueless flag: Gin only checks presence.
    expect(url.search).toMatch(/&play$/)
    expect(playerProps.current?.downloadSrc).toBe(src)
    expect(playerProps.current?.hls).toBe(false)
    expect(playerProps.current?.heartbeatSrc).toBeUndefined()
    expect(playerProps.current?.title).toBe('Ep #1 (100%)!.mp4')
    expect(network.requests.some(r => r.url.includes('/gst/') && r.url.includes('/probe'))).toBe(false)
  })

  it('passes the server-resolved caption url, absolute against the page origin', async () => {
    install({ subs: [{ lang: 'en', url: '/subs/x/1/en.vtt' }] })
    mount()
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.captionSrc).toBe(`${window.location.origin}/subs/x/1/en.vtt`)
  })

  it('leaves captionSrc unset when /subs finds nothing', async () => {
    install()
    mount()
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.captionSrc).toBeUndefined()
  })
})

describe('usePlayLauncher: gst/HLS path', () => {
  it('keeps mkv progressive when the build has no GStreamer', async () => {
    install({ gst: { built_in: false } })
    mount({ files: [mkv] })
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.hls).toBe(false)
    expect(String(playerProps.current?.videoSrc)).toContain('/stream/Show.S01E02.mkv?')
  })

  it('keeps mp4 progressive even when GStreamer is built in', async () => {
    install({ gst: { built_in: true } })
    mount({ files: [mp4] })
    await waitFor(() => expect(net?.requests.some(r => r.url.includes('/gst/settings'))).toBe(true))
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.hls).toBe(false)
  })

  it('opens mkv through the HLS master playlist with a heartbeat, and no /subs lookup', async () => {
    const network = install({
      gst: { built_in: true },
      tracks: [{ Type: 'audio', Lang: 'eng' }],
    })
    mount({ files: [mkv] })
    await waitFor(() => expect(network.requests.some(r => r.url.includes('/gst/settings'))).toBe(true))
    // let the runtime query resolve before the click reads it
    await new Promise(resolve => setTimeout(resolve, 20))
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')

    expect(playerProps.current?.hls).toBe(true)
    expect(playerProps.current?.videoSrc).toBe(`${window.location.origin}/gst/${HASH}/master.m3u8?index=2&audio=0`)
    expect(playerProps.current?.heartbeatSrc).toBe(`${window.location.origin}/gst/${HASH}/heartbeat`)
    // the download link stays the direct stream
    expect(String(playerProps.current?.downloadSrc)).toContain('/stream/Show.S01E02.mkv?')
    expect(network.requests.some(r => r.url.includes('/subs/'))).toBe(false)
  })

  it('asks which audio track to use when the probe finds several, then opens that track', async () => {
    install({
      gst: { built_in: true },
      tracks: [
        { Type: 'audio', Lang: 'eng', Title: 'English 5.1' },
        { Type: 'audio', Lang: 'rus', Title: 'Russian stereo' },
      ],
    })
    mount({ files: [mkv] })
    await new Promise(resolve => setTimeout(resolve, 20))
    await userEvent.click(screen.getByText('play-first'))

    await userEvent.click(await screen.findByRole('button', { name: /Russian stereo/ }))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.videoSrc).toBe(`${window.location.origin}/gst/${HASH}/master.m3u8?index=2&audio=1`)
    expect(playerProps.current?.audioIndex).toBe(1)
    expect((playerProps.current?.audioTracks as unknown[]).length).toBe(2)
  })

  it('falls back to the player when the probe request fails', async () => {
    install({ gst: { built_in: true } }, req => (req.url.includes('/probe') ? { status: 500 } : undefined))
    mount({ files: [mkv] })
    await new Promise(resolve => setTimeout(resolve, 20))
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.audioTracks).toEqual([])
    expect(playerProps.current?.audioIndex).toBe(0)
  })

  it('probes a file once: the second play reuses the cached tracks', async () => {
    const network = install({
      gst: { built_in: true },
      tracks: [{ Type: 'audio' }],
    })
    mount({ files: [mkv] })
    await new Promise(resolve => setTimeout(resolve, 20))
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    await userEvent.click(screen.getByText('play-first'))
    await waitFor(() => expect(playerProps.current).not.toBeNull())
    expect(network.requests.filter(r => r.url.includes('/probe'))).toHaveLength(1)
  })
})

describe('usePlayLauncher: resume position', () => {
  it('starts at 0 and never asks /viewed when TrackTimecode is off', async () => {
    const network = install({
      trackTimecode: false,
      viewed: [{ file_index: 1, timecode: 99 }],
    })
    mount()
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.trackTimecode).toBe(false)
    expect(playerProps.current?.initialTimecode).toBe(0)
    expect(network.requests.some(r => r.url.endsWith('/viewed'))).toBe(false)
  })

  it('resumes from the saved timecode of that file when TrackTimecode is on', async () => {
    install({
      trackTimecode: true,
      viewed: [
        { file_index: 7, timecode: 5 },
        { file_index: 1, timecode: 321 },
      ],
    })
    mount()
    await userEvent.click(screen.getByText('play-first'))
    await screen.findByTestId('video-player')
    expect(playerProps.current?.trackTimecode).toBe(true)
    expect(playerProps.current?.initialTimecode).toBe(321)
  })
})

describe('usePlayLauncher: file picker and handoff', () => {
  it('shows the picker for several files and plays the one chosen', async () => {
    install()
    mount({
      files: [mp4, { id: 3, path: 'Show/Show.S01E03.mp4', length: 10 }],
    })
    await userEvent.click(screen.getByText('play-all'))
    await userEvent.click(await screen.findByRole('button', { name: /E03/ }))
    await screen.findByTestId('video-player')
    expect(new URL(String(playerProps.current?.videoSrc)).searchParams.get('index')).toBe('3')
  })

  it('hands a single file to the caller without opening the player', async () => {
    install()
    mount({ files: [mp4] })
    await userEvent.click(screen.getByText('handoff'))
    await waitFor(() => expect(handoff).toHaveBeenCalledWith(mp4))
    expect(screen.queryByTestId('video-player')).toBeNull()
  })

  it('hands the picked file to the caller when there are several', async () => {
    install()
    const second = { id: 3, path: 'Show/Show.S01E03.mp4', length: 10 }
    mount({ files: [mp4, second] })
    await userEvent.click(screen.getByText('handoff'))
    await userEvent.click(await screen.findByRole('button', { name: /E03/ }))
    expect(handoff).toHaveBeenCalledWith(second)
    expect(screen.queryByTestId('video-player')).toBeNull()
  })

  it('wakes an IN_DB torrent when no files are known, then plays what the server reports', async () => {
    const network = install({
      detail: {
        hash: HASH,
        file_stats: [{ id: 5, path: 'a/movie.mp4', length: 5 }],
      },
    })
    mount({ files: [] })
    await userEvent.click(screen.getByText('play-all'))
    // one candidate: no picker, straight to the player
    await screen.findByTestId('video-player')
    expect(new URL(String(playerProps.current?.videoSrc)).searchParams.get('index')).toBe('5')
    expect(network.requests.some(r => r.method === 'POST' && pathOf(r.url) === '/torrents')).toBe(true)
  })
})

describe('usePlayLauncher: autoplay (Continue Watching)', () => {
  it('starts the requested file once, with the local resume position', async () => {
    install({ trackTimecode: true, viewed: [{ file_index: 1, timecode: 10 }] })
    const { rerender } = renderWithProviders(
      <ModalOpenProvider>
        <Harness files={[mp4]} autoPlayFileId={1} autoPlayTimecode={77} />
      </ModalOpenProvider>,
    )
    await screen.findByTestId('video-player')
    // the local timecode beats server history
    expect(playerProps.current?.initialTimecode).toBe(77)

    playerProps.current = null
    rerender(
      <ModalOpenProvider>
        <Harness files={[mp4, mkv]} autoPlayFileId={1} autoPlayTimecode={77} />
      </ModalOpenProvider>,
    )
    await new Promise(resolve => setTimeout(resolve, 30))
    // the player element is already open; a second autoplay would re-resolve it
    expect(net?.requests.filter(r => r.url.includes('/subs/'))).toHaveLength(1)
  })

  it('waits until the target file shows up in the known list', async () => {
    install()
    const { rerender } = renderWithProviders(
      <ModalOpenProvider>
        <Harness files={[]} autoPlayFileId={1} />
      </ModalOpenProvider>,
    )
    await new Promise(resolve => setTimeout(resolve, 30))
    expect(screen.queryByTestId('video-player')).toBeNull()

    rerender(
      <ModalOpenProvider>
        <Harness files={[mp4]} autoPlayFileId={1} />
      </ModalOpenProvider>,
    )
    await screen.findByTestId('video-player')
  })
})

describe('usePlayLauncher: teardown', () => {
  it('aborts the file lookup when the host unmounts mid-wake (drop during resolve)', async () => {
    let seenSignal: AbortSignal | null | undefined
    install({}, req => {
      if (req.method === 'POST' && pathOf(req.url) === '/torrents') {
        seenSignal = req.signal
        return { hash: HASH, file_stats: [] } // never playable: the wait loop keeps polling
      }
      return undefined
    })
    const view = mount({ files: [] })
    await userEvent.click(screen.getByText('play-all'))
    await waitFor(() => expect(seenSignal).toBeTruthy())
    expect(seenSignal?.aborted).toBe(false)

    view.unmount()
    expect(seenSignal?.aborted).toBe(true)
  })
})
