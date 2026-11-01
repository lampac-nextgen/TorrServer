// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const SCRIPT_ID = 'telegram-web-app-sdk'

type Mod = typeof import('./telegramWebApp')
let m: Mod
/** Scripts the module tried to inject; kept off the document so happy-dom never fetches them. */
let injected: HTMLScriptElement[]

beforeEach(async () => {
  vi.resetModules() // loadPromise is module state
  vi.useFakeTimers()
  // happy-dom would otherwise fetch the SDK and fire load/error on its own.
  ;(
    window as unknown as { happyDOM: { settings: { disableJavaScriptFileLoading: boolean } } }
  ).happyDOM.settings.disableJavaScriptFileLoading = true
  document.head.innerHTML = ''
  document.body.innerHTML = ''
  injected = []
  vi.spyOn(document.head, 'appendChild').mockImplementation(<T extends Node>(n: T): T => {
    injected.push(n as unknown as HTMLScriptElement)
    return n
  })
  document.documentElement.removeAttribute('style')
  delete window.Telegram
  window.history.replaceState(null, '', '/')
  m = await import('./telegramWebApp')
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.useRealTimers()
  delete window.Telegram
})

const installWebApp = (over: Partial<NonNullable<Window['Telegram']>['WebApp']> = {}) => {
  const wa = { initData: ' query_id=1 ', ready: vi.fn(), expand: vi.fn(), ...over }
  window.Telegram = { WebApp: wa as NonNullable<Window['Telegram']>['WebApp'] }
  return wa
}

describe('Telegram bridge accessors', () => {
  it('returns null / empty without the SDK', () => {
    expect(m.getTelegramWebApp()).toBeNull()
    expect(m.getTelegramInitData()).toBe('')
    expect(m.needsTelegramSdk()).toBe(false)
  })

  it('trims init data and requires the SDK once WebApp is injected', () => {
    installWebApp()
    expect(m.getTelegramInitData()).toBe('query_id=1')
    expect(m.needsTelegramSdk()).toBe(true)
  })

  it('needs the SDK for ?tg=1 even before it loads', () => {
    window.history.replaceState(null, '', '/?tg=1')
    expect(m.needsTelegramSdk()).toBe(true)
  })
})

describe('loadTelegramSdk', () => {
  it('resolves immediately when WebApp already exists', async () => {
    installWebApp()
    await expect(m.loadTelegramSdk()).resolves.toBeUndefined()
    expect(injected).toHaveLength(0)
  })

  it('injects one async script and resolves on load, sharing the promise', async () => {
    const p = m.loadTelegramSdk()
    expect(m.loadTelegramSdk()).toBe(p)
    const script = injected[0]
    expect(injected).toHaveLength(1)
    expect(script.id).toBe(SCRIPT_ID)
    expect(script.src).toBe('https://telegram.org/js/telegram-web-app.js')
    expect(script.async).toBe(true)
    script.onload?.(new Event('load'))
    await expect(p).resolves.toBeUndefined()
  })

  it('rejects and removes the script on error, allowing a retry', async () => {
    const p = m.loadTelegramSdk()
    injected[0].onerror?.(new Event('error'))
    await expect(p).rejects.toThrow(/failed to load/)
    // loadPromise was cleared, so a new attempt injects again.
    void m.loadTelegramSdk().catch(() => {})
    expect(injected).toHaveLength(2)
  })

  it('times out so a blocked telegram.org cannot hang the SPA', async () => {
    const p = m.loadTelegramSdk(1000)
    const assertion = expect(p).rejects.toThrow(/timeout/)
    await vi.advanceTimersByTimeAsync(1000)
    await assertion
  })

  it('attaches to an existing script tag instead of injecting a second one', async () => {
    const existing = document.createElement('script')
    existing.id = SCRIPT_ID
    document.body.appendChild(existing)
    const p = m.loadTelegramSdk()
    existing.dispatchEvent(new Event('load'))
    await expect(p).resolves.toBeUndefined()
    expect(injected).toHaveLength(0)
  })

  it('rejects when an existing script tag errors', async () => {
    const existing = document.createElement('script')
    existing.id = SCRIPT_ID
    document.body.appendChild(existing)
    const p = m.loadTelegramSdk()
    existing.dispatchEvent(new Event('error'))
    await expect(p).rejects.toThrow(/failed to load/)
  })
})

describe('bootstrapTelegramWebApp', () => {
  it('does nothing for normal browsing', async () => {
    await m.bootstrapTelegramWebApp()
    expect(injected).toHaveLength(0)
  })

  it('applies the Telegram theme to an injected WebApp', async () => {
    const setBackgroundColor = vi.fn()
    const setHeaderColor = vi.fn()
    const wa = installWebApp({ themeParams: { bg_color: '#112233' }, setBackgroundColor, setHeaderColor })
    await m.bootstrapTelegramWebApp()
    expect(wa.ready).toHaveBeenCalled()
    expect(wa.expand).toHaveBeenCalled()
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('#112233')
    expect(setBackgroundColor).toHaveBeenCalledWith('#112233')
    expect(setHeaderColor).toHaveBeenCalledWith('#112233')
  })

  it('skips the theme without bg_color and survives a throwing SDK', async () => {
    installWebApp()
    await m.bootstrapTelegramWebApp()
    expect(document.documentElement.style.getPropertyValue('--background')).toBe('')

    installWebApp({
      ready: () => {
        throw new Error('old client')
      },
    })
    await expect(m.bootstrapTelegramWebApp()).resolves.toBeUndefined()
  })

  it('swallows an SDK load failure on ?tg=1', async () => {
    window.history.replaceState(null, '', '/?tg=1')
    const p = m.bootstrapTelegramWebApp()
    injected[0].onerror?.(new Event('error'))
    await expect(p).resolves.toBeUndefined()
  })

  it('returns quietly when the SDK loads but WebApp never appears', async () => {
    window.history.replaceState(null, '', '/?tg=1')
    const p = m.bootstrapTelegramWebApp()
    injected[0].onload?.(new Event('load'))
    await expect(p).resolves.toBeUndefined()
  })
})
