import { memo, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'shared/api/types'
import { playlistTorrHost, torrentsHost, viewedHost } from 'shared/api/hosts'
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
      axios
        .post(torrentsHost(), { action: 'drop', hash })
        .then(() => {
          toast?.showToast({ message: t('DropTorrent'), severity: 'success' })
          onDropped?.()
        })
        .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
    }
    if (confirm === 'views') {
      axios
        .post(viewedHost(), { action: 'rem', hash, file_index: -1 })
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
      toast?.showToast({ message: t('Error', { defaultValue: 'Error' }), severity: 'error' })
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
          <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
            <Button component='a' href={fullPlaylistLink} variant='contained' color='primary'>
              {t('Full')}
            </Button>
            <Button component='a' href={partialPlaylistLink} variant='contained' color='primary'>
              {t('FromLatestFile')}
            </Button>
          </Stack>
        </Stack>
      ) : null}

      <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 1 }}>
        {t('TorrentState')}
      </Typography>
      <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
        <Button onClick={() => setConfirm('views')} variant='outlined' color='primary'>
          {t('RemoveViews')}
        </Button>
        <Button onClick={() => setConfirm('drop')} variant='contained' color='error'>
          {t('DropTorrent')}
        </Button>
      </Stack>

      <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 1 }}>
        {t('Info')}
      </Typography>
      <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
        {isOnlyOnePlayableFile || !viewedFileList?.length ? (
          <Button component='a' href={fullPlaylistLink} variant='contained' color='primary'>
            {t('DownloadPlaylist')}
          </Button>
        ) : null}
        <Button variant='contained' color='primary' onClick={() => void copyMagnet()}>
          {t('CopyHash')}
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
