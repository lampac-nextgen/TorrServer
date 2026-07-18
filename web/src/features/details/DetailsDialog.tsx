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
import { Pencil, X } from 'lucide-react'
import { useEffect, useMemo, useState, useCallback } from 'react'
import ptt from 'parse-torrent-title'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
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
import { iconBtn } from 'shared/ui/controlClasses'
import { DIALOG_SHEET_L } from 'shared/ui/dialogSizes'
import { toPlayableFile } from 'shared/torrent/toPlayableFile'

import FileBrowser from './FileBrowser'
import SpeedCharts from './SpeedCharts'
import TorrentActions from './TorrentActions'
import TorrentCache from './TorrentCache'

export interface DetailsDialogProps {
  torrent: TorrentStat
  onClose: () => void
  onEdit?: (torrent: TorrentStat) => void
  /** Continue Watching: start this file after details open. */
  autoPlayFileId?: number
  autoPlayTimecode?: number
}

type DetailsTab = 'overview' | 'files' | 'cache'

function StatWidget({ label, value }: { label: string; value: string }) {
  return (
    <div className='min-w-0 flex-1 rounded-lg border border-border bg-surface-secondary px-2.5 py-2 text-center sm:min-w-[104px] sm:px-3'>
      <span className='block text-[11px] leading-tight text-muted sm:text-xs'>{label}</span>
      <span
        className='mt-1 block break-words text-sm font-bold tabular-nums text-foreground sm:text-base'
        title={value}
      >
        {value || '—'}
      </span>
    </div>
  )
}

/**
 * Derives a short display title from torrent `name` / `title` via parse-torrent-title,
 * dropping redundant year/resolution tokens already present in the primary string.
 */
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
export default function DetailsDialog({
  torrent: initialTorrent,
  onClose,
  onEdit,
  autoPlayFileId,
  autoPlayTimecode,
}: DetailsDialogProps) {
  const { t } = useTranslation()
  const isFullScreen = useMediaQuery(queryMax('dialog'))
  /** Equal-width Overview/Files/Cache segments — only needed below the phone breakpoint. */
  const isMobile = useMediaQuery(queryMax('mobile'))
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
  const [isSnakeDebugMode, setIsSnakeDebugMode] = useLocalBoolPref('isSnakeDebugMode')

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

  const cache = useUpdateCache(hash, {
    // Fast snake only on Cache tab; Overview mini-preview uses idle cadence.
    fast: resolvedTab === 'cache',
  })

  const seasonsFingerprint = useMemo(() => {
    const seasons: number[] = []
    playableFileList.forEach(({ path }) => {
      const season = ptt.parse(path).season
      if (season && !seasons.includes(season)) seasons.push(season)
    })
    seasons.sort((a, b) => a - b)
    return seasons.join(',')
  }, [playableFileList])

  useEffect(() => {
    const seasons = seasonsFingerprint
      ? seasonsFingerprint
          .split(',')
          .map(Number)
          .filter(n => Number.isFinite(n) && n > 0)
      : []
    // eslint-disable-next-line react-hooks/set-state-in-effect -- keep season list/selection valid when file list changes
    setSeasonList(seasons)
    setSelectedSeason(prev => {
      if (seasons.length === 0) return undefined
      if (prev != null && seasons.includes(prev)) return prev
      return seasons[0]
    })
  }, [seasonsFingerprint])

  useEffect(() => {
    let cancelled = false
    void listViewedFiles(hash)
      .then(list => {
        if (!cancelled) setViewedFileList(list)
      })
      .catch(() => {
        if (!cancelled) setViewedFileList(undefined)
      })
    return () => {
      cancelled = true
    }
  }, [hash])

  const refreshViewed = useCallback(async () => {
    try {
      setViewedFileList(await listViewedFiles(hash))
    } catch {
      setViewedFileList(undefined)
    }
  }, [hash])

  const statusLabel = (value?: number) => {
    const labels: Record<number, string> = {
      [GETTING_INFO]: t('TorrentGettingInfo'),
      [PRELOAD]: t('TorrentPreload'),
      [WORKING]: t('TorrentWorking'),
      [CLOSED]: t('TorrentClosed'),
      [IN_DB]: t('TorrentInDb'),
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
          <Modal.Dialog style={isFullScreen ? undefined : DIALOG_SHEET_L}>
            <Modal.Header className='flex items-center gap-2'>
              <Modal.Heading className='min-w-0 flex-1 truncate'>{t('TorrentDetails')}</Modal.Heading>
              {onEdit ? (
                <Button
                  isIconOnly
                  variant='ghost'
                  className={iconBtn}
                  aria-label={t('EditTorrent')}
                  onPress={() => onEdit(torrent)}
                >
                  <Pencil aria-hidden />
                </Button>
              ) : null}
              <Modal.CloseTrigger aria-label={t('Close')}>
                <X aria-hidden />
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body className='gap-4'>
              <div className='flex flex-col gap-4 rounded-xl bg-gradient-to-br from-accent-soft to-accent-soft/40 p-4 sm:flex-row sm:items-start'>
                {poster ? (
                  <div className='mx-auto grid aspect-[2/3] w-full max-w-[120px] shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-secondary sm:mx-0'>
                    <img
                      src={poster}
                      alt=''
                      className='h-full w-full object-cover'
                      onError={event => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ) : null}

                <div className='min-w-0 flex-1'>
                  <h2 className='mb-1 break-words text-lg font-bold text-foreground'>{displayTitle}</h2>
                  {subtitle ? <p className='mb-3 text-sm text-muted'>{subtitle}</p> : null}

                  <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    <StatWidget label={t('DownloadSpeed')} value={humanizeSpeed(downloadSpeed)} />
                    <StatWidget label={t('UploadSpeed')} value={humanizeSpeed(uploadSpeed)} />
                    <StatWidget label={t('Peers')} value={getPeerString(torrent) || '—'} />
                    <StatWidget label={t('Size')} value={humanizeSize(torrentSize)} />
                    <StatWidget label={t('Status')} value={statusLabel(stat)} />
                    {category ? <StatWidget label={t('Category')} value={category} /> : null}
                    {cache.PiecesCount != null ? (
                      <StatWidget label={t('PiecesCount')} value={String(cache.PiecesCount)} />
                    ) : null}
                    {cache.PiecesLength != null ? (
                      <StatWidget label={t('PiecesLength')} value={humanizeSize(cache.PiecesLength)} />
                    ) : null}
                    {cache.Filled != null && cache.Capacity != null ? (
                      <StatWidget
                        label={t('CacheFilled')}
                        value={(() => {
                          const filled = cache.Filled
                          const capacity = cache.Capacity
                          const shown = Math.min(filled, capacity)
                          const over = filled > capacity
                          return over
                            ? `${humanizeSize(shown)} / ${humanizeSize(capacity)} · ${Math.round((filled / capacity) * 100)}%`
                            : `${humanizeSize(filled)} / ${humanizeSize(capacity)}`
                        })()}
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              {/*
                HeroUI primary tabs default to `w-full` per tab; without `w-auto` + Indicator,
                only the first label was visible (others scrolled off-screen). Secondary variant
                gives a clear underline for the active section on both phone and desktop.
              */}
              <Tabs.Root
                variant='secondary'
                selectedKey={resolvedTab}
                onSelectionChange={key => setActiveTab(String(key) as DetailsTab)}
              >
                <Tabs.ListContainer className='w-full max-w-full'>
                  <Tabs.List aria-label={t('TorrentDetails')} className={isMobile ? 'w-full min-w-full' : undefined}>
                    <Tabs.Tab
                      id='overview'
                      className={isMobile ? 'min-h-11 w-auto flex-1 basis-0' : 'min-h-11 w-auto shrink-0'}
                    >
                      {t('Overview')}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab
                      id='files'
                      className={isMobile ? 'min-h-11 w-auto flex-1 basis-0' : 'min-h-11 w-auto shrink-0'}
                      aria-label={t('TorrentContent')}
                    >
                      {t('TorrentFiles')}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab
                      id='cache'
                      className={isMobile ? 'min-h-11 w-auto flex-1 basis-0' : 'min-h-11 w-auto shrink-0'}
                    >
                      {t('Cache')}
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel id='overview' className='space-y-4 pt-4'>
                  <SpeedCharts downloadSpeed={downloadSpeed} uploadSpeed={uploadSpeed} />

                  <div className='rounded-xl border border-border bg-surface-secondary p-4'>
                    <div className='mb-3 flex items-center justify-between gap-2'>
                      <p className='text-sm font-semibold text-muted'>{t('Cache')}</p>
                      <Button size='sm' variant='ghost' onPress={() => setActiveTab('cache')}>
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
                    onViewedChange={refreshViewed}
                    onDropped={onClose}
                    onShowFiles={() => setActiveTab('files')}
                    autoPlayFileId={autoPlayFileId}
                    autoPlayTimecode={autoPlayTimecode}
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
                          allFileStats={fileStats}
                          onViewedChange={refreshViewed}
                        />
                      </>
                    )}
                  </div>
                </Tabs.Panel>

                <Tabs.Panel id='cache' className='space-y-4 pt-4'>
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <p className='text-sm font-semibold text-muted'>{t('Cache')}</p>
                    <Checkbox isSelected={isSnakeDebugMode} onChange={setIsSnakeDebugMode}>
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        {t('SnakeDebug')}
                      </Checkbox.Content>
                    </Checkbox>
                  </div>

                  <TorrentCache cache={cache} mode='detailed' isSnakeDebugMode={isSnakeDebugMode} />
                </Tabs.Panel>
              </Tabs.Root>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  )
}
