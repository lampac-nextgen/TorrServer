import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { clearCredentials, setCredentials, withAuthMediaUrl, authFetch } from './authCredentials'

const memory = new Map<string, string>()

const stubPage = (href: string) => {
  const u = new URL(href)
  vi.stubGlobal('window', {
    location: { href, protocol: u.protocol, hostname: u.hostname, port: u.port, pathname: u.pathname },
  })
}

describe('withAuthMediaUrl never sends credentials to another host', () => {
  beforeEach(() => {
    memory.clear()
    vi.stubGlobal('sessionStorage', {
      getItem: (k: string) => memory.get(k) ?? null,
      setItem: (k: string, v: string) => void memory.set(k, v),
      removeItem: (k: string) => void memory.delete(k),
    })
    stubPage('https://ts.example:8443/')
    setCredentials('alice', 'p@ss:w/rd#?')
  })
  afterEach(() => {
    clearCredentials()
    vi.unstubAllGlobals()
  })

  it.each([
    'http://ts.example.evil.test/stream?link=a&play',
    'http://evil.test/ts.example/stream',
    'http://ts.example@evil.test/stream',
    'http://evil.test:8090@evil.test/stream',
    'http://other.example/stream',
    'http://192.168.1.5:8090/stream',
    'data:text/plain,hi',
    'javascript:alert(1)',
  ])('leaves %s alone', url => {
    expect(withAuthMediaUrl(url)).toBe(url)
  })

  it('percent-encodes the userinfo so the password cannot change the host or path', () => {
    const out = withAuthMediaUrl('http://ts.example:8090/stream?link=a&play')
    const url = new URL(out)
    expect(url.hostname).toBe('ts.example')
    expect(url.port).toBe('8090')
    expect(url.pathname).toBe('/stream')
    expect(url.search).toBe('?link=a&play')
    expect(decodeURIComponent(url.username)).toBe('alice')
    expect(decodeURIComponent(url.password)).toBe('p@ss:w/rd#?')
  })

  it('resolves a relative URL against the page and keeps scheme and port differences', () => {
    expect(withAuthMediaUrl('/stream?link=a')).toMatch(/^https:\/\/alice:.*@ts\.example:8443\/stream\?link=a$/)
    expect(withAuthMediaUrl('http://ts.example:8090/x')).toMatch(/^http:\/\/alice:.*@ts\.example:8090\/x$/)
  })

  it('does not overwrite userinfo that is already in the URL', () => {
    expect(withAuthMediaUrl('http://bob:secret@ts.example:8090/x')).toBe('http://bob:secret@ts.example:8090/x')
  })

  it('returns the URL untouched without stored credentials', () => {
    clearCredentials()
    expect(withAuthMediaUrl('http://ts.example:8090/x')).toBe('http://ts.example:8090/x')
  })

  it('matches an IPv6 page host', () => {
    stubPage('http://[::1]:8090/')
    expect(withAuthMediaUrl('http://[::1]:8091/x')).toMatch(/^http:\/\/alice:.*@\[::1\]:8091\/x$/)
    expect(withAuthMediaUrl('http://[::2]:8091/x')).toBe('http://[::2]:8091/x')
  })
})

describe('authFetch', () => {
  const fetchMock = vi.fn(async () => new Response('ok'))
  beforeEach(() => {
    memory.clear()
    vi.stubGlobal('sessionStorage', {
      getItem: (k: string) => memory.get(k) ?? null,
      setItem: (k: string, v: string) => void memory.set(k, v),
      removeItem: (k: string) => void memory.delete(k),
    })
    stubPage('http://127.0.0.1:8090/')
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockClear()
  })
  afterEach(() => {
    clearCredentials()
    vi.unstubAllGlobals()
  })

  it('adds Basic from the session but keeps a caller-supplied Authorization', async () => {
    setCredentials('u', 'p')
    await authFetch('/echo')
    const sent = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
    expect(new Headers(sent.headers).get('Authorization')).toBe(`Basic ${btoa('u:p')}`)

    await authFetch('/echo', { headers: { Authorization: 'Bearer x' } })
    const sent2 = (fetchMock.mock.calls[1] as unknown as [string, RequestInit])[1]
    expect(new Headers(sent2.headers).get('Authorization')).toBe('Bearer x')
  })

  it('sends no Authorization without credentials', async () => {
    await authFetch('/echo')
    const sent = (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
    expect(new Headers(sent.headers).has('Authorization')).toBe(false)
  })
})
