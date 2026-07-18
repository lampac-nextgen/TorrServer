import { type ReactNode } from 'react'
import { Button, Modal, useOverlayState } from '@heroui/react'
import { Ellipsis, FolderPlus, Info, Layers, Power, Search, Settings, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

import type { ShellNavProps } from './navTypes'

/** Fixed bottom tab bar for narrow viewports; overflow actions live in a sheet. */
export default function BottomNav({
  isOffline,
  isLoading,
  onAdd,
  onSearch,
  onCategories,
  onSettings,
  onAbout,
  onCloseServer,
  onRemoveAll,
}: ShellNavProps) {
  const { t } = useTranslation()
  const disabled = isOffline || isLoading
  const moreState = useOverlayState()
  useSyncModalOpen(moreState.isOpen)

  const closeMore = () => moreState.close()

  const tab = (label: string, icon: ReactNode, onPress: () => void, isDisabled = false) => (
    <Button
      key={label}
      variant='ghost'
      isDisabled={isDisabled}
      onPress={onPress}
      aria-label={label}
      className='flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-none px-1 py-2 text-xs font-medium'
    >
      {icon}
      <span className='truncate'>{label}</span>
    </Button>
  )

  const sheetAction = (label: string, icon: ReactNode, onPress: () => void, isDisabled = false, danger = false) => (
    <Button
      key={label}
      variant='ghost'
      isDisabled={isDisabled}
      onPress={() => {
        closeMore()
        onPress()
      }}
      className={`justify-start gap-3 px-4 py-3 ${danger ? 'text-danger' : ''}`}
    >
      {icon}
      {label}
    </Button>
  )

  return (
    <>
      <div
        className='ts-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface pb-[env(safe-area-inset-bottom,0px)]'
        style={{ height: 'calc(90px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className='mx-auto flex h-[90px] max-w-lg items-stretch'>
          {tab(t('Add', { defaultValue: 'Add' }), <FolderPlus size={22} />, onAdd, disabled)}
          {tab(t('Search'), <Search size={22} />, onSearch, disabled)}
          {tab(t('Category', { defaultValue: 'Category' }), <Layers size={22} />, onCategories)}
          {tab(t('More', { defaultValue: 'More' }), <Ellipsis size={22} />, moreState.open)}
        </div>
      </div>

      <Modal state={moreState}>
        <Modal.Backdrop isDismissable onClick={closeMore}>
          <Modal.Container placement='bottom' size='md'>
            <Modal.Dialog aria-label={t('More', { defaultValue: 'More' })}>
              <Modal.Body className='flex flex-col gap-1 pb-[env(safe-area-inset-bottom,0px)] pt-2'>
                {sheetAction(t('RemoveAll'), <Trash2 size={20} />, onRemoveAll, disabled)}
                {sheetAction(t('Settings'), <Settings size={20} />, onSettings, disabled)}
                {sheetAction(t('About'), <Info size={20} />, onAbout)}
                {sheetAction(t('CloseServer'), <Power size={20} />, onCloseServer, disabled, true)}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}
