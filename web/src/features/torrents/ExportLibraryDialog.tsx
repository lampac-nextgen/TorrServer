import { Button, Modal } from '@heroui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { torrsShareUrl } from 'shared/api/extras'
import { copyToClipboard } from 'shared/lib/clipboard'
import { useDialogFullScreen } from 'shared/hooks/useDialogFullScreen'
import AppDialog from 'shared/ui/AppDialog'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface ExportLibraryDialogProps {
  open: boolean
  onClose: () => void
  torrents: TorrentStat[]
}

/** One-shot export of the visible library as magnets, torrs:// lines, or JSON. */
export default function ExportLibraryDialog({ open, onClose, torrents }: ExportLibraryDialogProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const isFullScreen = useDialogFullScreen()

  const magnets = useMemo(
    () =>
      torrents
        .map(tr => `magnet:?xt=urn:btih:${tr.hash}&dn=${encodeURIComponent(tr.title || tr.name || tr.hash)}`)
        .join('\n'),
    [torrents],
  )

  const torrs = useMemo(() => torrents.map(tr => torrsShareUrl(tr)).join('\n'), [torrents])

  const json = useMemo(
    () =>
      JSON.stringify(
        torrents.map(tr => ({
          hash: tr.hash,
          title: tr.title,
          name: tr.name,
          category: tr.category,
          poster: tr.poster,
          torrs_hash: tr.torrs_hash,
          torrent_size: tr.torrent_size,
        })),
        null,
        2,
      ),
    [torrents],
  )

  const copy = async (text: string) => {
    try {
      await copyToClipboard(text)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  return (
    <AppDialog open={open} onClose={onClose} size='sm' fullScreen={isFullScreen}>
      <Modal.Header>
        <Modal.Heading>{t('ExportLibrary')}</Modal.Heading>
        <Modal.CloseTrigger aria-label={t('Close')} />
      </Modal.Header>
      <Modal.Body className='space-y-3'>
        <p className='text-sm text-muted'>{torrents.length}</p>
        <div className='flex flex-col gap-2'>
          <Button
            variant='secondary'
            className='min-h-11'
            onPress={() => void copy(magnets)}
            isDisabled={!torrents.length}
          >
            {t('ExportMagnets')}
          </Button>
          <Button
            variant='secondary'
            className='min-h-11'
            onPress={() => void copy(torrs)}
            isDisabled={!torrents.length}
          >
            {t('ExportTorrs')}
          </Button>
          <Button
            variant='secondary'
            className='min-h-11'
            onPress={() => void copy(json)}
            isDisabled={!torrents.length}
          >
            {t('ExportJson')}
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onPress={onClose}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </AppDialog>
  )
}
