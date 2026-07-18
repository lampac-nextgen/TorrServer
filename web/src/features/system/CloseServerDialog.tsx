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

/** Destructive confirm dialog for shutting down the TorrServer process. */
export default function CloseServerDialog({ open, onClose }: CloseServerDialogProps) {
  const { t } = useTranslation()

  return (
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Icon className='bg-danger/15 text-danger'>
          <Power className='size-5' aria-hidden />
        </Modal.Icon>
        <Modal.Heading>{t('CloseServer?')}</Modal.Heading>
        <Modal.CloseTrigger />
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
          <Power className='size-4' aria-hidden />
          {t('TurnOff')}
        </UnsafeButton>
      </Modal.Footer>
    </AppDialog>
  )
}
