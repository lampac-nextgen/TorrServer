import { useMemo, memo, useState, type ReactNode } from 'react'
import { Button, ButtonGroup, Modal, Separator, Spinner, useOverlayState } from '@heroui/react'
import { EyeOff, ExternalLink, Hash, ListVideo, Magnet, Play, Settings, Trash2, Copy } from 'lucide-react'
import ptt from 'parse-torrent-title'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { playlistTorrHost, streamHost } from 'shared/api/hosts'
import { dropTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { clearViewedFiles } from 'shared/api/viewed'
import { useExternalPlayers } from 'shared/lib/externalPlayers'
import { requestOpenSettings } from 'shared/lib/settingsEvents'
import { useOptionalAppToast } from 'shared/ui/Toast'
import { usePlayLauncher } from 'features/player/usePlayLauncher'

export interface TorrentActionsProps {
  hash: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
  onViewedChange?: () => void
  onDropped?: () => void
  onShowFiles?: () => void
}

type PendingConfirm = 'drop' | 'clearViews' | null

function ExternalPlayersGroup({
  players,
  size = 'md',
}: {
  players: { label: string; href: string }[]
  size?: 'sm' | 'md' | 'lg'
}) {
  if (players.length === 0) return null

  const buttons = players.map(player => (
    <Button
      key={player.label}
      variant='secondary'
      size={size}
      onPress={() => {
        window.location.href = player.href
      }}
    >
      <ExternalLink aria-hidden />
      {player.label}
    </Button>
  ))

  if (players.length === 1) return buttons[0]
  return <ButtonGroup>{buttons}</ButtonGroup>
}

function TorrentActions({
  hash,
  viewedFileList,
  playableFileList,
  name,
  title,
  setViewedFileList,
  onViewedChange,
  onDropped,
  onShowFiles,
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
    onViewedChange,
  })

  /** Only offer app deep links when there's exactly one obvious file to hand off — otherwise Play's file picker covers it. */
  const { buildExternalPlayers, hasAnyExternalPlayer } = useExternalPlayers()
  const singleFileStream = useMemo(() => {
    if (playableFileList?.length !== 1) return null
    const file = playableFileList[0]
    const fileName = file.path.split('\\').pop()?.split('/').pop() || file.path
    const link = `${streamHost()}/${encodeURIComponent(fileName)}?link=${hash}&index=${file.id}&play`
    const fullLink = new URL(link, window.location.href).toString()
    return { link, fullLink, externalPlayers: buildExternalPlayers(fullLink) }
  }, [playableFileList, hash, buildExternalPlayers])
  const externalPlayers = singleFileStream?.externalPlayers ?? []

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

  const copyInfoHash = async () => {
    try {
      await navigator.clipboard.writeText(hash)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const copyStreamLink = async () => {
    if (!singleFileStream) return
    try {
      await navigator.clipboard.writeText(singleFileStream.fullLink)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const hasPartialProgress = !isSingleFileTorrent && !!viewedFileList?.length
  const playLabel: ReactNode =
    !isSingleFileTorrent && (playableFileList?.length ?? 0) > 1
      ? `${t('TorrentContent')} (${playableFileList!.length})`
      : t('Play')

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <Button
          variant='primary'
          size='lg'
          fullWidth
          className='sm:w-auto'
          isPending={resolvingAudio}
          onPress={() => {
            // Series / multi-file: jump to the Content tab (per-file Play/Copy/external) instead of
            // opening a second file-picker modal — matches the legacy details UX.
            if (!isSingleFileTorrent && onShowFiles) {
              onShowFiles()
              return
            }
            handlePlay()
          }}
        >
          {({ isPending }) => (
            <>
              {isPending ? <Spinner size='sm' color='current' /> : <Play fill='currentColor' aria-hidden />}
              {playLabel}
            </>
          )}
        </Button>
        <ExternalPlayersGroup players={externalPlayers} />
        {singleFileStream ? (
          <Button variant='secondary' onPress={() => void copyStreamLink()}>
            <Copy aria-hidden />
            {t('CopyLink')}
          </Button>
        ) : null}
      </div>

      {isSingleFileTorrent && !hasAnyExternalPlayer ? (
        <button
          type='button'
          onClick={() => requestOpenSettings('app')}
          className='flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent'
        >
          <Settings className='size-3.5' aria-hidden />
          {t('ExternalPlayersHint', { defaultValue: 'Open in VLC, Infuse, etc. — enable in Settings → App' })}
        </button>
      ) : null}

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
        <div className='flex flex-wrap items-center gap-2'>
          {isSingleFileTorrent || !viewedFileList?.length ? (
            <Button variant='primary' onPress={() => window.open(fullPlaylistLink, '_blank')}>
              <ListVideo aria-hidden />
              {t('DownloadPlaylist')}
            </Button>
          ) : null}
          <ButtonGroup>
            <Button variant='secondary' onPress={() => void copyMagnetLink()}>
              <Magnet aria-hidden />
              {t('CopyMagnet')}
            </Button>
            <Button variant='secondary' onPress={() => void copyInfoHash()}>
              <Hash aria-hidden />
              {t('CopyHash')}
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-2 text-sm font-semibold text-muted'>{t('TorrentState')}</p>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' onPress={() => setPendingConfirm('clearViews')}>
            <EyeOff aria-hidden />
            {t('RemoveViews')}
          </Button>
          <Button variant='danger' onPress={() => setPendingConfirm('drop')}>
            <Trash2 aria-hidden />
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
