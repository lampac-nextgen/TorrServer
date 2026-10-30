import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios', () => ({
  default: { get: vi.fn(), post: vi.fn(), isCancel: () => false, isAxiosError: () => false },
}))

const fetchMock = vi.fn()

beforeEach(() => {
  vi.resetModules()
  vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '127.0.0.1', port: '8090' } })
  vi.stubGlobal('sessionStorage', { getItem: () => null, setItem: () => {}, removeItem: () => {} })
  vi.stubGlobal('fetch', fetchMock)
  fetchMock.mockReset()
  vi.mocked(axios.get).mockReset()
  vi.mocked(axios.post).mockReset()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

const json = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' }, ...init })

const lastBody = () => JSON.parse((fetchMock.mock.calls.at(-1)?.[1] as RequestInit).body as string)

describe('settings api', () => {
  it('reset posts action def and nothing else', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: null })
    const { resetSettings } = await import('./settings')
    await resetSettings()
    expect(axios.post).toHaveBeenCalledWith(expect.stringMatching(/\/settings$/), { action: 'def' })
  })

  it('propagates a read-only 403 from reset and get', async () => {
    const err = { response: { status: 403, data: { error: 'Read-only mode' } } }
    vi.mocked(axios.post).mockRejectedValue(err)
    const { resetSettings, getSettings } = await import('./settings')
    await expect(resetSettings()).rejects.toBe(err)
    await expect(getSettings()).rejects.toBe(err)
  })

  it('sends CacheSize as whole bytes: 64 MB from the dialog is 67108864', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: null })
    const { setSettings } = await import('./settings')
    // SettingsDialog multiplies megabytes by 1024*1024 before calling setSettings.
    await setSettings({ CacheSize: 64 * 1024 * 1024 })
    const body = vi.mocked(axios.post).mock.calls[0][1] as { sets: { CacheSize: number } }
    expect(body.sets.CacheSize).toBe(67_108_864)
    // A fractional megabyte entry is rounded to an integer before it reaches Go.
    await setSettings({ CacheSize: 1.5 * 1024 * 1024 + 0.4 })
    const body2 = vi.mocked(axios.post).mock.calls[1][1] as { sets: { CacheSize: number } }
    expect(Number.isInteger(body2.sets.CacheSize)).toBe(true)
  })

  it('does not mutate the caller object', async () => {
    vi.mocked(axios.post).mockResolvedValue({ data: null })
    const { setSettings } = await import('./settings')
    const sets = { CacheSize: 10.7, ReaderReadAHead: 500 }
    await setSettings(sets)
    expect(sets).toEqual({ CacheSize: 10.7, ReaderReadAHead: 500 })
  })
})

describe('gst api', () => {
  it('rounds integer fields, replaces NaN with 0 and keeps the float GSTVersion', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }))
    const { setGstSettings } = await import('./gst')
    await setGstSettings({
      MaxTasks: 3.6,
      VideoBitrate: '1200.4',
      SegmentSeconds: Number.NaN,
      GSTVersion: 1.24,
      Keep: 'x',
    })
    expect(lastBody()).toEqual({
      action: 'set',
      config: { MaxTasks: 4, VideoBitrate: 1200, SegmentSeconds: 0, GSTVersion: 1.24, Keep: 'x' },
    })
  })

  it('drops a non-finite GSTVersion', async () => {
    fetchMock.mockResolvedValue(new Response('', { status: 200 }))
    const { setGstSettings } = await import('./gst')
    await setGstSettings({ GSTVersion: 'nope' })
    expect(lastBody().config).toEqual({})
  })

  it('throws on a failed save and reload-after-reset hits GET', async () => {
    const { setGstSettings, resetGstSettings, getGstSettings } = await import('./gst')
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }))
    await expect(setGstSettings({})).rejects.toThrow('Failed to save')

    fetchMock.mockResolvedValueOnce(new Response('', { status: 200 })).mockResolvedValueOnce(json({ built_in: true }))
    await expect(resetGstSettings()).resolves.toEqual({ built_in: true })
    expect(JSON.parse((fetchMock.mock.calls.at(-2)?.[1] as RequestInit).body as string)).toEqual({ action: 'def' })

    fetchMock.mockResolvedValueOnce(new Response('', { status: 404 }))
    await expect(getGstSettings()).rejects.toThrow('Failed to load')
  })

  it('passes the abort signal to fetch', async () => {
    fetchMock.mockResolvedValue(json({ built_in: false }))
    const { getGstSettings } = await import('./gst')
    const signal = new AbortController().signal
    await getGstSettings(signal)
    expect((fetchMock.mock.calls[0][1] as RequestInit).signal).toBe(signal)
  })
})

describe('storage api', () => {
  it('coerces garbage from the server onto the two known backends', async () => {
    const { getStorageSettings } = await import('./storage')
    vi.mocked(axios.get).mockResolvedValue({ data: { settings: 'sqlite', viewed: 7, viewedCount: '3' } })
    await expect(getStorageSettings()).resolves.toEqual({ settings: 'json', viewed: 'bbolt', viewedCount: undefined })
    vi.mocked(axios.get).mockResolvedValue({ data: { settings: 'bbolt', viewed: 'json', viewedCount: 3 } })
    await expect(getStorageSettings()).resolves.toEqual({ settings: 'bbolt', viewed: 'json', viewedCount: 3 })
  })

  it('posts only the two backend fields and surfaces server errors', async () => {
    const { setStorageSettings } = await import('./storage')
    vi.mocked(axios.post).mockResolvedValue({ data: { status: 'ok' } })
    await setStorageSettings({ settings: 'json', viewed: 'bbolt', viewedCount: 9 })
    expect(vi.mocked(axios.post).mock.calls[0][1]).toEqual({ settings: 'json', viewed: 'bbolt' })

    vi.mocked(axios.post).mockResolvedValue({ data: { error: 'read only' } })
    await expect(setStorageSettings({ settings: 'json', viewed: 'json' })).rejects.toThrow('read only')
    vi.mocked(axios.post).mockResolvedValue({ data: { status: 'locked' } })
    await expect(setStorageSettings({ settings: 'json', viewed: 'json' })).rejects.toThrow('locked')
  })
})

describe('waf api', () => {
  it('fills missing fields so the form never sees undefined', async () => {
    const { getWAF } = await import('./waf')
    vi.mocked(axios.get).mockResolvedValue({ data: { ip_enabled: true } })
    await expect(getWAF()).resolves.toMatchObject({
      whitelist: '',
      blacklist: '',
      referers: '',
      warnings: [],
      ip_enabled: true,
      read_only: false,
    })
  })

  it('posts all three lists, empty strings included', async () => {
    const { setWAF } = await import('./waf')
    vi.mocked(axios.post).mockResolvedValue({ data: { whitelist: '1.1.1.1' } })
    const out = await setWAF({ whitelist: '1.1.1.1', blacklist: '', referers: '' })
    expect(vi.mocked(axios.post).mock.calls[0][1]).toEqual({ whitelist: '1.1.1.1', blacklist: '', referers: '' })
    expect(out.whitelist).toBe('1.1.1.1')
    expect(out.warnings).toEqual([])
  })
})

describe('extras api', () => {
  it('maps the category chip onto the m3u query', async () => {
    const { playlistCategoryQuery } = await import('./extras')
    expect(playlistCategoryQuery('all')).toBeUndefined()
    expect(playlistCategoryQuery('')).toBe('uncategorized')
    expect(playlistCategoryQuery('movie')).toBe('movie')
  })

  it('encodes playlist filters with URLSearchParams', async () => {
    const { playlistAllUrl, filteredPlaylistAllUrl } = await import('./extras')
    expect(playlistAllUrl()).toBe('http://127.0.0.1:8090/playlistall/all.m3u')
    const url = new URL(playlistAllUrl({ category: 'tv&show', search: 'a b#c' }))
    expect(url.searchParams.get('category')).toBe('tv&show')
    expect(url.searchParams.get('search')).toBe('a b#c')
    expect(url.hash).toBe('')
    expect(filteredPlaylistAllUrl('all', '   ')).toBe('http://127.0.0.1:8090/playlistall/all.m3u')
    expect(new URL(filteredPlaylistAllUrl('', ' x ')).searchParams.toString()).toBe('category=uncategorized&search=x')
  })

  it('probes ffprobe with the abort signal', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: { streams: [] } })
    const { fetchFfp } = await import('./extras')
    const signal = new AbortController().signal
    await fetchFfp('ab/cd', 3, signal)
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8090/ffp/ab%2Fcd/3', { signal })
  })

  it('speed test fails on a non-2xx response and reports bytes otherwise', async () => {
    const { runSpeedTest } = await import('./extras')
    fetchMock.mockResolvedValueOnce(new Response('', { status: 503 }))
    await expect(runSpeedTest(5)).rejects.toThrow('503')
    fetchMock.mockResolvedValueOnce(new Response(new Uint8Array(1000)))
    const r = await runSpeedTest(1)
    expect(r.bytes).toBe(1000)
    expect(r.mbps).toBeGreaterThan(0)
    expect(String(fetchMock.mock.calls.at(-1)?.[0])).toBe('http://127.0.0.1:8090/download/1')
  })
})
