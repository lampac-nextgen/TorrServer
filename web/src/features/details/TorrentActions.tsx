import { memo, useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ptt from 'parse-torrent-title'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { playlistTorrHost } from 'shared/api/hosts'
import { dropTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { clearViewedFiles } from 'shared/api/viewed'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface TorrentActionsProps {
  hash: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
  onDropped?: () => void
}

type ConfirmKind = 'drop' | 'views' | null

function TorrentActions({
  hash,
  viewedFileList,
  playableFileList,
  name,
  title,
  setViewedFileList,
  onDropped,
}: TorrentActionsProps) {
  const { t } = useTranslation()
  const toast = useOptionalAppToast()
  const queryClient = useQueryClient()
  const [confirm, setConfirm] = useState<ConfirmKind>(null)

  const latestViewedFileId = viewedFileList?.[viewedFileList.length - 1]
  const latestViewedFile = playableFileList?.find(({ id }) => id === latestViewedFileId)?.path
  const isOnlyOnePlayableFile = playableFileList?.length === 1
  const latestViewedFileData = latestViewedFile ? ptt.parse(latestViewedFile) : null
  const fullPlaylistLink = `${playlistTorrHost()}/${encodeURIComponent(name || title || 'file')}.m3u?link=${hash}&m3u`
  const partialPlaylistLink = `${fullPlaylistLink}&fromlast`
  const magnet = `magnet:?xt=urn:btih:${hash}&dn=${encodeURIComponent(name || title || '')}`

  const runConfirmed = () => {
    if (confirm === 'drop') {
      void dropTorrent(hash)
        .then(async () => {
          toast?.showToast({ message: t('DropTorrent'), severity: 'success' })
          await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
          onDropped?.()
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    if (confirm === 'views') {
      void clearViewedFiles(hash)
        .then(() => {
          setViewedFileList(undefined)
          toast?.showToast({ message: t('RemoveViews'), severity: 'success' })
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    setConfirm(null)
  }

  const copyMagnet = async () => {
    try {
      await navigator.clipboard.writeText(magnet)
      toast?.showToast({ message: t('Copied'), severity: 'success' })
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    }
  }

  return (
    <>
      {!isOnlyOnePlayableFile && !!viewedFileList?.length ? (
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
            {t('DownloadPlaylist')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {t('LatestFilePlayed')}{' '}
            <strong>
              {latestViewedFileData?.title}.
              {latestViewedFileData?.season ? (
                <>
                  {' '}
                  {t('Season')}: {latestViewedFileData.season}. {t('Episode')}: {latestViewedFileData.episode}.
                </>
              ) : null}
            </strong>
          </Typography>
          <ButtonGroup variant='contained' color='primary'>
            <Button component='a' href={fullPlaylistLink}>
              {t('Full')}
            </Button>
            <Button component='a' href={partialPlaylistLink}>
              {t('FromLatestFile')}
            </Button>
          </ButtonGroup>
        </Stack>
      ) : null}

      <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 1 }}>
        {t('Info')}
      </Typography>
      <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
        {isOnlyOnePlayableFile || !viewedFileList?.length ? (
          <Button component='a' href={fullPlaylistLink} variant='contained' color='primary'>
            {t('DownloadPlaylist')}
          </Button>
        ) : null}
        <Button variant='contained' color='primary' onClick={() => void copyMagnet()}>
          {t('CopyHash')}
        </Button>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 1 }}>
        {t('TorrentState')}
      </Typography>
      <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button onClick={() => setConfirm('views')} variant='outlined' color='primary'>
          {t('RemoveViews')}
        </Button>
        <Button onClick={() => setConfirm('drop')} variant='outlined' color='error'>
          {t('DropTorrent')}
        </Button>
      </Stack>

      <Dialog open={confirm != null} onClose={() => setConfirm(null)}>
        <DialogTitle>{confirm === 'drop' ? t('DropTorrent') : t('RemoveViews')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirm === 'drop' ? t('ConfirmDropTorrent') : t('ConfirmRemoveViews')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setConfirm(null)} variant='outlined'>
            {t('Cancel')}
          </Button>
          <Button onClick={runConfirmed} variant='contained' color={confirm === 'drop' ? 'error' : 'primary'}>
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(TorrentActions)
