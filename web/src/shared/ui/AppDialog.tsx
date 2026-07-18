import { styled } from '@mui/material/styles'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

/** Dialog that registers open state for bottom-nav / chrome coordination. */
export default function AppDialog({ open, children, ...rest }: DialogProps) {
  useSyncModalOpen(Boolean(open))
  return (
    <Dialog open={open} {...rest}>
      {children}
    </Dialog>
  )
}

export const StyledAppDialog = styled(AppDialog)({})
