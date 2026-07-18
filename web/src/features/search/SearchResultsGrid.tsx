import { Button, Spinner, useMediaQuery } from '@heroui/react'
import { Film, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { SearchResultItem } from 'shared/api/types'
import { queryMax } from 'shared/theme/breakpoints'

interface SearchResultsGridProps {
  results: SearchResultItem[]
  adding: boolean
  addingKey: string | null
  resultDedupeKey: (item: SearchResultItem) => string
  formatSize: (item: SearchResultItem) => string
  onAdd: (item: SearchResultItem) => void
}

/**
 * Search results as a dense list/table — Torznab/Rutor rarely ship posters, so a poster grid
 * wastes space on empty Film placeholders. Optional poster thumb stays when present.
 */
export default function SearchResultsGrid({
  results,
  adding,
  addingKey,
  resultDedupeKey,
  formatSize,
  onAdd,
}: SearchResultsGridProps) {
  const { t } = useTranslation()
  const isCompact = useMediaQuery(queryMax('mobile'))

  if (isCompact) {
    return (
      <div className='space-y-2'>
        {results.map((item, index) => {
          const key = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
          const busy = adding && addingKey === key

          return (
            <div
              key={key}
              className={`flex gap-3 rounded-xl border border-border bg-surface p-3 ${busy ? 'border-accent/40 bg-accent-soft/30' : ''}`}
            >
              <PosterThumb poster={item.Poster} />
              <div className='min-w-0 flex-1'>
                <div className='mb-1 flex flex-wrap items-center gap-1.5'>
                  {item.Tracker ? (
                    <span className='truncate rounded-full bg-surface-tertiary px-2 py-0.5 text-[10px] font-medium text-muted'>
                      {item.Tracker}
                    </span>
                  ) : null}
                </div>
                <p className='mb-1.5 break-words text-sm font-medium leading-snug text-foreground' title={item.Title}>
                  {item.Title || '—'}
                </p>
                <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted'>
                  <span>{formatSize(item)}</span>
                  {item.Seed != null || item.Peer != null ? (
                    <span className='inline-flex items-center gap-1'>
                      <Users className='size-3.5' aria-hidden />
                      {item.Seed ?? 0}·{item.Peer ?? 0}
                    </span>
                  ) : null}
                </div>
              </div>
              <Button
                size='sm'
                variant='primary'
                isDisabled={adding}
                onPress={() => onAdd(item)}
                className='min-h-10 shrink-0 self-center px-3'
              >
                {busy ? <Spinner size='sm' color='current' /> : t('Add')}
              </Button>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`overflow-auto rounded-xl border border-border ${adding ? 'opacity-90' : ''}`}>
      <table className='w-full min-w-[640px] border-collapse text-sm'>
        <thead className='bg-surface-tertiary text-left text-xs uppercase tracking-wide text-muted'>
          <tr>
            <th className='w-12 px-3 py-2.5' />
            <th className='px-3 py-2.5'>{t('Name')}</th>
            <th className='w-28 px-3 py-2.5'>{t('Size')}</th>
            <th className='w-24 px-3 py-2.5'>{t('Seeders')}</th>
            <th className='w-24 px-3 py-2.5'>{t('Peers')}</th>
            <th className='w-28 px-3 py-2.5' />
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => {
            const key = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
            const busy = adding && addingKey === key

            return (
              <tr
                key={key}
                className={`border-t border-border ${busy ? 'bg-accent-soft/40' : 'hover:bg-surface-secondary/80'}`}
              >
                <td className='px-3 py-2.5 align-middle'>
                  <PosterThumb poster={item.Poster} />
                </td>
                <td className='px-3 py-2.5 align-top'>
                  <div className='flex flex-col gap-1'>
                    {item.Tracker ? (
                      <span className='w-fit max-w-full truncate rounded-full bg-surface-tertiary px-2 py-0.5 text-[10px] font-medium text-muted'>
                        {item.Tracker}
                      </span>
                    ) : null}
                    <span className='break-words leading-snug text-foreground' title={item.Title}>
                      {item.Title || '—'}
                    </span>
                  </div>
                </td>
                <td className='px-3 py-2.5 whitespace-nowrap text-muted'>{formatSize(item)}</td>
                <td className='px-3 py-2.5 tabular-nums text-muted'>{item.Seed ?? '—'}</td>
                <td className='px-3 py-2.5 tabular-nums text-muted'>{item.Peer ?? '—'}</td>
                <td className='px-3 py-2.5'>
                  <Button
                    size='sm'
                    variant='primary'
                    isDisabled={adding}
                    onPress={() => onAdd(item)}
                    className='min-h-9'
                  >
                    {busy ? <Spinner size='sm' color='current' /> : t('Add')}
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function PosterThumb({ poster }: { poster?: string }) {
  if (poster) {
    return <img src={poster} alt='' className='h-14 w-10 shrink-0 rounded-md object-cover' loading='lazy' />
  }
  return (
    <div className='grid h-14 w-10 shrink-0 place-items-center rounded-md bg-surface-tertiary'>
      <Film className='size-4 text-muted' aria-hidden />
    </div>
  )
}
