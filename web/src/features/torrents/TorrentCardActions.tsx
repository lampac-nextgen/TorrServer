import { useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { Button, Dropdown, Modal, Tooltip, useOverlayState } from '@heroui/react'
import { Info, ListMusic, Loader2, MoreVertical, Music2, Pencil, Play, Trash2, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat, TorrentStat } from 'shared/api/types'
import { playlistTorrHost, streamHost } from 'shared/api/hosts'
import { dropTorrent, getTorrent, removeTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  gstreamerProbeUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'shared/lib/gstreamer'
import { isFilePlayable } from 'shared/torrent/playable'
import { useOptionalAppToast } from 'shared/ui/Toast'
import VideoPlayer from 'features/player/VideoPlayer'

export interface TorrentCardActionsProps {
  torrent: TorrentStat
  onDetails: () => void
  onEdit?: () => void
}

type ConfirmKind = 'drop' | 'delete' | null
/** GStreamer probe result track — field casing varies by backend build, so lookups are case-insensitive. */
type ProbeTrack = Record<string, unknown>

interface ActivePlayer {
  src: string
  downloadSrc: string
  title: string
  hls: boolean
  heartbeatSrc?: string
}

const toPlayableFile = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

const probeField = (track: ProbeTrack, key: string): unknown => {
  const lowerKey = key.toLowerCase()
  const match = Object.keys(track).find(candidate => candidate.toLowerCase() === lowerKey)
  return match ? track[match] : undefined
}

const extractAudioTracks = (probe: { Tracks?: ProbeTrack[]; tracks?: ProbeTrack[] } | null | undefined): ProbeTrack[] =>
  (probe?.Tracks || probe?.tracks || []).filter(
    track => String(probeField(track, 'Type') || '').toLowerCase() === 'audio',
  )

const audioTrackLabel = (track: ProbeTrack, index: number): string => {
  const lang = String(probeField(track, 'Language') || probeField(track, 'Lang') || '')
  const codec = String(probeField(track, 'Codec') || probeField(track, 'CapsName') || '')
  const trackTitle = String(probeField(track, 'Title') || '')
  const parts = [`#${index}`, lang, codec, trackTitle].filter(Boolean)
  return parts.join(' · ') || `Audio ${index}`
}

const fileBaseName = (path: string): string => path.split('\\').pop()?.split('/').pop() || path

export default function TorrentCardActions({ torrent, onDetails, onEdit }: TorrentCardActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const gstRuntime = useGStreamerRuntime()
  /** Per-file audio-track probe results, cached for the lifetime of this card. */
  const audioProbeCache = useRef<Record<number, ProbeTrack[]>>({})

  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null)
  const [playableFiles, setPlayableFiles] = useState<PlayableFile[]>([])
  const [audioTracks, setAudioTracks] = useState<ProbeTrack[]>([])
  const [pendingAudioFile, setPendingAudioFile] = useState<PlayableFile | null>(null)
  const [resolvingAudio, setResolvingAudio] = useState(false)
  const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null)

  const filePickerState = useOverlayState()
  const audioPickerState = useOverlayState()
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

  const openPlayer = (file: PlayableFile, audioIndex = 0) => {
    const useHls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    const directStream = `${streamHost()}/${encodeURIComponent(fileBaseName(file.path))}?link=${hash}&index=${file.id}&play`

    setActivePlayer({
      src: useHls ? gstreamerMasterUrl(hash, file.id, audioIndex) : directStream,
      downloadSrc: directStream,
      title: fileBaseName(file.path) || displayName,
      hls: useHls,
      heartbeatSrc: useHls ? gstreamerHeartbeatUrl(hash) : undefined,
    })
    filePickerState.close()
    audioPickerState.close()
    setPendingAudioFile(null)
  }

  const resolveAndPlay = async (file: PlayableFile) => {
    const useHls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    if (!useHls) {
      openPlayer(file)
      return
    }

    const cachedTracks = audioProbeCache.current[file.id]
    if (cachedTracks !== undefined) {
      if (!cachedTracks.length) {
        openPlayer(file, 0)
        return
      }
      setPendingAudioFile(file)
      setAudioTracks(cachedTracks)
      audioPickerState.open()
      return
    }

    setResolvingAudio(true)
    try {
      const { data } = await axios.get(gstreamerProbeUrl(hash, file.id))
      const tracks = extractAudioTracks(data)
      audioProbeCache.current[file.id] = tracks
      if (!tracks.length) {
        openPlayer(file, 0)
        return
      }
      setPendingAudioFile(file)
      setAudioTracks(tracks)
      audioPickerState.open()
    } catch {
      openPlayer(file, 0)
    } finally {
      setResolvingAudio(false)
    }
  }

  const handlePlay = async () => {
    try {
      let candidates = knownPlayableFiles
      if (!candidates.length) {
        const detail = await getTorrent(hash)
        candidates = (detail.file_stats || []).map(toPlayableFile).filter(file => isFilePlayable(file.path))
      }
      if (!candidates.length) {
        toast?.showToast({ message: t('NoPlayableFiles'), severity: 'info' })
        return
      }
      if (candidates.length === 1) {
        await resolveAndPlay(candidates[0])
        return
      }
      setPlayableFiles(candidates)
      filePickerState.open()
    } catch {
      toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' })
    }
  }

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
              onPress={() => void handlePlay()}
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

      <Modal state={filePickerState}>
        <Modal.Backdrop isDismissable>
          <Modal.Container size='sm'>
            <Modal.Dialog aria-label={t('Play')}>
              <Modal.Header>
                <Modal.Heading>{t('Play')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-1'>
                {playableFiles.map(file => (
                  <Button
                    key={file.id}
                    variant='ghost'
                    className='justify-start'
                    onPress={() => void resolveAndPlay(file)}
                  >
                    {fileBaseName(file.path)}
                  </Button>
                ))}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal state={audioPickerState}>
        <Modal.Backdrop isDismissable>
          <Modal.Container size='sm'>
            <Modal.Dialog aria-label={t('Play')}>
              <Modal.Header>
                <Modal.Heading>{t('Play')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body className='flex flex-col gap-1'>
                {audioTracks.map((track, index) => (
                  <Button
                    key={index}
                    variant='ghost'
                    className='justify-start gap-2'
                    onPress={() => pendingAudioFile && openPlayer(pendingAudioFile, index)}
                  >
                    <Music2 size={16} />
                    {audioTrackLabel(track, index)}
                  </Button>
                ))}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {activePlayer ? (
        <VideoPlayer
          initiallyOpen
          showTrigger={false}
          title={activePlayer.title}
          videoSrc={activePlayer.src}
          downloadSrc={activePlayer.downloadSrc}
          hls={activePlayer.hls}
          heartbeatSrc={activePlayer.heartbeatSrc}
          onClose={() => setActivePlayer(null)}
        />
      ) : null}

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
