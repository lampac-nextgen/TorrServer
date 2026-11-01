// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { THEME_PALETTES, useThemePreference } from './useThemePreference'

describe('theme-color meta', () => {
  it('follows --app-header when the theme store applies a palette', async () => {
    document.documentElement.style.setProperty('--app-header', '#123456')
    const { renderHook, act } = await import('@testing-library/react')
    const { result } = renderHook(() => useThemePreference())
    act(() => result.current.setPalette(THEME_PALETTES.OCEAN))
    const metas = document.querySelectorAll('meta#ts-theme-color')
    expect(metas).toHaveLength(1)
    expect((metas[0] as HTMLMetaElement).content).toBe('#123456')
    act(() => result.current.setPalette(THEME_PALETTES.FOREST))
    expect(document.querySelectorAll('meta#ts-theme-color')).toHaveLength(1)
  })
})
