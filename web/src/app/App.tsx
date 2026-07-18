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

/**
 * Root providers: modal-open chrome, snackbars, settings cache bootstrap, Shell.
 * Toaster offset clears the mobile BottomNav when present.
 */
export default function App() {
  // Shell only renders its fixed BottomNav below this breakpoint — toasts must clear it, not sit under it.
  const hasBottomNav = useMediaQuery(queryMax('mobile'))

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
