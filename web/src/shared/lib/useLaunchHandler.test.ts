// @vitest-environment happy-dom
import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useLaunchHandler from './useLaunchHandler'

const magnet = 'magnet:?xt=urn:btih:0123456789abcdef0123456789abcdef01234567'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
})

afterEach(() => {
  delete window.launchQueue
})

describe('useLaunchHandler', () => {
  it('has no launch source or files on a plain load', () => {
    const { result } = renderHook(() => useLaunchHandler())
    expect(result.current.launchSource).toBeNull()
    expect(result.current.launchFiles).toBeNull()
  })

  it('reads a protocol-handler source from the URL once and cleans the query', () => {
    window.history.replaceState(null, '', `/?magnet=${encodeURIComponent(magnet)}`)
    const { result } = renderHook(() => useLaunchHandler())
    expect(result.current.launchSource).toBe(magnet)
    expect(window.location.search).toBe('')
  })

  it('lets the caller clear the source', () => {
    window.history.replaceState(null, '', `/?magnet=${encodeURIComponent(magnet)}`)
    const { result } = renderHook(() => useLaunchHandler())
    act(() => result.current.setLaunchSource(null))
    expect(result.current.launchSource).toBeNull()
  })

  it('collects only .torrent files from the file-handler launch queue', async () => {
    let consumer!: (p: { files?: { getFile: () => Promise<File> }[] }) => Promise<void>
    window.launchQueue = { setConsumer: cb => (consumer = cb as typeof consumer) }
    const { result } = renderHook(() => useLaunchHandler())

    const torrent = new File(['x'], 'A.TORRENT')
    const other = new File(['x'], 'notes.txt')
    await act(() => consumer({ files: [{ getFile: async () => torrent }, { getFile: async () => other }] }))
    await waitFor(() => expect(result.current.launchFiles).toEqual([torrent]))
  })

  it('ignores an empty queue or one without torrent files', async () => {
    let consumer!: (p: { files?: { getFile: () => Promise<File> }[] }) => Promise<void>
    window.launchQueue = { setConsumer: cb => (consumer = cb as typeof consumer) }
    const { result } = renderHook(() => useLaunchHandler())

    await act(() => consumer({}))
    await act(() => consumer({ files: [] }))
    await act(() => consumer({ files: [{ getFile: async () => new File(['x'], 'a.txt') }] }))
    expect(result.current.launchFiles).toBeNull()
  })

  it('does not throw without the launchQueue API', () => {
    expect(() => renderHook(() => useLaunchHandler())).not.toThrow()
    vi.clearAllMocks()
  })
})
