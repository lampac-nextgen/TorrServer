import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import type { AlertColor } from '@mui/material'

export interface ToastOptions {
  message: string
  severity?: AlertColor
  autoHideDuration?: number
}

interface AppSnackbarContextValue {
  showToast: (options: ToastOptions | string) => void
}

const AppSnackbarContext = createContext<AppSnackbarContextValue | null>(null)

export function useAppToast() {
  const ctx = useContext(AppSnackbarContext)
  if (!ctx) {
    throw new Error('useAppToast must be used within AppSnackbarProvider')
  }
  return ctx
}

export function useOptionalAppToast() {
  return useContext(AppSnackbarContext)
}

export function AppSnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('info')
  const [autoHideDuration, setAutoHideDuration] = useState(2500)

  const showToast = useCallback((options: ToastOptions | string) => {
    const next = typeof options === 'string' ? { message: options } : options
    setMessage(next.message)
    setSeverity(next.severity || 'info')
    setAutoHideDuration(next.autoHideDuration ?? 2500)
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <AppSnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} variant='filled' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AppSnackbarContext.Provider>
  )
}

/** @deprecated Use AppSnackbarProvider */
export const AppSnackbar = AppSnackbarProvider
