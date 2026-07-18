import { useMemo, useRef, useState } from 'react'
import axios from 'axios'
import {
  Button,
  Dropdown,
  Modal,
  Tooltip,
  useOverlayState,
} from '@heroui/react'
import {
  Info,
  ListMusic,
  Loader2,
  MoreVertical,
  Music2,
  Pencil,
  Play,
  Trash2,
  X,
} from 'lucide-react'
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
  className?: string
}

type ConfirmKind = 'drop' | 'delete' | null
type ProbeTrack = Record<string, unknown>

const toPlayable = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

const probeTrackValue = (track: ProbeTrack, key: string): unknown => {
  const lower = key.toLowerCase()
  const found = Object.keys(track).find(k => k.toLowerCase() === lower)
  return found ? track[found] : undefined
}

const probeAudioTracks = (probe: { Tracks?: ProbeTrack[]; tracks?: ProbeTrack[] } | null | undefined) =>
  (probe?.Tracks || probe?.tracks || []).filter(
    track => String(probeTrackValue(track, 'Type') || '').toLowerCase() === 'audio',
  )

const audioTrackLabel = (track: ProbeTrack, index: number) => {
  const lang = String(probeTrackValue(track, 'Language') || probeTrackValue(track, 'Lang') || '')
  const codec = String(probeTrackValue(track, 'Codec') || probeTrackValue(track, 'CapsName') || '')
  const title = String(probeTrackValue(track, 'Title') || '')
  const parts = [`#${index}`, lang, codec, title].filter(Boolean)
  return parts.join(' · ') || `Audio ${index}`
}

export default function TorrentCardActions({ torrent, onDetails, onEdit, className }: TorrentCardActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const gstRuntime = useGStreamerRuntime()
  const audioCache = useRef<Record<number, ProbeTrack[]>>({})

  const [confirm, setConfirm] = useState<ConfirmKind>(null)
  const [playableFiles, setPlayableFiles] = useState<PlayableFile[]>([])
  const [audioTracks, setAudioTracks] = useState<ProbeTrack[]>([])
  const [pendingAudioFile, setPendingAudioFile] = useState<PlayableFile | null>(null)
  const [resolvingAudio, setResolvingAudio] = useState(false)
  const [player, setPlayer] = useState<{
    src: string
    downloadSrc: string
    title: string
    hls: boolean
    heartbeatSrc?: string
  } | null>(null)

  const playMenuState = useOverlayState()
  const audioMenuState = useOverlayState()
  const confirmState = useOverlayState({
    isOpen: confirm != null,
    onOpenChange: open => {
      if (!open) setConfirm(null)
    },
  })

  const hash = torrent.hash
  const displayName = torrent.title || torrent.name || hash
  const playlistLink = `${playlistTorrHost()}/${encodeURIComponent(displayName)}.m3u?link=${hash}&m3u`

  const listPlayable = useMemo(() => {
    const stats = torrent.file_stats
    if (!stats?.length) return []
    return stats.map(toPlayable).filter(f => isFilePlayable(f.path))
  }, [torrent.file_stats])

  const openPlayerForFile = (file: PlayableFile, audio = 0) => {
    const useHls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    const stream = `${streamHost()}/${encodeURIComponent(
      file.path.split('\\').pop()!.split('/').pop()!,
    )}?link=${hash}&index=${file.id}&play`
    setPlayer({
      src: useHls ? gstreamerMasterUrl(hash, file.id, audio) : stream,
      downloadSrc: stream,
      title: file.path.split('/').pop() || displayName,
      hls: useHls,
      heartbeatSrc: useHls ? gstreamerHeartbeatUrl(hash) : undefined,
    })
    playMenuState.close()
    audioMenuState.close()
    setPendingAudioFile(null)
  }

  const resolveAndPlay = async (file: PlayableFile) => {
    const useHls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    if (!useHls) {
      openPlayerForFile(file)
      return
    }

    const cached = audioCache.current[file.id]
    if (cached !== undefined) {
      if (!cached.length) {
        openPlayerForFile(file, 0)
        return
      }
      setPendingAudioFile(file)
      setAudioTracks(cached)
      audioMenuState.open()
      return
    }

    setResolvingAudio(true)
    try {
      const { data } = await axios.get(gstreamerProbeUrl(hash, file.id))
      const tracks = probeAudioTracks(data)
      audioCache.current[file.id] = tracks
      if (!tracks.length) {
        openPlayerForFile(file, 0)
        return
      }
      setPendingAudioFile(file)
      setAudioTracks(tracks)
      audioMenuState.open()
    } catch {
      openPlayerForFile(file, 0)
    } finally {
      setResolvingAudio(false)
    }
  }

  const handlePlayClick = async () => {
    try {
      let files = listPlayable
      if (!files.length) {
        const detail = await getTorrent(hash)
        files = (detail.file_stats || []).map(toPlayable).filter(f => isFilePlayable(f.path))
      }
      if (!files.length) {
        toast?.showToast({
          message: t('NoPlayableFiles', { defaultValue: 'No playable files' }),
          severity: 'info',
        })
        return
      }
      if (files.length === 1) {
        await resolveAndPlay(files[0])
        return
      }
      setPlayableFiles(files)
      playMenuState.open()
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const runConfirmed = () => {
    const action = confirm
    setConfirm(null)
    confirmState.close()
    if (action === 'drop') {
      void dropTorrent(hash)
        .then(async () => {
          toast?.showToast({ message: t('DropTorrent'), severity: 'success' })
          await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
        })
        .catch(() => toast?.showToast({ message: t('Error'), severity: 'error' }))
    }
    if (action === 'delete') {
      void removeTorrent(hash)
        .then(async () => {
          toast?.showToast({ message: t('Delete'), severity: 'success' })
          await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
        })
        .catch(() => toast?.showToast({ message: t('Error'), severity: 'error' }))
    }
  }

  const actionBtnClass = 'h-9 w-9 min-w-9 rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-accent'

  return (
    <>
      <div
        className={`pointer-events-none flex items-center justify-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 ${className ?? ''}`}
        onClick={e => e.stopPropagation()}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              variant='primary'
              isIconOnly
              className={actionBtnClass}
              aria-label={t('Play')}
              isDisabled={resolvingAudio}
              onPress={() => void handlePlayClick()}
            >
              {resolvingAudio ? <Loader2 size={16} className='animate-spin' /> : <Play size={16} fill='currentColor' />}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Play')}</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <Button variant='primary' isIconOnly className={actionBtnClass} aria-label={t('Details')} onPress={onDetails}>
              <Info size={16} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('Details')}</Tooltip.Content>
        </Tooltip>

        <Tooltip>
          <Tooltip.Trigger>
            <a
              href={playlistLink}
              className={`inline-flex items-center justify-center ${actionBtnClass}`}
              aria-label={t('DownloadPlaylist')}
              onClick={e => e.stopPropagation()}
            >
              <ListMusic size={16} />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>{t('DownloadPlaylist')}</Tooltip.Content>
        </Tooltip>

        <Dropdown>
          <Dropdown.Trigger>
            <Button variant='primary' isIconOnly className={actionBtnClass} aria-label={t('Actions')}>
              <MoreVertical size={16} />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover placement='bottom end'>
            <Dropdown.Menu aria-label={t('Actions')}>
              {onEdit ? (
                <Dropdown.Item
                  onPress={() => {
                    onEdit()
                  }}
                >
                  <Pencil size={16} />
                  {t('EditTorrent')}
                </Dropdown.Item>
              ) : null}
              <Dropdown.Item
                onPress={() => {
                  setConfirm('drop')
                  confirmState.open()
                }}
              >
                <X size={16} />
                {t('DropTorrent')}
              </Dropdown.Item>
              <Dropdown.Item
                variant='danger'
                onPress={() => {
                  setConfirm('delete')
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

      <Modal state={playMenuState}>
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
                    {file.path.split('/').pop() || file.path}
                  </Button>
                ))}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal state={audioMenuState}>
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
                    onPress={() => pendingAudioFile && openPlayerForFile(pendingAudioFile, index)}
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

      {player ? (
        <VideoPlayer
          initiallyOpen
          showTrigger={false}
          title={player.title}
          videoSrc={player.src}
          downloadSrc={player.downloadSrc}
          hls={player.hls}
          heartbeatSrc={player.heartbeatSrc}
          onClose={() => setPlayer(null)}
        />
      ) : null}

      <Modal state={confirmState}>
        <Modal.Backdrop isDismissable>
          <Modal.Container size='sm'>
            <Modal.Dialog aria-label={confirm === 'delete' ? t('Delete') : t('DropTorrent')}>
              <Modal.Header>
                <Modal.Heading>{confirm === 'delete' ? t('Delete') : t('DropTorrent')}</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                {confirm === 'delete' ? t('DeleteTorrents?') : t('ConfirmDropTorrent')}
              </Modal.Body>
              <Modal.Footer className='flex justify-end gap-2'>
                <Button autoFocus variant='secondary' onPress={() => setConfirm(null)}>
                  {t('Cancel')}
                </Button>
                <Button variant='danger' onPress={runConfirmed}>
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
