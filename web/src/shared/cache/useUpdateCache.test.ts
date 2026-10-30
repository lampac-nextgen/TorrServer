import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'

import type { TorrentCache } from 'shared/api/types'
import { renderHook } from 'shared/testing/reactShim'

vi.mock('react', () => import('shared/testing/reactShim'))

const getCache = vi.hoisted(() => vi.fn())
vi.mock('shared/api/cache', () => ({ getCache }))

import { clearSnakeSessions } from './snakeSession'
import { useUpdateCache } from './useUpdateCache'

interface Doc {
  hidden: boolean
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  listeners: Map<string, Set<() => void>>
  setHidden: (hidden: boolean) => void
}

const makeDocument = (): Doc => {
  const listeners = new Map<string, Set<() => void>>()
  const doc: Doc = {
    hidden: false,
    listeners,
    addEventListener: vi.fn((type: string, fn: () => void) => {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type)!.add(fn)
    }),
    removeEventListener: vi.fn((type: string, fn: () => void) => listeners.get(type)?.delete(fn)),
    setHidden(hidden) {
      doc.hidden = hidden
      listeners.get('visibilitychange')?.forEach(fn => fn())
    },
  }
  return doc
}

const snap = (filled: number, extra: Partial<TorrentCache> = {}): TorrentCache => ({
  Hash: 'h',
  Filled: filled,
  Capacity: 100,
  PiecesCount: 10,
  PiecesLength: 10,
  ...extra,
})

/** getCache stub that records the signal it was called with. */
const respondWith = (...snapshots: (TorrentCache | Error)[]) => {
  let i = 0
  getCache.mockImplementation(async () => {
    const next = snapshots[Math.min(i++, snapshots.length - 1)]
    if (next instanceof Error) throw next
    return next
  })
}

let doc: Doc

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(1_000_000)
  doc = makeDocument()
  vi.stubGlobal('document', doc)
  getCache.mockReset()
  clearSnakeSessions()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

const flush = () => vi.advanceTimersByTimeAsync(0)

describe('useUpdateCache', () => {
  it('fetches at once and hands getCache an AbortSignal', async () => {
    respondWith(snap(1))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    expect(getCache).toHaveBeenCalledTimes(1)
    expect(getCache.mock.calls[0][0]).toBe('h1')
    expect(getCache.mock.calls[0][1]).toBeInstanceOf(AbortSignal)
    h.rerender()
    expect(h.result.Filled).toBe(1)
    h.unmount()
  })

  it('schedules the next poll after the response, never while a request is in flight', async () => {
    let release!: (v: TorrentCache) => void
    getCache.mockImplementationOnce(() => new Promise<TorrentCache>(r => (release = r)))
    getCache.mockResolvedValue(snap(2))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    await vi.advanceTimersByTimeAsync(5000)
    expect(getCache).toHaveBeenCalledTimes(1)

    release(snap(1))
    await flush()
    expect(getCache).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(99)
    expect(getCache).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(getCache).toHaveBeenCalledTimes(2)
    h.unmount()
  })

  it('polls at 100ms while the snake changes, then settles at 1s after 2s of quiet', async () => {
    respondWith(snap(1), snap(2), snap(2))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush() // 1st response: change
    await vi.advanceTimersByTimeAsync(100) // 2nd: change
    await vi.advanceTimersByTimeAsync(100) // 3rd: unchanged, only just quiet
    expect(getCache).toHaveBeenCalledTimes(3)

    // unchanged polls stay at 100ms until 2s have passed since the last change
    await vi.advanceTimersByTimeAsync(1800)
    const before = getCache.mock.calls.length
    expect(before).toBeGreaterThan(10)

    await vi.advanceTimersByTimeAsync(300)
    const settled = getCache.mock.calls.length
    await vi.advanceTimersByTimeAsync(3000)
    // idle: ~1 request per second
    expect(getCache.mock.calls.length - settled).toBeLessThanOrEqual(3)
    expect(getCache.mock.calls.length - settled).toBeGreaterThanOrEqual(2)
    h.unmount()
  })

  it('stays at 100ms while a reader is active even when nothing changed', async () => {
    const active = snap(1, { Readers: [{ Reader: 1, Start: 0, End: 4, Active: true }] as never })
    respondWith(active)
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    await vi.advanceTimersByTimeAsync(5000)
    expect(getCache.mock.calls.length).toBeGreaterThan(40)
    h.unmount()
  })

  it('uses only the 1s cadence when fast is false', async () => {
    respondWith(snap(1), snap(2), snap(3))
    const h = renderHook(() => useUpdateCache('h1', { fast: false }))
    await flush()
    expect(getCache).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(999)
    expect(getCache).toHaveBeenCalledTimes(1)
    await vi.advanceTimersByTimeAsync(1)
    expect(getCache).toHaveBeenCalledTimes(2)
    h.unmount()
  })

  it('backs off to 1s and keeps the last good snapshot after an error', async () => {
    respondWith(snap(7), new Error('boom'), snap(8))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    await vi.advanceTimersByTimeAsync(100) // error
    expect(getCache).toHaveBeenCalledTimes(2)
    h.rerender()
    expect(h.result.Filled).toBe(7)
    await vi.advanceTimersByTimeAsync(999)
    expect(getCache).toHaveBeenCalledTimes(2)
    await vi.advanceTimersByTimeAsync(1)
    expect(getCache).toHaveBeenCalledTimes(3)
    h.rerender()
    expect(h.result.Filled).toBe(8)
    h.unmount()
  })

  it('aborts the request on unmount, ignores its late result and stops the chain', async () => {
    let signal!: AbortSignal
    let release!: (v: TorrentCache) => void
    getCache.mockImplementationOnce((_hash: string, s: AbortSignal) => {
      signal = s
      return new Promise<TorrentCache>(r => (release = r))
    })
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    expect(signal.aborted).toBe(false)

    h.unmount()
    expect(signal.aborted).toBe(true)
    expect(doc.listeners.get('visibilitychange')?.size ?? 0).toBe(0)
    expect(doc.removeEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function))

    release(snap(9))
    await vi.advanceTimersByTimeAsync(10_000)
    expect(getCache).toHaveBeenCalledTimes(1)
    h.rerender()
    expect(h.result.Filled).toBeUndefined()
  })

  it('treats an axios cancel as silent, not as a failed poll', async () => {
    getCache.mockRejectedValueOnce(new axios.CanceledError())
    getCache.mockResolvedValue(snap(1))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    // not failed: next poll at the active cadence, not the 1s error backoff
    await vi.advanceTimersByTimeAsync(100)
    expect(getCache).toHaveBeenCalledTimes(2)
    h.unmount()
  })

  it('does not request while hidden, resumes on visibilitychange, pauses again when hidden', async () => {
    doc.hidden = true
    respondWith(snap(1))
    const h = renderHook(() => useUpdateCache('h1'))
    await vi.advanceTimersByTimeAsync(10_000)
    expect(getCache).not.toHaveBeenCalled()

    doc.setHidden(false)
    await flush()
    expect(getCache).toHaveBeenCalledTimes(1)

    doc.setHidden(true)
    const calls = getCache.mock.calls.length
    await vi.advanceTimersByTimeAsync(10_000)
    expect(getCache.mock.calls.length).toBe(calls)
    h.unmount()
  })

  it('does not reschedule from a request that finished while the tab was hidden', async () => {
    let release!: (v: TorrentCache) => void
    getCache.mockImplementationOnce(() => new Promise<TorrentCache>(r => (release = r)))
    const h = renderHook(() => useUpdateCache('h1'))
    await flush()
    doc.setHidden(true)
    release(snap(1))
    await vi.advanceTimersByTimeAsync(10_000)
    expect(getCache).toHaveBeenCalledTimes(1)
    h.unmount()
  })

  it('does not poll without a hash or when disabled', async () => {
    respondWith(snap(1))
    const none = renderHook(() => useUpdateCache(undefined))
    const off = renderHook(() => useUpdateCache('h1', { enabled: false }))
    await vi.advanceTimersByTimeAsync(5000)
    expect(getCache).not.toHaveBeenCalled()
    none.unmount()
    off.unmount()
  })

  it('aborts the old hash and starts the new one when the hash changes', async () => {
    const signals: AbortSignal[] = []
    getCache.mockImplementation((_h: string, s: AbortSignal) => {
      signals.push(s)
      return new Promise<TorrentCache>(() => {})
    })
    let hash = 'a'
    const h = renderHook(() => useUpdateCache(hash))
    await flush()
    hash = 'b'
    h.rerender()
    await flush()
    expect(signals).toHaveLength(2)
    expect(signals[0].aborted).toBe(true)
    expect(signals[1].aborted).toBe(false)
    expect(getCache.mock.calls.map(c => c[0])).toEqual(['a', 'b'])
    h.unmount()
  })
})
