import { useCallback, useEffect, useRef, useState } from 'react'
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
import { Captions, Maximize, Minimize, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { setViewedFile } from 'shared/api/viewed'
import { rememberContinueWatching } from 'shared/lib/continueWatching'
import { queryMax } from 'shared/theme/breakpoints'
import { useModalOpen, useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { iconBtn } from 'shared/ui/controlClasses'

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

  const [open, setOpen] = useState(initiallyOpen)
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [mediaError, setMediaError] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrackInfo[]>([])
  const [activeSubtitleTrack, setActiveSubtitleTrack] = useState(-1)
  const [subtitleMenuOpen, setSubtitleMenuOpen] = useState(false)

  const shouldPersistTimecode = Boolean(hash && fileIndex != null && trackTimecode)

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
    }
  }, [open])

  // Hide the bottom-nav chrome behind the video on small screens.
  useEffect(() => {
    if (!isMobile || !open) return undefined
    setImmersive(true)
    return () => setImmersive(false)
  }, [isMobile, open, setImmersive])

  useEffect(() => {
    const probe = document.createElement('video')
    const supported = hls
      ? Hls.isSupported() || supportsNativeHls(probe)
      : Boolean(probe.canPlayType(nativeMimeType(videoSrc)))
    if (!supported) onNotSupportedRef.current?.()
  }, [hls, videoSrc])

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

      hlsPlayer.loadSource(videoSrc)
      hlsPlayer.attachMedia(video)
    } else if (supportsNativeHls(video)) {
      usingNativeHls = true
      video.src = videoSrc
      video.load()
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
  }, [hls, open, videoElement, videoSrc])

  // Keeps a GStreamer transcode session alive while the player stays open.
  useEffect(() => {
    if (!open || !heartbeatSrc) return undefined
    const timer = window.setInterval(() => {
      fetch(heartbeatSrc, { cache: 'no-store' }).catch(() => {})
    }, HEARTBEAT_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [heartbeatSrc, open])

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const seekRelative = useCallback((deltaSec: number) => {
    const video = videoRef.current
    if (!video) return
    const next = Math.min(Math.max(0, video.currentTime + deltaSec), video.duration || Infinity)
    video.currentTime = next
    setCurrentTime(next)
  }, [])

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }, [])

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
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, seekRelative, togglePlayPause])

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
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
    setLoading(false)
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
  }

  const enterFullscreen = () => videoRef.current?.requestFullscreen()
  const exitFullscreen = () => document.exitFullscreen()

  const switchSubtitleTrack = (index: number) => {
    const hlsPlayer = hlsInstanceRef.current
    if (hlsPlayer) {
      hlsPlayer.subtitleDisplay = index >= 0
      hlsPlayer.subtitleTrack = index
    }
    setActiveSubtitleTrack(index)
    setSubtitleMenuOpen(false)
  }

  const openPlayer = () => {
    setLoading(true)
    setMediaError(false)
    setOpen(true)
  }

  const chromeIconBtn = `${iconBtn} text-white hover-fine:bg-white/10`

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
        <Modal.Backdrop>
          <Modal.Container size={isMobile ? 'full' : 'lg'} scroll='inside'>
            <Modal.Dialog className='bg-black'>
              <Modal.Header className='flex items-center gap-2 border-b border-white/10 bg-black py-2 text-white'>
                <Modal.Heading className='min-w-0 flex-1 truncate text-base'>{title || t('Play')}</Modal.Heading>
                <Modal.CloseTrigger aria-label={t('Close')} className={chromeIconBtn}>
                  <X aria-hidden />
                </Modal.CloseTrigger>
              </Modal.Header>

              {mediaError ? (
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
              ) : null}

              <Modal.Body className='gap-0 bg-black p-0'>
                <div className='relative w-full bg-black' style={{ minHeight: isMobile ? 240 : 360 }}>
                  <video
                    autoPlay
                    ref={attachVideoNode}
                    src={hls ? undefined : videoSrc}
                    onTimeUpdate={handleTimeUpdate}
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
                    onError={() => {
                      setLoading(false)
                      setMediaError(true)
                    }}
                    className='block w-full'
                    style={{ maxHeight: isMobile ? 'calc(100dvh - 180px)' : '70vh' }}
                  >
                    {!hls && captionSrc ? <track kind='captions' src={captionSrc} default /> : null}
                  </video>
                  {loading ? (
                    <div className='absolute inset-0 grid place-items-center bg-black/40'>
                      <Spinner size='lg' className='text-white' />
                    </div>
                  ) : null}
                </div>
              </Modal.Body>

              <Modal.Footer className='flex flex-col gap-3 border-t border-white/10 bg-neutral-950 p-3 text-white'>
                <Slider value={currentTime} maxValue={duration || 0} onChange={handleSeek} aria-label={t('Seconds')}>
                  <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                  </Slider.Track>
                </Slider>

                <div className='flex flex-wrap items-center gap-2'>
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

                  <span className='min-w-[100px] text-xs tabular-nums text-white/80'>
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

                  {/* A drag-precise slider is fiddly on touch and duplicates the hardware volume
                   * buttons — keep it for mouse/trackpad users, mute button covers touch. */}
                  <Slider
                    value={volume * 100}
                    maxValue={100}
                    onChange={handleVolumeChange}
                    className='hidden w-24 sm:flex'
                    aria-label={t('Volume', { defaultValue: 'Volume' })}
                  >
                    <Slider.Track>
                      <Slider.Fill />
                      <Slider.Thumb />
                    </Slider.Track>
                  </Slider>

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

                  <div className='flex-1' />

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
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}
