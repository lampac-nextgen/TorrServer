import { Button, ButtonGroup, Modal, Separator, useOverlayState } from '@heroui/react'
import { EyeOff, ListVideo, Loader2, Magnet, Play, Trash2 } from 'lucide-react'
import { memo, useState } from 'react'
import ptt from 'parse-torrent-title'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { playlistTorrHost } from 'shared/api/hosts'
import { dropTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { clearViewedFiles } from 'shared/api/viewed'
import { useOptionalAppToast } from 'shared/ui/Toast'
import { usePlayLauncher } from 'features/player/usePlayLauncher'

export interface TorrentActionsProps {
  hash: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
  onDropped?: () => void
}

type PendingConfirm = 'drop' | 'clearViews' | null

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
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null)
  const confirmState = useOverlayState({
    isOpen: pendingConfirm != null,
    onOpenChange: open => {
      if (!open) setPendingConfirm(null)
    },
  })

  const isSingleFileTorrent = playableFileList?.length === 1
  const latestViewedFileId = viewedFileList?.[viewedFileList.length - 1]
  const latestViewedFilePath = playableFileList?.find(({ id }) => id === latestViewedFileId)?.path
  const latestViewedFileInfo = latestViewedFilePath ? ptt.parse(latestViewedFilePath) : null

  const displayName = name || title || 'file'
  const fullPlaylistLink = `${playlistTorrHost()}/${encodeURIComponent(displayName)}.m3u?link=${hash}&m3u`
  const fromLatestPlaylistLink = `${fullPlaylistLink}&fromlast`
  const magnetLink = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name || title || '')}`

  const { handlePlay, resolvingAudio, playerModals } = usePlayLauncher({
    hash,
    displayName,
    knownPlayableFiles: playableFileList || [],
  })

  const runPendingConfirm = () => {
    if (pendingConfirm === 'drop') {
      void dropTorrent(hash)
        .then(async () => {
          toast?.showToast({ message: t('DropTorrent'), severity: 'success' })
          await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
          onDropped?.()
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    } else if (pendingConfirm === 'clearViews') {
      void clearViewedFiles(hash)
        .then(() => {
          setViewedFileList(undefined)
          toast?.showToast({ message: t('RemoveViews'), severity: 'success' })
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    setPendingConfirm(null)
  }

  const copyMagnetLink = async () => {
    try {
      await navigator.clipboard.writeText(magnetLink)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const hasPartialProgress = !isSingleFileTorrent && !!viewedFileList?.length

  return (
    <div className='space-y-4'>
      <Button variant='primary' size='lg' className='w-full sm:w-auto' isDisabled={resolvingAudio} onPress={handlePlay}>
        {resolvingAudio ? (
          <Loader2 className='size-4 animate-spin' aria-hidden />
        ) : (
          <Play className='size-4' fill='currentColor' aria-hidden />
        )}
        {t('Play')}
      </Button>

      {hasPartialProgress ? (
        <div className='rounded-xl border border-border bg-surface-secondary p-4'>
          <p className='mb-1 flex items-center gap-2 text-sm font-semibold'>
            <ListVideo className='size-4 text-accent' aria-hidden />
            {t('DownloadPlaylist')}
          </p>
          <p className='mb-3 text-sm text-muted'>
            {t('LatestFilePlayed')}{' '}
            <strong className='text-foreground'>
              {latestViewedFileInfo?.title}
              {latestViewedFileInfo?.season ? (
                <>
                  {' '}
                  · {t('Season')} {latestViewedFileInfo.season} · {t('Episode')} {latestViewedFileInfo.episode}
                </>
              ) : null}
            </strong>
          </p>
          <ButtonGroup>
            <Button variant='primary' onPress={() => window.open(fullPlaylistLink, '_blank')}>
              {t('Full')}
            </Button>
            <Button variant='primary' onPress={() => window.open(fromLatestPlaylistLink, '_blank')}>
              {t('FromLatestFile')}
            </Button>
          </ButtonGroup>
        </div>
      ) : null}

      <div>
        <p className='mb-2 text-sm font-semibold text-muted'>{t('Info')}</p>
        <div className='flex flex-wrap gap-2'>
          {isSingleFileTorrent || !viewedFileList?.length ? (
            <Button variant='primary' onPress={() => window.open(fullPlaylistLink, '_blank')}>
              <ListVideo className='size-4' aria-hidden />
              {t('DownloadPlaylist')}
            </Button>
          ) : null}
          <Button variant='secondary' onPress={() => void copyMagnetLink()}>
            <Magnet className='size-4' aria-hidden />
            {t('CopyHash')}
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-2 text-sm font-semibold text-muted'>{t('TorrentState')}</p>
        <div className='flex flex-wrap gap-2'>
          <Button variant='secondary' onPress={() => setPendingConfirm('clearViews')}>
            <EyeOff className='size-4' aria-hidden />
            {t('RemoveViews')}
          </Button>
          <Button variant='danger' onPress={() => setPendingConfirm('drop')}>
            <Trash2 className='size-4' aria-hidden />
            {t('DropTorrent')}
          </Button>
        </div>
      </div>

      {playerModals}

      <Modal.Root state={confirmState}>
        <Modal.Backdrop>
          <Modal.Container size='sm'>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>{pendingConfirm === 'drop' ? t('DropTorrent') : t('RemoveViews')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>{pendingConfirm === 'drop' ? t('ConfirmDropTorrent') : t('ConfirmRemoveViews')}</Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onPress={() => setPendingConfirm(null)} autoFocus>
                  {t('Cancel')}
                </Button>
                <Button variant={pendingConfirm === 'drop' ? 'danger' : 'primary'} onPress={runPendingConfirm}>
                  {t('OK')}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>
    </div>
  )
}

export default memo(TorrentActions)
