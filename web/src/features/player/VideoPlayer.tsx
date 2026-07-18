import { useCallback, useEffect, useRef, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
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

    if (Hls.isSupported()) {
      hlsPlayer = new Hls()
      hlsRef.current = hlsPlayer
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
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

  const handleSeek = (_: Event, val: number | number[]) => {
    if (!videoRef.current) return
    const next = Array.isArray(val) ? val[0] : val
    videoRef.current.currentTime = next
    setCurrentTime(next)
  }

  const handleVolume = (_: Event, val: number | number[]) => {
    if (!videoRef.current) return
    const next = Array.isArray(val) ? val[0] : val
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

  const openPlayer = () => {
    setLoading(true)
    setMediaError(false)
    setOpen(true)
  }

  const closePlayer = () => {
    setOpen(false)
    setMediaError(false)
    onClose?.()
  }

  return (
    <>
      {showTrigger &&
        (inlineTrigger ? (
          <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={openPlayer}
            sx={{ flex: '1 1 auto', minWidth: 72, maxWidth: '100%' }}
          >
            {t('Play')}
          </Button>
        ) : (
          <Button variant='outlined' color='primary' startIcon={<PlayArrowIcon />} onClick={openPlayer}>
            {t('Play')}
          </Button>
        ))}

      <Dialog
        open={open}
        onClose={closePlayer}
        maxWidth='lg'
        fullWidth
        fullScreen={isMobile}
        disableEnforceFocus
        className={isMobile ? 'ts-immersive' : undefined}
        sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <Typography variant='h6' noWrap sx={{ flex: 1 }}>
            {title || t('Play')}
          </Typography>
          <IconButton aria-label={t('Close', { defaultValue: 'Close' })} onClick={closePlayer}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {mediaError && (
          <Alert
            severity='error'
            action={
              downloadSrc ? (
                <Button color='inherit' size='small' component='a' href={downloadSrc} target='_blank' rel='noreferrer'>
                  {t('OpenLink')}
                </Button>
              ) : undefined
            }
            sx={{ borderRadius: 0 }}
          >
            {t('PlaybackError')}
          </Alert>
        )}

        <DialogContent sx={{ p: 0, bgcolor: '#000', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ position: 'relative', width: '100%', bgcolor: '#000', minHeight: isMobile ? 240 : 360 }}>
            <Box
              component='video'
              autoPlay
              ref={setVideoNode}
              src={hls ? undefined : videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoaded}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              sx={{ width: '100%', maxHeight: isMobile ? 'calc(100dvh - 180px)' : '70vh', display: 'block' }}
            />
            {loading && (
              <Box sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <CircularProgress sx={{ color: '#fff' }} />
              </Box>
            )}
          </Box>

          <Box sx={{ p: 1.5, bgcolor: 'background.paper' }}>
            <Slider value={currentTime} max={duration || 0} onChange={handleSeek} size='small' sx={{ mb: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Tooltip title={playing ? t('Pause') : t('Play')}>
                <IconButton onClick={handlePlayPause} size='small'>
                  {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </Tooltip>
              <Typography variant='caption' sx={{ minWidth: 100 }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
              <Tooltip title={muted ? t('Unmute') : t('Mute')}>
                <IconButton onClick={toggleMute} size='small'>
                  {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>
              </Tooltip>
              <Slider value={volume * 100} onChange={handleVolume} size='small' sx={{ width: 100 }} />
              <Box sx={{ flexGrow: 1 }} />
              <Tooltip title={fullscreen ? t('ExitFullscreen') : t('Fullscreen')}>
                <IconButton onClick={fullscreen ? exitFull : enterFull} size='small'>
                  {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
