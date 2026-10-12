import { useMemo, memo, useState, type ReactNode } from 'react'
import { Button, Dropdown, Drawer, Modal, useMediaQuery, useOverlayState } from '@heroui/react'
import {
  EyeOff,
  Hash,
  Link2,
  ListMusic,
  Magnet,
  MoreHorizontal,
  Settings,
  Share2,
  SquareArrowOutUpRight,
  Trash2,
} from 'lucide-react'
import ptt from 'parse-torrent-title'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentStat } from 'shared/api/types'
import { torrsShareUrl } from 'shared/api/extras'
import { playlistTorrHost } from 'shared/api/hosts'
import { dropTorrent, markTorrentsDroppedInList, removeTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { clearViewedFiles } from 'shared/api/viewed'
import { useExternalPlayers } from 'shared/lib/externalPlayers'
import { externalLink, useExternalMediaBase } from 'shared/lib/mediaBase'
import { copyToClipboard } from 'shared/lib/clipboard'
import { streamPlayUrl, torrentPlaylistUrl } from 'shared/lib/posterPlay'
import { requestOpenSettings } from 'shared/lib/settingsEvents'
import { queryMax } from 'shared/theme/breakpoints'
import { iconMenu } from 'shared/ui/iconProps'
import { useOptionalAppToast } from 'shared/ui/Toast'
import { usePlayLauncher } from 'features/player/usePlayLauncher'

export interface TorrentActionsProps {
  hash: string
  torrsHash?: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
  onViewedChange?: () => void
  onDropped?: () => void
  /** After permanent delete — close details. */
  onDeleted?: () => void
  /** Continue Watching: auto-play this file when the list is ready. */
  autoPlayFileId?: number
  autoPlayTimecode?: number
  /** Phone/fullscreen Details — secondary actions in a bottom sheet. */
  compact?: boolean
}

type PendingConfirm = 'drop' | 'delete' | 'clearViews' | null

/** Renders Infuse/VLC/… as equal secondary pills (same look as Copy link beside them). */
function ExternalPlayersGroup({
  players,
  size = 'md',
  compact = false,
  stretch = false,
}: {
  players: { label: string; href: string }[]
  size?: 'sm' | 'md' | 'lg'
  compact?: boolean
  /** Equal-width chips across the row (desktop Files). */
  stretch?: boolean
}) {
  if (players.length === 0) return null

  return (
    <>
      {players.map(player => (
        <Button
          key={player.label}
          variant='secondary'
          size={compact ? 'sm' : size}
          className={
            compact
              ? 'min-h-11 max-w-[5rem] px-2 text-xs'
              : stretch
                ? 'min-h-9 min-w-0 flex-1 px-2 text-sm'
                : 'min-h-11'
          }
          onPress={() => {
            window.location.href = player.href
          }}
        >
          {compact || stretch ? null : <SquareArrowOutUpRight {...iconMenu} aria-hidden />}
          <span className='truncate'>{player.label}</span>
        </Button>
      ))}
    </>
  )
}

/**
 * Files-tab action block: playlist / share / drop.
 * Play + Cache live on their own tabs; copy helpers use {@link copyToClipboard}.
 */
function TorrentActions({
  hash,
  torrsHash,
  viewedFileList,
  playableFileList,
  name,
  title,
  setViewedFileList,
  onViewedChange,
  onDropped,
  onDeleted,
  autoPlayFileId,
  autoPlayTimecode,
  compact: compactProp = false,
}: TorrentActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const isPhone = useMediaQuery(queryMax('mobile'))
  const compact = compactProp || isPhone
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm>(null)
  const moreState = useOverlayState()
  const shareState = useOverlayState()
  const moreMenuState = useOverlayState()
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

  /** Keep launcher mounted for Continue Watching autoplay + player modals. */
  const { playerModals } = usePlayLauncher({
    hash,
    displayName,
    knownPlayableFiles: playableFileList || [],
    onViewedChange,
    autoPlayFileId,
    autoPlayTimecode,
  })

  /** File row owns single-file players. Series footer opens the whole playlist. */
  const { buildSeriesExternalPlayers, hasAnyExternalPlayer } = useExternalPlayers()
  const mediaBase = useExternalMediaBase()
  const singleFileStream = useMemo(() => {
    if (playableFileList?.length !== 1) return null
    return { fullLink: externalLink(streamPlayUrl(hash, playableFileList[0]), mediaBase).toString() }
  }, [playableFileList, hash, mediaBase])
  const seriesPlayers = useMemo(() => {
    if (!playableFileList || playableFileList.length < 2) return []
    const playlist = externalLink(torrentPlaylistUrl(hash, displayName), mediaBase).toString()
    const episodes = playableFileList.map(file => ({
      url: externalLink(streamPlayUrl(hash, file), mediaBase).toString(),
      filename: file.path.split('\\').pop()?.split('/').pop() || file.path,
    }))
    return buildSeriesExternalPlayers(playlist, episodes)
  }, [playableFileList, hash, displayName, mediaBase, buildSeriesExternalPlayers])
  const showPlayerHint = (playableFileList?.length ?? 0) > 0 && !hasAnyExternalPlayer

  const runPendingConfirm = () => {
    if (pendingConfirm === 'drop' || pendingConfirm === 'delete') {
      const previous = queryClient.getQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY)
      if (pendingConfirm === 'drop') {
        markTorrentsDroppedInList(queryClient, hash)
      } else {
        queryClient.setQueryData<TorrentStat[]>(TORRENTS_QUERY_KEY, prev => prev?.filter(item => item.hash !== hash))
      }
      const mutate = pendingConfirm === 'drop' ? dropTorrent : removeTorrent
      const successMessage = pendingConfirm === 'drop' ? t('DropTorrent') : t('Delete')
      const afterSuccess = pendingConfirm === 'drop' ? onDropped : onDeleted
      void mutate(hash)
        .then(() => {
          toast?.showToast({ message: successMessage, severity: 'success' })
          void queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
          afterSuccess?.()
        })
        .catch(() => {
          if (previous) queryClient.setQueryData(TORRENTS_QUERY_KEY, previous)
          toast?.showToast({ message: t('Error'), severity: 'error' })
        })
    } else if (pendingConfirm === 'clearViews') {
      void clearViewedFiles(hash)
        .then(() => {
          setViewedFileList(undefined)
          toast?.showToast({ message: t('RemoveViews'), severity: 'success' })
        })
        .catch(() => toast?.showToast({ message: t('Error'), severity: 'error' }))
    }
    setPendingConfirm(null)
  }

  const confirmHeading =
    pendingConfirm === 'drop' ? t('DropTorrent') : pendingConfirm === 'delete' ? t('Delete') : t('RemoveViews')
  const confirmBody =
    pendingConfirm === 'drop'
      ? t('ConfirmDropTorrent')
      : pendingConfirm === 'delete'
        ? t('ConfirmDeleteTorrent')
        : t('ConfirmRemoveViews')

  const copyMagnetLink = async () => {
    try {
      await copyToClipboard(magnetLink)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const copyInfoHash = async () => {
    try {
      await copyToClipboard(hash)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const copyTorrsLink = async () => {
    try {
      await copyToClipboard(torrsShareUrl({ hash, torrs_hash: torrsHash }))
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const copyStreamLink = async () => {
    if (!singleFileStream) return
    try {
      await copyToClipboard(singleFileStream.fullLink)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const hasPartialProgress = !isSingleFileTorrent && !!viewedFileList?.length
  const latestPlayed = hasPartialProgress ? (
    <p className='truncate text-xs text-muted'>
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
  ) : null

  const confirmModal = (
    <Modal.Root state={confirmState}>
      <Modal.Backdrop>
        <Modal.Container size='sm' placement='center'>
          <Modal.Dialog className='ts-compact-modal'>
            <Modal.Header className='shrink-0'>
              <Modal.Heading>{confirmHeading}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{confirmBody}</Modal.Body>
            <Modal.Footer className='flex w-full shrink-0 justify-center gap-2'>
              <Button variant='secondary' className='min-h-11 flex-1' onPress={() => setPendingConfirm(null)} autoFocus>
                {t('Cancel')}
              </Button>
              <Button
                variant={pendingConfirm === 'drop' || pendingConfirm === 'delete' ? 'danger' : 'primary'}
                className='min-h-11 flex-1'
                onPress={runPendingConfirm}
              >
                {t('OK')}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )

  const playlistButtons = hasPartialProgress ? (
    <>
      <Button
        variant='primary'
        className='min-h-9 min-w-0 flex-1'
        onPress={() => window.open(fromLatestPlaylistLink, '_blank')}
      >
        <ListMusic {...iconMenu} aria-hidden />
        <span className='truncate'>{t('FromLatestFile')}</span>
      </Button>
      <Button
        variant='outline'
        className='min-h-9 min-w-0 flex-1'
        onPress={() => window.open(fullPlaylistLink, '_blank')}
      >
        <span className='truncate'>{t('DownloadPlaylist')}</span>
      </Button>
    </>
  ) : (
    <Button
      variant='primary'
      className='min-h-9 min-w-0 flex-1'
      onPress={() => window.open(fullPlaylistLink, '_blank')}
    >
      <ListMusic {...iconMenu} aria-hidden />
      <span className='truncate'>{t('DownloadPlaylist')}</span>
    </Button>
  )

  if (compact) {
    const closeMore = () => moreState.close()
    const sheetAction = (label: string, icon: ReactNode, onPress: () => void, danger = false) => (
      <Button
        key={label}
        variant='ghost'
        onPress={() => {
          closeMore()
          onPress()
        }}
        className={`h-auto w-full justify-start gap-3 px-4 py-3 min-h-11 ${danger ? 'text-danger' : ''}`}
      >
        {icon}
        {label}
      </Button>
    )

    return (
      <div className='space-y-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]'>
        {seriesPlayers.length > 0 ? (
          <div className='flex flex-wrap items-center gap-1.5'>
            <ExternalPlayersGroup players={seriesPlayers} compact />
          </div>
        ) : null}

        {latestPlayed}

        <div className='flex items-stretch gap-2'>
          {playlistButtons}
          <Button variant='secondary' size='md' className='min-h-9 min-w-11 shrink-0 px-3' onPress={moreState.open}>
            <MoreHorizontal {...iconMenu} aria-hidden />
            <span className='sr-only'>{t('Actions')}</span>
          </Button>
        </div>

        {showPlayerHint ? (
          <button
            type='button'
            onClick={() => requestOpenSettings('app')}
            className='flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent'
          >
            <Settings size={14} strokeWidth={1.75} aria-hidden />
            {t('ExternalPlayersHint')}
          </button>
        ) : null}

        <Drawer.Root state={moreState}>
          <Drawer.Backdrop isDismissable>
            <Drawer.Content placement='bottom'>
              <Drawer.Dialog className='ts-sheet-drawer' aria-label={t('Actions')}>
                <Drawer.Header>
                  <Drawer.Heading>{t('Actions')}</Drawer.Heading>
                  <Drawer.CloseTrigger className='min-h-11 min-w-11' aria-label={t('Close')} />
                </Drawer.Header>
                <Drawer.Body className='flex flex-col gap-0.5 px-0 pt-1'>
                  {singleFileStream
                    ? sheetAction(t('CopyLink'), <Link2 {...iconMenu} aria-hidden />, () => void copyStreamLink())
                    : null}
                  {sheetAction(t('CopyMagnet'), <Magnet {...iconMenu} aria-hidden />, () => void copyMagnetLink())}
                  {sheetAction(t('CopyHash'), <Hash {...iconMenu} aria-hidden />, () => void copyInfoHash())}
                  {sheetAction(t('CopyTorrs'), <Share2 {...iconMenu} aria-hidden />, () => void copyTorrsLink())}
                  {sheetAction(t('RemoveViews'), <EyeOff {...iconMenu} aria-hidden />, () =>
                    setPendingConfirm('clearViews'),
                  )}
                  {sheetAction(
                    t('DropTorrent'),
                    <Trash2 {...iconMenu} aria-hidden />,
                    () => setPendingConfirm('drop'),
                    true,
                  )}
                  {sheetAction(
                    t('Delete'),
                    <Trash2 {...iconMenu} aria-hidden />,
                    () => setPendingConfirm('delete'),
                    true,
                  )}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer.Root>

        {playerModals}
        {confirmModal}
      </div>
    )
  }

  return (
    <div className='space-y-2'>
      {seriesPlayers.length > 0 ? (
        <div className='flex w-full items-center gap-2'>
          <ExternalPlayersGroup players={seriesPlayers} stretch />
        </div>
      ) : null}

      {showPlayerHint ? (
        <button
          type='button'
          onClick={() => requestOpenSettings('app')}
          className='flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent'
        >
          <Settings size={14} strokeWidth={1.75} aria-hidden />
          {t('ExternalPlayersHint')}
        </button>
      ) : null}

      {latestPlayed}

      <div className='flex w-full flex-wrap items-stretch gap-2'>
        {playlistButtons}
        <Dropdown isOpen={shareState.isOpen} onOpenChange={shareState.setOpen}>
          <Dropdown.Trigger>
            <Button variant='secondary' className='min-h-9 min-w-0 shrink-0 gap-1.5 px-3'>
              <Share2 {...iconMenu} aria-hidden />
              <span className='truncate'>{t('Share')}</span>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover placement='top end'>
            <Dropdown.Menu aria-label={t('Share')}>
              <Dropdown.Item onPress={() => void copyMagnetLink()}>
                <Magnet {...iconMenu} />
                {t('CopyMagnet')}
              </Dropdown.Item>
              <Dropdown.Item onPress={() => void copyInfoHash()}>
                <Hash {...iconMenu} />
                {t('CopyHash')}
              </Dropdown.Item>
              <Dropdown.Item onPress={() => void copyTorrsLink()}>
                <Share2 {...iconMenu} />
                {t('CopyTorrs')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <Dropdown isOpen={moreMenuState.isOpen} onOpenChange={moreMenuState.setOpen}>
          <Dropdown.Trigger>
            <Button variant='secondary' isIconOnly className='min-h-9 min-w-9 shrink-0' aria-label={t('nav.More')}>
              <MoreHorizontal {...iconMenu} aria-hidden />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover placement='top end'>
            <Dropdown.Menu aria-label={t('nav.More')}>
              <Dropdown.Item onPress={() => setPendingConfirm('clearViews')}>
                <EyeOff {...iconMenu} />
                {t('RemoveViews')}
              </Dropdown.Item>
              <Dropdown.Item onPress={() => setPendingConfirm('drop')}>
                <Trash2 {...iconMenu} />
                {t('DropTorrent')}
              </Dropdown.Item>
              <Dropdown.Item variant='danger' onPress={() => setPendingConfirm('delete')}>
                <Trash2 {...iconMenu} />
                {t('Delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {playerModals}
      {confirmModal}
    </div>
  )
}

export default memo(TorrentActions)
