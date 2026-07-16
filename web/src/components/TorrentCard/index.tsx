import {
  forwardRef,
  memo,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ForwardedRef,
  type ReactElement,
} from 'react'
import type { PlayableFile, TorrentFileStat, TorrentStat } from 'types/api'
import {
  Audiotrack as AudiotrackIcon,
  UnfoldMore as UnfoldMoreIcon,
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { getPeerString, humanizeSize, humanizeSpeed, removeRedundantCharacters } from 'utils/Utils'
import { playlistTorrHost, streamHost, torrentsHost } from 'utils/Hosts'
import { NoImageIcon } from 'icons'
import DialogTorrentDetailsContent from 'components/DialogTorrentDetailsContent'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import AddDialog from 'components/Add/AddDialog'
import { StyledDialog } from 'style/CustomMaterialUiStyles'
import useOnStandaloneAppOutsideClick from 'utils/useOnStandaloneAppOutsideClick'
import { GETTING_INFO, IN_DB, CLOSED, PRELOAD, WORKING } from 'torrentStates'
import { TORRENT_CATEGORIES } from 'components/categories'
import VideoPlayer from 'components/VideoPlayer'
import { isFilePlayable } from 'components/DialogTorrentDetailsContent/helpers'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  gstreamerProbeUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'utils/GStreamer'

import {
  StatusIndicators,
  StyledButton,
  TorrentCard,
  TorrentCardButtons,
  TorrentCardDescription,
  TorrentCardPoster,
} from './style'

const Transition = forwardRef(function Transition(
  props: ComponentPropsWithoutRef<typeof Slide>,
  ref: ForwardedRef<unknown>,
): ReactElement {
  return <Slide direction='up' ref={ref} {...props} />
})

const wait = (milliseconds: number) => new Promise<void>(resolve => setTimeout(resolve, milliseconds))

const requestTorrentFiles = async (
  hash: string,
  isActive: () => boolean,
  attemptsLeft = 60,
): Promise<PlayableFile[]> => {
  const { data: status } = await axios.post(torrentsHost(), { action: 'get', hash })
  const files = ((status?.file_stats || []) as TorrentFileStat[]).map(file => ({
    id: file.id ?? file.Id ?? 0,
    path: file.path ?? file.Path ?? '',
    length: file.length ?? file.Length ?? 0,
  }))
  if (!isActive() || files.length || attemptsLeft <= 1) return files

  await wait(1000)
  if (!isActive()) return []
  return requestTorrentFiles(hash, isActive, attemptsLeft - 1)
}

const fileName = (path: string) => path.split('\\').pop()!.split('/').pop()!

const filesFromMetadata = (data?: string): PlayableFile[] => {
  if (!data) return []
  try {
    const files = JSON.parse(data).TorrServer?.Files || []
    return (files as Array<{ id?: number; path?: string; length?: number }>).map(file => ({
      id: file.id ?? 0,
      path: file.path ?? '',
      length: file.length ?? 0,
    }))
  } catch {
    return []
  }
}

const episodeLabel = (path: string, index: number) => {
  const name = fileName(path)
  const parsed = ptt.parse(name)
  const season = Number(parsed.season)
  const episode = Number(parsed.episode)
  const code = `${season ? `S${String(season).padStart(2, '0')}` : ''}${
    episode ? `E${String(episode).padStart(2, '0')}` : ''
  }`
  const title = parsed.title || name.replace(/\.[^/.]+$/, '')
  return code ? `${code} - ${title}` : `${index + 1}. ${title}`
}

type ProbeTrack = Record<string, unknown>

const probeTrackValue = (track: ProbeTrack | undefined, name: string) =>
  track?.[name] ?? track?.[`${name[0].toLowerCase()}${name.slice(1)}`]

const probeAudioTracks = (probe: { Tracks?: ProbeTrack[]; tracks?: ProbeTrack[] } | null | undefined) =>
  (probe?.Tracks || probe?.tracks || []).filter(
    track => String(probeTrackValue(track, 'Type')).toLowerCase() === 'audio',
  )

const audioCodecName = (track: ProbeTrack) => {
  const codec = String(probeTrackValue(track, 'Codec') || '')
  const caps = String(probeTrackValue(track, 'CapsName') || '')
  const value = `${caps} ${codec}`.toLowerCase()

  switch (true) {
    case value.includes('eac3') || value.includes('e-ac3') || value.includes('e-ac-3'):
      return 'E-AC3'
    case value.includes('truehd') || value.includes('true-hd') || value.includes('mlp'):
      return 'TrueHD'
    case value.includes('ac3') || value.includes('ac-3') || value.includes('a/52'):
      return 'AC3'
    case value.includes('dts'):
      return 'DTS'
    case value.includes('aac') || value.includes('mpegversion=(int)4') || value.includes('mpegversion=4'):
      return 'AAC'
    case value.includes('opus'):
      return 'Opus'
    case value.includes('vorbis'):
      return 'Vorbis'
    case value.includes('flac'):
      return 'FLAC'
    case value.includes('mp3') || value.includes('layer=(int)3'):
      return 'MP3'
    case value.includes('pcm') || value.includes('audio/x-raw'):
      return 'PCM'
    default: {
      const shortName = (caps || codec).split(',')[0].trim()
      return shortName
        .replace(/^audio\/(?:x-)?/i, '')
        .replace(/[_-]+/g, ' ')
        .toUpperCase()
    }
  }
}

const sameFileList = (left?: TorrentFileStat[] | null, right?: TorrentFileStat[] | null) => {
  const leftFiles = left || []
  const rightFiles = right || []
  return (
    leftFiles.length === rightFiles.length &&
    leftFiles.every((file, index) => {
      const other = rightFiles[index]
      return (
        (file.id ?? file.Id) === (other?.id ?? other?.Id) &&
        (file.path ?? file.Path) === (other?.path ?? other?.Path) &&
        (file.length ?? file.Length) === (other?.length ?? other?.Length)
      )
    })
  )
}

interface TorrentPlayer extends PlayableFile {
  key: string
  label: string
  videoSrc: string
  downloadSrc: string
  hls: boolean
  heartbeatSrc: string
  playerTitle?: string
}

export interface TorrentCardProps {
  torrent: TorrentStat
}

const Torrent = ({ torrent }: TorrentCardProps) => {
  const { t } = useTranslation()
  const [isDetailedInfoOpened, setIsDetailedInfoOpened] = useState(false)
  const [isDeleteTorrentOpened, setIsDeleteTorrentOpened] = useState(false)
  const [unsupportedPlayers, setUnsupportedPlayers] = useState<Record<string, boolean>>({})
  const [episodeMenuAnchor, setEpisodeMenuAnchor] = useState<HTMLElement | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<TorrentPlayer | null>(null)
  const [resolvedFileList, setResolvedFileList] = useState<PlayableFile[]>([])
  const [isResolvingPlayers, setIsResolvingPlayers] = useState(false)
  const [playerResolveFailed, setPlayerResolveFailed] = useState(false)
  const [openEpisodeMenuAfterResolve, setOpenEpisodeMenuAfterResolve] = useState(false)
  const [audioTracksByFile, setAudioTracksByFile] = useState<Record<number, ProbeTrack[]>>({})
  const [audioMenuAnchor, setAudioMenuAnchor] = useState<HTMLElement | null>(null)
  const [audioMenuPlayer, setAudioMenuPlayer] = useState<TorrentPlayer | null>(null)
  const [isResolvingAudio, setIsResolvingAudio] = useState(false)
  const isMounted = useRef(true)
  const episodeButtonRef = useRef<HTMLButtonElement | null>(null)
  const audioButtonRef = useRef<HTMLButtonElement | null>(null)
  const gstRuntime = useGStreamerRuntime()

  useEffect(
    () => () => {
      isMounted.current = false
    },
    [],
  )

  const fullScreen = useMediaQuery('(max-width:930px)')

  const openDetailedInfo = () => setIsDetailedInfoOpened(true)
  const closeDetailedInfo = () => setIsDetailedInfoOpened(false)
  const openDeleteTorrentAlert = () => setIsDeleteTorrentOpened(true)
  const closeDeleteTorrentAlert = () => setIsDeleteTorrentOpened(false)

  const {
    title,
    name,
    category,
    poster,
    torrent_size: torrentSize,
    download_speed: downloadSpeed,
    hash,
    stat,
    data,
    file_stats: torrentFileList,
  } = torrent

  const dropTorrent = () => axios.post(torrentsHost(), { action: 'drop', hash })
  const deleteTorrent = () => axios.post(torrentsHost(), { action: 'rem', hash })

  const getParsedTitle = () => {
    const parse = (key: 'title' | 'year' | 'resolution') =>
      ptt.parse(title || '')?.[key] || ptt.parse(name || '')?.[key]

    const titleStrings: Array<string | number> = []

    let parsedTitle = removeRedundantCharacters(String(parse('title') || ''))
    const parsedYear = parse('year')
    const parsedResolution = parse('resolution')
    if (parsedTitle) titleStrings.push(parsedTitle)
    if (parsedYear) titleStrings.push(`(${parsedYear})`)
    if (parsedResolution) titleStrings.push(`[${parsedResolution}]`)
    parsedTitle = titleStrings.join(' ')
    return { parsedTitle }
  }
  const { parsedTitle } = getParsedTitle()

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const handleClickOpenEditDialog = () => setIsEditDialogOpen(true)
  const handleCloseEditDialog = () => setIsEditDialogOpen(false)

  const fullPlaylistLink = `${playlistTorrHost()}/${encodeURIComponent(parsedTitle || 'file')}.m3u?link=${hash}&m3u`

  const detailedInfoDialogRef = useOnStandaloneAppOutsideClick(closeDetailedInfo)
  // main categories
  const catIndex = TORRENT_CATEGORIES.findIndex(e => e.key === category)
  const catArray = TORRENT_CATEGORIES.find(e => e.key === category)
  const getFileLink = (path: string, id: number) =>
    `${streamHost()}/${encodeURIComponent(fileName(path))}?link=${hash}&index=${id}&play`

  const normalizeFiles = (files: Array<TorrentFileStat | PlayableFile>): PlayableFile[] =>
    files.map(file => ({
      id: Number((file as PlayableFile).id ?? (file as TorrentFileStat).Id ?? 0),
      path: String((file as PlayableFile).path ?? (file as TorrentFileStat).Path ?? ''),
      length: Number((file as PlayableFile).length ?? (file as TorrentFileStat).Length ?? 0),
    }))

  const fileList: PlayableFile[] = torrentFileList?.length
    ? normalizeFiles(torrentFileList)
    : resolvedFileList.length
      ? resolvedFileList
      : filesFromMetadata(typeof data === 'string' ? data : undefined)
  const playableVideoList = fileList.filter(({ path }) => isFilePlayable(path))
  const getVideoCaption = (path: string) => {
    const baseName = path.replace(/\.[^/.]+$/, '')
    const captionFile = fileList.find(file => file.path.startsWith(baseName) && /\.(srt|vtt)$/i.test(file.path))
    return captionFile ? getFileLink(captionFile.path, captionFile.id) : ''
  }
  const createPlayer = (file: PlayableFile, index: number): TorrentPlayer => {
    const hls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    const downloadSrc = getFileLink(file.path, file.id)
    return {
      ...file,
      key: `${file.id}:${hls ? 'gst' : 'stream'}`,
      label: episodeLabel(file.path, index),
      videoSrc: hls ? gstreamerMasterUrl(hash, file.id) : downloadSrc,
      downloadSrc,
      hls,
      heartbeatSrc: hls ? gstreamerHeartbeatUrl(hash) : '',
    }
  }
  const players = playableVideoList.map(createPlayer)
  const availablePlayers = players.filter(player => !unsupportedPlayers[player.key])
  const singlePlayer = players.length === 1 ? players[0] : null
  const audioMenuTracks = audioMenuPlayer ? audioTracksByFile[audioMenuPlayer.id] || [] : []

  const playerWithAudio = (player: TorrentPlayer, audio: number): TorrentPlayer => ({
    ...player,
    key: `${player.key}:audio:${audio}`,
    videoSrc: gstreamerMasterUrl(hash, player.id, audio),
    playerTitle: title || player.label,
  })

  const showAudioTracks = (player: TorrentPlayer, tracks: ProbeTrack[], anchor?: HTMLElement | null) => {
    if (!tracks.length) {
      setSelectedPlayer(playerWithAudio(player, 0))
      return
    }
    setAudioMenuPlayer(player)
    const target = anchor || audioButtonRef.current
    if (target) {
      setAudioMenuAnchor(target)
    } else {
      window.requestAnimationFrame(() => {
        if (isMounted.current) setAudioMenuAnchor(audioButtonRef.current)
      })
    }
  }

  const resolveAudioTracks = async (player: TorrentPlayer, anchor?: HTMLElement | null) => {
    const cached = audioTracksByFile[player.id]
    if (cached !== undefined) {
      showAudioTracks(player, cached, anchor)
      return
    }

    setIsResolvingAudio(true)
    try {
      const { data: probe } = await axios.get(gstreamerProbeUrl(hash, player.id))
      if (!isMounted.current) return

      const tracks = probeAudioTracks(probe)
      setAudioTracksByFile(current => ({ ...current, [player.id]: tracks }))
      showAudioTracks(player, tracks, anchor)
    } catch {
      if (isMounted.current) setSelectedPlayer(playerWithAudio(player, 0))
    } finally {
      if (isMounted.current) setIsResolvingAudio(false)
    }
  }

  const audioTrackLabel = (track: ProbeTrack, ordinal: number) => {
    const trackTitle = String(probeTrackValue(track, 'Title') || '').trim()
    const language = String(probeTrackValue(track, 'Language') || '').trim()
    const codec = audioCodecName(track)
    const channels = Number(probeTrackValue(track, 'Channels'))
    const rate = Number(probeTrackValue(track, 'Rate'))
    const details = [
      trackTitle && language ? language.toUpperCase() : '',
      codec,
      channels > 0 ? `${channels} ch` : '',
      rate > 0 ? `${Math.round(rate / 1000)} kHz` : '',
    ].filter(Boolean)
    return {
      primary: trackTitle || language.toUpperCase() || `${t('GStreamer.AudioTrack')} ${ordinal + 1}`,
      secondary: details.join(' / '),
    }
  }

  const selectAudioTrack = (track: ProbeTrack, ordinal: number) => {
    if (!audioMenuPlayer) return
    const value = Number(probeTrackValue(track, 'Index'))
    const audio = Number.isInteger(value) && value >= 0 ? value : ordinal
    setAudioMenuAnchor(null)
    setSelectedPlayer(playerWithAudio(audioMenuPlayer, audio))
  }

  useEffect(() => {
    if (!openEpisodeMenuAfterResolve || players.length <= 1 || !episodeButtonRef.current) return
    setEpisodeMenuAnchor(episodeButtonRef.current)
    setOpenEpisodeMenuAfterResolve(false)
  }, [openEpisodeMenuAfterResolve, players.length])

  const markPlayerUnsupported = (key: string) => {
    setUnsupportedPlayers(current => ({ ...current, [key]: true }))
    setSelectedPlayer(current => (current?.key === key ? null : current))
  }
  const resolvePlayers = async () => {
    setIsResolvingPlayers(true)
    setPlayerResolveFailed(false)

    try {
      const files = await requestTorrentFiles(hash, () => isMounted.current)
      if (!isMounted.current) return

      const loadedPlayers = files.filter(({ path }) => isFilePlayable(path)).map(createPlayer)
      setResolvedFileList(files)
      if (loadedPlayers.length === 1) {
        if (loadedPlayers[0].hls) {
          await resolveAudioTracks(loadedPlayers[0])
        } else {
          setSelectedPlayer(loadedPlayers[0])
        }
      } else if (loadedPlayers.length > 1) {
        setOpenEpisodeMenuAfterResolve(true)
      } else {
        setPlayerResolveFailed(true)
      }
    } catch (_) {
      if (isMounted.current) setPlayerResolveFailed(true)
    } finally {
      if (isMounted.current) setIsResolvingPlayers(false)
    }
  }

  return (
    <>
      <TorrentCard>
        <TorrentCardPoster $isPoster={Boolean(poster)} onClick={handleClickOpenEditDialog}>
          {poster ? <img src={poster} alt='poster' /> : <NoImageIcon />}
        </TorrentCardPoster>

        <TorrentCardButtons>
          <StyledButton onClick={openDetailedInfo}>
            <UnfoldMoreIcon />
            <span>{t('Details')}</span>
          </StyledButton>

          {singlePlayer && !unsupportedPlayers[singlePlayer.key] ? (
            singlePlayer.hls ? (
              <>
                <StyledButton
                  ref={audioButtonRef}
                  disabled={isResolvingAudio || isResolvingPlayers}
                  aria-haspopup='menu'
                  aria-expanded={Boolean(audioMenuAnchor)}
                  onClick={event => resolveAudioTracks(singlePlayer, event.currentTarget)}
                >
                  {isResolvingAudio || isResolvingPlayers ? (
                    <CircularProgress size={20} color='inherit' />
                  ) : (
                    <PlayArrowIcon />
                  )}
                  <span>{t('Play')}</span>
                </StyledButton>
                <Menu
                  anchorEl={audioMenuAnchor}
                  open={Boolean(audioMenuAnchor)}
                  onClose={() => setAudioMenuAnchor(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{ style: { maxHeight: '65vh', width: 420, maxWidth: 'calc(100vw - 32px)' } }}
                >
                  {audioMenuTracks.map((track, ordinal) => {
                    const label = audioTrackLabel(track, ordinal)
                    const index = probeTrackValue(track, 'Index') ?? ordinal
                    return (
                      <MenuItem key={String(index)} onClick={() => selectAudioTrack(track, ordinal)}>
                        <ListItemIcon style={{ minWidth: 34 }}>
                          <AudiotrackIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText primary={label.primary} secondary={label.secondary} />
                      </MenuItem>
                    )
                  })}
                </Menu>
              </>
            ) : (
              <VideoPlayer
                title={title}
                videoSrc={singlePlayer.videoSrc}
                downloadSrc={singlePlayer.downloadSrc}
                captionSrc={getVideoCaption(singlePlayer.path)}
                heartbeatSrc={singlePlayer.heartbeatSrc}
                onNotSupported={() => markPlayerUnsupported(singlePlayer.key)}
              />
            )
          ) : players.length > 1 && availablePlayers.length ? (
            <>
              <StyledButton
                ref={episodeButtonRef}
                aria-haspopup='menu'
                aria-expanded={Boolean(episodeMenuAnchor)}
                onClick={event => setEpisodeMenuAnchor(event.currentTarget)}
              >
                <PlayArrowIcon />
                <span>{t('Play')}</span>
              </StyledButton>
              <Menu
                anchorEl={episodeMenuAnchor}
                open={Boolean(episodeMenuAnchor)}
                onClose={() => setEpisodeMenuAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ style: { maxHeight: '65vh', width: 420, maxWidth: 'calc(100vw - 32px)' } }}
              >
                {availablePlayers.map(player => (
                  <MenuItem
                    key={player.key}
                    onClick={() => {
                      setEpisodeMenuAnchor(null)
                      setSelectedPlayer(player)
                    }}
                  >
                    <ListItemIcon style={{ minWidth: 34 }}>
                      <PlayArrowIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText primary={player.label} secondary={humanizeSize(player.length)} />
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : gstRuntime.built_in && !playerResolveFailed && players.length === 0 ? (
            <StyledButton disabled={isResolvingPlayers} onClick={resolvePlayers}>
              {isResolvingPlayers ? <CircularProgress size={20} color='inherit' /> : <PlayArrowIcon />}
              <span>{t('Play')}</span>
            </StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                window.open(fullPlaylistLink, '_blank')
              }}
            >
              <PlayArrowIcon />
              <span>{t('Playlist')}</span>
            </StyledButton>
          )}

          {selectedPlayer && (
            <VideoPlayer
              key={selectedPlayer.key}
              title={selectedPlayer.playerTitle || selectedPlayer.label}
              videoSrc={selectedPlayer.videoSrc}
              downloadSrc={selectedPlayer.downloadSrc}
              captionSrc={selectedPlayer.hls ? '' : getVideoCaption(selectedPlayer.path)}
              hls={selectedPlayer.hls}
              heartbeatSrc={selectedPlayer.heartbeatSrc}
              initiallyOpen
              showTrigger={false}
              onClose={() => setSelectedPlayer(null)}
              onNotSupported={() => markPlayerUnsupported(selectedPlayer.key)}
            />
          )}

          <StyledButton onClick={() => dropTorrent()}>
            <CloseIcon />
            <span>{t('Drop')}</span>
          </StyledButton>

          <StyledButton onClick={openDeleteTorrentAlert}>
            <DeleteIcon />
            <span>{t('Delete')}</span>
          </StyledButton>
        </TorrentCardButtons>

        <TorrentCardDescription>
          <div className='description-title-wrapper'>
            <div className='description-section-name'>
              {category ? (catIndex >= 0 && catArray ? t(catArray.name) : category) : t('Name')}
            </div>
            <div className='description-torrent-title'>{parsedTitle}</div>
          </div>

          <div className='description-statistics-wrapper'>
            <div className='description-statistics-element-wrapper'>
              <div className='description-section-name'>
                <StatusIndicator stat={stat} />
                {t('Size')}
              </div>
              <div className='description-statistics-element-value'>
                {torrentSize != null && torrentSize > 0 && humanizeSize(torrentSize)}
              </div>
            </div>

            <div className='description-statistics-element-wrapper'>
              <div className='description-section-name'>{t('Speed')}</div>
              <div className='description-statistics-element-value'>
                {downloadSpeed != null && downloadSpeed > 0 ? humanizeSpeed(downloadSpeed) : '---'}
              </div>
            </div>

            <div className='description-statistics-element-wrapper'>
              <div className='description-section-name'>{t('Peers')}</div>
              <div className='description-statistics-element-value'>{getPeerString(torrent) || '---'}</div>
            </div>
          </div>
        </TorrentCardDescription>
      </TorrentCard>

      <StyledDialog
        open={isDetailedInfoOpened}
        onClose={closeDetailedInfo}
        fullScreen={fullScreen}
        fullWidth
        maxWidth='xl'
        TransitionComponent={Transition}
        ref={detailedInfoDialogRef}
      >
        <DialogTorrentDetailsContent closeDialog={closeDetailedInfo} torrent={torrent} />
      </StyledDialog>

      <Dialog open={isDeleteTorrentOpened} onClose={closeDeleteTorrentAlert}>
        <DialogTitle>{t('DeleteTorrent?')}</DialogTitle>
        <DialogActions>
          <Button variant='outlined' onClick={closeDeleteTorrentAlert} color='secondary'>
            {t('Cancel')}
          </Button>

          <Button
            variant='contained'
            onClick={() => {
              deleteTorrent()
              closeDeleteTorrentAlert()
            }}
            color='secondary'
            autoFocus
          >
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>

      {isEditDialogOpen && (
        <AddDialog
          hash={hash}
          title={title}
          name={name}
          poster={poster}
          handleClose={handleCloseEditDialog}
          category={category}
        />
      )}
    </>
  )
}

export const StatusIndicator = ({ stat }: { stat?: number }) => {
  const { t } = useTranslation()

  const values: Record<number, string> = {
    [GETTING_INFO]: t('TorrentGettingInfo'),
    [PRELOAD]: t('TorrentPreload'),
    [WORKING]: t('TorrentWorking'),
    [CLOSED]: t('TorrentClosed'),
    [IN_DB]: t('TorrentInDb'),
  }

  const colors: Record<number, string> = {
    [GETTING_INFO]: '#2196F3',
    [PRELOAD]: '#FFC107',
    [WORKING]: '#CDDC39',
    [CLOSED]: '#E57373',
    [IN_DB]: '#9E9E9E',
  }

  return (
    <span className='description-status-wrapper'>
      <StatusIndicators
        $color={stat != null ? colors[stat] : undefined}
        title={stat != null ? values[stat] : undefined}
      />
    </span>
  )
}

export default memo(Torrent, (prev, next) => {
  const p = prev.torrent
  const n = next.torrent
  return (
    p.hash === n.hash &&
    p.title === n.title &&
    p.name === n.name &&
    p.poster === n.poster &&
    p.category === n.category &&
    p.stat === n.stat &&
    p.torrent_size === n.torrent_size &&
    p.download_speed === n.download_speed &&
    p.data === n.data &&
    sameFileList(p.file_stats, n.file_stats)
  )
})
