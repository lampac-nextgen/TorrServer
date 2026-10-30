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

  const { cleanup } = await import('@testing-library/react')
  afterEach(() => cleanup())
}
