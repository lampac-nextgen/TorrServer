import { Button, Modal } from '@heroui/react'
import { Trash2 } from 'lucide-react'
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
    <AppDialog open={open} onClose={onClose} size='sm'>
      <Modal.Header>
        <Modal.Heading>{t('DeleteTorrents?')}</Modal.Heading>
      </Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onPress={onClose} autoFocus>
          {t('Cancel')}
        </Button>
        <UnsafeButton variant='danger' onPress={() => void handleRemove()}>
          <Trash2 className='size-4' />
          {t('OK')}
        </UnsafeButton>
      </Modal.Footer>
    </AppDialog>
  )
}
