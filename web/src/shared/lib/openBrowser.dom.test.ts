// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const authFetch = vi.fn()
vi.mock('shared/api/authCredentials', () => ({ authFetch: (...a: unknown[]) => authFetch(...a) }))

import { bindPlaylistButton, bindPlaylistClick, openInBrowser, openPlaylistLink } from './openBrowser'

const URL_M3U = 'http://127.0.0.1:8090/stream/Show.m3u'

function asIosHomeScreenApp(on: boolean) {
  Object.defineProperty(window.navigator, 'userAgent', { value: on ? 'iPhone' : 'Linux', configurable: true })
  Object.defineProperty(window.navigator, 'platform', { value: on ? 'iPhone' : 'Linux', configurable: true })
  Object.defineProperty(window.navigator, 'standalone', { value: on, configurable: true })
}

function stubNavigator(over: Record<string, unknown>) {
  for (const [k, v] of Object.entries(over))
    Object.defineProperty(window.navigator, k, { value: v, configurable: true })
}

beforeEach(() => {
  authFetch.mockReset()
  asIosHomeScreenApp(false)
  stubNavigator({
    share: undefined,
    canShare: undefined,
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('openInBrowser', () => {
  it('clicks a temporary noopener _blank anchor and removes it', () => {
    let seen: { target: string; rel: string; href: string; attached: boolean } | null = null
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      seen = { target: this.target, rel: this.rel, href: this.href, attached: document.body.contains(this) }
    })
    openInBrowser(URL_M3U)
    expect(seen).toEqual({ target: '_blank', rel: 'noopener noreferrer', href: URL_M3U, attached: true })
    expect(document.querySelector('a[target=_blank]')).toBeNull() // removed after the click
  })
})

describe('openPlaylistLink', () => {
  it('opens in a new tab outside an iOS home-screen app', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    await expect(openPlaylistLink(URL_M3U)).resolves.toBe('opened')
    expect(click).toHaveBeenCalledOnce()
  })

  it('shares the fetched playlist as a file in an iOS home-screen app', async () => {
    asIosHomeScreenApp(true)
    const share = vi.fn().mockResolvedValue(undefined)
    stubNavigator({ share, canShare: () => true })
    authFetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['#EXTM3U']) })
    await expect(openPlaylistLink(URL_M3U)).resolves.toBe('shared')
    const file = share.mock.calls[0][0].files[0] as File
    expect(file.name).toBe('Show.m3u')
    expect(file.type).toBe('application/vnd.apple.mpegurl')
  })

  it('treats a cancelled share sheet as done', async () => {
    asIosHomeScreenApp(true)
    stubNavigator({ share: vi.fn().mockRejectedValue(new DOMException('cancel', 'AbortError')) })
    authFetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['x']) })
    await expect(openPlaylistLink(URL_M3U)).resolves.toBe('shared')
  })

  it.each([
    ['a failed fetch', () => authFetch.mockResolvedValue({ ok: false, status: 500 })],
    [
      'canShare refusing files',
      () => {
        authFetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['x']) })
        stubNavigator({ canShare: () => false })
      },
    ],
  ])('falls back to copying the link after %s', async (_n, arrange) => {
    asIosHomeScreenApp(true)
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubNavigator({ share: vi.fn(), clipboard: { writeText } })
    arrange()
    await expect(openPlaylistLink(URL_M3U)).resolves.toBe('copied')
    expect(writeText).toHaveBeenCalledWith(URL_M3U)
  })

  it('reports an error when sharing and copying both fail', async () => {
    asIosHomeScreenApp(true)
    stubNavigator({ clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } })
    Object.defineProperty(document, 'execCommand', { value: vi.fn().mockReturnValue(false), configurable: true })
    await expect(openPlaylistLink(URL_M3U)).resolves.toBe('error')
  })
})

describe('bindPlaylistClick / bindPlaylistButton', () => {
  it('lets the anchor navigate outside an iOS home-screen app', () => {
    const preventDefault = vi.fn()
    bindPlaylistClick(URL_M3U, () => {})({ preventDefault })
    expect(preventDefault).not.toHaveBeenCalled()
  })

  it('reports copied / error from the in-app delivery, but not a successful share', async () => {
    asIosHomeScreenApp(true)
    const onResult = vi.fn()
    bindPlaylistClick(URL_M3U, onResult)({ preventDefault: () => {} })
    await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith('copied'))

    const shared = vi.fn()
    stubNavigator({ share: vi.fn().mockRejectedValue(new DOMException('x', 'AbortError')) })
    authFetch.mockResolvedValue({ ok: true, blob: async () => new Blob(['x']) })
    bindPlaylistClick(URL_M3U, shared)({ preventDefault: () => {} })
    await new Promise(r => setTimeout(r, 20))
    expect(shared).not.toHaveBeenCalled()
  })

  it('reports an error when copyLink fails', async () => {
    stubNavigator({ clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) } })
    Object.defineProperty(document, 'execCommand', { value: vi.fn().mockReturnValue(false), configurable: true })
    const onResult = vi.fn()
    bindPlaylistButton('copyLink', URL_M3U, null, onResult)({ preventDefault: () => {} })
    await vi.waitFor(() => expect(onResult).toHaveBeenCalledWith('error'))
  })

  it('delegates a download button to the click handler', () => {
    asIosHomeScreenApp(true)
    const preventDefault = vi.fn()
    bindPlaylistButton('download', URL_M3U, null, () => {})({ preventDefault })
    expect(preventDefault).toHaveBeenCalledOnce()
  })
})
