import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

interface ModalOpenContextValue {
  openCount: number
  pushOpen: () => void
  popOpen: () => void
  setImmersive: (value: boolean) => void
}

const ModalOpenContext = createContext<ModalOpenContextValue | null>(null)

/** Tracks open dialogs/drawers for bottom-nav pointer-events (MUI 9 Backdrop aria-hidden-safe). */
export function ModalOpenProvider({ children }: { children: ReactNode }) {
  const [openCount, setOpenCount] = useState(0)
  const [immersive, setImmersiveState] = useState(false)

  const pushOpen = useCallback(() => setOpenCount(c => c + 1), [])
  const popOpen = useCallback(() => setOpenCount(c => Math.max(0, c - 1)), [])
  const setImmersive = useCallback((value: boolean) => setImmersiveState(value), [])

  useEffect(() => {
    document.body.dataset.modalOpen = openCount > 0 ? 'true' : 'false'
  }, [openCount])

  useEffect(() => {
    document.body.dataset.immersive = immersive ? 'true' : 'false'
  }, [immersive])

  const value = useMemo(
    () => ({ openCount, pushOpen, popOpen, setImmersive }),
    [openCount, pushOpen, popOpen, setImmersive],
  )

  return <ModalOpenContext.Provider value={value}>{children}</ModalOpenContext.Provider>
}

export function useModalOpen() {
  const ctx = useContext(ModalOpenContext)
  if (!ctx) {
    throw new Error('useModalOpen must be used within ModalOpenProvider')
  }
  return ctx
}

/** Sync open state with a controlled Dialog/Drawer `open` prop. */
export function useSyncModalOpen(open: boolean) {
  const { pushOpen, popOpen } = useModalOpen()
  useEffect(() => {
    if (!open) return
    pushOpen()
    return () => popOpen()
  }, [open, pushOpen, popOpen])
}
