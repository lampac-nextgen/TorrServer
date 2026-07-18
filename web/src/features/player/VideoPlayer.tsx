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
import { Captions, Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { queryMax } from 'shared/theme/breakpoints'
import { useModalOpen, useSyncModalOpen } from 'shared/ui/ModalOpenContext'

export interface VideoPlayerProps {
  videoSrc: string
  downloadSrc?: string
  title?: string
  onNotSupported?: () => void
  hls?: boolean
  heartbeatSrc?: string
  showTrigger?: boolean
  inlineTrigger?: boolean
  initiallyOpen?: boolean
  onClose?: () => void
}

interface SubtitleTrackInfo {
  id: number
  name?: string
  lang?: string
}

const HEARTBEAT_INTERVAL_MS = 30_000

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
  initiallyOpen = false,
  onClose,
}: VideoPlayerProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery(queryMax('dialog'))
  const { setImmersive } = useModalOpen()

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsInstanceRef = useRef<Hls | null>(null)
  const onNotSupportedRef = useRef(onNotSupported)

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

  const closePlayer = useCallback(() => {
    setOpen(false)
    setMediaError(false)
    setSubtitleMenuOpen(false)
    onClose?.()
  }, [onClose])

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

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    setLoading(false)
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

  return (
    <>
      {showTrigger &&
        (inlineTrigger ? (
          <Button variant='secondary' size='sm' onPress={openPlayer} className='min-w-[72px] max-w-full flex-1'>
            {t('Play')}
          </Button>
        ) : (
          <Button variant='secondary' onPress={openPlayer}>
            <Play className='size-4' />
            {t('Play')}
          </Button>
        ))}

      <Modal state={overlayState}>
        <Modal.Backdrop>
          <Modal.Container
            size={isMobile ? 'full' : 'lg'}
            scroll='inside'
            className={isMobile ? 'ts-immersive' : undefined}
          >
            <Modal.Dialog className='bg-black'>
              <Modal.Header className='flex items-center gap-2 border-b border-white/10 bg-black py-2 text-white'>
                <Modal.Heading className='min-w-0 flex-1 truncate text-base'>{title || t('Play')}</Modal.Heading>
                <Modal.CloseTrigger aria-label={t('Close')} className='text-white hover:bg-white/10'>
                  <X className='size-4' />
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
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    className='block w-full'
                    style={{ maxHeight: isMobile ? 'calc(100dvh - 180px)' : '70vh' }}
                  />
                  {loading ? (
                    <div className='absolute inset-0 grid place-items-center bg-black/40'>
                      <Spinner size='lg' className='text-white' />
                    </div>
                  ) : null}
                </div>

                <div className='flex flex-col gap-3 bg-neutral-950 p-3 text-white'>
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
                          size='sm'
                          variant='ghost'
                          className='text-white hover:bg-white/10'
                          onPress={togglePlayPause}
                        >
                          {playing ? <Pause className='size-4' /> : <Play className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{playing ? t('Pause') : t('Play')}</Tooltip.Content>
                    </Tooltip>

                    <span className='min-w-[100px] text-xs tabular-nums text-white/80'>
                      {formatDuration(currentTime)} / {formatDuration(duration)}
                    </span>

                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          size='sm'
                          variant='ghost'
                          className='text-white hover:bg-white/10'
                          onPress={toggleMute}
                        >
                          {muted ? <VolumeX className='size-4' /> : <Volume2 className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{muted ? t('Unmute') : t('Mute')}</Tooltip.Content>
                    </Tooltip>

                    <Slider
                      value={volume * 100}
                      maxValue={100}
                      onChange={handleVolumeChange}
                      className='w-24'
                      aria-label={t('Mute')}
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
                            size='sm'
                            variant={activeSubtitleTrack >= 0 ? 'primary' : 'ghost'}
                            className={activeSubtitleTrack >= 0 ? '' : 'text-white hover:bg-white/10'}
                            aria-label={t('GStreamer.Subtitles', { defaultValue: 'Subtitles' })}
                          >
                            <Captions className='size-4' />
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
                          size='sm'
                          variant='ghost'
                          className='text-white hover:bg-white/10'
                          onPress={fullscreen ? exitFullscreen : enterFullscreen}
                        >
                          {fullscreen ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{fullscreen ? t('ExitFullscreen') : t('Fullscreen')}</Tooltip.Content>
                    </Tooltip>
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
