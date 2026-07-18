import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import PowerOffIcon from '@mui/icons-material/PowerOff'
import { useTranslation } from 'react-i18next'
import { shutdownHost } from 'shared/api/hosts'
import AppDialog from 'shared/ui/AppDialog'
import UnsafeButton from 'shared/ui/UnsafeButton'

export interface CloseServerDialogProps {
  open: boolean
  onClose: () => void
}

export default function CloseServerDialog({ open, onClose }: CloseServerDialogProps) {
  const { t } = useTranslation()

  return (
    <AppDialog open={open} onClose={onClose}>
      <DialogTitle>{t('CloseServer?')}</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color='secondary' autoFocus>
          {t('Cancel')}
        </Button>
        <UnsafeButton
          timeout={5}
          startIcon={<PowerOffIcon />}
          variant='contained'
          color='secondary'
          onClick={() => {
            void fetch(shutdownHost())
            onClose()
          }}
        >
          {t('TurnOff')}
        </UnsafeButton>
      </DialogActions>
    </AppDialog>
  )
}
