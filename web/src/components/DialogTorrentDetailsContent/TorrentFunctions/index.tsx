import axios from 'axios'
import { memo, useState } from 'react'
import { playlistTorrHost, torrentsHost, viewedHost } from 'utils/Hosts'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import type { PlayableFile } from 'types/api'
import { useOptionalAppToast } from 'components/Feedback/AppSnackbar'

import { SmallLabel, MainSectionButtonGroup } from './style'
import { SectionSubName } from '../style'

interface TorrentFunctionsProps {
  hash: string
  viewedFileList?: number[]
  playableFileList?: PlayableFile[]
  name?: string
  title?: string
  setViewedFileList: (list?: number[]) => void
}

type ConfirmKind = 'drop' | 'views' | null

const TorrentFunctions = memo(
  ({ hash, viewedFileList, playableFileList, name, title, setViewedFileList }: TorrentFunctionsProps) => {
    const { t } = useTranslation()
    const toast = useOptionalAppToast()
    const [confirm, setConfirm] = useState<ConfirmKind>(null)
    const latestViewedFileId = viewedFileList?.[viewedFileList?.length - 1]
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
          .then(() => toast?.showToast({ message: t('DropTorrent'), severity: 'success' }))
          .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
      }
      if (confirm === 'views') {
        axios
          .post(viewedHost(), { action: 'rem', hash, file_index: -1 })
          .then(() => {
            setViewedFileList()
            toast?.showToast({ message: t('RemoveViews'), severity: 'success' })
          })
          .catch(() => toast?.showToast({ message: t('PlaybackError'), severity: 'error' }))
      }
      setConfirm(null)
    }

    return (
      <>
        {!isOnlyOnePlayableFile && !!viewedFileList?.length && (
          <>
            <SmallLabel>{t('DownloadPlaylist')}</SmallLabel>
            <SectionSubName $mb={10}>
              {t('LatestFilePlayed')}{' '}
              <strong>
                {latestViewedFileData?.title}.
                {latestViewedFileData?.season && (
                  <>
                    {' '}
                    {t('Season')}: {latestViewedFileData?.season}. {t('Episode')}: {latestViewedFileData?.episode}.
                  </>
                )}
              </strong>
            </SectionSubName>

            <MainSectionButtonGroup>
              <Button component='a' href={fullPlaylistLink} variant='contained' color='primary' size='large'>
                {t('Full')}
              </Button>
              <Button component='a' href={partialPlaylistLink} variant='contained' color='primary' size='large'>
                {t('FromLatestFile')}
              </Button>
            </MainSectionButtonGroup>
          </>
        )}
        <SmallLabel $mb={10}>{t('TorrentState')}</SmallLabel>
        <MainSectionButtonGroup>
          <Button onClick={() => setConfirm('views')} variant='outlined' color='primary' size='large'>
            {t('RemoveViews')}
          </Button>
          <Button onClick={() => setConfirm('drop')} variant='contained' color='error' size='large'>
            {t('DropTorrent')}
          </Button>
        </MainSectionButtonGroup>
        <SmallLabel $mb={10}>{t('Info')}</SmallLabel>
        <MainSectionButtonGroup>
          {(isOnlyOnePlayableFile || !viewedFileList?.length) && (
            <Button component='a' href={fullPlaylistLink} variant='contained' color='primary' size='large'>
              {t('DownloadPlaylist')}
            </Button>
          )}
          <CopyToClipboard text={magnet} onCopy={() => toast?.showToast({ message: t('Copied'), severity: 'success' })}>
            <Button variant='contained' color='primary' size='large'>
              {t('CopyHash')}
            </Button>
          </CopyToClipboard>
        </MainSectionButtonGroup>

        <Dialog open={confirm != null} onClose={() => setConfirm(null)} aria-labelledby='torrent-fn-confirm-title'>
          <DialogTitle id='torrent-fn-confirm-title'>
            {confirm === 'drop' ? t('DropTorrent') : t('RemoveViews')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {confirm === 'drop' ? t('ConfirmDropTorrent') : t('ConfirmRemoveViews')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setConfirm(null)} variant='outlined' color='primary'>
              {t('Cancel')}
            </Button>
            <Button onClick={runConfirmed} variant='contained' color={confirm === 'drop' ? 'error' : 'primary'}>
              {t('OK')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  },
)

export default TorrentFunctions
