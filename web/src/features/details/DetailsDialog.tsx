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
import { filesFromMetadata } from 'shared/torrent/fileMetadata'
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
  onEdit?: (torrent: TorrentStat) => void
}

type DetailsTab = 'overview' | 'files' | 'cache'

const toPlayableFile = (file: TorrentFileStat): PlayableFile => ({
  id: file.id ?? file.Id ?? 0,
  path: file.path ?? file.Path ?? '',
  length: file.length ?? file.Length ?? 0,
})

function StatWidget({ label, value }: { label: string; value: string }) {
  return (
    <div className='min-w-[104px] flex-1 rounded-lg border border-border bg-surface-secondary px-3 py-2 text-center'>
      <span className='block text-xs leading-tight text-muted'>{label}</span>
      <span className='mt-1 block break-words text-base font-bold tabular-nums text-foreground' title={value}>
        {value || '—'}
      </span>
    </div>
  )
}

/** Derives a deduplicated display title from the raw torrent name via parse-torrent-title. */
function buildDisplayTitle(name: string | undefined, title: string | undefined): string {
  const parts: Array<string | number> = []
  const parsedName = name ? ptt.parse(name) : null

  if (title !== name) {
    parts.push(removeRedundantCharacters(title || ''))
  } else if (parsedName?.title) {
    parts.push(removeRedundantCharacters(parsedName.title))
  }

  if (parsedName?.year && !String(parts[0] || '').includes(String(parsedName.year))) {
    parts.push(parsedName.year)
  }
  if (parsedName?.resolution && !String(parts[0] || '').includes(String(parsedName.resolution))) {
    parts.push(parsedName.resolution)
  }

  const combined = parts.join('. ')
  const needsTrailingDot = combined.endsWith('.') && combined[combined.length - 2] === '.'
  return needsTrailingDot ? `${combined}.` : combined
}

/** Full-detail sheet for a torrent: hero header, live speed chart, files browser and cache "snake" map. */
export default function DetailsDialog({ torrent: initialTorrent, onClose, onEdit }: DetailsDialogProps) {
  const { t } = useTranslation()
  const isFullScreen = useMediaQuery(queryMax('dialog'))
  useSyncModalOpen(true)

  const overlayState = useOverlayState({
    isOpen: true,
    onOpenChange: open => {
      if (!open) onClose()
    },
  })

  const hash = initialTorrent.hash
  const { data: liveTorrent } = useTorrentDetail(hash, initialTorrent)
  const torrent = liveTorrent ?? initialTorrent

  const [activeTab, setActiveTab] = useState<DetailsTab | null>(null)
  const [viewedFileList, setViewedFileList] = useState<number[] | undefined>()
  const [seasonList, setSeasonList] = useState<number[] | null>(null)
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
    file_stats: fileStats,
    data,
  } = torrent

  const playableFileList = useMemo(() => {
    const files = fileStats?.length ? fileStats.map(toPlayableFile) : filesFromMetadata(data)
    return files.filter(({ path }) => isFilePlayable(path))
  }, [fileStats, data])

  // Multi-file / series: default to Content so Play / Copy / external players are visible up front.
  const resolvedTab: DetailsTab = activeTab ?? (playableFileList.length > 1 ? 'files' : 'overview')

  useEffect(() => {
    if (playableFileList && seasonList === null) {
      const seasons: number[] = []
      playableFileList.forEach(({ path }) => {
        const season = ptt.parse(path).season
        if (season && !seasons.includes(season)) seasons.push(season)
      })
      seasons.sort((a, b) => a - b)
      if (seasons.length) setSelectedSeason(seasons[0])
      setSeasonList(seasons)
    }
  }, [playableFileList, seasonList])

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
    const labels: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDB'),
    }
    return value != null ? labels[value] || String(value) : '—'
  }

  const displayTitle = buildDisplayTitle(name, title) || title || name || hash
  const subtitle = name && title !== name ? ptt.parse(name).title || name : null
  // IN_DB torrents still carry a persisted file list in `data` — only block the UI while the
  // live torrent is actively resolving metadata and we have nothing to show yet.
  const isLoadingMetadata = stat === GETTING_INFO && playableFileList.length === 0
  const hasMultipleSeasons = (seasonList?.length ?? 0) > 1

  return (
    <Modal.Root state={overlayState}>
      <Modal.Backdrop>
        <Modal.Container size={isFullScreen ? 'full' : 'lg'} scroll='inside'>
          {/* Inline style: HeroUI's size ceiling + our collapse-prevention floor (index.css) live in CSS
              layers, so a plain width utility can lose to them regardless of specificity — see AppDialog. */}
          <Modal.Dialog style={isFullScreen ? undefined : { minWidth: '46rem', maxWidth: '64rem' }}>
            <Modal.Header className='flex items-center gap-2'>
              <Modal.Heading className='min-w-0 flex-1 truncate'>{t('TorrentDetails')}</Modal.Heading>
              {onEdit ? (
                <Button isIconOnly variant='ghost' aria-label={t('EditTorrent')} onPress={() => onEdit(torrent)}>
                  <Pencil className='size-4' />
                </Button>
              ) : null}
              <Modal.CloseTrigger aria-label={t('Close')}>
                <X className='size-4' />
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body className='gap-4'>
              <div className='flex flex-col gap-4 rounded-xl bg-gradient-to-br from-accent-soft to-accent-soft/40 p-4 sm:flex-row sm:items-start'>
                <div className='mx-auto grid aspect-[2/3] w-full max-w-[160px] shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-secondary sm:mx-0'>
                  {poster ? (
                    <img src={poster} alt='' className='h-full w-full object-cover' />
                  ) : (
                    <ImageOff className='size-12 opacity-40' aria-hidden />
                  )}
                </div>

                <div className='min-w-0 flex-1'>
                  <h2 className='mb-1 break-words text-lg font-bold text-foreground'>{displayTitle}</h2>
                  {subtitle ? <p className='mb-3 text-sm text-muted'>{subtitle}</p> : null}

                  <div className='flex flex-wrap gap-2'>
                    <StatWidget label={t('DownloadSpeed')} value={humanizeSpeed(downloadSpeed)} />
                    <StatWidget label={t('UploadSpeed')} value={humanizeSpeed(uploadSpeed)} />
                    <StatWidget label={t('Peers')} value={getPeerString(torrent) || '—'} />
                    <StatWidget label={t('Size')} value={humanizeSize(torrentSize)} />
                    <StatWidget label={t('Status', { defaultValue: 'Status' })} value={statusLabel(stat)} />
                    {category ? <StatWidget label={t('Category')} value={category} /> : null}
                  </div>

                  {cache.PiecesCount != null || cache.PiecesLength != null || cache.Capacity != null ? (
                    <div className='mt-2 flex flex-wrap gap-2'>
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
                  ) : null}
                </div>
              </div>

              <Tabs.Root selectedKey={resolvedTab} onSelectionChange={key => setActiveTab(String(key) as DetailsTab)}>
                <Tabs.List aria-label={t('TorrentDetails')}>
                  <Tabs.Tab id='overview'>{t('Overview', { defaultValue: 'Overview' })}</Tabs.Tab>
                  <Tabs.Tab id='files'>{t('TorrentContent')}</Tabs.Tab>
                  <Tabs.Tab id='cache'>{t('Cache')}</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel id='overview' className='space-y-4 pt-4'>
                  <SpeedCharts downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed} />

                  <div className='rounded-xl border border-border bg-surface-secondary p-4'>
                    <div className='mb-3 flex items-center justify-between gap-2'>
                      <p className='text-sm font-semibold text-muted'>{t('Cache')}</p>
                      <Button
                        size='sm'
                        variant='ghost'
                        onPress={() => {
                          setIsDetailedCacheView(true)
                          setActiveTab('cache')
                        }}
                      >
                        {t('DetailedCacheView.button')}
                      </Button>
                    </div>
                    <TorrentCache cache={cache} mode='mini' />
                  </div>

                  <TorrentActions
                    hash={hash}
                    name={name}
                    title={title}
                    playableFileList={playableFileList}
                    viewedFileList={viewedFileList}
                    setViewedFileList={setViewedFileList}
                    onDropped={onClose}
                    onShowFiles={() => setActiveTab('files')}
                  />
                </Tabs.Panel>

                <Tabs.Panel id='files' className='pt-4'>
                  <div className='rounded-xl bg-surface-secondary p-4'>
                    {isLoadingMetadata ? (
                      <p className='text-sm text-muted'>{t('TorrentGettingInfo')}</p>
                    ) : (
                      <>
                        {hasMultipleSeasons ? (
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
                              {seasonList!.map(season => (
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
                          seasonAmount={seasonList}
                        />
                      </>
                    )}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id='cache' className='space-y-4 pt-4'>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='text-sm font-semibold text-muted'>{t('Cache')}</p>
                    <div className='flex flex-wrap items-center gap-3'>
                      <Button
                        size='sm'
                        variant={isDetailedCacheView ? 'primary' : 'secondary'}
                        onPress={() => setIsDetailedCacheView(current => !current)}
                      >
                        {isDetailedCacheView
                          ? t('CacheViewCompact', { defaultValue: 'Compact' })
                          : t('DetailedCacheView.button')}
                      </Button>
                      {isDetailedCacheView ? (
                        <Checkbox isSelected={isSnakeDebugMode} onChange={setIsSnakeDebugMode}>
                          <Checkbox.Content>
                            <Checkbox.Control>
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                            {t('SnakeDebug', { defaultValue: 'Debug pieces' })}
                          </Checkbox.Content>
                        </Checkbox>
                      ) : null}
                    </div>
                  </div>

                  <TorrentCache
                    cache={cache}
                    mode={isDetailedCacheView ? 'detailed' : 'mini'}
                    isSnakeDebugMode={isSnakeDebugMode}
                  />
                </Tabs.Panel>
              </Tabs.Root>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}
