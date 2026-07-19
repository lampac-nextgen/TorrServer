/** Minimal Telegram Mini App bridge — reuses the existing SPA inside Telegram. */

export interface TelegramThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

export interface TelegramWebApp {
  initData: string
  ready: () => void
  expand: () => void
  themeParams?: TelegramThemeParams
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  colorScheme?: 'light' | 'dark'
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}

export function getTelegramWebApp(): TelegramWebApp | null {
  if (typeof window === 'undefined') return null
  return window.Telegram?.WebApp ?? null
}

export function getTelegramInitData(): string {
  return getTelegramWebApp()?.initData?.trim() || ''
}

export function isTelegramMiniApp(): boolean {
  return Boolean(getTelegramInitData()) || new URLSearchParams(window.location.search).get('tg') === '1'
}

/** Call once at boot when opened from Telegram. */
export function bootstrapTelegramWebApp(): void {
  const wa = getTelegramWebApp()
  if (!wa) return
  try {
    wa.ready()
    wa.expand?.()
    const bg = wa.themeParams?.bg_color
    if (bg) {
      document.documentElement.style.setProperty('--background', bg)
      wa.setBackgroundColor?.(bg)
      wa.setHeaderColor?.(bg)
    }
  } catch {
    // Older clients / incomplete SDK — ignore
  }
}
