/* eslint-disable react-hooks/rules-of-hooks -- useQuery is mocked; the hook only builds options */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const captured = vi.hoisted(() => ({ options: undefined as undefined | Record<string, unknown> }))
const fetchMock = vi.hoisted(() => vi.fn())

vi.mock('@tanstack/react-query', () => ({
  useQuery: (options: Record<string, unknown>) => {
    captured.options = options
    return { data: undefined }
  },
}))

describe('useExternalMediaBase query', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubGlobal('window', {
      location: { protocol: 'http:', hostname: 'ts.example', port: '8090', href: 'http://ts.example:8090/' },
    })
    vi.stubGlobal('sessionStorage', { getItem: () => null })
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockReset()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const queryFn = async () => {
    const { useExternalMediaBase } = await import('./mediaBase')
    useExternalMediaBase()
    return captured.options!.queryFn as () => Promise<string | null>
  }

  it('reads GET /mediabase and returns the base', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ base: 'http://ts.example:8091' })))
    expect(await (await queryFn())()).toBe('http://ts.example:8091')
    expect(String(fetchMock.mock.calls[0][0])).toBe('http://ts.example:8090/mediabase')
  })

  it('returns null for a non-2xx response or an empty base so callers keep the page origin', async () => {
    const fn = await queryFn()
    fetchMock.mockResolvedValueOnce(new Response('', { status: 401 }))
    expect(await fn()).toBeNull()
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({})))
    expect(await fn()).toBeNull()
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ base: '' })))
    expect(await fn()).toBeNull()
  })

  it('is short-lived: certificates and settings change without a restart', async () => {
    await queryFn()
    expect(captured.options).toMatchObject({ staleTime: 30_000, gcTime: 60_000, refetchOnWindowFocus: false })
  })
})
