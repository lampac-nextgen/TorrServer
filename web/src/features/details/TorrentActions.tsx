import { Button, ButtonGroup, Description, Modal, Separator, useOverlayState } from '@heroui/react'
import { memo, useState } from 'react'
import ptt from 'parse-torrent-title'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { playlistTorrHost } from 'shared/api/hosts'
import { dropTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { clearViewedFiles } from 'shared/api/viewed'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface TorrentActionsProps {
  hash: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
  onDropped?: () => void
}

type ConfirmKind = 'drop' | 'views' | null

function TorrentActions({
  hash,
  viewedFileList,
  playableFileList,
  name,
  title,
  setViewedFileList,
  onDropped,
}: TorrentActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const [confirm, setConfirm] = useState<ConfirmKind>(null)
  const confirmState = useOverlayState({
    isOpen: confirm != null,
    onOpenChange: open => {
      if (!open) setConfirm(null)
    },
  })

  const latestViewedFileId = viewedFileList?.[viewedFileList.length - 1]
  const latestViewedFile = playableFileList?.find(({ id }) => id === latestViewedFileId)?.path
  const isOnlyOnePlayableFile = playableFileList?.length === 1
  const latestViewedFileData = latestViewedFile ? ptt.parse(latestViewedFile) : null
  const fullPlaylistLink = `${playlistTorrHost()}/${encodeURIComponent(name || title || 'file')}.m3u?link=${hash}&m3u`
  const partialPlaylistLink = `${fullPlaylistLink}&fromlast`
  const magnet = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name || title || '')}`

  const runConfirmed = () => {
    if (confirm === 'drop') {
      void dropTorrent(hash)
        .then(async () => {
          toast?.showToast({ message: t('DropTorrent'), severity: 'success' })
          await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
          onDropped?.()
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    if (confirm === 'views') {
      void clearViewedFiles(hash)
        .then(() => {
          setViewedFileList(undefined)
          toast?.showToast({ message: t('RemoveViews'), severity: 'success' })
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    setConfirm(null)
  }

  const copyMagnet = async () => {
    try {
      await navigator.clipboard.writeText(magnet)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  return (
    <>
      {!isOnlyOnePlayableFile && !!viewedFileList?.length ? (
        <div className='mb-4 space-y-2'>
          <p className='text-sm font-semibold'>{t('DownloadPlaylist')}</p>
          <Description className='text-sm'>
            {t('LatestFilePlayed')}{' '}
            <strong>
              {latestViewedFileData?.title}.
              {latestViewedFileData?.season ? (
                <>
                  {' '}
                  {t('Season')}: {latestViewedFileData.season}. {t('Episode')}: {latestViewedFileData.episode}.
                </>
              ) : null}
            </strong>
          </Description>
          <ButtonGroup>
            <Button variant='primary' onPress={() => window.open(fullPlaylistLink, '_blank')}>
              {t('Full')}
            </Button>
            <Button variant='primary' onPress={() => window.open(partialPlaylistLink, '_blank')}>
              {t('FromLatestFile')}
            </Button>
          </ButtonGroup>
        </div>
      ) : null}

      <p className='mb-2 text-sm font-semibold'>{t('Info')}</p>
      <div className='mb-4 flex flex-wrap gap-2'>
        {isOnlyOnePlayableFile || !viewedFileList?.length ? (
          <Button variant='primary' onPress={() => window.open(fullPlaylistLink, '_blank')}>
            {t('DownloadPlaylist')}
          </Button>
        ) : null}
        <Button variant='primary' onPress={() => void copyMagnet()}>
          {t('CopyHash')}
        </Button>
      </div>

      <Separator className='my-4' />

      <p className='mb-2 text-sm font-semibold'>{t('TorrentState')}</p>
      <div className='flex flex-wrap gap-2'>
        <Button variant='secondary' onPress={() => setConfirm('views')}>
          {t('RemoveViews')}
        </Button>
        <Button variant='danger' onPress={() => setConfirm('drop')}>
          {t('DropTorrent')}
        </Button>
      </div>

      <Modal.Root state={confirmState}>
        <Modal.Backdrop>
          <Modal.Container size='sm'>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>{confirm === 'drop' ? t('DropTorrent') : t('RemoveViews')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>{confirm === 'drop' ? t('ConfirmDropTorrent') : t('ConfirmRemoveViews')}</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onPress={() => setConfirm(null)} autoFocus>
                  {t('Cancel')}
                </Button>
                <Button variant={confirm === 'drop' ? 'danger' : 'primary'} onPress={runConfirmed}>
                  {t('OK')}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>
    </>
  )
}

export default memo(TorrentActions)
