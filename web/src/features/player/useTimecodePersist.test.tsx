// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'

import { listContinueWatching } from 'shared/lib/continueWatching'
import { mockNetwork, pathOf, type NetworkMock } from '@/test/network'

import { useTimecodePersist, type UseTimecodePersistOptions } from './useTimecodePersist'

const HASH = 'abcdef0123456789abcdef0123456789abcdef01'

let net: NetworkMock | undefined
let fail = false

const video = (currentTime: number, duration = 3600) => {
  const el = document.createElement('video')
  Object.defineProperty(el, 'currentTime', {
    value: currentTime,
    writable: true,
    configurable: true,
  })
  Object.defineProperty(el, 'duration', {
    value: duration,
    configurable: true,
  })
  return el
}

const setup = (over: Partial<UseTimecodePersistOptions> = {}, el = video(30)) => {
  const onViewedChange = vi.fn()
  const hook = renderHook(
    (props: Partial<UseTimecodePersistOptions>) =>
      useTimecodePersist({
        enabled: true,
        hash: HASH,
        fileIndex: 2,
        title: 'Episode',
        initialTimecode: 0,
        videoRef: { current: el },
        onViewedChange,
        ...props,
      }),
    { initialProps: over },
  )
  return { ...hook, el, onViewedChange }
}

const saves = () => net!.requests.filter(r => r.method === 'POST' && pathOf(r.url) === '/viewed')

beforeEach(() => {
  localStorage.clear()
  fail = false
  net = mockNetwork(() => (fail ? { status: 500 } : {}))
})

afterEach(() => {
  net?.restore()
  net = undefined
  vi.restoreAllMocks()
})

describe('useTimecodePersist: saving', () => {
  it('flushes the current position to /viewed and Continue Watching', async () => {
    const { result, onViewedChange } = setup()
    act(() => result.current.flushTimecode())
    await waitFor(() => expect(onViewedChange).toHaveBeenCalled())
    expect(saves()[0].body).toMatchObject({
      hash: HASH,
      file_index: 2,
      timecode: 30,
    })
    expect(listContinueWatching()).toEqual([expect.objectContaining({ hash: HASH, fileIndex: 2, timecode: 30 })])
  })

  it('writes nothing when tracking is disabled', async () => {
    const { result } = setup({ enabled: false })
    act(() => {
      result.current.flushTimecode()
      result.current.onTimeUpdate()
    })
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(saves()).toHaveLength(0)
  })

  it('throttles timeupdate saves to one per 5 seconds', async () => {
    const now = vi.spyOn(Date, 'now')
    now.mockReturnValue(100_000)
    const { result } = setup()
    act(() => result.current.onTimeUpdate())
    now.mockReturnValue(102_000)
    act(() => result.current.onTimeUpdate())
    now.mockReturnValue(105_500)
    act(() => result.current.onTimeUpdate())
    await waitFor(() => expect(saves()).toHaveLength(2))
  })

  it('keeps playing when the save fails: no callback, no throw', async () => {
    fail = true
    const { result, onViewedChange } = setup()
    act(() => result.current.flushTimecode())
    await waitFor(() => expect(saves()).toHaveLength(1))
    await new Promise(resolve => setTimeout(resolve, 20))
    expect(onViewedChange).not.toHaveBeenCalled()
  })
})

describe('useTimecodePersist: resume', () => {
  it('seeks to the saved position once, not on every metadata event', () => {
    const { result, el } = setup({ initialTimecode: 120 })
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(120)
    el.currentTime = 7
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(7)
  })

  it('does not seek for positions within the first 5 seconds', () => {
    const { result, el } = setup({ initialTimecode: 4 }, video(0))
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(0)
  })

  it('does not resume at the very end of the file', () => {
    const { result, el } = setup({ initialTimecode: 3598 }, video(0, 3600))
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(0)
  })

  it('resumes again for a different file', () => {
    const { result, rerender, el } = setup({ initialTimecode: 90 })
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(90)
    el.currentTime = 0
    rerender({ fileIndex: 3, initialTimecode: 200 })
    act(() => result.current.applyResumeIfNeeded())
    expect(el.currentTime).toBe(200)
  })
})
