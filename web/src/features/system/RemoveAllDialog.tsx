import { Button, Modal } from '@heroui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { TORRENTS_QUERY_KEY, wipeTorrents } from 'shared/api/torrents'
import AppDialog from 'shared/ui/AppDialog'
import UnsafeButton from 'shared/ui/UnsafeButton'

export interface RemoveAllDialogProps {
  open: boolean
  onClose: () => void
}

/** Destructive confirm dialog that wipes every torrent from the database. */
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
        <Modal.Icon className='bg-danger/15 text-danger'>
          <Trash2 className='size-5' aria-hidden />
        </Modal.Icon>
        <Modal.Heading>{t('DeleteTorrents?')}</Modal.Heading>
        <Modal.CloseTrigger />
      </Modal.Header>
      <Modal.Footer>
        <Button variant='secondary' onPress={onClose} autoFocus>
          {t('Cancel')}
        </Button>
        <UnsafeButton variant='danger' onPress={() => void handleRemove()}>
          <Trash2 className='size-4' aria-hidden />
          {t('OK')}
        </UnsafeButton>
      </Modal.Footer>
    </AppDialog>
  )
}
