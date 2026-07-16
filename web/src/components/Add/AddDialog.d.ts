import type { FC } from 'react'

export interface AddDialogProps {
  handleClose: () => void
  hash?: string | null
  title?: string
  name?: string
  poster?: string
  category?: string
}

declare const AddDialog: FC<AddDialogProps>
export default AddDialog
