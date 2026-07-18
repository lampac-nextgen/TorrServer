import { useCallback, useEffect, useState } from 'react'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'system',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]

/** Named accent/chrome palettes layered on top of light/dark. */
export const THEME_PALETTES = {
  FOREST: 'forest',
  OCEAN: 'ocean',
  SLATE: 'slate',
} as const

export type ThemePalette = (typeof THEME_PALETTES)[keyof typeof THEME_PALETTES]

export const THEME_PALETTE_IDS = Object.values(THEME_PALETTES) as ThemePalette[]

const STORAGE_KEY = 'ts-color-scheme'
const STORAGE_KEY_PALETTE = 'ts-color-palette'

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* ignore */
  }
  return THEME_MODES.AUTO
}

function readStoredPalette(): ThemePalette {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PALETTE)
    if (stored === 'forest' || stored === 'ocean' || stored === 'slate') return stored
  } catch {
    /* ignore */
  }
  return THEME_PALETTES.FOREST
}

function resolveDark(preference: ThemePreference, systemDark: boolean): boolean {
  if (preference === 'dark') return true
  if (preference === 'light') return false
  return systemDark
}

function applyThemeToDocument(isDark: boolean, palette: ThemePalette) {
  const root = document.documentElement
  root.classList.toggle('dark', isDark)
  root.dataset.palette = palette
}

export interface ThemePreferenceState {
  isDark: boolean
  preference: ThemePreference
  setPreference: (mode: ThemePreference) => void
  palette: ThemePalette
  setPalette: (palette: ThemePalette) => void
}

/**
 * Applies `dark` class + `data-palette` on html and persists both axes in localStorage.
 * Brightness: light / dark / system. Palette: forest / ocean / slate.
 */
export function useThemePreference(): ThemePreferenceState {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => readStoredPreference())
  const [palette, setPaletteState] = useState<ThemePalette>(() => readStoredPalette())
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isDark = resolveDark(preference, systemDark)

  useEffect(() => {
    applyThemeToDocument(isDark, palette)
    try {
      localStorage.setItem(STORAGE_KEY, preference)
      localStorage.setItem(STORAGE_KEY_PALETTE, palette)
    } catch {
      /* ignore */
    }
  }, [preference, isDark, palette])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
  }, [])

  const setPalette = useCallback((next: ThemePalette) => {
    setPaletteState(next)
  }, [])

  return { isDark, preference, setPreference, palette, setPalette }
}
