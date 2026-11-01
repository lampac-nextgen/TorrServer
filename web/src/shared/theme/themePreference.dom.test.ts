// @vitest-environment happy-dom
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('brightness preference vs the OS scheme', () => {
  beforeEach(() => {
    vi.resetModules()
    localStorage.clear()
    document.documentElement.className = ''
    document.head.querySelectorAll('meta#ts-theme-color').forEach(el => el.remove())
    // OS prefers dark
    window.matchMedia = ((query: string) => ({
      matches: query.includes('dark'),
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
      onchange: null,
    })) as unknown as typeof window.matchMedia
  })

  it('follows the OS only in auto mode; explicit light/dark wins and is persisted', async () => {
    const { useThemePreference } = await import('./useThemePreference')
    const { result } = renderHook(() => useThemePreference())
    expect(result.current.preference).toBe('system')
    expect(result.current.isDark).toBe(true)

    act(() => result.current.setPreference('light'))
    expect(result.current.isDark).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('ts-color-scheme')).toBe('light')

    act(() => result.current.setPreference('dark'))
    expect(result.current.isDark).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('applies a stored explicit preference over the OS scheme on load', async () => {
    localStorage.setItem('ts-color-scheme', 'light')
    const { useThemePreference } = await import('./useThemePreference')
    const { result } = renderHook(() => useThemePreference())
    expect(result.current.isDark).toBe(false)
  })
})
