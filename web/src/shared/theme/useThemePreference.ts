import { useCallback, useEffect, useState } from 'react'

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'system',
} as const

export type ThemePreference = (typeof THEME_MODES)[keyof typeof THEME_MODES]

const STORAGE_KEY = 'ts-color-scheme'

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* ignore */
  }
  return THEME_MODES.AUTO
}

function resolveDark(preference: ThemePreference, systemDark: boolean): boolean {
  if (preference === 'dark') return true
  if (preference === 'light') return false
  return systemDark
}

function applyDarkClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

/** Applies `dark` class on html and persists preference in localStorage. */
export function useThemePreference(): [boolean, ThemePreference, (mode: ThemePreference) => void] {
  const [preference, setPreference] = useState<ThemePreference>(() => readStoredPreference())
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    setSystemDark(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const resolvedDark = resolveDark(preference, systemDark)

  useEffect(() => {
    applyDarkClass(resolvedDark)
    try {
      localStorage.setItem(STORAGE_KEY, preference)
    } catch {
      /* ignore */
    }
  }, [preference, resolvedDark])

  const updateThemeMode = useCallback((next: ThemePreference) => {
    setPreference(next)
  }, [])

  return [resolvedDark, preference, updateThemeMode]
}
