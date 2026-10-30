/* eslint-disable react-hooks/rules-of-hooks -- hooks are called outside a render on purpose: useQuery is mocked to return its options */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { focusManager, QueryClient, QueryObserver, type QueryObserverOptions } from '@tanstack/react-query'

import type { TorrentStat } from 'shared/api/types'
import { GETTING_INFO, PRELOAD, WORKING } from 'shared/torrent/states'

vi.hoisted(() => {
  // shared/api/hosts reads window.location at import time.
  vi.stubGlobal('window', { location: { protocol: 'http:', hostname: '127.0.0.1', port: '8090' } })
})

const api = vi.hoisted(() => ({ getTorrents: vi.fn(), getTorrent: vi.fn() }))
const rq = vi.hoisted(() => ({ client: undefined as unknown }))

vi.mock('shared/api/torrents', async importOriginal => ({
  ...(await importOriginal<typeof import('shared/api/torrents')>()),
  getTorrents: api.getTorrents,
  getTorrent: api.getTorrent,
}))

// Outside a render, useQuery only needs to hand back the options the hook built.
vi.mock('@tanstack/react-query', async importOriginal => ({
  ...(await importOriginal<typeof import('@tanstack/react-query')>()),
  useQuery: (options: unknown) => options,
  useQueryClient: () => rq.client,
}))

import { TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { useTorrentDetail } from './useTorrentDetail'
import { useTorrentsQuery } from './useTorrentsQuery'

type Options = QueryObserverOptions<TorrentStat[], Error> & {
  refetchInterval: (query: { state: { data?: unknown } }) => number
}

const row = (hash: string, stat = WORKING): TorrentStat => ({ hash, stat })
const listOptions = (opts?: { enabled?: boolean }) => useTorrentsQuery(opts) as unknown as Options
const detailOptions = (hash?: string, initial?: TorrentStat) =>
  useTorrentDetail(hash, initial) as unknown as QueryObserverOptions<TorrentStat, Error> & {
    refetchInterval: (query: { state: { data?: TorrentStat } }) => number
  }

type QueryFn = (ctx: { signal: AbortSignal }) => Promise<unknown>
const runQueryFn = (options: { queryFn?: unknown }, signal: AbortSignal) => (options.queryFn as QueryFn)({ signal })

/** A request that stays open until its signal aborts, like axios does. */
const hangUntilAborted = (signal: AbortSignal) =>
  new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')))
  })

beforeEach(() => {
  api.getTorrents.mockReset()
  api.getTorrent.mockReset()
  rq.client = new QueryClient()
  vi.stubGlobal('document', { hidden: false })
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  focusManager.setFocused(undefined)
})

describe('useTorrentsQuery', () => {
  it('keys the list under TORRENTS_QUERY_KEY and honours enabled', () => {
    expect(listOptions().queryKey).toEqual(TORRENTS_QUERY_KEY)
    expect(listOptions().enabled).toBe(true)
    expect(listOptions({ enabled: false }).enabled).toBe(false)
  })

  it("passes React Query's signal (not the context object) to getTorrents", async () => {
    api.getTorrents.mockResolvedValue([])
    const ac = new AbortController()
    await runQueryFn(listOptions(), ac.signal)
    expect(api.getTorrents).toHaveBeenCalledTimes(1)
    expect(api.getTorrents.mock.calls[0][0]).toBe(ac.signal)
  })

  it('does not enable background polling', () => {
    expect(listOptions().refetchIntervalInBackground ?? false).toBe(false)
  })

  it('picks 500ms while metadata resolves, 1s when idle and 10s once the tab is hidden', () => {
    const interval = listOptions().refetchInterval
    expect(interval({ state: { data: [row('a', GETTING_INFO)] } })).toBe(500)
    expect(interval({ state: { data: [row('a')] } })).toBe(1000)
    vi.stubGlobal('document', { hidden: true })
    expect(interval({ state: { data: [row('a', GETTING_INFO)] } })).toBe(10_000)
  })

  it('aborts the in-flight request when the last observer unsubscribes', async () => {
    let seen: AbortSignal | undefined
    api.getTorrents.mockImplementation((signal: AbortSignal) => {
      seen = signal
      return hangUntilAborted(signal)
    })
    const client = rq.client as QueryClient
    const observer = new QueryObserver(client, listOptions() as never)
    const unsubscribe = observer.subscribe(() => {})
    await vi.waitFor(() => expect(seen).toBeDefined())
    expect(seen!.aborted).toBe(false)
    unsubscribe()
    expect(seen!.aborted).toBe(true)
  })

  it('does not fire the interval while the tab is hidden', async () => {
    vi.useFakeTimers()
    api.getTorrents.mockResolvedValue([row('a')])
    const client = rq.client as QueryClient
    const observer = new QueryObserver(client, listOptions() as never)
    const unsubscribe = observer.subscribe(() => {})
    await vi.advanceTimersByTimeAsync(0)
    expect(api.getTorrents).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(3000)
    const visibleCalls = api.getTorrents.mock.calls.length
    expect(visibleCalls).toBeGreaterThan(1)

    focusManager.setFocused(false)
    await vi.advanceTimersByTimeAsync(60_000)
    expect(api.getTorrents.mock.calls.length).toBe(visibleCalls)
    unsubscribe()
  })
})

describe('useTorrentDetail', () => {
  it('is disabled without a hash and keys on it', () => {
    expect(detailOptions(undefined).enabled).toBe(false)
    const opts = detailOptions('abc')
    expect(opts.enabled).toBe(true)
    expect(opts.queryKey).toEqual(['torrent', 'abc'])
  })

  it('seeds from the list row', () => {
    const initial = row('abc')
    expect(detailOptions('abc', initial).initialData).toBe(initial)
  })

  it("passes React Query's signal to getTorrent", async () => {
    api.getTorrent.mockResolvedValue(row('abc'))
    const ac = new AbortController()
    await runQueryFn(detailOptions('abc'), ac.signal)
    expect(api.getTorrent).toHaveBeenCalledWith('abc', ac.signal)
  })

  it('mirrors the row into the library cache only when the list is loaded', async () => {
    const client = rq.client as QueryClient
    const fresh = { ...row('ABC', GETTING_INFO), title: 'T' }
    api.getTorrent.mockResolvedValue(fresh)
    const opts = detailOptions('abc')
    const signal = new AbortController().signal

    await runQueryFn(opts, signal)
    expect(client.getQueryData(TORRENTS_QUERY_KEY)).toBeUndefined()

    client.setQueryData(TORRENTS_QUERY_KEY, [row('abc'), row('other')])
    await runQueryFn(opts, signal)
    const list = client.getQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY)!
    expect(list).toHaveLength(2)
    expect(list[0]).toMatchObject({ stat: GETTING_INFO, title: 'T' })
    expect(list[1].hash).toBe('other')
  })

  it('polls 500ms / 1s / 2s by state and 5s while hidden', () => {
    const interval = detailOptions('abc').refetchInterval
    expect(interval({ state: { data: row('a', GETTING_INFO) } })).toBe(500)
    expect(interval({ state: { data: row('a', PRELOAD) } })).toBe(1000)
    expect(interval({ state: { data: row('a') } })).toBe(2000)
    vi.stubGlobal('document', { hidden: true })
    expect(interval({ state: { data: row('a', GETTING_INFO) } })).toBe(5000)
  })

  it('aborts the in-flight detail request on unsubscribe', async () => {
    let seen: AbortSignal | undefined
    api.getTorrent.mockImplementation((_hash: string, signal: AbortSignal) => {
      seen = signal
      return hangUntilAborted(signal)
    })
    const observer = new QueryObserver(rq.client as QueryClient, detailOptions('abc') as never)
    const unsubscribe = observer.subscribe(() => {})
    await vi.waitFor(() => expect(seen).toBeDefined())
    unsubscribe()
    expect(seen!.aborted).toBe(true)
  })
})
