// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('stored retired palette', () => {
  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
  })

  it('resolves to its successor and migrates the stored choice', async () => {
    localStorage.setItem('ts-color-palette', 'mint')
    const { renderHook } = await import('@testing-library/react')
    const { useThemePreference } = await import('./useThemePreference')
    const { result } = renderHook(() => useThemePreference())
    expect(result.current.palette).toBe('forest')
    expect(localStorage.getItem('ts-color-palette')).toBe('forest')
  })

  it('keeps a valid palette and falls back to the default for unknown ids', async () => {
    localStorage.setItem('ts-color-palette', 'amber')
    let mod = await import('./useThemePreference')
    expect(
      (await import('@testing-library/react')).renderHook(() => mod.useThemePreference()).result.current.palette,
    ).toBe('amber')

    vi.resetModules()
    localStorage.setItem('ts-color-palette', 'nope')
    mod = await import('./useThemePreference')
    expect(
      (await import('@testing-library/react')).renderHook(() => mod.useThemePreference()).result.current.palette,
    ).toBe('nextgen')
  })
})
