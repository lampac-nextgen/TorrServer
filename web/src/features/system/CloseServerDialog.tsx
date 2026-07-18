import { Button, Modal } from '@heroui/react'
import { Power } from 'lucide-react'
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
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Heading>{t('CloseServer?')}</Modal.Heading>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onPress={onClose} autoFocus>
          {t('Cancel')}
        </Button>
        <UnsafeButton
          variant='danger'
          onPress={() => {
            void fetch(shutdownHost())
            onClose()
          }}
        >
          <Power className='size-4' />
          {t('TurnOff')}
        </UnsafeButton>
      </Modal.Footer>
    </AppDialog>
  )
}
