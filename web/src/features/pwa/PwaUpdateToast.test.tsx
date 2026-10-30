// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

import 'shared/i18n'
import PwaUpdateToast from './PwaUpdateToast'

const registerSW = vi.hoisted(() => vi.fn())
vi.mock('virtual:pwa-register', () => ({ registerSW }))
const toast = vi.hoisted(() => ({ error: vi.fn() }))
vi.mock('sonner', () => ({ toast }))

type Options = {
  immediate?: boolean
  onRegisteredSW?: (url: string, reg?: unknown) => void
  onRegisterError?: (e: unknown) => void
}
const options = () => registerSW.mock.calls.at(-1)![0] as Options
const HOUR = 60 * 60 * 1000

beforeEach(() => {
  vi.useFakeTimers()
  registerSW.mockReset()
  toast.error.mockReset()
})
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('PwaUpdateToast', () => {
  it('registers the service worker immediately and renders nothing', () => {
    const { container } = render(<PwaUpdateToast />)
    expect(registerSW).toHaveBeenCalledTimes(1)
    expect(options().immediate).toBe(true)
    expect(container.innerHTML).toBe('')
  })

  it('toasts when registration fails', () => {
    render(<PwaUpdateToast />)
    options().onRegisterError?.(new Error('nope'))
    expect(toast.error).toHaveBeenCalledWith(
      'Could not update the offline cache. Hard-reload or clear site data if the UI looks stuck.',
      { duration: 8000 },
    )
  })

  it('does not toast a registration failure after unmount', () => {
    const { unmount } = render(<PwaUpdateToast />)
    const opts = options()
    unmount()
    opts.onRegisterError?.(new Error('late'))
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('re-checks sw.js hourly and asks the registration to update when it is reachable', async () => {
    const update = vi.fn().mockResolvedValue(undefined)
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
    render(<PwaUpdateToast />)
    options().onRegisteredSW?.('/sw.js', { installing: null, update })

    await vi.advanceTimersByTimeAsync(HOUR - 1)
    expect(fetchMock).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1)
    expect(fetchMock).toHaveBeenCalledWith('/sw.js', expect.objectContaining({ cache: 'no-store' }))
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('skips the check while offline or installing, and survives a failed fetch', async () => {
    const update = vi.fn()
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'))
    vi.stubGlobal('fetch', fetchMock)
    const online = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    render(<PwaUpdateToast />)
    options().onRegisteredSW?.('/sw.js', { installing: null, update })

    await vi.advanceTimersByTimeAsync(HOUR)
    expect(fetchMock).not.toHaveBeenCalled()

    online.mockReturnValue(true)
    await vi.advanceTimersByTimeAsync(HOUR)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(update).not.toHaveBeenCalled()
  })

  it('stops checking after unmount', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    const { unmount } = render(<PwaUpdateToast />)
    options().onRegisteredSW?.('/sw.js', { installing: null, update: vi.fn() })
    unmount()
    await vi.advanceTimersByTimeAsync(2 * HOUR)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
