import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import AppGlobalStyles from 'shared/theme/AppGlobalStyles'
import { appTheme } from 'shared/theme/appTheme'
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
    <MuiThemeProvider theme={appTheme} defaultMode='system' modeStorageKey='ts-color-scheme' forceThemeRerender>
      <ModalOpenProvider>
        <AppGlobalStyles />
        <CssBaseline />
        <AppSnackbarProvider>
          <Shell />
        </AppSnackbarProvider>
      </ModalOpenProvider>
    </MuiThemeProvider>
  )
}
