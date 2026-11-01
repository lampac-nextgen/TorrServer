// Runs before every test file. Node-environment tests (the default) skip the DOM parts.
import { afterEach } from 'vitest'

if (typeof window !== 'undefined') {
  // happy-dom lacks a few browser APIs HeroUI, the player and the layout touch.
  if (!window.matchMedia) {
    window.matchMedia = (query: string) =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList
  }

  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  const w = window as unknown as { ResizeObserver?: unknown; IntersectionObserver?: unknown }
  if (!w.ResizeObserver) w.ResizeObserver = NoopObserver
  if (!w.IntersectionObserver) w.IntersectionObserver = NoopObserver

  window.scrollTo = (() => {}) as typeof window.scrollTo
  Element.prototype.scrollIntoView = () => {}

  // <video>/<audio>: happy-dom does not implement playback.
  HTMLMediaElement.prototype.play = () => Promise.resolve()
  HTMLMediaElement.prototype.pause = () => {}
  HTMLMediaElement.prototype.load = () => {}

  // Invalid markup or a broken react-aria trigger is a bug, not noise: fail the test that renders it.
  // React swallows errors thrown from console.error during render, so record and fail in afterEach.
  const markupBug =
    /cannot be a descendant of|cannot contain a nested|PressResponder was rendered without a pressable child/
  const originalError = console.error
  const markupBugs: string[] = []
  console.error = (...args: unknown[]) => {
    const text = args.map(String).join(' ')
    if (markupBug.test(text)) markupBugs.push(text.split('\n')[0])
    originalError(...args)
  }
  afterEach(() => {
    if (markupBugs.length === 0) return
    const found = [...new Set(markupBugs)]
    markupBugs.length = 0
    throw new Error(`Invalid markup warning(s): ${found.join(' | ')}`)
  })

  const { cleanup } = await import('@testing-library/react')
  afterEach(() => cleanup())
}
