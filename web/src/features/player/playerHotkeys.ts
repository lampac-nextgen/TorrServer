const SEEK_STEP_SEC = 10

export interface PlayerHotkeyMedia {
  paused: boolean
  currentTime: number
  duration: number
  play: () => unknown
  pause: () => void
}

/** Skip hotkeys while the user is typing. Buttons and the video itself still receive them. */
export function isPlayerHotkeyTarget(target: unknown): boolean {
  if (!target || typeof target !== 'object') return true
  const el = target as { tagName?: string; isContentEditable?: boolean }
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return false
  return !el.isContentEditable
}

/**
 * Space toggles play; Left/Right seek ±10s. Returns false for unrelated keys.
 * Matches the upstream MUI player document-level shortcuts.
 */
export function applyPlayerHotkey(video: PlayerHotkeyMedia, key: string): boolean {
  if (key === ' ' || key === 'Spacebar') {
    if (video.paused) video.play()
    else video.pause()
    return true
  }
  const delta = key === 'ArrowRight' ? SEEK_STEP_SEC : key === 'ArrowLeft' ? -SEEK_STEP_SEC : 0
  if (!delta) return false
  const duration = Number.isFinite(video.duration) ? video.duration : Number.POSITIVE_INFINITY
  video.currentTime = Math.min(Math.max(0, video.currentTime + delta), duration)
  return true
}
