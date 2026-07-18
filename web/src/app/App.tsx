import { useEffect } from 'react'
import { Toaster } from 'sonner'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'

import Shell from './Shell'

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
  useEffect(() => {
    migrateLegacyThemeKey()
  }, [])

  return (
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <Shell />
        <Toaster richColors closeButton position='bottom-center' />
      </AppSnackbarProvider>
    </ModalOpenProvider>
  )
}
