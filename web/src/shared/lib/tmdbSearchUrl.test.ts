import axios from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))

describe('TMDB search URL', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '127.0.0.1', port: '8090' } })
    vi.mocked(axios.get).mockReset()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const searchedUrl = async (apiUrl: string | undefined) => {
    vi.mocked(axios.get).mockImplementation((url: string) =>
      String(url).includes('/tmdb/settings')
        ? Promise.resolve({ data: { APIKey: 'k', APIURL: apiUrl } })
        : Promise.resolve({ data: { results: [] } }),
    )
    const { getMoviePosters } = await import('./torrentHelpers')
    await getMoviePosters('x', 'en')
    return vi.mocked(axios.get).mock.calls.find(c => !String(c[0]).includes('/tmdb/settings'))?.[0]
  }

  it.each([
    ['https://api.themoviedb.org', 'https://api.themoviedb.org/3/search/multi'],
    ['https://api.themoviedb.org/', 'https://api.themoviedb.org/3/search/multi'],
    ['https://api.themoviedb.org/3', 'https://api.themoviedb.org/3/search/multi'],
    ['https://api.themoviedb.org/3/', 'https://api.themoviedb.org/3/search/multi'],
    ['https://api.themoviedb.org/3/search/multi', 'https://api.themoviedb.org/3/search/multi'],
    ['https://api.themoviedb.org/search', 'https://api.themoviedb.org/3/search/multi'],
    ['api.themoviedb.org', 'https://api.themoviedb.org/3/search/multi'],
    ['//proxy.example/tmdb', 'https://proxy.example/tmdb/3/search/multi'],
    ['http://proxy.example:8080/3', 'http://proxy.example:8080/3/search/multi'],
    ['  https://api.themoviedb.org  ', 'https://api.themoviedb.org/3/search/multi'],
  ])('%s -> %s', async (configured, expected) => {
    expect(await searchedUrl(configured)).toBe(expected)
  })

  it('falls back to the default API when the setting is empty', async () => {
    expect(await searchedUrl('')).toBe('https://api.themoviedb.org/3/search/multi')
  })

  it('does not search without an API key', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: { APIKey: '', APIURL: '' } })
    const { getMoviePosters } = await import('./torrentHelpers')
    await expect(getMoviePosters('x', 'en')).resolves.toBeNull()
    expect(axios.get).toHaveBeenCalledTimes(1)
  })

  it('clearTMDBCache forces a settings reload', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: { APIKey: '' } })
    const { getMoviePosters, clearTMDBCache } = await import('./torrentHelpers')
    await getMoviePosters('x', 'en')
    await getMoviePosters('x', 'en')
    expect(axios.get).toHaveBeenCalledTimes(1)
    clearTMDBCache()
    await getMoviePosters('x', 'en')
    expect(axios.get).toHaveBeenCalledTimes(2)
  })
})
