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
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
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

function getMimeType(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase()
  switch (ext) {
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

const canPlayNativeHls = (video: HTMLVideoElement) =>
  Boolean(video.canPlayType('application/vnd.apple.mpegurl') || video.canPlayType('application/x-mpegURL'))

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

type SubtitleTrackInfo = { id: number; name?: string; lang?: string }

const subtitleLabel = (track: SubtitleTrackInfo) => {
  const parts = [track.name, track.lang].filter(Boolean)
  return parts.length ? parts.join(' · ') : `Subtitle ${track.id}`
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
  initiallyOpen = false,
  onClose,
}: VideoPlayerProps) {
  const { t } = useTranslation()
  const isMobile = useMediaQuery(queryMax('dialog'))
  const { setImmersive } = useModalOpen()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
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
  const [subtitleTrack, setSubtitleTrack] = useState(-1)
  const [subtitlesOpen, setSubtitlesOpen] = useState(false)

  const state = useOverlayState({
    isOpen: open,
    onOpenChange: next => {
      if (!next) closePlayer()
      else setOpen(true)
    },
  })

  useSyncModalOpen(open)

  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node
    setVideoElement(node)
  }, [])

  useEffect(() => {
    onNotSupportedRef.current = onNotSupported
  }, [onNotSupported])

  useEffect(() => {
    if (!isMobile || !open) return
    setImmersive(true)
    return () => setImmersive(false)
  }, [isMobile, open, setImmersive])

  useEffect(() => {
    const vid = document.createElement('video')
    const supported = hls ? Hls.isSupported() || canPlayNativeHls(vid) : Boolean(vid.canPlayType(getMimeType(videoSrc)))
    if (!supported) onNotSupportedRef.current?.()
  }, [hls, videoSrc])

  useEffect(() => {
    if (!open || !hls || !videoElement) return undefined

    const video = videoElement
    let hlsPlayer: Hls | null = null
    let nativeHls = false
    setLoading(true)
    setSubtitleTracks([])
    setSubtitleTrack(-1)

    if (Hls.isSupported()) {
      hlsPlayer = new Hls()
      hlsRef.current = hlsPlayer
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
        const tracks = (hlsPlayer?.subtitleTracks || []).map((track, id) => ({
          id,
          name: track.name,
          lang: track.lang,
        }))
        setSubtitleTracks(tracks)
        setSubtitleTrack(hlsPlayer?.subtitleTrack ?? -1)
        video.play().catch(() => {})
      })
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
        const tracks = (hlsPlayer?.subtitleTracks || []).map((track, id) => ({
          id,
          name: track.name,
          lang: track.lang,
        }))
        setSubtitleTracks(tracks)
      })
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACK_SWITCH, (_, data) => {
        setSubtitleTrack(data.id)
      })
      hlsPlayer.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hlsPlayer!.startLoad()
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hlsPlayer!.recoverMediaError()
        } else {
          hlsPlayer!.stopLoad()
          setLoading(false)
          setMediaError(true)
        }
      })
      hlsPlayer.loadSource(videoSrc)
      hlsPlayer.attachMedia(video)
    } else if (canPlayNativeHls(video)) {
      nativeHls = true
      video.src = videoSrc
      video.load()
      video.play().catch(() => {})
    } else {
      onNotSupportedRef.current?.()
    }

    return () => {
      if (hlsRef.current === hlsPlayer) hlsRef.current = null
      if (hlsPlayer) hlsPlayer.destroy()
      if (nativeHls) {
        video.pause()
        video.removeAttribute('src')
        video.load()
      }
      setSubtitleTracks([])
      setSubtitleTrack(-1)
    }
  }, [hls, open, videoElement, videoSrc])

  useEffect(() => {
    if (!open || !heartbeatSrc) return undefined
    const timer = window.setInterval(() => {
      fetch(heartbeatSrc, { cache: 'no-store' }).catch(() => {})
    }, 30 * 1000)
    return () => window.clearInterval(timer)
  }, [heartbeatSrc, open])

  useEffect(() => {
    const onFull = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFull)
    return () => document.removeEventListener('fullscreenchange', onFull)
  }, [])

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
  }

  const handleLoaded = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    setLoading(false)
  }

  const handleSeek = (value: number | number[]) => {
    if (!videoRef.current) return
    const next = Array.isArray(value) ? value[0] : value
    videoRef.current.currentTime = next
    setCurrentTime(next)
  }

  const handleVolume = (value: number | number[]) => {
    if (!videoRef.current) return
    const next = Array.isArray(value) ? value[0] : value
    const v = next / 100
    videoRef.current.volume = v
    setVolume(v)
    setMuted(v === 0)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(m => !m)
  }

  const enterFull = () => videoRef.current?.requestFullscreen()
  const exitFull = () => document.exitFullscreen()

  const changeSubtitleTrack = (index: number) => {
    const hlsPlayer = hlsRef.current
    if (hlsPlayer) {
      hlsPlayer.subtitleDisplay = index >= 0
      hlsPlayer.subtitleTrack = index
    }
    setSubtitleTrack(index)
    setSubtitlesOpen(false)
  }

  const openPlayer = () => {
    setLoading(true)
    setMediaError(false)
    setOpen(true)
  }

  const closePlayer = () => {
    setOpen(false)
    setMediaError(false)
    setSubtitlesOpen(false)
    onClose?.()
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

      <Modal.Root state={state}>
        <Modal.Backdrop>
          <Modal.Container size={isMobile ? 'full' : 'lg'} scroll='inside' className={isMobile ? 'ts-immersive' : undefined}>
            <Modal.Dialog>
              <Modal.Header className='flex items-center gap-2 py-2'>
                <Modal.Heading className='min-w-0 flex-1 truncate text-base'>{title || t('Play')}</Modal.Heading>
                <Modal.CloseTrigger aria-label={t('Close', { defaultValue: 'Close' })}>
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
                    ref={setVideoNode}
                    src={hls ? undefined : videoSrc}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoaded}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    className='block w-full'
                    style={{ maxHeight: isMobile ? 'calc(100dvh - 180px)' : '70vh' }}
                  />
                  {loading ? (
                    <div className='absolute inset-0 grid place-items-center'>
                      <Spinner size='lg' className='text-white' />
                    </div>
                  ) : null}
                </div>

                <div className='bg-content1 p-3'>
                  <Slider value={currentTime} maxValue={duration || 0} onChange={handleSeek} className='mb-3'>
                    <Slider.Track>
                      <Slider.Fill />
                      <Slider.Thumb />
                    </Slider.Track>
                  </Slider>
                  <div className='flex flex-wrap items-center gap-2'>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button isIconOnly size='sm' variant='ghost' onPress={handlePlayPause}>
                          {playing ? <Pause className='size-4' /> : <Play className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{playing ? t('Pause') : t('Play')}</Tooltip.Content>
                    </Tooltip.Root>
                    <span className='min-w-[100px] text-xs tabular-nums'>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button isIconOnly size='sm' variant='ghost' onPress={toggleMute}>
                          {muted ? <VolumeX className='size-4' /> : <Volume2 className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{muted ? t('Unmute') : t('Mute')}</Tooltip.Content>
                    </Tooltip.Root>
                    <Slider value={volume * 100} maxValue={100} onChange={handleVolume} className='w-24'>
                      <Slider.Track>
                        <Slider.Fill />
                        <Slider.Thumb />
                      </Slider.Track>
                    </Slider>
                    {subtitleTracks.length > 0 ? (
                      <Popover isOpen={subtitlesOpen} onOpenChange={setSubtitlesOpen}>
                        <Popover.Trigger>
                          <Button
                            isIconOnly
                            size='sm'
                            variant={subtitleTrack >= 0 ? 'primary' : 'ghost'}
                            aria-label={t('Subtitles', { defaultValue: 'Subtitles' })}
                          >
                            <Captions className='size-4' />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                          <ListBox
                            selectedKeys={[String(subtitleTrack)]}
                            onSelectionChange={keys => {
                              const value = [...keys][0]
                              changeSubtitleTrack(value == null ? -1 : Number(value))
                            }}
                          >
                            <ListBox.Item id='-1'>{t('Off', { defaultValue: 'Off' })}</ListBox.Item>
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
                    <Tooltip.Root>
                      <Tooltip.Trigger>
                        <Button isIconOnly size='sm' variant='ghost' onPress={fullscreen ? exitFull : enterFull}>
                          {fullscreen ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>{fullscreen ? t('ExitFullscreen') : t('Fullscreen')}</Tooltip.Content>
                    </Tooltip.Root>
                  </div>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>
    </>
  )
}
