import { useMemo, useState, type MouseEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat, TorrentStat } from 'shared/api/types'
import { playlistTorrHost, streamHost } from 'shared/api/hosts'
import {
  dropTorrent,
  getTorrent,
  removeTorrent,
  TORRENTS_QUERY_KEY,
} from 'shared/api/torrents'
import {
  gstreamerHeartbeatUrl,
  gstreamerMasterUrl,
  shouldUseGStreamerPlayer,
  useGStreamerRuntime,
} from 'shared/lib/gstreamer'
import { isFilePlayable } from 'shared/torrent/playable'
import { useOptionalAppToast } from 'shared/ui/Toast'
import VideoPlayer from 'features/player/VideoPlayer'

export interface TorrentCardActionsProps {
  torrent: TorrentStat
  onDetails: () => void
}

type ConfirmKind = 'drop' | 'delete' | null

const toPlayable = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

export default function TorrentCardActions({ torrent, onDetails }: TorrentCardActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const gstRuntime = useGStreamerRuntime()

  const [confirm, setConfirm] = useState<ConfirmKind>(null)
  const [playMenuAnchor, setPlayMenuAnchor] = useState<HTMLElement | null>(null)
  const [playableFiles, setPlayableFiles] = useState<PlayableFile[]>([])
  const [player, setPlayer] = useState<{
    src: string
    downloadSrc: string
    title: string
    hls: boolean
    heartbeatSrc?: string
  } | null>(null)

  const hash = torrent.hash
  const displayName = torrent.title || torrent.name || hash
  const playlistLink = `${playlistTorrHost()}/${encodeURIComponent(displayName)}.m3u?link=${hash}&m3u`

  const listPlayable = useMemo(() => {
    const stats = torrent.file_stats
    if (!stats?.length) return []
    return stats.map(toPlayable).filter(f => isFilePlayable(f.path))
  }, [torrent.file_stats])

  const openPlayerForFile = (file: PlayableFile) => {
    const useHls = shouldUseGStreamerPlayer(file.path, gstRuntime)
    const stream = `${streamHost()}/${encodeURIComponent(
      file.path.split('\\').pop()!.split('/').pop()!,
    )}?link=${hash}&index=${file.id}&play`
    setPlayer({
      src: useHls ? gstreamerMasterUrl(hash, file.id) : stream,
      downloadSrc: stream,
      title: file.path.split('/').pop() || displayName,
      hls: useHls,
      heartbeatSrc: useHls ? gstreamerHeartbeatUrl(hash) : undefined,
    })
    setPlayMenuAnchor(null)
  }

  const handlePlayClick = async (event: MouseEvent<HTMLElement>) => {
    try {
      let files = listPlayable
      if (!files.length) {
        const detail = await getTorrent(hash)
        files = (detail.file_stats || []).map(toPlayable).filter(f => isFilePlayable(f.path))
      }
      if (!files.length) {
        toast?.showToast({ message: t('NoPlayableFiles', { defaultValue: 'No playable files' }), severity: 'info' })
        return
      }
      if (files.length === 1) {
        openPlayerForFile(files[0])
        return
      }
      setPlayableFiles(files)
      setPlayMenuAnchor(event.currentTarget)
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  const runConfirmed = () => {
    const action = confirm
    setConfirm(null)
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

  return (
    <>
      <Stack
        spacing={{ xs: 0.75, sm: 0 }}
        direction={{ xs: 'row', sm: 'column' }}
        useFlexGap
        sx={{
          width: '100%',
          height: { sm: '100%' },
          flex: 1,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          '& > .MuiButton-root + .MuiButton-root': {
            borderTop: { sm: '1px solid rgba(255,255,255,0.18)' },
          },
        }}
      >
        <Button variant='cardAction' startIcon={<UnfoldMoreIcon />} onClick={onDetails}>
          {t('Details')}
        </Button>
        <Button variant='cardAction' startIcon={<PlayArrowIcon />} onClick={e => void handlePlayClick(e)}>
          {t('Play')}
        </Button>
        <Button variant='cardAction' startIcon={<PlaylistPlayIcon />} component='a' href={playlistLink}>
          {t('DownloadPlaylist')}
        </Button>
        <Button variant='cardAction' startIcon={<CloseIcon />} onClick={() => setConfirm('drop')}>
          {t('DropTorrent')}
        </Button>
        <Button variant='cardAction' startIcon={<DeleteIcon />} onClick={() => setConfirm('delete')}>
          {t('Delete')}
        </Button>
      </Stack>

      <Menu anchorEl={playMenuAnchor} open={Boolean(playMenuAnchor)} onClose={() => setPlayMenuAnchor(null)}>
        {playableFiles.map(file => (
          <MenuItem key={file.id} onClick={() => openPlayerForFile(file)}>
            {file.path.split('/').pop() || file.path}
          </MenuItem>
        ))}
      </Menu>

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

      <Dialog open={confirm != null} onClose={() => setConfirm(null)}>
        <DialogTitle>{confirm === 'delete' ? t('Delete') : t('DropTorrent')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirm === 'delete' ? t('DeleteTorrents?') : t('ConfirmDropTorrent')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setConfirm(null)} variant='outlined'>
            {t('Cancel')}
          </Button>
          <Button onClick={runConfirmed} variant='contained' color='error'>
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
