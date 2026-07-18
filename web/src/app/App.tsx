import { useEffect } from 'react'
import { useMediaQuery } from '@heroui/react'
import { Toaster } from 'sonner'

import { useSettingsQuery } from 'shared/hooks/useSettingsQuery'
import { queryMax } from 'shared/theme/breakpoints'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'

import Shell from './Shell'
import PwaUpdateToast from 'features/pwa/PwaUpdateToast'

/** Keep SETTINGS_QUERY_KEY warm so play/resume can read TrackTimecode without opening Settings. */
function SettingsQueryBootstrap() {
  useSettingsQuery()
  return null
}

/** One-time migration of the pre-rewrite `themeMode` localStorage key. */
function migrateLegacyThemeKey() {
  try {
    const legacy = localStorage.getItem('themeMode')
    if (legacy === 'auto') localStorage.setItem('ts-color-scheme', 'system')
    else if ((legacy === 'light' || legacy === 'dark') && !localStorage.getItem('ts-color-scheme')) {
      localStorage.setItem('ts-color-scheme', legacy)
    }
  } catch {
    /* localStorage unavailable (privacy mode, etc.) */
  }
}

export default function App() {
  // Shell only renders its fixed BottomNav below this breakpoint — toasts must clear it, not sit under it.
  const hasBottomNav = useMediaQuery(queryMax('mobile'))

  useEffect(() => {
    migrateLegacyThemeKey()
  }, [])

  return (
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <SettingsQueryBootstrap />
        <Shell />
        <PwaUpdateToast />
        <Toaster
          richColors
          closeButton
          position='bottom-center'
          offset={hasBottomNav ? 'calc(90px + env(safe-area-inset-bottom, 0px) + 12px)' : 24}
        />
      </AppSnackbarProvider>
    </ModalOpenProvider>
  )
}
