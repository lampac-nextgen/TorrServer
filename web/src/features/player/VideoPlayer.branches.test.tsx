// @vitest-environment happy-dom
import type { ReactNode } from 'react'
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import VideoPlayer, { type VideoPlayerProps } from './VideoPlayer'

const hls = vi.hoisted(() => ({
  instances: [] as { src?: string; destroyed: boolean }[],
}))

vi.mock('hls.js', () => {
  class FakeHls {
    static isSupported = () => true
    static Events = {
      MANIFEST_PARSED: 'manifest',
      LEVEL_LOADED: 'level',
      SUBTITLE_TRACKS_UPDATED: 'subs',
      SUBTITLE_TRACK_SWITCH: 'switch',
      ERROR: 'error',
    }
    static ErrorTypes = { NETWORK_ERROR: 'net', MEDIA_ERROR: 'media' }
    subtitleTracks: unknown[] = []
    subtitleTrack = -1
    record: (typeof hls.instances)[number] = { destroyed: false }
    constructor() {
      hls.instances.push(this.record)
    }
    on() {}
    loadSource(src: string) {
      this.record.src = src
    }
    attachMedia() {}
    startLoad() {}
    stopLoad() {}
    recoverMediaError() {}
    destroy() {
      this.record.destroyed = true
    }
  }
  return { default: FakeHls }
})

// Unlike VideoPlayer.test.tsx, render the extra controls: the audio menu and expand button live there.
vi.mock('./PlayerChrome', () => ({
  default: ({
    topChrome,
    extraControls,
    showCaptionsButton,
    showPip,
    isMobile,
    children,
  }: {
    topChrome: ReactNode
    extraControls?: ReactNode
    showCaptionsButton: boolean
    showPip: boolean
    isMobile: boolean
    children: ReactNode
  }) => (
    <div data-testid='chrome' data-captions={showCaptionsButton} data-pip={showPip} data-mobile={isMobile}>
      {topChrome}
      {extraControls}
      {children}
    </div>
  ),
}))

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const PAGE = window.location.origin
const STREAM = `${PAGE}/stream/movie.mp4?link=${HASH}&index=1&play`
const MASTER = `${PAGE}/gst/${HASH}/master.m3u8?index=1&audio=0`
const two = [
  { Type: 'audio', Lang: 'eng', Title: 'Original' },
  { Type: 'audio', Lang: 'rus', Title: 'Dub' },
]

let net: NetworkMock | undefined
let torrentBody: Record<string, unknown>
let probeBody: unknown
let probeStatus: number

const install = () => {
  net = mockNetwork(req => {
    const path = pathOf(req.url)
    if (path.startsWith('/torrents')) return torrentBody
    if (path.startsWith('/cache')) return { Hash: HASH, Filled: 10, Capacity: 100 }
    if (path.includes('/probe')) return probeStatus === 200 ? probeBody : { status: probeStatus }
    return {}
  })
}

const mount = (props: Partial<VideoPlayerProps> = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <VideoPlayer videoSrc={STREAM} initiallyOpen showTrigger={false} title='movie.mp4' {...props} />
    </ModalOpenProvider>,
  )

const mountHls = (props: Partial<VideoPlayerProps> = {}) =>
  mount({ videoSrc: MASTER, hls: true, hash: HASH, fileIndex: 1, audioTracks: two, ...props })

const mobile = (on: boolean) => {
  window.matchMedia = ((q: string) => ({
    matches: on && q.includes('max-width'),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
  })) as unknown as typeof window.matchMedia
}

const liveHls = () => hls.instances.filter(i => !i.destroyed)

beforeEach(() => {
  hls.instances.length = 0
  torrentBody = { hash: HASH, stat: 3, download_speed: 2048, active_peers: 3, total_peers: 9, connected_seeders: 2 }
  probeBody = { Tracks: two }
  probeStatus = 200
  sessionStorage.clear()
  localStorage.clear()
  mobile(false)
  install()
})

afterEach(() => {
  net?.restore()
  net = undefined
})

describe('VideoPlayer: audio track menu', () => {
  it('offers the menu for several tracks and switches the GStreamer master playlist', async () => {
    const onAudioIndexChange = vi.fn()
    mountHls({ onAudioIndexChange })
    await userEvent.click(await screen.findByRole('button', { name: 'Select audio track' }))
    expect(await screen.findByText('Original')).toBeTruthy()
    await userEvent.click(screen.getByText('Dub'))

    expect(onAudioIndexChange).toHaveBeenCalledWith(1)
    await waitFor(() => expect(liveHls().some(i => i.src?.includes('audio=1'))).toBe(true))
  })

  it('resumes at the same position after the new audio stream loads its metadata', async () => {
    mountHls()
    const video = await waitFor(() => {
      const v = document.querySelector('video')
      if (!v) throw new Error('no video')
      return v as HTMLVideoElement
    })
    Object.defineProperty(video, 'currentTime', { value: 42, writable: true, configurable: true })
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play')
    await userEvent.click(await screen.findByRole('button', { name: 'Select audio track' }))
    await userEvent.click(await screen.findByText('Dub'))
    const next = document.querySelector('video') as HTMLVideoElement
    Object.defineProperty(next, 'currentTime', { value: 0, writable: true, configurable: true })
    act(() => {
      next.dispatchEvent(new Event('loadedmetadata'))
    })
    await waitFor(() => expect(next.currentTime).toBe(42))
    expect(play).toHaveBeenCalled()
  })

  it('has no menu for a single audio track or without a file index', async () => {
    mountHls({ audioTracks: [two[0]] })
    await screen.findByTestId('chrome')
    expect(screen.queryByRole('button', { name: 'Select audio track' })).toBeNull()
  })

  it('probes the file when the launcher passed no tracks, then shows the menu', async () => {
    mountHls({ audioTracks: [] })
    expect(await screen.findByRole('button', { name: 'Select audio track' })).toBeTruthy()
    expect(net!.requests.some(r => pathOf(r.url).includes('/probe'))).toBe(true)
  })

  it('stays without a menu when the probe fails', async () => {
    probeStatus = 500
    mountHls({ audioTracks: [] })
    await waitFor(() => expect(net!.requests.some(r => pathOf(r.url).includes('/probe'))).toBe(true))
    expect(screen.queryByRole('button', { name: 'Select audio track' })).toBeNull()
  })

  it('does not probe a progressive stream', async () => {
    mount({ hash: HASH, fileIndex: 1, audioTracks: [] })
    await screen.findByTestId('chrome')
    expect(net!.requests.some(r => pathOf(r.url).includes('/probe'))).toBe(false)
  })
})

describe('VideoPlayer: window modes', () => {
  it('toggles the expanded desktop player', async () => {
    mount()
    await userEvent.click(await screen.findByRole('button', { name: 'Expand player' }))
    expect(screen.getByRole('button', { name: 'Exit Fullscreen' })).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Exit Fullscreen' }))
    expect(screen.getByRole('button', { name: 'Expand player' })).toBeTruthy()
  })

  it('has no expand control on a phone, where the player is already full-size', async () => {
    mobile(true)
    mount()
    expect((await screen.findByTestId('chrome')).getAttribute('data-mobile')).toBe('true')
    expect(screen.queryByRole('button', { name: 'Expand player' })).toBeNull()
  })

  it('follows the document fullscreen state', async () => {
    mount()
    await screen.findByTestId('chrome')
    Object.defineProperty(document, 'fullscreenElement', { value: document.body, configurable: true })
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'))
    })
    Object.defineProperty(document, 'fullscreenElement', { value: null, configurable: true })
    act(() => {
      document.dispatchEvent(new Event('fullscreenchange'))
    })
    expect(screen.getByTestId('chrome')).toBeTruthy()
  })

  it('closes on Escape and reports it', async () => {
    const onClose = vi.fn()
    mount({ onClose })
    await screen.findByTestId('chrome')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })
})

describe('VideoPlayer: triggers', () => {
  it.each([
    ['default', {}],
    ['inline', { inlineTrigger: true }],
    ['inline primary', { inlineTrigger: true, inlineTriggerPrimary: true }],
  ])('opens from the %s Play button', async (_n, props) => {
    mount({ initiallyOpen: false, showTrigger: true, ...props })
    expect(screen.queryByTestId('chrome')).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(await screen.findByTestId('chrome')).toBeTruthy()
  })
})

describe('VideoPlayer: captions and stats', () => {
  it('shows the captions button for a sidecar subtitle on a progressive stream', async () => {
    mount({ captionSrc: `${PAGE}/subs/x.vtt` })
    expect((await screen.findByTestId('chrome')).getAttribute('data-captions')).toBe('true')
    expect(document.querySelector('track')).toBeTruthy()
  })

  it('has no captions button without a subtitle', async () => {
    mount()
    expect((await screen.findByTestId('chrome')).getAttribute('data-captions')).toBe('false')
  })

  it('shows dashes for peers that are not known yet', async () => {
    torrentBody = { hash: HASH, stat: 3 }
    mount({ hash: HASH })
    await screen.findByLabelText(/Download/)
    await waitFor(() => expect(screen.getAllByText('—').length).toBeGreaterThan(0))
  })

  it('shows the swarm line from the live torrent', async () => {
    mount({ hash: HASH })
    expect(await screen.findByText('3/9')).toBeTruthy()
    expect(screen.getByText('↑2')).toBeTruthy()
  })

  it('shows no stats row for a stream that is not a torrent file', async () => {
    mount()
    await screen.findByTestId('chrome')
    expect(screen.queryByLabelText(/Download/)).toBeNull()
  })
})

describe('VideoPlayer: container support', () => {
  it.each(['movie.webm', 'movie.ogv', 'movie.ogg', 'movie.mkv', 'movie'])(
    'reports %s as unsupported without codec support',
    async name => {
      const onNotSupported = vi.fn()
      mount({ videoSrc: `${PAGE}/stream/${name}?link=${HASH}&index=1&play`, onNotSupported })
      await waitFor(() => expect(onNotSupported).toHaveBeenCalled())
    },
  )
})
