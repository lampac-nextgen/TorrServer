import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))

type RemoteCb = (err: Error | null, parsed?: { name?: string; files?: { name?: string }[]; infoHash?: string }) => void
const remote = vi.fn<(source: unknown, cb: RemoteCb) => void>()
vi.mock('parse-torrent', () => ({ remote: (source: unknown, cb: RemoteCb) => remote(source, cb) }))

type Mod = typeof import('./torrentHelpers')
let m: Mod

beforeEach(async () => {
  vi.resetModules()
  vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '127.0.0.1', port: '8090' } })
  vi.mocked(axios.get).mockReset()
  remote.mockReset()
  m = await import('./torrentHelpers')
})

afterEach(() => vi.unstubAllGlobals())

describe('TMDB poster search', () => {
  const tmdb = (over: Record<string, unknown> = {}) =>
    vi.mocked(axios.get).mockImplementation(async (url: string) => {
      if (url.includes('/tmdb/settings')) return { data: { APIKey: 'k', ...over } }
      return { data: { results: [{ poster_path: '/a.jpg' }, { poster_path: '' }, { poster_path: '/b.jpg' }] } }
    })

  it('builds absolute w300 URLs and drops results without a poster', async () => {
    tmdb()
    expect(await m.getMoviePosters('Matrix')).toEqual([
      'https://image.tmdb.org/t/p/w300/a.jpg',
      'https://image.tmdb.org/t/p/w300/b.jpg',
    ])
  })

  it('uses the Russian image host for ru', async () => {
    tmdb({ ImageURLRu: 'img.example.test/' })
    const posters = await m.getMoviePosters('Матрица', 'ru')
    expect(posters?.[0]).toBe('https://img.example.test/t/p/w300/a.jpg')
  })

  it('returns null without an API key and when the search fails', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: { APIKey: '' } })
    expect(await m.getMoviePosters('x')).toBeNull()

    m.clearTMDBCache()
    vi.mocked(axios.get).mockImplementation(async (url: string) => {
      if (url.includes('/tmdb/settings')) return { data: { APIKey: 'k' } }
      throw new Error('boom')
    })
    expect(await m.getMoviePosters('x')).toBeNull()
  })

  it('falls back to default settings when the settings request fails, and caches', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('down'))
    expect(await m.getMoviePosters('x')).toBeNull()
    const calls = vi.mocked(axios.get).mock.calls.length
    expect(await m.getMoviePosters('x')).toBeNull()
    expect(vi.mocked(axios.get).mock.calls.length).toBe(calls) // cached defaults
  })
})

describe('checkImageURL', () => {
  it('rejects empty values and accepts image-looking URLs', async () => {
    expect(await m.checkImageURL('')).toBe(false)
    expect(await m.checkImageURL(null)).toBe(false)
    expect(await m.checkImageURL('https://x.test/p.jpg')).toBe(true)
  })
})

describe('shortenTitleForPosterSearch', () => {
  it('returns empty for blank or non-string input', () => {
    expect(m.shortenTitleForPosterSearch('')).toBe('')
    expect(m.shortenTitleForPosterSearch('   ')).toBe('')
    expect(m.shortenTitleForPosterSearch(undefined as unknown as string)).toBe('')
  })

  it('cuts at the first separator, caps words and length', () => {
    expect(m.shortenTitleForPosterSearch('The Matrix [1080p] / 1999')).toBe('The Matrix')
    expect(m.shortenTitleForPosterSearch('one two three four five six', { maxWords: 3 })).toBe('one two three')
    const long = m.shortenTitleForPosterSearch('alpha beta gamma delta', { maxLen: 12, maxWords: 10 })
    expect(long.length).toBeLessThanOrEqual(12)
    expect(long).toBe('alpha beta')
  })

  it('hard-cuts a single word longer than the limit', () => {
    expect(m.shortenTitleForPosterSearch('Supercalifragilistic', { maxLen: 5 })).toBe('Super')
  })
})

describe('parseTorrentTitle', () => {
  it('reports nulls on error or a nameless torrent', () => {
    const cb = vi.fn()
    remote.mockImplementation((_s, done) => done(new Error('bad')))
    m.parseTorrentTitle('x', cb)
    remote.mockImplementation((_s, done) => done(null, {}))
    m.parseTorrentTitle('x', cb)
    expect(cb).toHaveBeenNthCalledWith(1, { parsedTitle: null, originalName: null })
    expect(cb).toHaveBeenNthCalledWith(2, { parsedTitle: null, originalName: null })
  })

  it('prefers the shorter of torrent and first-file titles', () => {
    const cb = vi.fn()
    remote.mockImplementation((_s, done) =>
      done(null, { name: 'The.Matrix.1999.1080p.BluRay', files: [{ name: 'The.Matrix.Reloaded.2003.mkv' }] }),
    )
    m.parseTorrentTitle('x', cb)
    expect(cb.mock.calls[0][0]).toMatchObject({
      parsedTitle: 'The Matrix',
      originalName: 'The.Matrix.1999.1080p.BluRay',
    })

    remote.mockImplementation((_s, done) =>
      done(null, { name: 'Some.Long.Release.Name.2020', files: [{ name: 'Short.2020.mkv' }] }),
    )
    m.parseTorrentTitle('x', cb)
    expect(cb.mock.calls[1][0].parsedTitle).toBe('Short')
  })

  it('uses the torrent title alone when there are no files', () => {
    const cb = vi.fn()
    remote.mockImplementation((_s, done) => done(null, { name: 'Solo.Movie.2021' }))
    m.parseTorrentTitle('x', cb)
    expect(cb.mock.calls[0][0].parsedTitle).toBe('Solo Movie')
  })
})

describe('info hash parsing', () => {
  it('parseTorrentInfoHash resolves the hash or null', async () => {
    remote.mockImplementationOnce((_s, done) => done(null, { infoHash: 'abc' }))
    expect(await m.parseTorrentInfoHash(new File(['x'], 'a.torrent'))).toBe('abc')
    remote.mockImplementationOnce((_s, done) => done(new Error('bad')))
    expect(await m.parseTorrentInfoHash(new File(['x'], 'a.torrent'))).toBeNull()
    remote.mockImplementationOnce((_s, done) => done(null, {}))
    expect(await m.parseTorrentInfoHash(new File(['x'], 'a.torrent'))).toBeNull()
  })

  it('parseSourceInfoHash trims, lowercases and rejects blanks', async () => {
    expect(await m.parseSourceInfoHash('   ')).toBeNull()
    expect(remote).not.toHaveBeenCalled()
    remote.mockImplementationOnce((src, done) => {
      expect(src).toBe('magnet:?xt=urn:btih:ABC')
      done(null, { infoHash: 'ABC' })
    })
    expect(await m.parseSourceInfoHash('  magnet:?xt=urn:btih:ABC ')).toBe('abc')
    remote.mockImplementationOnce((_s, done) => done(new Error('bad')))
    expect(await m.parseSourceInfoHash('magnet:?xt=urn:btih:zz')).toBeNull()
  })
})
