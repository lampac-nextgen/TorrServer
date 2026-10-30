// @vitest-environment happy-dom
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'
import { renderWithProviders } from '@/test/renderWithProviders'

import VideoPlayer, { type VideoPlayerProps } from './VideoPlayer'

const hls = vi.hoisted(() => {
  const instances: Array<{
    src?: string
    media?: HTMLVideoElement
    destroyed: boolean
    handlers: Record<string, (...args: unknown[]) => void>
    xhrSetup?: (xhr: { setRequestHeader: (k: string, v: string) => void }) => void
  }> = []
  return { instances, supported: true }
})

vi.mock('hls.js', () => {
  class FakeHls {
    static isSupported = () => hls.supported
    static Events = {
      MANIFEST_PARSED: 'manifest',
      LEVEL_LOADED: 'level',
      SUBTITLE_TRACKS_UPDATED: 'subs',
      SUBTITLE_TRACK_SWITCH: 'subswitch',
      ERROR: 'error',
    }
    static ErrorTypes = { NETWORK_ERROR: 'network', MEDIA_ERROR: 'media' }
    subtitleTracks: unknown[] = []
    subtitleTrack = -1
    record: (typeof hls.instances)[number]
    constructor(config: { xhrSetup?: (xhr: { setRequestHeader: (k: string, v: string) => void }) => void }) {
      this.record = {
        destroyed: false,
        handlers: {},
        xhrSetup: config?.xhrSetup,
      }
      hls.instances.push(this.record)
    }
    on(event: string, fn: (...args: unknown[]) => void) {
      this.record.handlers[event] = fn
    }
    loadSource(src: string) {
      this.record.src = src
    }
    attachMedia(media: HTMLVideoElement) {
      this.record.media = media
    }
    startLoad() {}
    stopLoad() {}
    recoverMediaError() {}
    destroy() {
      this.record.destroyed = true
    }
  }
  return { default: FakeHls }
})

// media-chrome registers custom elements happy-dom does not need; the OSD is not under test.
vi.mock('./PlayerChrome', () => ({
  default: ({ topChrome, children }: { topChrome: ReactNode; children: ReactNode }) => (
    <div>
      {topChrome}
      {children}
    </div>
  ),
}))

const useUpdateCacheCalls = vi.hoisted(
  () =>
    [] as Array<{
      hash?: string
      options?: { enabled?: boolean; fast?: boolean }
    }>,
)
vi.mock('shared/cache/useUpdateCache', async importOriginal => {
  const actual = await importOriginal<typeof import('shared/cache/useUpdateCache')>()
  return {
    ...actual,
    useUpdateCache: (hash?: string, options?: { enabled?: boolean; fast?: boolean }) => {
      useUpdateCacheCalls.push({ hash, options })
      return actual.useUpdateCache(hash, options)
    },
  }
})

/** The video node attaching bumps an epoch, so the first hls.js instance may be replaced; only one stays live. */
const liveHls = () => hls.instances.filter(i => !i.destroyed)

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const PAGE = window.location.origin
const STREAM = `${PAGE}/stream/movie.mp4?link=${HASH}&index=1&play`
const MASTER = `${PAGE}/gst/${HASH}/master.m3u8?index=1&audio=0`

let net: NetworkMock | undefined

const install = () => {
  net = mockNetwork(req => {
    const path = pathOf(req.url)
    if (path.startsWith('/torrents'))
      return {
        hash: HASH,
        stat: 3,
        download_speed: 2048,
        active_peers: 3,
        total_peers: 9,
      }
    if (path.startsWith('/cache')) return { Hash: HASH, Filled: 10, Capacity: 100 }
    if (path.startsWith('/viewed')) return {}
    if (path.includes('/heartbeat')) return {}
    if (path.includes('/probe')) return { Tracks: [] }
    return {}
  })
  return net
}

const mount = (props: Partial<VideoPlayerProps> = {}) =>
  renderWithProviders(
    <ModalOpenProvider>
      <VideoPlayer videoSrc={STREAM} initiallyOpen showTrigger={false} title='movie.mp4' {...props} />
    </ModalOpenProvider>,
  )

const videoEl = async () => {
  await waitFor(() => expect(document.querySelector('video')).not.toBeNull())
  return document.querySelector('video') as HTMLVideoElement
}

beforeEach(() => {
  hls.instances.length = 0
  hls.supported = true
  useUpdateCacheCalls.length = 0
  sessionStorage.clear()
  localStorage.clear()
})

afterEach(() => {
  net?.restore()
  net = undefined
  vi.restoreAllMocks()
})

describe('VideoPlayer: in-page source', () => {
  it('plays the progressive stream on the page origin without credentials when none are stored', async () => {
    install()
    mount()
    const video = await videoEl()
    await waitFor(() => expect(video.getAttribute('src') || video.src).toBe(STREAM))
  })

  it('adds Basic userinfo to the <video> src when the hostname matches the page', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'ann', password: 'p@ss' }))
    install()
    mount({
      videoSrc: `${window.location.protocol}//${window.location.hostname}:8091/stream/movie.mp4?link=${HASH}&index=1&play`,
    })
    const video = await videoEl()
    await waitFor(() => expect(video.src).toContain('ann:p%40ss@'))
    // a different port on the same host still gets the credentials
    expect(new URL(video.src).port).toBe('8091')
  })

  it('never puts the password on another host', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'ann', password: 'secret' }))
    install()
    mount({
      videoSrc: 'http://tv.example.org:8090/stream/movie.mp4?link=x&index=1&play',
    })
    const video = await videoEl()
    await waitFor(() => expect(video.src).toContain('tv.example.org'))
    expect(video.src).not.toContain('secret')
    expect(video.src).not.toContain('@')
  })

  it('does not attach hls.js for a progressive source', async () => {
    install()
    mount()
    await videoEl()
    expect(hls.instances).toHaveLength(0)
  })

  it('clears the element src and pauses when unmounted', async () => {
    install()
    const view = mount()
    const video = await videoEl()
    await waitFor(() => expect(video.src).toBe(STREAM))
    const pause = vi.spyOn(video, 'pause')
    view.unmount()
    expect(pause).toHaveBeenCalled()
    expect(video.hasAttribute('src')).toBe(false)
  })

  it('reports an unsupported container once through onNotSupported', async () => {
    install()
    vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('')
    const onNotSupported = vi.fn()
    mount({
      videoSrc: `${PAGE}/stream/movie.mkv?link=x&index=1&play`,
      onNotSupported,
    })
    await waitFor(() => expect(onNotSupported).toHaveBeenCalled())
  })
})

describe('VideoPlayer: HLS source', () => {
  it('feeds the master playlist to hls.js with the stored Authorization header, and destroys it on unmount', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'ann', password: 'pw' }))
    install()
    const view = mount({
      videoSrc: MASTER,
      hls: true,
      hash: HASH,
      fileIndex: 1,
    })
    await waitFor(() => expect(liveHls()).toHaveLength(1))
    const instance = liveHls()[0]
    expect(instance.src).toBe(MASTER)
    expect(instance.media).toBe(await videoEl())

    const headers: Record<string, string> = {}
    instance.xhrSetup?.({ setRequestHeader: (k, v) => void (headers[k] = v) })
    expect(headers.Authorization).toBe(`Basic ${btoa('ann:pw')}`)

    // the <video> element itself is left without a progressive src
    expect((await videoEl()).hasAttribute('src')).toBe(false)
    view.unmount()
    expect(instance.destroyed).toBe(true)
    expect(liveHls()).toHaveLength(0)
  })

  it('reports not supported when neither hls.js nor native HLS is available', async () => {
    install()
    hls.supported = false
    vi.spyOn(HTMLMediaElement.prototype, 'canPlayType').mockReturnValue('')
    const onNotSupported = vi.fn()
    mount({ videoSrc: MASTER, hls: true, onNotSupported })
    await waitFor(() => expect(onNotSupported).toHaveBeenCalled())
  })

  it('shows the playback error with an open-link fallback to the direct stream on a fatal hls error', async () => {
    install()
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    mount({ videoSrc: MASTER, downloadSrc: STREAM, hls: true })
    await waitFor(() => expect(liveHls()).toHaveLength(1))
    liveHls()[0].handlers.error({}, { fatal: true, type: 'other' })
    await userEvent.click(await screen.findByRole('button', { name: 'Open link' }))
    expect(open).toHaveBeenCalledWith(STREAM, '_blank', 'noopener,noreferrer')
  })
})

describe('VideoPlayer: heartbeat and polling lifecycle', () => {
  it('pings the GST heartbeat every 30s with auth, and clears the timer when the player unmounts', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'ann', password: 'pw' }))
    const network = install()
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval')
    const heartbeat = `${PAGE}/gst/${HASH}/heartbeat`
    const view = mount({
      videoSrc: MASTER,
      hls: true,
      heartbeatSrc: heartbeat,
      hash: HASH,
      fileIndex: 1,
    })
    await videoEl()

    const call = setIntervalSpy.mock.calls.findIndex(([, ms]) => ms === 30_000)
    expect(call).toBeGreaterThanOrEqual(0)
    const id = setIntervalSpy.mock.results[call].value
    ;(setIntervalSpy.mock.calls[call][0] as () => void)()
    await waitFor(() => expect(network.requests.some(r => r.url === heartbeat)).toBe(true))
    const fetchInit = vi.mocked(fetch).mock.calls.find(([url]) => url === heartbeat)?.[1]
    expect(new Headers(fetchInit?.headers).get('Authorization')).toBe(`Basic ${btoa('ann:pw')}`)
    expect(fetchInit?.cache).toBe('no-store')

    view.unmount()
    expect(clearIntervalSpy).toHaveBeenCalledWith(id)
  })

  it('does not start a heartbeat for a progressive stream', async () => {
    install()
    const setIntervalSpy = vi.spyOn(window, 'setInterval')
    mount()
    await videoEl()
    expect(setIntervalSpy.mock.calls.some(([, ms]) => ms === 30_000)).toBe(false)
  })

  it('polls /cache at the idle cadence only while open, never the fast one', async () => {
    install()
    const view = mount({ hash: HASH, fileIndex: 1 })
    await videoEl()
    const open = useUpdateCacheCalls.filter(c => c.options?.enabled)
    expect(open.length).toBeGreaterThan(0)
    expect(open.every(c => c.options?.fast === false && c.hash === HASH)).toBe(true)

    const before = net!.requests.filter(r => pathOf(r.url) === '/cache').length
    view.unmount()
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(net!.requests.filter(r => pathOf(r.url) === '/cache').length).toBe(before)
  })

  it('shows the live stats from the details poll', async () => {
    install()
    mount({ hash: HASH, fileIndex: 1 })
    expect(await screen.findByText('3/9')).toBeTruthy()
  })
})

describe('VideoPlayer: timecode and closing', () => {
  it('saves the position to /viewed when the player is closed with tracking on', async () => {
    const network = install()
    const onClose = vi.fn()
    mount({ hash: HASH, fileIndex: 1, trackTimecode: true, onClose })
    const video = await videoEl()
    Object.defineProperty(video, 'currentTime', {
      value: 42,
      configurable: true,
    })
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(onClose).toHaveBeenCalled())
    const save = network.requests.find(r => r.method === 'POST' && pathOf(r.url) === '/viewed')
    expect(save?.body).toMatchObject({
      hash: HASH,
      file_index: 1,
      timecode: 42,
    })
  })

  it('does not write /viewed when timecode tracking is off', async () => {
    const network = install()
    mount({ hash: HASH, fileIndex: 1, trackTimecode: false })
    await videoEl()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(network.requests.some(r => pathOf(r.url) === '/viewed')).toBe(false)
  })

  it('resumes at the saved position once metadata is loaded', async () => {
    install()
    mount({
      hash: HASH,
      fileIndex: 1,
      trackTimecode: true,
      initialTimecode: 120,
    })
    const video = await videoEl()
    Object.defineProperty(video, 'duration', {
      value: 3600,
      configurable: true,
    })
    video.dispatchEvent(new Event('loadedmetadata'))
    await waitFor(() => expect(video.currentTime).toBe(120))
  })
})
