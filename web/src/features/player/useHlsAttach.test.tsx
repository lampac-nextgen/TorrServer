// @vitest-environment happy-dom
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const hls = vi.hoisted(() => {
  type Handler = (event: string, data: Record<string, unknown>) => void
  const state = {
    supported: true,
    instances: [] as FakePlayer[],
  }
  class FakePlayer {
    handlers = new Map<string, Handler>()
    subtitleTracks = [
      { name: 'English', lang: 'en' },
      { name: 'Русский', lang: 'ru' },
    ]
    subtitleTrack = 1
    config: { xhrSetup?: (x: { setRequestHeader: (k: string, v: string) => void }) => void }
    loadSource = vi.fn()
    attachMedia = vi.fn()
    destroy = vi.fn()
    startLoad = vi.fn()
    recoverMediaError = vi.fn()
    stopLoad = vi.fn()
    constructor(config: FakePlayer['config']) {
      this.config = config
      state.instances.push(this)
    }
    on(event: string, handler: Handler) {
      this.handlers.set(event, handler)
    }
    emit(event: string, data: Record<string, unknown> = {}) {
      this.handlers.get(event)?.(event, data)
    }
    static isSupported = () => state.supported
    static Events = {
      MANIFEST_PARSED: 'manifest',
      LEVEL_LOADED: 'level',
      SUBTITLE_TRACKS_UPDATED: 'subs',
      SUBTITLE_TRACK_SWITCH: 'switch',
      ERROR: 'error',
    }
    static ErrorTypes = { NETWORK_ERROR: 'net', MEDIA_ERROR: 'media' }
  }
  return { state, FakePlayer }
})

vi.mock('hls.js', () => ({ default: hls.FakePlayer }))
vi.mock('shared/api/authCredentials', () => ({
  getAuthorizationHeader: () => 'Basic abc',
  withAuthMediaUrl: (u: string) => `auth:${u}`,
}))

import { useHlsAttach } from './useHlsAttach'

const player = () => hls.state.instances[hls.state.instances.length - 1]

function video(native = false) {
  const v = document.createElement('video')
  v.canPlayType = (type: string) => (native && type === 'application/vnd.apple.mpegurl' ? 'maybe' : '')
  v.play = vi.fn().mockResolvedValue(undefined)
  v.pause = vi.fn()
  v.load = vi.fn()
  return v
}

function mount(overrides: Partial<Parameters<typeof useHlsAttach>[0]> = {}, v = video()) {
  const cb = {
    onLoading: vi.fn(),
    onError: vi.fn(),
    onNotSupported: vi.fn(),
    onSubtitleTracks: vi.fn(),
    onSubtitleTrack: vi.fn(),
    onDuration: vi.fn(),
  }
  const utils = renderHook(
    props =>
      useHlsAttach({
        enabled: true,
        open: true,
        videoRef: { current: v },
        videoEpoch: 0,
        src: '/stream/x.m3u8',
        playbackRate: 1.5,
        ...cb,
        ...props,
      }),
    { initialProps: overrides },
  )
  return { ...utils, cb, v }
}

beforeEach(() => {
  hls.state.supported = true
  hls.state.instances.length = 0
})

describe('useHlsAttach', () => {
  it.each([
    ['disabled', { enabled: false }],
    ['closed', { open: false }],
    ['without a source', { src: '' }],
  ])('does nothing when %s', (_n, over) => {
    mount(over)
    expect(hls.state.instances).toHaveLength(0)
  })

  it('creates an hls.js player, loads the source and sends Basic auth on XHRs', () => {
    const { cb, v } = mount()
    const p = player()
    expect(p.loadSource).toHaveBeenCalledWith('/stream/x.m3u8')
    expect(p.attachMedia).toHaveBeenCalledWith(v)
    expect(cb.onLoading).toHaveBeenCalledWith(true)
    const setRequestHeader = vi.fn()
    p.config.xhrSetup?.({ setRequestHeader })
    expect(setRequestHeader).toHaveBeenCalledWith('Authorization', 'Basic abc')
  })

  it('on manifest: reports subtitle tracks, applies the playback rate and starts playback', () => {
    const { cb, v } = mount()
    player().emit('manifest')
    expect(cb.onSubtitleTracks).toHaveBeenLastCalledWith([
      { id: 0, name: 'English', lang: 'en' },
      { id: 1, name: 'Русский', lang: 'ru' },
    ])
    expect(cb.onSubtitleTrack).toHaveBeenCalledWith(1)
    expect(v.playbackRate).toBe(1.5)
    expect(v.play).toHaveBeenCalled()
  })

  it('reports duration only when the level has a numeric total', () => {
    const { cb } = mount()
    player().emit('level', { details: { totalduration: 123.4 } })
    player().emit('level', { details: {} })
    player().emit('level', {})
    expect(cb.onDuration).toHaveBeenCalledTimes(1)
    expect(cb.onDuration).toHaveBeenCalledWith(123.4)
  })

  it('keeps subtitle state in sync with track updates and switches', () => {
    const { cb } = mount()
    player().emit('subs')
    expect(cb.onSubtitleTracks).toHaveBeenLastCalledWith(expect.arrayContaining([expect.objectContaining({ id: 0 })]))
    player().emit('switch', { id: 0 })
    expect(cb.onSubtitleTrack).toHaveBeenCalledWith(0)
  })

  it('recovers from fatal network and media errors, and fails on anything else', () => {
    const { cb } = mount()
    const p = player()
    p.emit('error', { fatal: false, type: 'net' })
    expect(p.startLoad).not.toHaveBeenCalled()
    p.emit('error', { fatal: true, type: 'net' })
    expect(p.startLoad).toHaveBeenCalledOnce()
    p.emit('error', { fatal: true, type: 'media' })
    expect(p.recoverMediaError).toHaveBeenCalledOnce()
    expect(cb.onError).not.toHaveBeenCalled()
    p.emit('error', { fatal: true, type: 'other' })
    expect(p.stopLoad).toHaveBeenCalledOnce()
    expect(cb.onLoading).toHaveBeenLastCalledWith(false)
    expect(cb.onError).toHaveBeenCalledOnce()
  })

  it('destroys the player and clears subtitle state on unmount', () => {
    const { unmount, cb, result } = mount()
    const p = player()
    unmount()
    expect(p.destroy).toHaveBeenCalledOnce()
    expect(cb.onSubtitleTracks).toHaveBeenLastCalledWith([])
    expect(cb.onSubtitleTrack).toHaveBeenLastCalledWith(-1)
    expect(result.current.current).toBeNull()
  })

  it('rebuilds the player when the source changes', () => {
    const { rerender } = mount()
    const first = player()
    rerender({ src: '/stream/y.m3u8' })
    expect(first.destroy).toHaveBeenCalled()
    expect(hls.state.instances).toHaveLength(2)
    expect(player().loadSource).toHaveBeenCalledWith('/stream/y.m3u8')
  })

  it('uses native HLS (Safari) when hls.js is unsupported, and releases the element after', () => {
    hls.state.supported = false
    const { v, unmount } = mount({}, video(true))
    expect(hls.state.instances).toHaveLength(0)
    expect(v.src).toContain('auth:/stream/x.m3u8')
    expect(v.load).toHaveBeenCalled()
    expect(v.playbackRate).toBe(1.5)
    expect(v.play).toHaveBeenCalled()
    unmount()
    expect(v.pause).toHaveBeenCalled()
    expect(v.getAttribute('src')).toBeNull()
  })

  it('reports an unsupported browser when neither hls.js nor native HLS works', () => {
    hls.state.supported = false
    const { cb } = mount()
    expect(cb.onNotSupported).toHaveBeenCalledOnce()
  })
})
