import { Drawer, Separator } from '@heroui/react'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useOverlayState } from '@heroui/react'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'

interface CategoriesDrawerProps {
  open: boolean
  onClose: () => void
  selectedCategory: string
  onSelectCategory: (key: string) => void
}

export default function CategoriesDrawer({ open, onClose, selectedCategory, onSelectCategory }: CategoriesDrawerProps) {
  const { t } = useTranslation()
  useSyncModalOpen(open)

  const state = useOverlayState({
    isOpen: open,
    onOpenChange: next => {
      if (!next) onClose()
    },
  })

  const select = (key: string) => {
    onSelectCategory(key)
    onClose()
  }

  const itemClass = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
      active ? 'bg-primary/15 text-primary' : 'hover:bg-default-100'
    }`

  return (
    <Drawer.Root state={state}>
      <Drawer.Backdrop>
        <Drawer.Content placement='left'>
          <Drawer.Dialog>
            <Drawer.Body className='w-[280px] pt-2'>
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
