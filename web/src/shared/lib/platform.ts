export const detectStandaloneApp = (): boolean => {
  if (typeof window === 'undefined') return false

  const matchMedia = window.matchMedia?.bind(window)
  const isDisplayModeStandalone = (mode: string) => {
    try {
      return !!matchMedia && matchMedia(mode).matches
    } catch {
      return false
    }
  }

  const byDisplayMode =
    isDisplayModeStandalone('(display-mode: standalone)') ||
    isDisplayModeStandalone('screen and (display-mode: standalone)')

  return byDisplayMode || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

/** Install guide / launch / protocol only — not for layout or feature gating. */
export const isStandaloneApp = detectStandaloneApp()

export const detectApplePlatform = (): { isMac: boolean; isIOS: boolean } => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isMac: false, isIOS: false }
  }

  const userAgent = navigator.userAgent || ''
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform || ''

  const isMac = userAgent.includes('Macintosh') || (platform && platform.toLowerCase().includes('mac'))
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)

  return { isMac: Boolean(isMac), isIOS }
}

export const isAppleDevice = (): boolean => {
  const { isMac, isIOS } = detectApplePlatform()
  return isMac || isIOS
}

export const isMacOS = (): boolean => {
  const { isMac, isIOS } = detectApplePlatform()
  return isMac && !isIOS
}

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const userAgent = navigator.userAgent || ''
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isTabletWithTouch = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1

  return !isMobile && !isTabletWithTouch
}
