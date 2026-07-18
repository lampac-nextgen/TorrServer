import { Button, Spinner } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import type { SearchResultItem } from 'shared/api/types'

interface SearchResultsGridProps {
  results: SearchResultItem[]
  loading: boolean
  adding: boolean
  addingKey: string | null
  resultDedupeKey: (item: SearchResultItem) => string
  formatSize: (item: SearchResultItem) => string
  onAdd: (item: SearchResultItem) => void
}

/** Torznab/Rutor search results table. */
export default function SearchResultsGrid({
  results,
  loading,
  adding,
  addingKey,
  resultDedupeKey,
  formatSize,
  onAdd,
}: SearchResultsGridProps) {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className='grid place-items-center py-8'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div
      className={`min-h-[280px] overflow-auto rounded-xl border border-default-200 ${adding ? 'opacity-85' : ''}`}
    >
      <table className='w-full min-w-[640px] border-collapse text-sm'>
        <thead className='bg-default-100 text-left text-xs uppercase text-default-500'>
          <tr>
            <th className='w-14 px-3 py-2' />
            <th className='px-3 py-2'>{t('Name')}</th>
            <th className='w-24 px-3 py-2'>{t('Size')}</th>
            <th className='w-24 px-3 py-2'>{t('Seeders')}</th>
            <th className='w-24 px-3 py-2'>{t('Peers')}</th>
            <th className='w-28 px-3 py-2' />
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => {
            const key = resultDedupeKey(item) || `${item.Title || 'item'}-${index}`
            const busy = adding && addingKey === key
            return (
              <tr key={key} className={addingKey === key ? 'bg-default-100' : undefined}>
                <td className='px-3 py-2'>
                  {item.Poster ? (
                    <img src={item.Poster} alt='' className='h-[54px] w-9 rounded object-cover' />
                  ) : (
                    <div className='h-[54px] w-9 rounded bg-default-200' />
                  )}
                </td>
                <td className='px-3 py-2 align-top'>{item.Title || '—'}</td>
                <td className='px-3 py-2 whitespace-nowrap'>{formatSize(item)}</td>
                <td className='px-3 py-2'>{item.Seed ?? '—'}</td>
                <td className='px-3 py-2'>{item.Peer ?? '—'}</td>
                <td className='px-3 py-2'>
                  <Button size='sm' variant='primary' isDisabled={adding} onPress={() => onAdd(item)}>
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
