import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import Hls from 'hls.js'
import {
  Alert,
  Button,
  ListBox,
  Modal,
  Popover,
  Slider,
  Spinner,
  Tooltip,
  useMediaQuery,
  useOverlayState,
} from '@heroui/react'
import {
  Captions,
  Gauge,
  Maximize,
  Maximize2,
  Minimize,
  Minimize2,
  Music2,
  Pause,
  PictureInPicture2,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { setViewedFile } from 'shared/api/viewed'
import { rememberContinueWatching } from 'shared/lib/continueWatching'
import { gstreamerMasterUrl } from 'shared/lib/gstreamer'
import { queryMax } from 'shared/theme/breakpoints'
import { useModalOpen, useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { iconBtn } from 'shared/ui/controlClasses'
import { PLAYER_DIALOG_EXPANDED, PLAYER_DIALOG_NORMAL } from 'shared/ui/dialogSizes'

import { formatAudioTrackDisplay, type ProbeTrack } from './audioTrackLabel'

export interface VideoPlayerProps {
  videoSrc: string
  downloadSrc?: string
  title?: string
  onNotSupported?: () => void
  hls?: boolean
  heartbeatSrc?: string
  showTrigger?: boolean
  inlineTrigger?: boolean
  /** When used as an episode-row Play control — primary filled button with icon. */
  inlineTriggerPrimary?: boolean
  initiallyOpen?: boolean
  onClose?: () => void
  captionSrc?: string
  hash?: string
  fileIndex?: number
  initialTimecode?: number
  trackTimecode?: boolean
  onViewedChange?: () => void
  /** GST audio tracks for in-player switching (multi-track only). */
  audioTracks?: ProbeTrack[]
  audioIndex?: number
  onAudioIndexChange?: (index: number) => void
}

interface SubtitleTrackInfo {
  id: number
  name?: string
  lang?: string
}

const HEARTBEAT_INTERVAL_MS = 30_000
const SEEK_STEP_SEC = 10
const TIMECODE_SAVE_INTERVAL_MS = 5_000
const TIMECODE_RESUME_MARGIN_SEC = 5
const CHROME_HIDE_MS = 2_500
const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 2] as const

function nativeMimeType(url: string): string {
  switch (url.split('?')[0].split('.').pop()?.toLowerCase()) {
    case 'mp4':
      return 'video/mp4'
    case 'ogg':
    case 'ogv':
      return 'video/ogg'
    case 'webm':
      return 'video/webm'
    default:
      return ''
  }
}

const supportsNativeHls = (video: HTMLVideoElement): boolean =>
  Boolean(video.canPlayType('application/vnd.apple.mpegurl') || video.canPlayType('application/x-mpegURL'))

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds)) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':')
}

const subtitleLabel = (track: SubtitleTrackInfo): string =>
  [track.name, track.lang].filter(Boolean).join(' · ') || `Subtitle ${track.id}`

const supportsPiP = (): boolean =>
  typeof document !== 'undefined' && 'pictureInPictureEnabled' in document && Boolean(document.pictureInPictureEnabled)

function bufferedEnd(video: HTMLVideoElement | null): number {
  if (!video?.buffered?.length) return 0
  try {
    return video.buffered.end(video.buffered.length - 1)
  } catch {
    return 0
  }
}

export default function VideoPlayer({
  videoSrc,
  downloadSrc = videoSrc,
  title,
  onNotSupported,
  hls = false,
  heartbeatSrc = '',
  showTrigger = true,
  inlineTrigger = false,
  inlineTriggerPrimary = false,
  initiallyOpen = false,
  onClose,
  captionSrc,
  hash,
  fileIndex,
  initialTimecode = 0,
  trackTimecode = false,
  onViewedChange,
  audioTracks = [],
  audioIndex = 0,
  onAudioIndexChange,
}: VideoPlayerProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery(queryMax('dialog'))
  const { setImmersive } = useModalOpen()

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsInstanceRef = useRef<Hls | null>(null)
  const onNotSupportedRef = useRef(onNotSupported)
  const lastTimecodeSaveRef = useRef(0)
  const resumeAppliedRef = useRef(false)
  const onViewedChangeRef = useRef(onViewedChange)
  const pendingSeekRef = useRef<number | null>(null)
  const chromeHideTimerRef = useRef<number | null>(null)
  const shellRef = useRef<HTMLDivElement | null>(null)

  const [open, setOpen] = useState(initiallyOpen)
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [mediaError, setMediaError] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [pipActive, setPipActive] = useState(false)
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrackInfo[]>([])
  const [activeSubtitleTrack, setActiveSubtitleTrack] = useState(-1)
  const [subtitleMenuOpen, setSubtitleMenuOpen] = useState(false)
  const [audioMenuOpen, setAudioMenuOpen] = useState(false)
  const [rateMenuOpen, setRateMenuOpen] = useState(false)
  const [activeAudioIndex, setActiveAudioIndex] = useState(audioIndex)
  const [playbackSrc, setPlaybackSrc] = useState(videoSrc)

  const shouldPersistTimecode = Boolean(hash && fileIndex != null && trackTimecode)
  const canSwitchAudio = hls && Boolean(hash) && fileIndex != null && audioTracks.length > 1
  const showPip = supportsPiP()

  const dialogStyle: CSSProperties | undefined = isMobile
    ? undefined
    : expanded
      ? PLAYER_DIALOG_EXPANDED
      : PLAYER_DIALOG_NORMAL

  const videoMaxHeight = isMobile
    ? 'calc(100dvh - 2rem)'
    : expanded
      ? 'min(78dvh, calc(100dvh - 7rem))'
      : 'min(56dvh, 28rem)'

  useEffect(() => {
    setPlaybackSrc(videoSrc)
  }, [videoSrc])

  useEffect(() => {
    setActiveAudioIndex(audioIndex)
  }, [audioIndex])

  useEffect(() => {
    onViewedChangeRef.current = onViewedChange
  }, [onViewedChange])

  const saveTimecode = useCallback(
    async (time: number) => {
      if (!shouldPersistTimecode || hash == null || fileIndex == null) return
      try {
        await setViewedFile(hash, fileIndex, time)
        rememberContinueWatching({
          hash,
          fileIndex,
          title: title || hash,
          fileName: title || String(fileIndex),
          timecode: time,
        })
        onViewedChangeRef.current?.()
      } catch {
        // ignore persistence errors — playback should continue
      }
    },
    [fileIndex, hash, shouldPersistTimecode, title],
  )

  const flushTimecode = useCallback(() => {
    const video = videoRef.current
    if (!video || !shouldPersistTimecode) return
    void saveTimecode(video.currentTime)
  }, [saveTimecode, shouldPersistTimecode])

  const closePlayer = useCallback(() => {
    flushTimecode()
    setOpen(false)
    setMediaError(false)
    setSubtitleMenuOpen(false)
    setAudioMenuOpen(false)
    setRateMenuOpen(false)
    setExpanded(false)
    onClose?.()
  }, [flushTimecode, onClose])

  const overlayState = useOverlayState({
    isOpen: open,
    onOpenChange: next => {
      if (next) setOpen(true)
      else closePlayer()
    },
  })

  useSyncModalOpen(open)

  const attachVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node
    setVideoElement(node)
  }, [])

  useEffect(() => {
    onNotSupportedRef.current = onNotSupported
  }, [onNotSupported])

  useEffect(() => {
    if (!open) {
      resumeAppliedRef.current = false
      lastTimecodeSaveRef.current = 0
      pendingSeekRef.current = null
    }
  }, [open])

  useEffect(() => {
    if (!isMobile || !open) return undefined
    setImmersive(true)
    return () => setImmersive(false)
  }, [isMobile, open, setImmersive])

  useEffect(() => {
    const probe = document.createElement('video')
    const supported = hls
      ? Hls.isSupported() || supportsNativeHls(probe)
      : Boolean(probe.canPlayType(nativeMimeType(playbackSrc)))
    if (!supported) onNotSupportedRef.current?.()
  }, [hls, playbackSrc])

  useEffect(() => {
    if (!open || !hls || !videoElement) return undefined
    const video = videoRef.current
    if (!video) return undefined

    let hlsPlayer: Hls | null = null
    let usingNativeHls = false
    setLoading(true)
    setSubtitleTracks([])
    setActiveSubtitleTrack(-1)

    const syncSubtitleTracks = () => {
      const tracks = (hlsPlayer?.subtitleTracks || []).map((track, id) => ({ id, name: track.name, lang: track.lang }))
      setSubtitleTracks(tracks)
    }

    if (Hls.isSupported()) {
      hlsPlayer = new Hls()
      hlsInstanceRef.current = hlsPlayer

      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
        syncSubtitleTracks()
        setActiveSubtitleTrack(hlsPlayer?.subtitleTrack ?? -1)
        video.playbackRate = playbackRate
        video.play().catch(() => {})
      })
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, syncSubtitleTracks)
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACK_SWITCH, (_event, data) => setActiveSubtitleTrack(data.id))
      hlsPlayer.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal || !hlsPlayer) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hlsPlayer.startLoad()
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hlsPlayer.recoverMediaError()
        } else {
          hlsPlayer.stopLoad()
          setLoading(false)
          setMediaError(true)
        }
      })

      hlsPlayer.loadSource(playbackSrc)
      hlsPlayer.attachMedia(video)
    } else if (supportsNativeHls(video)) {
      usingNativeHls = true
      video.src = playbackSrc
      video.load()
      video.playbackRate = playbackRate
      video.play().catch(() => {})
    } else {
      onNotSupportedRef.current?.()
    }

    return () => {
      if (hlsInstanceRef.current === hlsPlayer) hlsInstanceRef.current = null
      hlsPlayer?.destroy()
      if (usingNativeHls) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
      setSubtitleTracks([])
      setActiveSubtitleTrack(-1)
    }
    // playbackRate applied on manifest; remount only when source changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hls, open, videoElement, playbackSrc])

  useEffect(() => {
    if (!open || !heartbeatSrc) return undefined
    const timer = window.setInterval(() => {
      fetch(heartbeatSrc, { cache: 'no-store' }).catch(() => {})
    }, HEARTBEAT_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [heartbeatSrc, open])

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement))
    const onPipChange = () => setPipActive(Boolean(document.pictureInPictureElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('enterpictureinpicture', onPipChange)
    document.addEventListener('leavepictureinpicture', onPipChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('enterpictureinpicture', onPipChange)
      document.removeEventListener('leavepictureinpicture', onPipChange)
    }
  }, [])

  const revealChrome = useCallback(() => {
    setChromeVisible(true)
    if (chromeHideTimerRef.current != null) window.clearTimeout(chromeHideTimerRef.current)
    chromeHideTimerRef.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setChromeVisible(false)
    }, CHROME_HIDE_MS)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    revealChrome()
    return () => {
      if (chromeHideTimerRef.current != null) window.clearTimeout(chromeHideTimerRef.current)
    }
  }, [open, revealChrome])

  useEffect(() => {
    if (!playing) setChromeVisible(true)
    else revealChrome()
  }, [playing, revealChrome])

  const seekRelative = useCallback((deltaSec: number) => {
    const video = videoRef.current
    if (!video) return
    const next = Math.min(Math.max(0, video.currentTime + deltaSec), video.duration || Infinity)
    video.currentTime = next
    setCurrentTime(next)
    revealChrome()
  }, [revealChrome])

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
    revealChrome()
  }, [revealChrome])

  const cyclePlaybackRate = useCallback(
    (direction: 1 | -1) => {
      const idx = PLAYBACK_RATES.indexOf(playbackRate as (typeof PLAYBACK_RATES)[number])
      const current = idx >= 0 ? idx : 1
      const next = PLAYBACK_RATES[Math.min(PLAYBACK_RATES.length - 1, Math.max(0, current + direction))]
      const video = videoRef.current
      if (video) video.playbackRate = next
      setPlaybackRate(next)
      revealChrome()
    },
    [playbackRate, revealChrome],
  )

  const applyPlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (video) video.playbackRate = rate
    setPlaybackRate(rate)
    setRateMenuOpen(false)
    revealChrome()
  }

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return
      }

      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        togglePlayPause()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        seekRelative(-SEEK_STEP_SEC)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        seekRelative(SEEK_STEP_SEC)
      } else if (event.key === 'm' || event.key === 'M') {
        event.preventDefault()
        const video = videoRef.current
        if (!video) return
        video.muted = !video.muted
        setMuted(video.muted)
        revealChrome()
      } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault()
        if (document.fullscreenElement) void document.exitFullscreen()
        else void videoRef.current?.requestFullscreen()
      } else if (event.key === '[') {
        event.preventDefault()
        cyclePlaybackRate(-1)
      } else if (event.key === ']') {
        event.preventDefault()
        cyclePlaybackRate(1)
      } else if (event.key === 'Escape' && expanded && !document.fullscreenElement) {
        setExpanded(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, seekRelative, togglePlayPause, revealChrome, cyclePlaybackRate, expanded])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
    setBuffered(bufferedEnd(video))
    if (!shouldPersistTimecode) return
    const now = Date.now()
    if (now - lastTimecodeSaveRef.current < TIMECODE_SAVE_INTERVAL_MS) return
    lastTimecodeSaveRef.current = now
    void saveTimecode(video.currentTime)
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (!video) return
    const videoDuration = video.duration
    setDuration(videoDuration)
    setBuffered(bufferedEnd(video))
    setLoading(false)
    video.playbackRate = playbackRate

    const pending = pendingSeekRef.current
    if (pending != null && pending > 0 && pending < videoDuration - 1) {
      video.currentTime = pending
      setCurrentTime(pending)
      pendingSeekRef.current = null
      resumeAppliedRef.current = true
      return
    }

    if (
      !resumeAppliedRef.current &&
      trackTimecode &&
      initialTimecode > TIMECODE_RESUME_MARGIN_SEC &&
      initialTimecode < videoDuration - TIMECODE_RESUME_MARGIN_SEC
    ) {
      video.currentTime = initialTimecode
      setCurrentTime(initialTimecode)
      resumeAppliedRef.current = true
    }
  }

  const handleProgress = () => setBuffered(bufferedEnd(videoRef.current))

  const handlePause = () => {
    setPlaying(false)
    flushTimecode()
  }

  const handleSeek = (value: number | number[]) => {
    const video = videoRef.current
    if (!video) return
    const next = Array.isArray(value) ? value[0] : value
    video.currentTime = next
    setCurrentTime(next)
    revealChrome()
  }

  const handleVolumeChange = (value: number | number[]) => {
    const video = videoRef.current
    if (!video) return
    const next = (Array.isArray(value) ? value[0] : value) / 100
    video.volume = next
    setVolume(next)
    setMuted(next === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !muted
    setMuted(prev => !prev)
    revealChrome()
  }

  const enterFullscreen = () => void videoRef.current?.requestFullscreen()
  const exitFullscreen = () => void document.exitFullscreen()

  const togglePiP = async () => {
    const video = videoRef.current
    if (!video || !supportsPiP()) return
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture()
      else await video.requestPictureInPicture()
    } catch {
      // browser may reject PiP
    }
    revealChrome()
  }

  const switchSubtitleTrack = (index: number) => {
    const hlsPlayer = hlsInstanceRef.current
    if (hlsPlayer) {
      hlsPlayer.subtitleDisplay = index >= 0
      hlsPlayer.subtitleTrack = index
    }
    setActiveSubtitleTrack(index)
    setSubtitleMenuOpen(false)
    revealChrome()
  }

  const switchAudioTrack = (index: number) => {
    if (!canSwitchAudio || hash == null || fileIndex == null || index === activeAudioIndex) {
      setAudioMenuOpen(false)
      return
    }
    const video = videoRef.current
    pendingSeekRef.current = video?.currentTime ?? currentTime
    resumeAppliedRef.current = true
    setActiveAudioIndex(index)
    setLoading(true)
    setAudioMenuOpen(false)
    if (onAudioIndexChange) {
      onAudioIndexChange(index)
    } else {
      setPlaybackSrc(gstreamerMasterUrl(hash, fileIndex, index))
    }
    revealChrome()
  }

  const openPlayer = () => {
    setLoading(true)
    setMediaError(false)
    setOpen(true)
  }

  const onShellPointerMove = (event: ReactPointerEvent) => {
    if (event.pointerType === 'touch') return
    revealChrome()
  }

  const chromeIconBtn = `${iconBtn} text-white hover-fine:bg-white/10`
  const showChrome = chromeVisible || !playing || mediaError
  const bufferedPct = duration > 0 ? Math.min(100, (buffered / duration) * 100) : 0

  return (
    <>
      {showTrigger &&
        (inlineTrigger ? (
          <Button
            variant={inlineTriggerPrimary ? 'primary' : 'secondary'}
            size='sm'
            onPress={openPlayer}
            className={inlineTriggerPrimary ? 'min-h-10 shrink-0 px-3' : 'min-h-10 min-w-[72px] max-w-full flex-1'}
          >
            {inlineTriggerPrimary ? <Play fill='currentColor' aria-hidden /> : null}
            {t('Play')}
          </Button>
        ) : (
          <Button variant='secondary' onPress={openPlayer}>
            <Play aria-hidden />
            {t('Play')}
          </Button>
        ))}

      <Modal state={overlayState}>
        <Modal.Backdrop isDismissable={!fullscreen}>
          <Modal.Container size={isMobile ? 'full' : 'lg'} scroll='inside' className={isMobile ? undefined : 'p-4'}>
            <Modal.Dialog className='overflow-hidden bg-black text-white' style={dialogStyle}>
              <Modal.Body className='gap-0 bg-black p-0'>
                <div
                  ref={shellRef}
                  className='relative w-full bg-black'
                  style={{ minHeight: isMobile ? 240 : expanded ? 420 : 320 }}
                  onPointerMove={onShellPointerMove}
                  onPointerDown={revealChrome}
                >
                  <video
                    autoPlay
                    ref={attachVideoNode}
                    src={hls ? undefined : playbackSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onProgress={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onWaiting={() => setLoading(true)}
                    onCanPlay={() => {
                      setLoading(false)
                      setMediaError(false)
                    }}
                    onPlaying={() => {
                      setLoading(false)
                      setPlaying(true)
                    }}
                    onPlay={() => setPlaying(true)}
                    onPause={handlePause}
                    onClick={togglePlayPause}
                    onError={() => {
                      setLoading(false)
                      setMediaError(true)
                    }}
                    className='block w-full cursor-pointer bg-black'
                    style={{ maxHeight: videoMaxHeight, minHeight: isMobile ? 200 : 280 }}
                  >
                    {!hls && captionSrc ? <track kind='captions' src={captionSrc} default /> : null}
                  </video>

                  {loading ? (
                    <div className='pointer-events-none absolute inset-0 grid place-items-center bg-black/45'>
                      <div className='flex flex-col items-center gap-2'>
                        <Spinner size='lg' className='text-white' />
                        <p className='text-sm text-white/80'>{t('Buffering', { defaultValue: 'Buffering…' })}</p>
                      </div>
                    </div>
                  ) : null}

                  {mediaError ? (
                    <div className='absolute inset-x-0 top-0 z-20'>
                      <Alert status='danger' className='rounded-none'>
                        <Alert.Content>
                          <Alert.Title>{t('PlaybackError')}</Alert.Title>
                          {downloadSrc ? (
                            <Button
                              variant='ghost'
                              size='sm'
                              onPress={() => window.open(downloadSrc, '_blank', 'noopener,noreferrer')}
                            >
                              {t('OpenLink')}
                            </Button>
                          ) : null}
                        </Alert.Content>
                      </Alert>
                    </div>
                  ) : null}

                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/80 to-transparent px-3 pb-10 pt-3 transition-opacity duration-300 ${
                      showChrome ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className='pointer-events-auto flex items-center gap-2'>
                      <p className='min-w-0 flex-1 truncate text-sm font-medium text-white' title={title || t('Play')}>
                        {title || t('Play')}
                      </p>
                      <Button
                        isIconOnly
                        variant='ghost'
                        className={chromeIconBtn}
                        aria-label={t('Close')}
                        onPress={closePlayer}
                      >
                        <X aria-hidden />
                      </Button>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-3 pb-3 pt-12 transition-opacity duration-300 ${
                      showChrome ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className='relative mb-2'>
                      <div
                        className='pointer-events-none absolute inset-y-0 left-0 rounded-full bg-white/25'
                        style={{ width: `${bufferedPct}%` }}
                      />
                      <Slider
                        value={currentTime}
                        maxValue={duration || 0}
                        onChange={handleSeek}
                        aria-label={t('Seconds')}
                        className='relative'
                      >
                        <Slider.Track className='bg-white/15'>
                          <Slider.Fill className='bg-accent' />
                          <Slider.Thumb />
                        </Slider.Track>
                      </Slider>
                    </div>

                    <div className='flex flex-wrap items-center gap-1.5'>
                      <Tooltip>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={playing ? t('Pause') : t('Play')}
                            onPress={togglePlayPause}
                          >
                            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{playing ? t('Pause') : t('Play')}</Tooltip.Content>
                      </Tooltip>

                      <Tooltip>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={t('Rewind-10-Sec')}
                            onPress={() => seekRelative(-SEEK_STEP_SEC)}
                          >
                            <RotateCcw aria-hidden />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{t('Rewind-10-Sec')}</Tooltip.Content>
                      </Tooltip>

                      <Tooltip>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={t('Forward-10-Sec')}
                            onPress={() => seekRelative(SEEK_STEP_SEC)}
                          >
                            <RotateCw aria-hidden />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{t('Forward-10-Sec')}</Tooltip.Content>
                      </Tooltip>

                      <span className='min-w-[100px] px-1 text-xs tabular-nums text-white/80'>
                        {formatDuration(currentTime)} / {formatDuration(duration)}
                      </span>

                      <Tooltip>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={muted ? t('Unmute') : t('Mute')}
                            onPress={toggleMute}
                          >
                            {muted ? <VolumeX aria-hidden /> : <Volume2 aria-hidden />}
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{muted ? t('Unmute') : t('Mute')}</Tooltip.Content>
                      </Tooltip>

                      <Slider
                        value={volume * 100}
                        maxValue={100}
                        onChange={handleVolumeChange}
                        className='hidden w-24 sm:flex'
                        aria-label={t('Volume', { defaultValue: 'Volume' })}
                      >
                        <Slider.Track className='bg-white/15'>
                          <Slider.Fill className='bg-accent' />
                          <Slider.Thumb />
                        </Slider.Track>
                      </Slider>

                      {canSwitchAudio ? (
                        <Popover isOpen={audioMenuOpen} onOpenChange={setAudioMenuOpen}>
                          <Popover.Trigger>
                            <Button
                              isIconOnly
                              variant='ghost'
                              className={chromeIconBtn}
                              aria-label={t('SelectAudioTrack', { defaultValue: 'Select audio track' })}
                            >
                              <Music2 aria-hidden />
                            </Button>
                          </Popover.Trigger>
                          <Popover.Content className='max-h-72 w-72 overflow-y-auto p-1'>
                            {audioTracks.map((track, index) => {
                              const { title: trackTitle, meta } = formatAudioTrackDisplay(track, index)
                              const selected = index === activeAudioIndex
                              return (
                                <Button
                                  key={index}
                                  variant={selected ? 'secondary' : 'ghost'}
                                  className='h-auto w-full justify-start gap-2 py-2'
                                  onPress={() => switchAudioTrack(index)}
                                >
                                  <span className='min-w-0 flex-1 text-left'>
                                    <span className='block truncate text-sm font-medium'>{trackTitle}</span>
                                    {meta ? <span className='mt-0.5 block truncate text-xs text-muted'>{meta}</span> : null}
                                  </span>
                                </Button>
                              )
                            })}
                          </Popover.Content>
                        </Popover>
                      ) : null}

                      {subtitleTracks.length > 0 ? (
                        <Popover isOpen={subtitleMenuOpen} onOpenChange={setSubtitleMenuOpen}>
                          <Popover.Trigger>
                            <Button
                              isIconOnly
                              variant={activeSubtitleTrack >= 0 ? 'primary' : 'ghost'}
                              className={activeSubtitleTrack >= 0 ? iconBtn : chromeIconBtn}
                              aria-label={t('GStreamer.Subtitles', { defaultValue: 'Subtitles' })}
                            >
                              <Captions aria-hidden />
                            </Button>
                          </Popover.Trigger>
                          <Popover.Content>
                            <ListBox
                              selectedKeys={[String(activeSubtitleTrack)]}
                              onSelectionChange={keys => {
                                const value = [...keys][0]
                                switchSubtitleTrack(value == null ? -1 : Number(value))
                              }}
                            >
                              <ListBox.Item id='-1'>{t('None')}</ListBox.Item>
                              {subtitleTracks.map(track => (
                                <ListBox.Item key={track.id} id={String(track.id)}>
                                  {subtitleLabel(track)}
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Popover.Content>
                        </Popover>
                      ) : null}

                      <Popover isOpen={rateMenuOpen} onOpenChange={setRateMenuOpen}>
                        <Popover.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={t('PlaybackSpeed', { defaultValue: 'Playback speed' })}
                          >
                            <Gauge aria-hidden />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content className='min-w-[8rem] p-1'>
                          {PLAYBACK_RATES.map(rate => (
                            <Button
                              key={rate}
                              variant={rate === playbackRate ? 'secondary' : 'ghost'}
                              className='w-full justify-start'
                              onPress={() => applyPlaybackRate(rate)}
                            >
                              {rate === 1 ? '1×' : `${rate}×`}
                            </Button>
                          ))}
                        </Popover.Content>
                      </Popover>

                      <div className='flex-1' />

                      {showPip ? (
                        <Tooltip>
                          <Tooltip.Trigger>
                            <Button
                              isIconOnly
                              variant={pipActive ? 'primary' : 'ghost'}
                              className={pipActive ? iconBtn : chromeIconBtn}
                              aria-label={t('PictureInPicture', { defaultValue: 'Picture in picture' })}
                              onPress={() => void togglePiP()}
                            >
                              <PictureInPicture2 aria-hidden />
                            </Button>
                          </Tooltip.Trigger>
                          <Tooltip.Content>{t('PictureInPicture', { defaultValue: 'Picture in picture' })}</Tooltip.Content>
                        </Tooltip>
                      ) : null}

                      {!isMobile ? (
                        <Tooltip>
                          <Tooltip.Trigger>
                            <Button
                              isIconOnly
                              variant='ghost'
                              className={chromeIconBtn}
                              aria-label={
                                expanded
                                  ? t('CollapsePlayer', { defaultValue: 'Collapse player' })
                                  : t('ExpandPlayer', { defaultValue: 'Expand player' })
                              }
                              onPress={() => {
                                setExpanded(prev => !prev)
                                revealChrome()
                              }}
                            >
                              {expanded ? <Minimize2 aria-hidden /> : <Maximize2 aria-hidden />}
                            </Button>
                          </Tooltip.Trigger>
                          <Tooltip.Content>
                            {expanded
                              ? t('CollapsePlayer', { defaultValue: 'Collapse player' })
                              : t('ExpandPlayer', { defaultValue: 'Expand player' })}
                          </Tooltip.Content>
                        </Tooltip>
                      ) : null}

                      <Tooltip>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            variant='ghost'
                            className={chromeIconBtn}
                            aria-label={fullscreen ? t('ExitFullscreen') : t('Fullscreen')}
                            onPress={fullscreen ? exitFullscreen : enterFullscreen}
                          >
                            {fullscreen ? <Minimize aria-hidden /> : <Maximize aria-hidden />}
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>{fullscreen ? t('ExitFullscreen') : t('Fullscreen')}</Tooltip.Content>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}
