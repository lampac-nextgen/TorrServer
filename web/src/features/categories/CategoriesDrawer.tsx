import { Drawer, Separator, useOverlayState } from '@heroui/react'
import { Check, LayoutGrid, X } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

export interface CategoriesDrawerProps {
  open: boolean
  onClose: () => void
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

/** Side sheet for filtering the torrent library by category, plus "All" / "Uncategorized". */
export default function CategoriesDrawer({ open, onClose, selectedCategory, onSelectCategory }: CategoriesDrawerProps) {
  const { t } = useTranslation()
  useSyncModalOpen(open)

  const state = useOverlayState({
    isOpen: open,
    onOpenChange: next => {
      if (!next) onClose()
    },
  })

  useEffect(() => {
    if (open) state.setOpen(true)
  }, [open, state])

  const select = (category: string) => {
    onSelectCategory(category)
    onClose()
  }

  const itemClass = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${
      active ? 'bg-accent-soft text-accent-soft-foreground' : 'text-foreground hover:bg-surface-secondary'
    }`

  return (
    <Drawer.Root state={state}>
      <Drawer.Backdrop>
        <Drawer.Content placement='left'>
          <Drawer.Dialog aria-label={t('Category', { defaultValue: 'Category' })}>
            <Drawer.Header>
              <Drawer.Heading className='flex items-center gap-2'>
                <LayoutGrid className='size-4' aria-hidden />
                {t('Category', { defaultValue: 'Category' })}
              </Drawer.Heading>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body className='w-[280px] space-y-1 pt-1'>
              <button type='button' className={itemClass(selectedCategory === 'all')} onClick={() => select('all')}>
                <Check className='size-5 shrink-0' aria-hidden />
                <span>{t('All')}</span>
              </button>

              {TORRENT_CATEGORIES.map(category => (
                <button
                  key={category.key}
                  type='button'
                  className={itemClass(selectedCategory === category.key)}
                  onClick={() => select(category.key)}
                >
                  <span className='shrink-0'>{category.icon}</span>
                  <span>{t(category.name)}</span>
                </button>
              ))}

              <Separator className='my-2' />

              <button type='button' className={itemClass(selectedCategory === '')} onClick={() => select('')}>
                <X className='size-5 shrink-0' aria-hidden />
                <span>{t('Uncategorized')}</span>
              </button>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer.Root>
  )
}
