import { Button, Spinner } from '@heroui/react'
import { Film, Plus, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { SearchResultItem } from 'shared/api/types'

interface SearchResultsGridProps {
  results: SearchResultItem[]
  adding: boolean
  addingKey: string | null
  resultDedupeKey: (item: SearchResultItem) => string
  formatSize: (item: SearchResultItem) => string
  onAdd: (item: SearchResultItem) => void
}

/** Poster-card grid of Torznab/Rutor search results, streaming-app style. */
export default function SearchResultsGrid({
  results,
  adding,
  addingKey,
  resultDedupeKey,
  formatSize,
  onAdd,
}: SearchResultsGridProps) {
  const { t } = useTranslation()

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
      {results.map((item, index) => {
        const key = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
        const busy = adding && addingKey === key

        return (
          <div
            key={key}
            className='group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/50'
          >
            <div className='relative aspect-[2/3] w-full overflow-hidden bg-surface-tertiary'>
              {item.Poster ? (
                <img src={item.Poster} alt='' className='h-full w-full object-cover' loading='lazy' />
              ) : (
                <div className='grid h-full w-full place-items-center'>
                  <Film className='size-8 text-muted' aria-hidden />
                </div>
              )}

              {item.Tracker ? (
                <span className='absolute top-1.5 left-1.5 max-w-[calc(100%-0.75rem)] truncate rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm'>
                  {item.Tracker}
                </span>
              ) : null}

              <Button
                size='sm'
                variant='primary'
                isIconOnly
                isDisabled={adding}
                onPress={() => onAdd(item)}
                aria-label={t('Add')}
                className='absolute right-1.5 bottom-1.5 min-h-9 min-w-9 shadow-lg'
              >
                {busy ? <Spinner size='sm' color='current' /> : <Plus className='size-4' aria-hidden />}
              </Button>
            </div>

            <div className='flex flex-1 flex-col gap-1.5 p-2.5'>
              <p className='line-clamp-2 min-h-[2.5em] text-sm font-medium text-foreground' title={item.Title}>
                {item.Title || '—'}
              </p>
              <div className='mt-auto flex items-center justify-between gap-2 text-xs text-muted'>
                <span className='truncate'>{formatSize(item)}</span>
                {item.Seed != null || item.Peer != null ? (
                  <span className='flex items-center gap-1 whitespace-nowrap'>
                    <Users className='size-3.5' aria-hidden />
                    {item.Seed ?? 0}·{item.Peer ?? 0}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
