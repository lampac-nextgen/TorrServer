import { useEffect } from 'react'
import { Toaster } from 'sonner'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'

import Shell from './Shell'

/** Migrate legacy localStorage themeMode=auto → system once. */
function migrateLegacyThemeKey() {
  try {
    const legacy = localStorage.getItem('themeMode')
    if (legacy === 'auto') localStorage.setItem('ts-color-scheme', 'system')
    else if (legacy === 'light' || legacy === 'dark') {
      if (!localStorage.getItem('ts-color-scheme')) localStorage.setItem('ts-color-scheme', legacy)
    }
  } catch {
    /* ignore */
  }
}

migrateLegacyThemeKey()

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
