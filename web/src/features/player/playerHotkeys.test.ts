import { describe, expect, it, vi } from 'vitest'

import { applyPlayerHotkey, isPlayerHotkeyTarget, type PlayerHotkeyMedia } from './playerHotkeys'

function media(partial: Partial<PlayerHotkeyMedia> = {}): PlayerHotkeyMedia {
  return {
    paused: true,
    currentTime: 20,
    duration: 100,
    play: vi.fn(),
    pause: vi.fn(),
    ...partial,
  }
}

describe('applyPlayerHotkey', () => {
  it('toggles play and pause on Space', () => {
    const paused = media({ paused: true })
    expect(applyPlayerHotkey(paused, ' ')).toBe(true)
    expect(paused.play).toHaveBeenCalledOnce()

    const playing = media({ paused: false })
    expect(applyPlayerHotkey(playing, 'Spacebar')).toBe(true)
    expect(playing.pause).toHaveBeenCalledOnce()
  })

  it('seeks ±10s and clamps to the timeline', () => {
    const video = media({ currentTime: 20, duration: 100 })
    expect(applyPlayerHotkey(video, 'ArrowRight')).toBe(true)
    expect(video.currentTime).toBe(30)
    expect(applyPlayerHotkey(video, 'ArrowLeft')).toBe(true)
    expect(video.currentTime).toBe(20)

    video.currentTime = 3
    applyPlayerHotkey(video, 'ArrowLeft')
    expect(video.currentTime).toBe(0)

    video.currentTime = 95
    applyPlayerHotkey(video, 'ArrowRight')
    expect(video.currentTime).toBe(100)
  })

  it('ignores unrelated keys and editable targets', () => {
    const video = media()
    expect(applyPlayerHotkey(video, 'k')).toBe(false)
    expect(video.currentTime).toBe(20)
    expect(isPlayerHotkeyTarget(null)).toBe(true)
    expect(isPlayerHotkeyTarget({ tagName: 'INPUT' })).toBe(false)
    expect(isPlayerHotkeyTarget({ tagName: 'DIV', isContentEditable: true })).toBe(false)
    expect(isPlayerHotkeyTarget({ tagName: 'VIDEO' })).toBe(true)
  })
})
