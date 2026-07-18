import { type ReactNode } from 'react'
import { useMediaQuery } from '@heroui/react'
import { Toaster } from 'sonner'

import { useSettingsQuery } from 'shared/hooks/useSettingsQuery'
import { queryMax } from 'shared/theme/breakpoints'
import { useThemePreference } from 'shared/theme/useThemePreference'
import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'
import AuthGate from 'features/auth/AuthGate'
import PwaUpdateToast from 'features/pwa/PwaUpdateToast'

import Shell from './Shell'
import { BOTTOM_NAV_TOAST_OFFSET } from './bottomNavLayout'

/** Keep SETTINGS_QUERY_KEY warm so play/resume can read TrackTimecode without opening Settings. */
function SettingsQueryBootstrap() {
  useSettingsQuery()
  return null
}

/** Apply `dark` / `data-palette` on `<html>` for the whole session (prefs live in localStorage). */
function ThemeBootstrap() {
  useThemePreference()
  return null
}

function AuthedApp({ children }: { children: ReactNode }) {
  return (
    <>
      <SettingsQueryBootstrap />
      {children}
    </>
  )
}

/**
 * Root providers: modal-open chrome, snackbars, auth gate, settings cache bootstrap, Shell.
 * Toaster offset clears the mobile BottomNav when present.
 */
export default function App() {
  const hasBottomNav = useMediaQuery(queryMax('mobile'))

  return (
    <ModalOpenProvider>
      <AppSnackbarProvider>
        <ThemeBootstrap />
        <AuthGate>
          <AuthedApp>
            <Shell />
          </AuthedApp>
        </AuthGate>
        <PwaUpdateToast />
        <Toaster richColors closeButton position='bottom-center' offset={hasBottomNav ? BOTTOM_NAV_TOAST_OFFSET : 24} />
      </AppSnackbarProvider>
    </ModalOpenProvider>
  )
}
