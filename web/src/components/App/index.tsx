import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { createContext, useEffect, type ReactNode } from 'react'
import { AppSnackbarProvider } from 'components/Feedback/AppSnackbar'
import { appTheme, useThemePreference } from 'style/materialUISetup'
import AppGlobalStyles from 'shared/theme/AppGlobalStyles'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'

import AppShell from './AppShell'

interface DarkModeContextValue {
  isDarkMode: boolean
}

export const DarkModeContext = createContext<DarkModeContextValue>({ isDarkMode: false })

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

function DarkModeBridge({ children }: { children: ReactNode }) {
  const [isDarkMode] = useThemePreference()
  return <DarkModeContext.Provider value={{ isDarkMode }}>{children}</DarkModeContext.Provider>
}

export default function App() {
  useEffect(() => {
    migrateLegacyThemeKey()
  }, [])

  return (
    <MuiThemeProvider theme={appTheme} defaultMode='system' modeStorageKey='ts-color-scheme' forceThemeRerender>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ModalOpenProvider>
          <AppGlobalStyles />
          <CssBaseline />
          <AppSnackbarProvider>
            <DarkModeBridge>
              <AppShell />
            </DarkModeBridge>
          </AppSnackbarProvider>
        </ModalOpenProvider>
      </LocalizationProvider>
    </MuiThemeProvider>
  )
}
