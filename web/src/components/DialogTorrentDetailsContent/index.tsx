import { NoImageIcon } from 'icons'
import { humanizeSize, removeRedundantCharacters } from 'utils/Utils'
import { useEffect, useState } from 'react'
import { Button, Box, LinearProgress, Stack, Typography } from '@mui/material'
import ptt from 'parse-torrent-title'
import axios from 'axios'
import { viewedHost } from 'utils/Hosts'
import { GETTING_INFO, IN_DB } from 'torrentStates'
import CircularProgress from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { resolveThemeColors } from 'shared/theme/color'
import { readLocalBool } from 'utils/localPrefs'
import type { PlayableFile, TorrentStat, ViewedFileEntry } from 'types/api'

import { useUpdateCache, useGetSettings } from './customHooks'
import DialogHeader from './DialogHeader'
import TorrentCache from './TorrentCache'
import Table from './Table'
import DetailedView from './DetailedView'
import {
  DialogContentGrid,
  MainSection,
  Poster,
  SectionTitle,
  SectionSubName,
  WidgetWrapper,
  SectionHeader,
  CacheSection,
  TorrentFilesSection,
  Divider,
  DetailsScrollBody,
} from './style'
import { DownlodSpeedWidget, UploadSpeedWidget, PeersWidget, SizeWidget, StatusWidget, CategoryWidget } from './widgets'
import SpeedCharts from 'features/details/SpeedCharts'
import TorrentFunctions from './TorrentFunctions'
import { isFilePlayable } from './helpers'

const Loader = () => (
  <div style={{ minHeight: 160, display: 'grid', placeItems: 'center', padding: 24 }}>
    <CircularProgress color='secondary' />
  </div>
)

const toPlayableFile = (file: {
  id?: number
  Id?: number
  path?: string
  Path?: string
  length?: number
  Length?: number
}): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

export interface DialogTorrentDetailsContentProps {
  closeDialog: () => void
  torrent: TorrentStat
}

export default function DialogTorrentDetailsContent({ closeDialog, torrent }: DialogTorrentDetailsContentProps) {
  const { t } = useTranslation()
  const {
    dialogTorrentDetailsContent: {
      bufferTrailStartColor,
      bufferTrailEndColor,
      bufferEmptyTrackColor,
      bufferTrackBorderColor,
    },
  } = resolveThemeColors(useTheme())
  const [isLoading, setIsLoading] = useState(true)
  const [isDetailedCacheView, setIsDetailedCacheView] = useState(false)
  const [viewedFileList, setViewedFileList] = useState<number[] | undefined>()
  const [playableFileList, setPlayableFileList] = useState<PlayableFile[] | undefined>()
  const [seasonAmount, setSeasonAmount] = useState<number[] | null>(null)
  const [selectedSeason, setSelectedSeason] = useState<number | undefined>()
  const [isSnakeDebugMode, setIsSnakeDebugMode] = useState(readLocalBool('isSnakeDebugMode'))

  const {
    poster,
    hash,
    title,
    category,
    name,
    stat,
    download_speed: downloadSpeed,
    upload_speed: uploadSpeed,
    torrent_size: torrentSize,
    file_stats: torrentFileList,
  } = torrent

  const cache = useUpdateCache(hash)
  const settings = useGetSettings()

  const { Capacity, PiecesCount, PiecesLength, Filled } = cache

  useEffect(() => {
    if (playableFileList && seasonAmount === null) {
      const seasons: number[] = []
      playableFileList.forEach(({ path }) => {
        const currentSeason = ptt.parse(path).season
        if (currentSeason) {
          !seasons.includes(currentSeason) && seasons.push(currentSeason)
        }
      })
      seasons.length && setSelectedSeason(seasons[0])
      setSeasonAmount(seasons.sort((a, b) => a - b))
    }
  }, [playableFileList, seasonAmount])

  useEffect(() => {
    setPlayableFileList(torrentFileList?.map(toPlayableFile).filter(({ path }) => isFilePlayable(path)))
  }, [torrentFileList])

  useEffect(() => {
    const cacheLoaded = !!Object.entries(cache).length
    const torrentLoaded = stat !== GETTING_INFO && stat !== IN_DB

    if (!cacheLoaded && !isLoading) setIsLoading(true)
    if (cacheLoaded && isLoading && torrentLoaded) setIsLoading(false)
  }, [stat, cache, isLoading])

  useEffect(() => {
    // getting viewed file list
    axios.post(viewedHost(), { action: 'list', hash }).then(({ data }) => {
      if (data) {
        const lst = (data as ViewedFileEntry[]).map(itm => itm.file_index).sort((a, b) => a - b)
        setViewedFileList(lst)
      } else setViewedFileList(undefined)
    })
  }, [hash])

  const preloadPerc = settings?.PreloadCache
  const preloadSize = ((Capacity || 0) / 100) * (preloadPerc || 0)
  const bufferSize = preloadSize > 33554432 ? preloadSize : 33554432 // Not less than 32MB
  // Classic TorrServer shows filled vs full cache capacity (not the preload target).
  const cacheDisplayTarget = Capacity && Capacity > 0 ? Capacity : bufferSize
  const cacheFillPercent =
    cacheDisplayTarget > 0 && Filled != null && Filled > 0
      ? Math.min(100, Math.round((Filled * 100) / cacheDisplayTarget))
      : null
  const preloadMarkerPct =
    Capacity && Capacity > 0 && preloadSize > 0 ? Math.min(100, Math.round((preloadSize * 100) / Capacity)) : null

  const getParsedTitle = () => {
    const newNameStringArr: Array<string | number> = []

    const torrentParsedName = name ? ptt.parse(name) : null

    if (title !== name) {
      newNameStringArr.push(removeRedundantCharacters(title || ''))
    } else if (torrentParsedName?.title) newNameStringArr.push(removeRedundantCharacters(torrentParsedName.title))

    // These 2 checks are needed to get year and resolution from torrent name if title does not have this info
    if (torrentParsedName?.year && !String(newNameStringArr[0] || '').includes(String(torrentParsedName.year)))
      newNameStringArr.push(torrentParsedName.year)
    if (
      torrentParsedName?.resolution &&
      !String(newNameStringArr[0] || '').includes(String(torrentParsedName.resolution))
    )
      newNameStringArr.push(torrentParsedName.resolution)

    const newNameString = newNameStringArr.join('. ')

    // removeRedundantCharacters is returning ".." if it was "..."
    const lastDotShouldBeAdded =
      newNameString[newNameString.length - 1] === '.' && newNameString[newNameString.length - 2] === '.'

    return lastDotShouldBeAdded ? `${newNameString}.` : newNameString
  }

  return (
    <>
      <DialogHeader
        onClose={closeDialog}
        title={isDetailedCacheView ? t('DetailedCacheView.header') : t('TorrentDetails')}
        {...(isDetailedCacheView && { onBack: () => setIsDetailedCacheView(false) })}
      />

      <DetailsScrollBody>
        {isLoading ? (
          <Loader />
        ) : isDetailedCacheView ? (
          <DetailedView
            downloadSpeed={downloadSpeed}
            uploadSpeed={uploadSpeed}
            torrent={torrent}
            torrentSize={torrentSize}
            PiecesCount={PiecesCount}
            PiecesLength={PiecesLength}
            stat={stat}
            cache={cache}
            isSnakeDebugMode={isSnakeDebugMode}
            setIsSnakeDebugMode={setIsSnakeDebugMode}
          />
        ) : (
          <DialogContentGrid>
            <MainSection>
              <Poster $poster={Boolean(poster)}>{poster ? <img alt='poster' src={poster} /> : <NoImageIcon />}</Poster>

              <div>
                {title && name !== title ? (
                  getParsedTitle().length > 90 ? (
                    <>
                      <SectionTitle>{ptt.parse(name || '').title}</SectionTitle>
                      <SectionSubName $mb={20}>{getParsedTitle()}</SectionSubName>
                    </>
                  ) : (
                    <>
                      <SectionTitle>{getParsedTitle()}</SectionTitle>
                      <SectionSubName $mb={20}>{ptt.parse(name || '')?.title}</SectionSubName>
                    </>
                  )
                ) : (
                  <SectionTitle $mb={20}>{getParsedTitle()}</SectionTitle>
                )}

                <WidgetWrapper>
                  <DownlodSpeedWidget data={downloadSpeed} />
                  <UploadSpeedWidget data={uploadSpeed} />
                  <PeersWidget data={torrent} />
                  <SizeWidget data={torrentSize} />
                  <StatusWidget stat={stat} />
                  <CategoryWidget data={category} />
                </WidgetWrapper>
                <SpeedCharts downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed} />

                <Divider />

                <TorrentFunctions
                  hash={hash}
                  viewedFileList={viewedFileList}
                  playableFileList={playableFileList}
                  name={name}
                  title={title}
                  setViewedFileList={setViewedFileList}
                />
              </div>
            </MainSection>

            <CacheSection>
              <SectionHeader>
                <SectionTitle $mb={12}>{t('Buffer')}</SectionTitle>
                {bufferSize <= 33554432 && <SectionSubName>{t('BufferNote')}</SectionSubName>}
                <Stack spacing={1} sx={{ mt: 0.5 }}>
                  <Typography
                    component='div'
                    variant='body2'
                    sx={{ fontWeight: 400, textAlign: 'center' }}
                    aria-label={`${humanizeSize(Filled || 0)} / ${humanizeSize(cacheDisplayTarget)}`}
                  >
                    {`${humanizeSize(Filled || 0)} / ${humanizeSize(cacheDisplayTarget)}`}
                    {cacheFillPercent != null ? ` · ${cacheFillPercent}%` : ''}
                  </Typography>
                  <Box sx={{ position: 'relative' }}>
                    <LinearProgress
                      variant='determinate'
                      value={cacheFillPercent ?? 0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={cacheFillPercent ?? 0}
                      sx={{
                        height: 10,
                        borderRadius: 1,
                        border: `1px solid ${bufferTrackBorderColor}`,
                        backgroundColor: bufferEmptyTrackColor,
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 1,
                          background: `linear-gradient(90deg, ${bufferTrailStartColor}, ${bufferTrailEndColor})`,
                        },
                      }}
                    />
                    {preloadMarkerPct != null && preloadMarkerPct > 0 && (
                      <Box
                        aria-hidden
                        title={t('SettingsDialog.PreloadCache')}
                        sx={{
                          position: 'absolute',
                          left: `${preloadMarkerPct}%`,
                          top: -2,
                          bottom: -2,
                          width: 2,
                          ml: '-1px',
                          borderRadius: 1,
                          bgcolor: bufferTrackBorderColor,
                          boxShadow: `0 0 0 1px ${bufferEmptyTrackColor}`,
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                  </Box>
                </Stack>
              </SectionHeader>

              <TorrentCache mode='mini' cache={cache} isSnakeDebugMode={isSnakeDebugMode} />
              <Button
                style={{ marginTop: '20px', width: '100%' }}
                variant='outlined'
                color='primary'
                size='large'
                onClick={() => setIsDetailedCacheView(true)}
              >
                {t('DetailedCacheView.button')}
              </Button>
            </CacheSection>

            <TorrentFilesSection>
              <SectionTitle $mb={20}>{t('TorrentContent')}</SectionTitle>

              {(seasonAmount?.length ?? 0) > 1 && (
                <>
                  <SectionSubName $mb={7}>{t('SelectSeason')}</SectionSubName>
                  <Stack direction='row' useFlexGap spacing={1} sx={{ flexWrap: 'wrap', mb: '30px' }}>
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

                  <SectionTitle $mb={20}>
                    {t('Season')} {selectedSeason}
                  </SectionTitle>
                </>
              )}

              <Table
                hash={hash}
                playableFileList={playableFileList}
                viewedFileList={viewedFileList}
                selectedSeason={selectedSeason}
                seasonAmount={seasonAmount}
              />
            </TorrentFilesSection>
          </DialogContentGrid>
        )}
      </DetailsScrollBody>
    </>
  )
}
