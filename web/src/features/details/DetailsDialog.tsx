import { useEffect, useMemo, useState } from 'react'
import ptt from 'parse-torrent-title'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { useTranslation } from 'react-i18next'
import type { PlayableFile, TorrentFileStat, TorrentStat } from 'shared/api/types'
import { listViewedFiles } from 'shared/api/viewed'
import { useUpdateCache } from 'shared/cache/useUpdateCache'
import { useTorrentDetail } from 'shared/hooks/useTorrentDetail'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { getPeerString, humanizeSize, humanizeSpeed, removeRedundantCharacters } from 'shared/lib/format'
import { isFilePlayable } from 'shared/torrent/playable'
import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING } from 'shared/torrent/states'
import { queryMax } from 'shared/theme/breakpoints'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

import FileBrowser from './FileBrowser'
import SpeedCharts from './SpeedCharts'
import TorrentActions from './TorrentActions'
import TorrentCache from './TorrentCache'

export interface DetailsDialogProps {
  torrent: TorrentStat
  onClose: () => void
}

const toPlayableFile = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

function StatWidget({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        flex: '1 1 120px',
        minWidth: 100,
        p: 1.25,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography variant='caption' color='text.secondary' sx={{ display: 'block' }}>
        {label}
      </Typography>
      <Typography variant='body2' noWrap sx={{ fontWeight: 600 }}>
        {value || '—'}
      </Typography>
    </Box>
  )
}

export default function DetailsDialog({ torrent: initialTorrent, onClose }: DetailsDialogProps) {
  const { t } = useTranslation()
  const fullScreen = useMediaQuery(queryMax('dialog'))
  useSyncModalOpen(true)

  const hash = initialTorrent.hash
  const { data: liveTorrent } = useTorrentDetail(hash, initialTorrent)
  const torrent = liveTorrent ?? initialTorrent

  const [viewedFileList, setViewedFileList] = useState<number[] | undefined>()
  const [seasonAmount, setSeasonAmount] = useState<number[] | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<number | undefined>()
  const [isDetailedCacheView, setIsDetailedCacheView] = useState(false)
  const [isSnakeDebugMode, setIsSnakeDebugMode] = useLocalBoolPref('isSnakeDebugMode')

  const cache = useUpdateCache(hash)
  const {
    poster,
    title,
    category,
    name,
    stat,
    download_speed: downloadSpeed,
    upload_speed: uploadSpeed,
    torrent_size: torrentSize,
    file_stats: torrentFileList,
  } = torrent

  const playableFileList = useMemo(
    () => torrentFileList?.map(toPlayableFile).filter(({ path }) => isFilePlayable(path)),
    [torrentFileList],
  )

  useEffect(() => {
    if (playableFileList && seasonAmount === null) {
      const seasons: number[] = []
      playableFileList.forEach(({ path }) => {
        const currentSeason = ptt.parse(path).season
        if (currentSeason && !seasons.includes(currentSeason)) seasons.push(currentSeason)
      })
      if (seasons.length) setSelectedSeason(seasons.sort((a, b) => a - b)[0])
      setSeasonAmount(seasons.sort((a, b) => a - b))
    }
  }, [playableFileList, seasonAmount])

  useEffect(() => {
    let cancelled = false
    void listViewedFiles(hash).then(list => {
      if (!cancelled) setViewedFileList(list)
    })
    return () => {
      cancelled = true
    }
  }, [hash])

  const statusLabel = (value?: number) => {
    const map: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDB'),
    }
    return value != null ? map[value] || String(value) : '—'
  }

  const getParsedTitle = () => {
    const parts: Array<string | number> = []
    const torrentParsedName = name ? ptt.parse(name) : null

    if (title !== name) {
      parts.push(removeRedundantCharacters(title || ''))
    } else if (torrentParsedName?.title) {
      parts.push(removeRedundantCharacters(torrentParsedName.title))
    }

    if (torrentParsedName?.year && !String(parts[0] || '').includes(String(torrentParsedName.year))) {
      parts.push(torrentParsedName.year)
    }
    if (torrentParsedName?.resolution && !String(parts[0] || '').includes(String(torrentParsedName.resolution))) {
      parts.push(torrentParsedName.resolution)
    }

    const newNameString = parts.join('. ')
    const lastDotShouldBeAdded =
      newNameString[newNameString.length - 1] === '.' && newNameString[newNameString.length - 2] === '.'

    return lastDotShouldBeAdded ? `${newNameString}.` : newNameString
  }

  const loading = stat === GETTING_INFO || stat === IN_DB

  return (
    <>
      <Dialog open fullWidth maxWidth='lg' fullScreen={fullScreen} onClose={onClose}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}>
          <Typography variant='h6' component='span' noWrap sx={{ flex: 1 }}>
            {t('TorrentDetails')}
          </Typography>
          <IconButton aria-label={t('Close', { defaultValue: 'Close' })} onClick={onClose} edge='end'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'flex-start' } }}>
              <Box
                sx={{
                  width: { xs: '100%', sm: 160 },
                  maxWidth: 160,
                  aspectRatio: '2/3',
                  borderRadius: 1,
                  overflow: 'hidden',
                  bgcolor: 'action.hover',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {poster ? (
                  <Box component='img' src={poster} alt='' sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageNotSupportedIcon sx={{ fontSize: 48, opacity: 0.4 }} />
                )}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant='h6' sx={{ mb: 0.5, wordBreak: 'break-word' }}>
                  {getParsedTitle() || title || name || hash}
                </Typography>
                {name && title !== name && (
                  <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>
                    {ptt.parse(name).title || name}
                  </Typography>
                )}

                <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mb: 1.5 }}>
                  <StatWidget label={t('DownloadSpeed')} value={humanizeSpeed(downloadSpeed)} />
                  <StatWidget label={t('UploadSpeed')} value={humanizeSpeed(uploadSpeed)} />
                  <StatWidget label={t('Peers')} value={getPeerString(torrent) || '—'} />
                  <StatWidget label={t('Size')} value={humanizeSize(torrentSize)} />
                  <StatWidget label={t('Status')} value={statusLabel(stat)} />
                  {category ? <StatWidget label={t('Category')} value={category} /> : null}
                </Stack>

                <SpeedCharts downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed} />
              </Box>
            </Stack>

            <Divider />

            <TorrentActions
              hash={hash}
              name={name}
              title={title}
              playableFileList={playableFileList}
              viewedFileList={viewedFileList}
              setViewedFileList={setViewedFileList}
              onDropped={onClose}
            />

            <Divider />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
            >
              <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                {t('Cache')}
              </Typography>
              <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  size='small'
                  variant={isDetailedCacheView ? 'contained' : 'outlined'}
                  color='secondary'
                  onClick={() => setIsDetailedCacheView(v => !v)}
                >
                  {isDetailedCacheView
                    ? t('CacheViewCompact', { defaultValue: 'Compact' })
                    : t('DetailedCacheView.button')}
                </Button>
                {isDetailedCacheView ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        checked={isSnakeDebugMode}
                        onChange={(_, checked) => {
                          setIsSnakeDebugMode(checked)
                        }}
                      />
                    }
                    label={t('SnakeDebug', { defaultValue: 'Debug pieces' })}
                  />
                ) : null}
              </Stack>
            </Stack>

            <TorrentCache
              cache={cache}
              mode={isDetailedCacheView ? 'detailed' : 'mini'}
              isSnakeDebugMode={isSnakeDebugMode}
            />

            {(cache.PiecesCount != null || cache.PiecesLength != null) && (
              <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap' }}>
                {cache.PiecesCount != null ? (
                  <StatWidget label={t('PiecesCount')} value={String(cache.PiecesCount)} />
                ) : null}
                {cache.PiecesLength != null ? (
                  <StatWidget label={t('PiecesLength')} value={humanizeSize(cache.PiecesLength)} />
                ) : null}
                {cache.Filled != null && cache.Capacity != null ? (
                  <StatWidget
                    label={t('CacheFilled', { defaultValue: 'Cache' })}
                    value={`${humanizeSize(cache.Filled)} / ${humanizeSize(cache.Capacity)}`}
                  />
                ) : null}
              </Stack>
            )}

            <Divider />

            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              {t('TorrentContent')}
            </Typography>

            {loading ? (
              <Typography color='text.secondary'>{t('TorrentGettingInfo')}</Typography>
            ) : (
              <>
                {(seasonAmount?.length ?? 0) > 1 && (
                  <Box>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
                      {t('SelectSeason')}
                    </Typography>
                    <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mb: 2 }}>
                      {seasonAmount!.map(season => (
                        <Button
                          key={season}
                          color='secondary'
                          variant={selectedSeason === season ? 'contained' : 'outlined'}
                          onClick={() => setSelectedSeason(season)}
                        >
                          {season}
                        </Button>
                      ))}
                    </Stack>
                    <Typography variant='subtitle2' sx={{ mb: 1 }}>
                      {t('Season')} {selectedSeason}
                    </Typography>
                  </Box>
                )}

                <FileBrowser
                  hash={hash}
                  playableFileList={playableFileList || []}
                  viewedFileList={viewedFileList}
                  selectedSeason={selectedSeason}
                  seasonAmount={seasonAmount}
                />
              </>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
