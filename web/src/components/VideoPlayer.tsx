import {
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Slider,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { keyframes, styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import Forward10Icon from '@mui/icons-material/Forward10'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import GetAppIcon from '@mui/icons-material/GetApp'
import PauseIcon from '@mui/icons-material/Pause'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Replay10Icon from '@mui/icons-material/Replay10'
import SpeedIcon from '@mui/icons-material/Speed'
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import Hls from 'hls.js'
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import { useTranslation } from 'react-i18next'

import { StyledButton } from './TorrentCard/style'

export interface VideoPlayerProps {
  videoSrc: string
  downloadSrc?: string
  captionSrc?: string
  title?: string
  onNotSupported?: () => void
  hls?: boolean
  heartbeatSrc?: string
  showTrigger?: boolean
  initiallyOpen?: boolean
  onClose?: () => void
}

interface SubtitleTrackInfo {
  id?: number
  name?: string
  lang?: string
  groupId?: string
  [key: string]: unknown
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

const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 6,
  padding: '13px 0',
  '@media (max-width: 930px)': {
    height: 8,
    padding: '16px 0',
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    // MUI v5+ centers the thumb with transform; do not use v4 margin offsets
    '@media (max-width: 930px)': {
      height: 20,
      width: 20,
    },
  },
  '& .MuiSlider-track': {
    height: 6,
    borderRadius: 4,
    '@media (max-width: 930px)': {
      height: 8,
    },
  },
  '& .MuiSlider-rail': {
    height: 6,
    borderRadius: 4,
    '@media (max-width: 930px)': {
      height: 8,
    },
  },
}))

const pulse = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0;
  }
`

const PlayerHeader = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const PlayerIconButton = styled(IconButton)({
  color: '#fff',
  padding: 12,
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
  '@media (max-width: 930px)': {
    padding: 10,
  },
})

const Controls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  padding: theme.spacing(0, 3, 2, 3),
  transition: 'opacity 200ms',
  opacity: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  zIndex: 3,
  pointerEvents: 'auto',
  '@media (max-width: 930px)': {
    opacity: 1,
    padding: theme.spacing(0, 1, 2, 1),
    gap: theme.spacing(0),
    background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
  },
}))

const CentralControl = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '50%',
  padding: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,0.5)',
  opacity: 0,
  transition: 'opacity 200ms',
  zIndex: 3,
  color: '#fff',
  pointerEvents: 'none',
  animation: `${pulse} 0.6s ease-out`,
}))

const SkipButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  padding: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,0.4)',
  color: '#fff',
  opacity: 0,
  transition: 'opacity 200ms',
  zIndex: 3,
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.6)' },
}))

const VideoWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  backgroundColor: '#000',
  overflow: 'hidden',
  [`&:hover ${Controls}`]: {
    opacity: 1,
  },
  [`&:hover ${CentralControl}`]: {
    opacity: 1,
  },
  [`&:hover ${SkipButton}`]: {
    opacity: 1,
  },
})

const VideoEl = styled('video')({
  width: '100%',
  display: 'block',
  cursor: 'pointer',
  '@media (max-width: 930px)': {
    height: 'min(94.5vh, 100dvh)',
    width: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
})

const LoadingOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.6)',
  zIndex: 4,
})

const TimeRow = styled(Box)(({ theme }) => ({
  color: '#fff',
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1),
    fontSize: 9,
  },
}))

const sliderAccentStyles = {
  color: '#00e68a',
  '& .MuiSlider-thumb': { backgroundColor: '#00e68a' },
  '& .MuiSlider-track': { borderRadius: 2 },
}

const SeekSlider = styled(PrettoSlider)(sliderAccentStyles)

const VolumeSlider = styled(Slider)(sliderAccentStyles)

const ControlRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const SpeedMenu = styled(Menu)({
  minWidth: 100,
})

const SubtitleMenu = styled(Menu)({
  '& .MuiPaper-root': {
    minWidth: 180,
    maxWidth: 320,
  },
})

// Helper function to format seconds to HH:MM:SS
const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const hh = h.toString().padStart(2, '0')
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}

const subtitleLabel = (track: SubtitleTrackInfo) => {
  const name = track.name || track.lang || 'Subtitle'
  return track.lang && track.lang.toLowerCase() !== name.toLowerCase() ? `${name} (${track.lang})` : name
}

const VideoPlayer = ({
  videoSrc,
  downloadSrc = videoSrc,
  captionSrc = '',
  title,
  onNotSupported,
  hls = false,
  heartbeatSrc = '',
  showTrigger = true,
  initiallyOpen = false,
  onClose,
}: VideoPlayerProps) => {
  const isMobile = useMediaQuery('(max-width:930px)')
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
  const onNotSupportedRef = useRef(onNotSupported)
  const { t } = useTranslation()
  const [open, setOpen] = useState(initiallyOpen)
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [speed, setSpeed] = useState(1)
  const [subtitleAnchorEl, setSubtitleAnchorEl] = useState<HTMLElement | null>(null)
  const [subtitleTracks, setSubtitleTracks] = useState<SubtitleTrackInfo[]>([])
  const [subtitleTrack, setSubtitleTrack] = useState(-1)

  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node
    setVideoElement(node)
  }, [])

  useEffect(() => {
    onNotSupportedRef.current = onNotSupported
  }, [onNotSupported])

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
      hlsPlayer.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        setSubtitleTracks((data.subtitleTracks as SubtitleTrackInfo[]) || [])
        setSubtitleTrack(hlsPlayer!.subtitleTrack)
        video.play().catch(() => {})
      })
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, (_, data) => {
        setSubtitleTracks((data.subtitleTracks as SubtitleTrackInfo[]) || [])
      })
      hlsPlayer.on(Hls.Events.SUBTITLE_TRACK_SWITCH, (_, data) => {
        setSubtitleTrack(Number(data.id ?? -1))
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
      setSubtitleAnchorEl(null)
      setSubtitleTracks([])
      setSubtitleTrack(-1)
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

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.paused ? video.play() : video.pause()
  }, [])

  const togglePlay = () => setPlaying(p => !p)
  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
  }
  const handleLoaded = () => {
    if (!videoRef.current) return
    setDuration(videoRef.current.duration)
    setLoading(false)
  }
  const handleSeek = (_: Event | React.SyntheticEvent, val: number | number[]) => {
    if (!videoRef.current) return
    const next = Array.isArray(val) ? val[0] : val
    videoRef.current.currentTime = next
    handleTimeUpdate()
  }
  const handleVolume = (_: Event | React.SyntheticEvent, val: number | number[]) => {
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

  const skip = useCallback(
    (secs: number) => {
      const video = videoRef.current
      if (!video) return
      const target = Math.min(Math.max(video.currentTime + secs, 0), duration)
      video.currentTime = target
      setCurrentTime(target)
    },
    [duration],
  )

  const enterFull = () => videoRef.current?.requestFullscreen()
  const exitFull = () => document.exitFullscreen()

  useEffect(() => {
    const onFull = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFull)
    return () => document.removeEventListener('fullscreenchange', onFull)
  }, [])

  const openSpeedMenu = (e: ReactMouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const closeSpeedMenu = () => setAnchorEl(null)
  const changeSpeed = (val: number) => {
    if (videoRef.current) videoRef.current.playbackRate = val
    setSpeed(val)
    closeSpeedMenu()
  }
  const openSubtitleMenu = (e: ReactMouseEvent<HTMLElement>) => setSubtitleAnchorEl(e.currentTarget)
  const closeSubtitleMenu = () => setSubtitleAnchorEl(null)
  const changeSubtitleTrack = (index: number) => {
    const hlsPlayer = hlsRef.current
    if (hlsPlayer) {
      hlsPlayer.subtitleDisplay = index >= 0
      hlsPlayer.subtitleTrack = index
    }
    setSubtitleTrack(index)
    closeSubtitleMenu()
  }
  const downloadVideo = () => {
    const a = document.createElement('a')
    a.href = downloadSrc
    a.download = ''
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const closePlayer = () => {
    setOpen(false)
    onClose?.()
  }

  const handleKey = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!open) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          handlePlayPause()
          break
        case 'ArrowRight':
          e.preventDefault()
          skip(10)
          break
        case 'ArrowLeft':
          e.preventDefault()
          skip(-10)
          break
        default:
          break
      }
    },
    [open, handlePlayPause, skip],
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <>
      {showTrigger && (
        <StyledButton
          onClick={() => {
            setLoading(true)
            setOpen(true)
          }}
        >
          <PlayArrowIcon />
          <span>{t('Play')}</span>
        </StyledButton>
      )}
      <StyledDialog
        open={open}
        onClose={closePlayer}
        maxWidth='lg'
        fullWidth
        fullScreen={isMobile}
        slotProps={{
          paper: {
            sx: theme => ({
              backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
              borderRadius: theme.spacing(1),
            }),
          },
        }}
      >
        <PlayerHeader>
          <Typography variant='h6' noWrap>
            {title || 'Video Player'}
          </Typography>
          <PlayerIconButton size='medium' onClick={closePlayer}>
            <CloseIcon fontSize='medium' />
          </PlayerIconButton>
        </PlayerHeader>
        <DialogContent style={{ padding: 0 }}>
          <VideoWrapper onClick={handlePlayPause} style={isMobile ? { minHeight: 240 } : {}}>
            <VideoEl
              autoPlay
              ref={setVideoNode}
              src={hls ? undefined : videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoaded}
              onPlay={togglePlay}
              onPause={togglePlay}
            >
              <track kind='captions' srcLang='en' label='English captions' src={hls ? undefined : captionSrc} default />
            </VideoEl>
            {loading && (
              <LoadingOverlay>
                <CircularProgress size={40} />
              </LoadingOverlay>
            )}
            <CentralControl
              size='medium'
              style={{
                opacity: playing ? 0 : 1,
              }}
            >
              <PlayArrowIcon fontSize='medium' />
            </CentralControl>
            <Controls onClick={e => e.stopPropagation()}>
              {isMobile && (
                <TimeRow>
                  <Typography variant='body2'>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </Typography>
                </TimeRow>
              )}
              <SeekSlider value={currentTime} max={duration} onChange={handleSeek} size='medium' />
              <ControlRow>
                <Tooltip title={playing ? t('Pause') : t('Play')}>
                  <PlayerIconButton size='medium' onClick={handlePlayPause}>
                    {playing ? <PauseIcon fontSize='medium' /> : <PlayArrowIcon fontSize='medium' />}
                  </PlayerIconButton>
                </Tooltip>
                <Tooltip title={t('Rewind-10-Sec')}>
                  <PlayerIconButton
                    size='medium'
                    onClick={e => {
                      e.stopPropagation()
                      skip(-10)
                    }}
                  >
                    <Replay10Icon fontSize='medium' />
                  </PlayerIconButton>
                </Tooltip>

                <Tooltip title={t('Forward-10-Sec')}>
                  <PlayerIconButton
                    size='medium'
                    onClick={e => {
                      e.stopPropagation()
                      skip(10)
                    }}
                  >
                    <Forward10Icon fontSize='medium' />
                  </PlayerIconButton>
                </Tooltip>
                <Tooltip title={muted ? t('Unmute') : t('Mute')}>
                  <PlayerIconButton size='medium' onClick={toggleMute}>
                    {muted ? <VolumeOffIcon fontSize='medium' /> : <VolumeUpIcon fontSize='medium' />}
                  </PlayerIconButton>
                </Tooltip>
                {!isMobile && (
                  <VolumeSlider value={volume * 100} onChange={handleVolume} size='medium' style={{ width: 70 }} />
                )}
                {!isMobile && (
                  <TimeRow>
                    <Typography variant='body2'>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </Typography>
                  </TimeRow>
                )}
                <Box flexGrow={1} />
                {subtitleTracks.length > 0 && (
                  <>
                    <Tooltip title={t('GStreamer.Subtitles')}>
                      <PlayerIconButton
                        size='medium'
                        onClick={openSubtitleMenu}
                        style={subtitleTrack >= 0 ? { color: '#00e68a' } : undefined}
                      >
                        <SubtitlesIcon fontSize='medium' />
                      </PlayerIconButton>
                    </Tooltip>
                    <SubtitleMenu
                      anchorEl={subtitleAnchorEl}
                      open={Boolean(subtitleAnchorEl)}
                      onClose={closeSubtitleMenu}
                    >
                      <MenuItem selected={subtitleTrack === -1} onClick={() => changeSubtitleTrack(-1)}>
                        {t('None')}
                      </MenuItem>
                      {subtitleTracks.map((track, index) => (
                        <MenuItem
                          key={`${track.groupId || 'subs'}:${track.id ?? index}`}
                          selected={subtitleTrack === index}
                          onClick={() => changeSubtitleTrack(index)}
                        >
                          {subtitleLabel(track)}
                        </MenuItem>
                      ))}
                    </SubtitleMenu>
                  </>
                )}
                <Tooltip title={t('Speed')}>
                  <PlayerIconButton size='medium' onClick={openSpeedMenu}>
                    <SpeedIcon fontSize='medium' />
                  </PlayerIconButton>
                </Tooltip>
                <SpeedMenu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeSpeedMenu}>
                  {[0.5, 1, 1.5, 2].map(r => (
                    <MenuItem key={r} selected={r === speed} onClick={() => changeSpeed(r)}>
                      {r}x
                    </MenuItem>
                  ))}
                </SpeedMenu>
                <Tooltip title={t('PIP')}>
                  <PlayerIconButton size='medium' onClick={() => videoRef.current?.requestPictureInPicture()}>
                    <PictureInPictureIcon fontSize='medium' />
                  </PlayerIconButton>
                </Tooltip>

                <Tooltip title={t('Download')}>
                  <PlayerIconButton size='medium' onClick={downloadVideo}>
                    <GetAppIcon fontSize='medium' />
                  </PlayerIconButton>
                </Tooltip>

                <Tooltip title={fullscreen ? t('ExitFullscreen') : t('Fullscreen')}>
                  <PlayerIconButton size='medium' onClick={fullscreen ? exitFull : enterFull}>
                    {fullscreen ? <FullscreenExitIcon fontSize='medium' /> : <FullscreenIcon fontSize='medium' />}
                  </PlayerIconButton>
                </Tooltip>
              </ControlRow>
            </Controls>
          </VideoWrapper>
        </DialogContent>
      </StyledDialog>
    </>
  )
}

export default VideoPlayer
