// @vitest-environment happy-dom
import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import type { PlayableFile } from 'shared/api/types'
import { mockNetwork, type NetworkMock } from '@/test/network'
import { makeTestQueryClient } from '@/test/renderWithProviders'

import { useConfiguredPlayAction, type RunConfiguredPlayArgs } from './useConfiguredPlayAction'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'
const file: PlayableFile = { id: 4, path: 'Show/Ep #4 (final).mp4', length: 1 }

let net: NetworkMock | undefined
let base: string | undefined

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={makeTestQueryClient()}>{children}</QueryClientProvider>
)

const args = (over: Partial<RunConfiguredPlayArgs> = {}): RunConfiguredPlayArgs => ({
  hash: HASH,
  displayName: 'My Show',
  knownPlayableFiles: [file],
  handlePlay: vi.fn(),
  resolvePlayableFile: vi.fn(),
  copyText: vi.fn(),
  ...over,
})

/** Mount and wait until /mediabase has been read, so the callback closes over the base. */
const setup = async (action?: string) => {
  if (action) localStorage.setItem('posterPlayAction', JSON.stringify(action))
  const view = renderHook(() => useConfiguredPlayAction(), { wrapper })
  if (base) await waitFor(() => expect(net!.requests.some(r => r.url.endsWith('/mediabase'))).toBe(true))
  await new Promise(resolve => setTimeout(resolve, 30))
  return view
}

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  base = 'https://tv.lan:8443'
  net = mockNetwork(req => (req.url.endsWith('/mediabase') ? { base } : undefined))
})

afterEach(() => {
  net?.restore()
  net = undefined
  vi.restoreAllMocks()
})

describe('useConfiguredPlayAction', () => {
  it('defaults to the built-in player and calls handlePlay', async () => {
    const { result } = await setup()
    const a = args()
    result.current.runConfiguredPlay(a)
    expect(result.current.playAction).toBe('builtin')
    expect(a.handlePlay).toHaveBeenCalledTimes(1)
    expect(a.copyText).not.toHaveBeenCalled()
  })

  it('built-in with onBuiltinMultiFile hands several files to the Files tab instead of the launcher', async () => {
    const { result } = await setup()
    const onBuiltinMultiFile = vi.fn()
    const a = args({
      knownPlayableFiles: [file, { ...file, id: 5 }],
      onBuiltinMultiFile,
    })
    result.current.runConfiguredPlay(a)
    expect(onBuiltinMultiFile).toHaveBeenCalledTimes(1)
    expect(a.handlePlay).not.toHaveBeenCalled()

    const single = args({ onBuiltinMultiFile })
    result.current.runConfiguredPlay(single)
    expect(single.handlePlay).toHaveBeenCalledTimes(1)
  })

  it('copyLink for one file copies the stream url on the /mediabase origin, not the page origin', async () => {
    const { result } = await setup('copyLink')
    const a = args()
    result.current.runConfiguredPlay(a)
    expect(a.copyText).toHaveBeenCalledTimes(1)
    const url = new URL(vi.mocked(a.copyText).mock.calls[0][0])
    expect(url.origin).toBe('https://tv.lan:8443')
    expect(url.pathname).toBe('/stream/Ep%20%234%20%28final%29.mp4')
    expect(url.searchParams.get('link')).toBe(HASH)
    expect(url.searchParams.get('index')).toBe('4')
    expect(url.search).toMatch(/&play$/)
  })

  it('copyLink for several files copies the m3u playlist instead', async () => {
    const { result } = await setup('copyLink')
    const a = args({ knownPlayableFiles: [file, { ...file, id: 5 }] })
    result.current.runConfiguredPlay(a)
    const url = new URL(vi.mocked(a.copyText).mock.calls[0][0])
    expect(url.origin).toBe('https://tv.lan:8443')
    expect(url.pathname).toBe('/stream/My%20Show.m3u')
    expect(url.search).toContain('m3u')
    expect(url.search).toContain('fn=file.m3u')
  })

  it('copyLink falls back to the page origin when /mediabase is unavailable', async () => {
    base = undefined
    const { result } = await setup('copyLink')
    const a = args()
    result.current.runConfiguredPlay(a)
    expect(new URL(vi.mocked(a.copyText).mock.calls[0][0]).origin).toBe(window.location.origin)
  })

  it('adds Basic userinfo only when the media base hostname is the page hostname', async () => {
    sessionStorage.setItem('torrserver.basicAuth', JSON.stringify({ username: 'ann', password: 'pw' }))

    base = `${window.location.protocol}//${window.location.hostname}:8091`
    const same = await setup('copyLink')
    const a = args()
    same.result.current.runConfiguredPlay(a)
    const withCreds = new URL(vi.mocked(a.copyText).mock.calls[0][0])
    expect(withCreds.username).toBe('ann')
    expect(withCreds.port).toBe('8091')
    same.unmount()

    base = 'http://other.example:8090'
    net!.restore()
    net = mockNetwork(req => (req.url.endsWith('/mediabase') ? { base } : undefined))
    const other = await setup('copyLink')
    const b = args()
    other.result.current.runConfiguredPlay(b)
    const noCreds = new URL(vi.mocked(b.copyText).mock.calls[0][0])
    expect(noCreds.hostname).toBe('other.example')
    expect(noCreds.username).toBe('')
    expect(noCreds.password).toBe('')
  })

  it('an enabled external player resolves a file then opens its deep link with the external url', async () => {
    localStorage.setItem('isVlcUsed', 'true')
    const assign = vi.fn()
    const realLocation = window.location
    vi.stubGlobal('location', {
      get href() {
        return realLocation.href
      },
      set href(value: string) {
        assign(value)
      },
      hostname: realLocation.hostname,
      origin: realLocation.origin,
      protocol: realLocation.protocol,
      port: realLocation.port,
    })
    const { result } = await setup('vlc')
    expect(result.current.playAction).toBe('vlc')

    const resolvePlayableFile = vi.fn((onFile: (f: PlayableFile) => void) => onFile(file))
    result.current.runConfiguredPlay(args({ resolvePlayableFile }))
    expect(resolvePlayableFile).toHaveBeenCalledTimes(1)
    expect(assign).toHaveBeenCalledTimes(1)
    const href = String(assign.mock.calls[0][0])
    expect(href.startsWith('vlc://https://tv.lan:8443/stream/Ep%20%234%20%28final%29.mp4?')).toBe(true)
  })

  it('ignores a stored external player that is switched off in Settings', async () => {
    const { result } = await setup('vlc')
    expect(result.current.playAction).toBe('builtin')
  })
})
