import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { wipeTorrents, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import AppDialog from 'shared/ui/AppDialog'
import UnsafeButton from 'shared/ui/UnsafeButton'
import { useQueryClient } from '@tanstack/react-query'

export interface RemoveAllDialogProps {
  open: boolean
  onClose: () => void
}

export default function RemoveAllDialog({ open, onClose }: RemoveAllDialogProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const handleRemove = async () => {
    await wipeTorrents()
    await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
    onClose()
  }

  return (
    <AppDialog open={open} onClose={onClose}>
      <DialogTitle>{t('DeleteTorrents?')}</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color='secondary' autoFocus>
          {t('Cancel')}
        </Button>
        <UnsafeButton
          timeout={5}
          startIcon={<DeleteIcon />}
          variant='contained'
          color='secondary'
          onClick={() => void handleRemove()}
        >
          {t('OK')}
        </UnsafeButton>
      </DialogActions>
    </AppDialog>
  )
}
