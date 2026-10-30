import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const MAGNET =
  'magnet:?xt=urn:btih:0123456789abcdef0123456789abcdef01234567&dn=My+Show+[1080p]&tr=udp://tracker.example:6969/announce&tr=http://t2.example/a?x=1#frag'

describe('stream URLs with a magnet link', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('VITE_SERVER_HOST', '')
    vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '192.168.1.5', port: '8090' } })
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('keeps a magnet in one `link` value so &dn, &tr, ? and # cannot split the query', async () => {
    const { streamPlayUrl, streamPreloadUrl } = await import('./streamLinks')
    for (const raw of [streamPlayUrl(MAGNET, { id: 2, path: 'Season 1/ep 1.mkv' }), streamPreloadUrl(MAGNET, 2)]) {
      const url = new URL(raw)
      expect(url.hash).toBe('')
      expect(url.searchParams.get('link')).toBe(MAGNET)
      expect(url.searchParams.get('index')).toBe('2')
      expect([...url.searchParams.keys()]).not.toContain('dn')
      expect([...url.searchParams.keys()]).not.toContain('tr')
    }
  })

  it('play: filename is one encoded path segment, only the last path part of the file is used, `play` is valueless', async () => {
    const { streamPlayUrl } = await import('./streamLinks')
    const raw = streamPlayUrl(MAGNET, { id: 2, path: 'Season 1\\Sub dir/ep 1 [x].mkv' })
    const url = new URL(raw)
    expect(url.pathname).toBe('/stream/ep%201%20%5Bx%5D.mkv')
    expect(url.searchParams.get('play')).toBe('')
    expect(raw.endsWith('&play')).toBe(true)
    expect(raw).not.toContain('play=')
  })

  it('preload: route without a filename, valueless `preload`, no `play`', async () => {
    const { streamPreloadUrl } = await import('./streamLinks')
    const raw = streamPreloadUrl(MAGNET, 5)
    const url = new URL(raw)
    expect(url.pathname).toBe('/stream')
    expect(raw.endsWith('&preload')).toBe(true)
    expect(url.searchParams.has('play')).toBe(false)
    expect(url.searchParams.get('index')).toBe('5')
  })

  it('playlist: displayName is one segment ending .m3u, flags m3u and fn=file.m3u', async () => {
    const { torrentPlaylistUrl } = await import('./streamLinks')
    const url = new URL(torrentPlaylistUrl(MAGNET, 'A/B?C#D.mkv'))
    expect(url.pathname).toBe('/stream/A%2FB%3FC%23D.mkv.m3u')
    expect(url.searchParams.get('link')).toBe(MAGNET)
    expect(url.searchParams.get('m3u')).toBe('')
    expect(url.searchParams.get('fn')).toBe('file.m3u')
  })

  it('a path-looking file name cannot escape the /stream prefix', async () => {
    const { streamPlayUrl } = await import('./streamLinks')
    const url = new URL(streamPlayUrl('abc', { id: 0, path: '../../settings' }))
    expect(url.pathname).toBe('/stream/settings')
  })
})
