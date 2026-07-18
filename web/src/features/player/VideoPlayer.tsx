import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import axios from 'axios'
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
import { gstreamerMasterUrl, gstreamerProbeUrl } from 'shared/lib/gstreamer'
import { queryMax } from 'shared/theme/breakpoints'
import { useModalOpen, useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { iconBtn } from 'shared/ui/controlClasses'
import { PLAYER_DIALOG_EXPANDED, PLAYER_DIALOG_NORMAL } from 'shared/ui/dialogSizes'

import { extractAudioTracks, formatAudioTrackDisplay, type ProbeTrack } from './audioTrackLabel'

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
const SEEK_LONG_STEP_SEC = 60
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
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--:--'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':')
}

function readFiniteDuration(video: HTMLVideoElement | null): number {
  if (!video) return 0
  const d = video.duration
  return Number.isFinite(d) && d > 0 ? d : 0
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
  const [resolvedAudioTracks, setResolvedAudioTracks] = useState<ProbeTrack[]>(audioTracks)
  const [scrubPreview, setScrubPreview] = useState<{ ratio: number; time: number } | null>(null)
  const [showRemaining, setShowRemaining] = useState(false)

  const shouldPersistTimecode = Boolean(hash && fileIndex != null && trackTimecode)
  const canSwitchAudio = hls && Boolean(hash) && fileIndex != null && resolvedAudioTracks.length > 1
  const showPip = supportsPiP()

  const dialogStyle: CSSProperties | undefined = isMobile
    ? undefined
    : expanded
      ? PLAYER_DIALOG_EXPANDED
      : PLAYER_DIALOG_NORMAL

  const videoMaxHeight = isMobile
    ? 'calc(100dvh - 2rem)'
    : expanded
      ? 'min(82dvh, calc(100dvh - 5rem))'
      : 'min(62dvh, 36rem)'

  const syncDuration = useCallback((fromVideo?: HTMLVideoElement | null, hint?: number) => {
    const hinted = hint != null && Number.isFinite(hint) && hint > 0 ? hint : 0
    const fromEl = readFiniteDuration(fromVideo ?? videoRef.current)
    const next = Math.max(hinted, fromEl)
    if (next > 0) setDuration(prev => (Math.abs(prev - next) > 0.25 ? next : prev))
  }, [])
  useEffect(() => {
    setPlaybackSrc(videoSrc)
  }, [videoSrc])

  useEffect(() => {
    setActiveAudioIndex(audioIndex)
  }, [audioIndex])

  useEffect(() => {
    if (audioTracks.length) setResolvedAudioTracks(audioTracks)
  }, [audioTracks])

  /** If launcher opened without a track list (or GST probe raced), refresh from /gst/.../probe. */
  useEffect(() => {
    if (!open || !hls || !hash || fileIndex == null) return undefined
    if (resolvedAudioTracks.length > 0) return undefined
    let cancelled = false
    void axios
      .get(gstreamerProbeUrl(hash, fileIndex))
      .then(({ data }) => {
        if (cancelled) return
        setResolvedAudioTracks(extractAudioTracks(data))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [open, hls, hash, fileIndex, resolvedAudioTracks.length])

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
        syncDuration(video)
        video.play().catch(() => {})
      })
      hlsPlayer.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
        const total = data.details?.totalduration
        if (typeof total === 'number') syncDuration(video, total)
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
  }, [hls, open, videoElement, playbackSrc, syncDuration])

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
        seekRelative(event.shiftKey ? -SEEK_LONG_STEP_SEC : -SEEK_STEP_SEC)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        seekRelative(event.shiftKey ? SEEK_LONG_STEP_SEC : SEEK_STEP_SEC)
      } else if (event.key === 'j' || event.key === 'J') {
        event.preventDefault()
        seekRelative(-SEEK_LONG_STEP_SEC)
      } else if (event.key === 'l' || event.key === 'L') {
        event.preventDefault()
        seekRelative(SEEK_LONG_STEP_SEC)
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
    syncDuration(video)
    const videoDuration = readFiniteDuration(video) || duration
    setBuffered(bufferedEnd(video))
    setLoading(false)
    video.playbackRate = playbackRate

    const pending = pendingSeekRef.current
    if (pending != null && pending > 0 && (videoDuration <= 0 || pending < videoDuration - 1)) {
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
      videoDuration > 0 &&
      initialTimecode < videoDuration - TIMECODE_RESUME_MARGIN_SEC
    ) {
      video.currentTime = initialTimecode
      setCurrentTime(initialTimecode)
      resumeAppliedRef.current = true
    }
  }

  const handleDurationChange = () => syncDuration(videoRef.current)

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

  const updateScrubPreview = (clientX: number, target: HTMLElement) => {
    if (duration <= 0) {
      setScrubPreview(null)
      return
    }
    const rect = target.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    setScrubPreview({ ratio, time: ratio * duration })
  }

  const handleVideoDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    if (ratio < 0.33) seekRelative(-SEEK_STEP_SEC)
    else if (ratio > 0.67) seekRelative(SEEK_STEP_SEC)
    else void videoRef.current?.requestFullscreen()
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

  const chromeIconBtn =
    `${iconBtn} size-9 min-h-9 min-w-9 rounded-full text-white/90 hover-fine:bg-white/12 hover-fine:text-white`
  const showChrome = chromeVisible || !playing || mediaError
  const bufferedPct = duration > 0 ? Math.min(100, (buffered / duration) * 100) : 0
  const playedPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0

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
        <Modal.Backdrop isDismissable={!fullscreen} className='bg-black/70 backdrop-blur-sm'>
          <Modal.Container size={isMobile ? 'full' : 'lg'} scroll='inside' className={isMobile ? undefined : 'p-5 sm:p-6'}>
            <Modal.Dialog
              className='overflow-hidden border border-white/10 bg-[#0a0e0c] text-white shadow-2xl shadow-black/50'
              style={dialogStyle}
            >
              <Modal.Body className='gap-0 p-0'>
                <div
                  ref={shellRef}
                  className='relative w-full overflow-hidden bg-black'
                  onPointerMove={onShellPointerMove}
                  onPointerDown={revealChrome}
                  onDoubleClick={handleVideoDoubleClick}
                >
                  <video
                    autoPlay
                    ref={attachVideoNode}
                    src={hls ? undefined : playbackSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onProgress={handleProgress}
                    onLoadedMetadata={handleLoadedMetadata}
                    onDurationChange={handleDurationChange}
                    onWaiting={() => setLoading(true)}
                    onCanPlay={() => {
                      setLoading(false)
                      setMediaError(false)
                      syncDuration(videoRef.current)
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
                    className='block h-auto w-full cursor-pointer bg-black object-contain'
                    style={{ maxHeight: videoMaxHeight, minHeight: isMobile ? 220 : 280 }}
                  >
                    {!hls && captionSrc ? <track kind='captions' src={captionSrc} default /> : null}
                  </video>

                  {loading ? (
                    <div className='pointer-events-none absolute inset-0 grid place-items-center bg-black/50'>
                      <div className='flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md'>
                        <Spinner size='lg' className='text-accent' />
                        <p className='text-sm font-medium text-white/85'>{t('Buffering', { defaultValue: 'Buffering…' })}</p>
                      </div>
                    </div>
                  ) : null}

                  {!playing && !loading && !mediaError && showChrome ? (
                    <button
                      type='button'
                      className='absolute inset-0 z-[5] grid place-items-center bg-transparent'
                      onClick={togglePlayPause}
                      aria-label={t('Play')}
                    >
                      <span className='flex size-[4.25rem] items-center justify-center rounded-full border border-white/25 bg-white/15 text-white shadow-lg shadow-black/40 backdrop-blur-md transition hover-fine:scale-105 hover-fine:bg-accent/90 hover-fine:text-accent-foreground'>
                        <Play className='size-8 translate-x-0.5' fill='currentColor' aria-hidden />
                      </span>
                    </button>
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
                    className={`pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/75 via-black/20 to-transparent px-4 pb-16 pt-3.5 transition-opacity duration-300 ${
                      showChrome ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className='pointer-events-auto flex items-start gap-3'>
                      <p className='min-w-0 flex-1 truncate text-sm font-semibold text-white drop-shadow' title={title || t('Play')}>
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
                    className={`absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-20 transition-opacity duration-300 ${
                      showChrome ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className='rounded-2xl border border-white/10 bg-black/55 px-3 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-xl'>
                      <div
                        className='group relative mb-2.5 px-0.5'
                        onPointerMove={event => updateScrubPreview(event.clientX, event.currentTarget)}
                        onPointerLeave={() => setScrubPreview(null)}
                      >
                        {scrubPreview && duration > 0 ? (
                          <div
                            className='pointer-events-none absolute bottom-full z-20 mb-2 -translate-x-1/2 rounded-md bg-black/85 px-2 py-1 text-[11px] font-medium tabular-nums text-white shadow-lg'
                            style={{ left: `${scrubPreview.ratio * 100}%` }}
                          >
                            {formatDuration(scrubPreview.time)}
                          </div>
                        ) : null}
                        <div className='pointer-events-none absolute inset-y-[7px] left-0 right-0 h-1 overflow-hidden rounded-full bg-white/15 group-hover:inset-y-[6px] group-hover:h-1.5'>
                          <div className='absolute inset-y-0 left-0 bg-white/30' style={{ width: `${bufferedPct}%` }} />
                          <div className='absolute inset-y-0 left-0 bg-accent' style={{ width: `${playedPct}%` }} />
                        </div>
                        <Slider
                          value={currentTime}
                          maxValue={duration > 0 ? duration : Math.max(currentTime, 1)}
                          onChange={handleSeek}
                          aria-label={t('Seconds')}
                          className='relative'
                        >
                          <Slider.Track className='h-1 bg-transparent group-hover:h-1.5'>
                            <Slider.Fill className='bg-transparent' />
                            <Slider.Thumb className='size-3 border-0 bg-white shadow-md after:hidden' />
                          </Slider.Track>
                        </Slider>
                      </div>

                      <div className='flex flex-wrap items-center gap-x-2 gap-y-1.5'>
                        <div className='flex items-center gap-0.5'>
                          <Tooltip>
                            <Tooltip.Trigger>
                              <Button
                                isIconOnly
                                variant='ghost'
                                className={chromeIconBtn}
                                aria-label={playing ? t('Pause') : t('Play')}
                                onPress={togglePlayPause}
                              >
                                {playing ? <Pause aria-hidden /> : <Play fill='currentColor' aria-hidden />}
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

                          <button
                            type='button'
                            className='ml-1 min-w-[7.5rem] rounded-md px-1 text-left text-xs tabular-nums tracking-wide text-white/75 hover-fine:bg-white/10 hover-fine:text-white'
                            title={t('ToggleTimeDisplay', { defaultValue: 'Toggle remaining time' })}
                            onClick={() => setShowRemaining(prev => !prev)}
                          >
                            {formatDuration(currentTime)}
                            <span className='text-white/35'> / </span>
                            {showRemaining && duration > 0
                              ? `-${formatDuration(Math.max(0, duration - currentTime))}`
                              : formatDuration(duration)}
                          </button>
                        </div>

                        <div className='mx-1 hidden h-4 w-px bg-white/15 sm:block' />

                        <div className='flex items-center gap-0.5'>
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
                            <Slider.Track className='h-1 bg-white/15'>
                              <Slider.Fill className='bg-accent' />
                              <Slider.Thumb className='size-3 border-0 bg-white after:hidden' />
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
                              <Popover.Content className='max-h-72 w-72 overflow-y-auto border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl'>
                                {resolvedAudioTracks.map((track, index) => {
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
                                        {meta ? (
                                          <span className='mt-0.5 block truncate text-xs text-muted'>{meta}</span>
                                        ) : null}
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
                              <Popover.Content className='border border-white/10 bg-neutral-950/95 backdrop-blur-xl'>
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
                            <Popover.Content className='min-w-[8rem] border border-white/10 bg-neutral-950/95 p-1 backdrop-blur-xl'>
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
                        </div>

                        <div className='ml-auto flex items-center gap-0.5'>
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
                              <Tooltip.Content>
                                {t('PictureInPicture', { defaultValue: 'Picture in picture' })}
                              </Tooltip.Content>
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
