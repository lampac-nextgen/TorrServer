// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { installAppHeight } from './appHeight'

const root = document.documentElement
const prop = (n: string) => root.style.getPropertyValue(n)

function setViewport({ inner, client, visual }: { inner: number; client: number; visual?: number }) {
  Object.defineProperty(window, 'innerHeight', { value: inner, configurable: true })
  Object.defineProperty(root, 'clientHeight', { value: client, configurable: true })
  const vv =
    visual === undefined
      ? undefined
      : Object.assign(new EventTarget(), { height: visual, offsetTop: 12.4, offsetLeft: 3.2 })
  Object.defineProperty(window, 'visualViewport', { value: vv, configurable: true })
  return vv
}

function setStandalone(on: boolean) {
  window.matchMedia = ((q: string) => ({
    matches: on && q.includes('standalone'),
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  vi.useFakeTimers()
  root.removeAttribute('style')
  setStandalone(false)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('installAppHeight', () => {
  it('pins --app-height to the visual viewport and the viewport offset in a browser tab', () => {
    setViewport({ inner: 700, client: 844, visual: 690 })
    const stop = installAppHeight()
    expect(prop('--app-height')).toBe('690px')
    expect(prop('--app-vv-top')).toBe('12px')
    expect(prop('--app-vv-left')).toBe('3px')
    stop()
  })

  it('takes the largest metric when standalone and ignores the visual offset', () => {
    setStandalone(true)
    setViewport({ inner: 760, client: 800, visual: 700 })
    const stop = installAppHeight()
    expect(prop('--app-height')).toBe('800px')
    expect(prop('--app-vv-top')).toBe('0px')
    stop()
  })

  it('falls back to innerHeight without visualViewport', () => {
    setViewport({ inner: 650, client: 900 })
    const stop = installAppHeight()
    expect(prop('--app-height')).toBe('650px')
    stop()
  })

  it('remeasures on resize, orientationchange, visualViewport events and the cold-start timers', async () => {
    const vv = setViewport({ inner: 700, client: 700, visual: 700 })!
    const stop = installAppHeight()

    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
    vv.height = 600
    window.dispatchEvent(new Event('resize'))
    expect(prop('--app-height')).toBe('600px')

    vv.height = 580
    vv.dispatchEvent(new Event('scroll'))
    expect(prop('--app-height')).toBe('580px')

    vv.height = 570
    vv.dispatchEvent(new Event('resize'))
    expect(prop('--app-height')).toBe('570px')

    vv.height = 560
    window.dispatchEvent(new Event('orientationchange'))
    expect(prop('--app-height')).toBe('560px')

    vv.height = 540
    await vi.advanceTimersByTimeAsync(600)
    expect(prop('--app-height')).toBe('540px')
    stop()
  })

  it('stops listening after cleanup', async () => {
    const vv = setViewport({ inner: 700, client: 700, visual: 700 })!
    const stop = installAppHeight()
    stop()
    // Cold-start timers still fire once; let them pass before asserting on events.
    await vi.advanceTimersByTimeAsync(600)
    vv.height = 300
    window.dispatchEvent(new Event('resize'))
    vv.dispatchEvent(new Event('resize'))
    expect(prop('--app-height')).not.toBe('300px')
  })
})
