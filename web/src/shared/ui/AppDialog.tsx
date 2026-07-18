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
  /** Extra classes applied to the dialog surface itself — use to widen a dialog past its `size` ceiling. */
  dialogClassName?: string
}

/** Modal wrapper that registers open state for bottom-nav / chrome coordination. */
export default function AppDialog({
  open,
  onClose,
  children,
  size = 'md',
  fullScreen = false,
  className,
  dialogClassName,
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
          <Modal.Dialog className={fullScreen ? undefined : dialogClassName}>{children}</Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}
