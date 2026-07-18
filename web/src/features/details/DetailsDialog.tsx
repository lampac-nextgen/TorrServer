import {
  Button,
  Checkbox,
  Modal,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useOverlayState,
} from '@heroui/react'
import { ImageOff, Pencil, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ptt from 'parse-torrent-title'
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
import { getThemeColors } from 'shared/theme/colors'
import { useThemePreference } from 'shared/theme/useThemePreference'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

import FileBrowser from './FileBrowser'
import SpeedCharts from './SpeedCharts'
import TorrentActions from './TorrentActions'
import TorrentCache from './TorrentCache'

export interface DetailsDialogProps {
  torrent: TorrentStat
  onClose: () => void
  onEdit?: (torrent: TorrentStat) => void
}

type DetailsTab = 'overview' | 'files' | 'cache'

const toPlayableFile = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

function StatWidget({ label, value }: { label: string; value: string }) {
  const [isDark] = useThemePreference()
  const colors = getThemeColors(isDark ? 'dark' : 'light').dialogTorrentDetailsContent

  return (
    <div
      className='min-w-[108px] flex-1 rounded-lg border px-3 py-2 text-center'
      style={{
        borderColor: colors.bufferTrackBorderColor,
        backgroundColor: colors.cacheSectionBGColor,
      }}
    >
      <span className='block text-xs leading-tight' style={{ color: colors.widgetFontColor }}>
        {label}
      </span>
      <span
        className='mt-1 block break-words text-base font-bold tabular-nums'
        title={value}
        style={{ color: colors.titleFontColor }}
      >
        {value || '—'}
      </span>
    </div>
  )
}

export default function DetailsDialog({ torrent: initialTorrent, onClose, onEdit }: DetailsDialogProps) {
  const { t } = useTranslation()
  const fullScreen = useMediaQuery(queryMax('dialog'))
  const [isDark] = useThemePreference()
  const colors = getThemeColors(isDark ? 'dark' : 'light').dialogTorrentDetailsContent
  useSyncModalOpen(true)

  const state = useOverlayState({
    isOpen: true,
    onOpenChange: open => {
      if (!open) onClose()
    },
  })

  const hash = initialTorrent.hash
  const { data: liveTorrent } = useTorrentDetail(hash, initialTorrent)
  const torrent = liveTorrent ?? initialTorrent

  const [tab, setTab] = useState<DetailsTab>('overview')
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
    <Modal.Root state={state}>
      <Modal.Backdrop>
        <Modal.Container size={fullScreen ? 'full' : 'lg'} scroll='inside'>
          <Modal.Dialog>
            <Modal.Header className='flex items-center gap-2'>
              <Modal.Heading className='min-w-0 flex-1 truncate'>{t('TorrentDetails')}</Modal.Heading>
              {onEdit ? (
                <Button
                  isIconOnly
                  variant='ghost'
                  aria-label={t('EditTorrent')}
                  onPress={() => onEdit(torrent)}
                >
                  <Pencil className='size-4' />
                </Button>
              ) : null}
              <Modal.CloseTrigger aria-label={t('Close', { defaultValue: 'Close' })}>
                <X className='size-4' />
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body className='gap-4'>
              <div
                className='flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-start'
                style={{
                  background: `linear-gradient(135deg, ${colors.gradientStartColor}, ${colors.gradientEndColor})`,
                }}
              >
                <div
                  className='mx-auto grid aspect-[2/3] w-full max-w-[160px] shrink-0 place-items-center overflow-hidden rounded-lg sm:mx-0'
                  style={{ backgroundColor: colors.posterBGColor }}
                >
                  {poster ? (
                    <img src={poster} alt='' className='h-full w-full object-cover' />
                  ) : (
                    <ImageOff className='size-12 opacity-40' aria-hidden />
                  )}
                </div>

                <div className='min-w-0 flex-1'>
                  <h2 className='mb-1 break-words text-lg font-bold' style={{ color: colors.titleFontColor }}>
                    {getParsedTitle() || title || name || hash}
                  </h2>
                  {name && title !== name ? (
                    <p className='mb-3 text-sm' style={{ color: colors.subNameFontColor }}>
                      {ptt.parse(name).title || name}
                    </p>
                  ) : null}
                  <div className='mb-3 flex flex-wrap gap-2'>
                    <StatWidget label={t('DownloadSpeed')} value={humanizeSpeed(downloadSpeed)} />
                    <StatWidget label={t('UploadSpeed')} value={humanizeSpeed(uploadSpeed)} />
                    <StatWidget label={t('Peers')} value={getPeerString(torrent) || '—'} />
                    <StatWidget label={t('Size')} value={humanizeSize(torrentSize)} />
                    <StatWidget label={t('Status')} value={statusLabel(stat)} />
                    {category ? <StatWidget label={t('Category')} value={category} /> : null}
                  </div>
                </div>
              </div>

              <Tabs.Root selectedKey={tab} onSelectionChange={key => setTab(String(key) as DetailsTab)}>
                <Tabs.List aria-label={t('TorrentDetails')}>
                  <Tabs.Tab id='overview'>{t('Overview', { defaultValue: 'Overview' })}</Tabs.Tab>
                  <Tabs.Tab id='files'>{t('TorrentContent')}</Tabs.Tab>
                  <Tabs.Tab id='cache'>{t('Cache')}</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel id='overview' className='pt-4'>
                  <SpeedCharts downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed} />
                  <div className='mt-4'>
                    <TorrentActions
                      hash={hash}
                      name={name}
                      title={title}
                      playableFileList={playableFileList}
                      viewedFileList={viewedFileList}
                      setViewedFileList={setViewedFileList}
                      onDropped={onClose}
                    />
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id='files' className='pt-4'>
                  <div className='rounded-xl p-4' style={{ backgroundColor: colors.torrentFilesSectionBGColor }}>
                    {loading ? (
                      <p className='text-default-500'>{t('TorrentGettingInfo')}</p>
                    ) : (
                      <>
                        {(seasonAmount?.length ?? 0) > 1 ? (
                          <div className='mb-4'>
                            <ToggleButtonGroup
                              selectionMode='single'
                              selectedKeys={selectedSeason != null ? [String(selectedSeason)] : []}
                              onSelectionChange={keys => {
                                const value = [...keys][0]
                                if (value != null) setSelectedSeason(Number(value))
                              }}
                              className='flex flex-wrap gap-2'
                            >
                              {seasonAmount!.map(season => (
                                <ToggleButton key={season} id={String(season)}>
                                  {t('Season')} {season}
                                </ToggleButton>
                              ))}
                            </ToggleButtonGroup>
                          </div>
                        ) : null}

                        <FileBrowser
                          hash={hash}
                          playableFileList={playableFileList || []}
                          viewedFileList={viewedFileList}
                          selectedSeason={selectedSeason}
                          seasonAmount={seasonAmount}
                        />
                      </>
                    )}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id='cache' className='space-y-4 pt-4'>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='text-sm font-semibold'>{t('Cache')}</p>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Button
                        size='sm'
                        variant={isDetailedCacheView ? 'primary' : 'secondary'}
                        onPress={() => setIsDetailedCacheView(v => !v)}
                      >
                        {isDetailedCacheView
                          ? t('CacheViewCompact', { defaultValue: 'Compact' })
                          : t('DetailedCacheView.button')}
                      </Button>
                      {isDetailedCacheView ? (
                        <Checkbox isSelected={isSnakeDebugMode} onChange={setIsSnakeDebugMode}>
                          {t('SnakeDebug', { defaultValue: 'Debug pieces' })}
                        </Checkbox>
                      ) : null}
                    </div>
                  </div>

                  <TorrentCache
                    cache={cache}
                    mode={isDetailedCacheView ? 'detailed' : 'mini'}
                    isSnakeDebugMode={isSnakeDebugMode}
                  />

                  {(cache.PiecesCount != null || cache.PiecesLength != null) && (
                    <div className='flex flex-wrap gap-2'>
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
                    </div>
                  )}
                </Tabs.Panel>
              </Tabs.Root>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}
