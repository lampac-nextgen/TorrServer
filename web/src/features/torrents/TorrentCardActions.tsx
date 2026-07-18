import { useMemo, useState } from 'react'
import { Button, Dropdown, Modal, Tooltip, useOverlayState } from '@heroui/react'
import { ExternalLink, Info, ListMusic, Loader2, MoreVertical, Pencil, Play, Trash2, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { playlistTorrHost, streamHost } from 'shared/api/hosts'
import { dropTorrent, removeTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { useExternalPlayers } from 'shared/lib/externalPlayers'
import { isFilePlayable } from 'shared/torrent/playable'
import { useOptionalAppToast } from 'shared/ui/Toast'
import { toPlayableFile, usePlayLauncher } from 'features/player/usePlayLauncher'

export interface TorrentCardActionsProps {
  torrent: TorrentStat
  onDetails: () => void
  onEdit?: () => void
}

type ConfirmKind = 'drop' | 'delete' | null

export default function TorrentCardActions({ torrent, onDetails, onEdit }: TorrentCardActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()

  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null)
  const confirmState = useOverlayState({
    isOpen: confirmKind != null,
    onOpenChange: open => {
      if (!open) setConfirmKind(null)
    },
  })

  const hash = torrent.hash
  const displayName = torrent.title || torrent.name || hash
  const playlistHref = `${playlistTorrHost()}/${encodeURIComponent(displayName)}.m3u?link=${hash}&m3u`

  const knownPlayableFiles = useMemo(() => {
    const stats = torrent.file_stats
    if (!stats?.length) return []
    return stats.map(toPlayableFile).filter(file => isFilePlayable(file.path))
  }, [torrent.file_stats])

  const { handlePlay, resolvingAudio, playerModals } = usePlayLauncher({ hash, displayName, knownPlayableFiles })

  /** Only offer app deep links when there's exactly one obvious file to hand off — otherwise Play's file picker covers it. */
  const { buildExternalPlayers } = useExternalPlayers()
  const externalPlayers = useMemo(() => {
    if (knownPlayableFiles.length !== 1) return []
    const file = knownPlayableFiles[0]
    const fileName = file.path.split('\\').pop()?.split('/').pop() || file.path
    const link = `${streamHost()}/${encodeURIComponent(fileName)}?link=${hash}&index=${file.id}&play`
    const fullLink = new URL(link, window.location.href).toString()
    return buildExternalPlayers(fullLink)
  }, [knownPlayableFiles, hash, buildExternalPlayers])

  const runConfirmedAction = () => {
    const action = confirmKind
    setConfirmKind(null)
    confirmState.close()

    const mutate = action === 'drop' ? dropTorrent : action === 'delete' ? removeTorrent : null
    const successMessage = action === 'drop' ? t('DropTorrent') : t('Delete')
    if (!mutate) return

    void mutate(hash)
      .then(async () => {
        toast?.showToast({ message: successMessage, severity: 'success' })
        await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      })
      .catch(() => toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' }))
  }

  const overlayButtonClass = 'h-9 w-9 min-w-9 rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-accent'

  return (
    <>
      <div className='flex items-center justify-center gap-1.5' onClick={event => event.stopPropagation()}>
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='primary'
              isIconOnly
              className={overlayButtonClass}
              aria-label={t('Play')}
              isDisabled={resolvingAudio}
              onPress={handlePlay}
            >
              {resolvingAudio ? <Loader2 size={16} className='animate-spin' /> : <Play size={16} fill='currentColor' />}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Play')}</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='primary'
              isIconOnly
              className={overlayButtonClass}
              aria-label={t('Details')}
              onPress={onDetails}
            >
              <Info size={16} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Details')}</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <a
              href={playlistHref}
              aria-label={t('DownloadPlaylist')}
              onClick={event => event.stopPropagation()}
              className={`inline-flex items-center justify-center ${overlayButtonClass}`}
            >
              <ListMusic size={16} />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('DownloadPlaylist')}</Tooltip.Content>
        </Tooltip>

        <Dropdown>
          <Dropdown.Trigger>
            <Button variant='primary' isIconOnly className={overlayButtonClass} aria-label={t('Actions')}>
              <MoreVertical size={16} />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover placement='bottom end'>
            <Dropdown.Menu aria-label={t('Actions')}>
              {onEdit ? (
                <Dropdown.Item onPress={onEdit}>
                  <Pencil size={16} />
                  {t('EditTorrent')}
                </Dropdown.Item>
              ) : null}
              {externalPlayers.map(player => (
                <Dropdown.Item
                  key={player.label}
                  onPress={() => {
                    window.location.href = player.href
                  }}
                >
                  <ExternalLink size={16} />
                  {player.label}
                </Dropdown.Item>
              ))}
              <Dropdown.Item
                onPress={() => {
                  setConfirmKind('drop')
                  confirmState.open()
                }}
              >
                <X size={16} />
                {t('DropTorrent')}
              </Dropdown.Item>
              <Dropdown.Item
                variant='danger'
                onPress={() => {
                  setConfirmKind('delete')
                  confirmState.open()
                }}
              >
                <Trash2 size={16} />
                {t('Delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {playerModals}

      <Modal state={confirmState}>
        <Modal.Backdrop isDismissable>
          <Modal.Container size='sm'>
            <Modal.Dialog aria-label={confirmKind === 'delete' ? t('Delete') : t('DropTorrent')}>
              <Modal.Header>
                <Modal.Heading>{confirmKind === 'delete' ? t('Delete') : t('DropTorrent')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>{confirmKind === 'delete' ? t('DeleteTorrents?') : t('ConfirmDropTorrent')}</Modal.Body>
              <Modal.Footer className='flex justify-end gap-2'>
                <Button autoFocus variant='secondary' onPress={() => setConfirmKind(null)}>
                  {t('Cancel')}
                </Button>
                <Button variant='danger' onPress={runConfirmedAction}>
                  {t('OK')}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}
