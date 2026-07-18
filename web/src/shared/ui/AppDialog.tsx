import { Modal, useOverlayState } from '@heroui/react'
import { useEffect, type ReactNode } from 'react'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

export interface AppDialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'full'
  fullScreen?: boolean
  className?: string
}

/** Modal wrapper that registers open state for bottom-nav / chrome coordination. */
export default function AppDialog({
  open,
  onClose,
  children,
  size = 'md',
  fullScreen = false,
  className,
}: AppDialogProps) {
  useSyncModalOpen(open)

  const state = useOverlayState({
    isOpen: open,
    onOpenChange: next => {
      if (!next) onClose()
    },
  })

  useEffect(() => {
    if (open) state.setOpen(true)
  }, [open, state])

  return (
    <Modal.Root state={state}>
      <Modal.Backdrop>
        <Modal.Container size={fullScreen ? 'full' : size} scroll='inside' className={className}>
          <Modal.Dialog>{children}</Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}
