import type { ReactElement } from 'react'

import { ModalOpenProvider } from 'shared/ui/ModalOpenContext'
import { AppSnackbarProvider } from 'shared/ui/Toast'

import { renderWithProviders } from './renderWithProviders'

/** `renderWithProviders` plus the dialog and toast contexts `App` mounts around every dialog. */
export function renderWithApp(ui: ReactElement, options: Parameters<typeof renderWithProviders>[1] = {}) {
  return renderWithProviders(
    <ModalOpenProvider>
      <AppSnackbarProvider>{ui}</AppSnackbarProvider>
    </ModalOpenProvider>,
    options,
  )
}
