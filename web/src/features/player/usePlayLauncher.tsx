import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { Button, Modal, useOverlayState } from '@heroui/react'
import { Music2 } from 'lucide-react'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat } from 'shared/api/types'
import { streamHost } from 'shared/api/hosts'
import { getTorrent } from 'shared/api/torrents'
import { humanizeSize } from 'shared/lib/format'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  gstreamerProbeUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'shared/lib/gstreamer'
import { isFilePlayable } from 'shared/torrent/playable'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'

/** Lazy: keeps hls.js out of the initial bundle — only fetched once a file is actually played. */
const VideoPlayer = lazy(() => import('features/player/VideoPlayer'))

/** GStreamer probe result track — field casing varies by backend build, so lookups are case-insensitive. */
type ProbeTrack = Record<string, unknown>

interface ActivePlayer {
  src: string
  downloadSrc: string
  title: string
  hls: boolean
  heartbeatSrc?: string
}

export const toPlayableFile = (file: TorrentFileStat): PlayableFile => ({
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

/** Parses a file's episode code ("S01E03") and title from its path, falling back to the raw name. */
const fileEpisodeInfo = (path: string, index: number): { code: string; title: string } => {
  const name = fileBaseName(path)
  const parsed = ptt.parse(name)
  const season = Number(parsed.season)
  const episode = Number(parsed.episode)
  const code = `${season ? `S${String(season).padStart(2, '0')}` : ''}${
    episode ? `E${String(episode).padStart(2, '0')}` : ''
  }`
  const title = parsed.title || name.replace(/\.[^/.]+$/, '')
  return { code: code || `#${index + 1}`, title }
}

export interface UsePlayLauncherArgs {
  hash: string
  displayName: string
  /** Playable files already known from a loaded torrent detail — falls back to fetching the torrent if empty. */
  knownPlayableFiles: PlayableFile[]
}

/**
 * Shared "Play" flow: resolves the file to play (prompting when there are several), probes audio
 * tracks for GStreamer-backed files, and opens the video player. Shared between the grid card's
 * quick-play button and the details dialog so both stay in sync.
 */
export function usePlayLauncher({ hash, displayName, knownPlayableFiles }: UsePlayLauncherArgs) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const gstRuntime = useGStreamerRuntime()
  /** Per-file audio-track probe results, cached for the lifetime of this hook instance. */
  const audioProbeCache = useRef<Record<number, ProbeTrack[]>>({})

  const [playableFiles, setPlayableFiles] = useState<PlayableFile[]>([])
  const [audioTracks, setAudioTracks] = useState<ProbeTrack[]>([])
  const [pendingAudioFile, setPendingAudioFile] = useState<PlayableFile | null>(null)
  const [resolvingAudio, setResolvingAudio] = useState(false)
  const [activePlayer, setActivePlayer] = useState<ActivePlayer | null>(null)

  const filePickerState = useOverlayState()
  const audioPickerState = useOverlayState()

  useSyncModalOpen(filePickerState.isOpen || audioPickerState.isOpen)

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

  const playerModals = useMemo(
    () => (
      <>
        <Modal state={filePickerState}>
          <Modal.Backdrop isDismissable>
            <Modal.Container size='md'>
              <Modal.Dialog aria-label={t('Play')} className='sm:min-w-[28rem]'>
                <Modal.Header>
                  <Modal.Heading>{t('Play')}</Modal.Heading>
                </Modal.Header>
                <Modal.Body className='flex max-h-[60vh] flex-col gap-1.5 overflow-y-auto'>
                  {playableFiles.map((file, index) => {
                    const { code, title } = fileEpisodeInfo(file.path, index)
                    return (
                      <Button
                        key={file.id}
                        variant='ghost'
                        className='h-auto flex-col items-start gap-0.5 py-2.5'
                        onPress={() => void resolveAndPlay(file)}
                      >
                        <span className='flex w-full items-center gap-2 text-sm font-medium'>
                          <span className='shrink-0 rounded bg-accent/15 px-1.5 py-0.5 text-xs font-semibold text-accent'>
                            {code}
                          </span>
                          <span className='truncate'>{title}</span>
                        </span>
                        <span className='text-xs text-muted'>{humanizeSize(file.length)}</span>
                      </Button>
                    )
                  })}
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
          <Suspense fallback={null}>
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
          </Suspense>
        ) : null}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filePickerState, audioPickerState, playableFiles, audioTracks, pendingAudioFile, activePlayer, t],
  )

  return { handlePlay: () => void handlePlay(), resolvingAudio, playerModals }
}
