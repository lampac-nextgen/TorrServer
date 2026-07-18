import { type ReactNode, useState } from 'react'
import { Button, Modal, useOverlayState } from '@heroui/react'
import {
  Ellipsis,
  FolderPlus,
  Info,
  Layers,
  Power,
  Search,
  Settings,
  Trash2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'

import type { ShellNavProps } from './Sidebar'

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

  const navAction = (
    label: string,
    icon: ReactNode,
    onPress: () => void,
    isDisabled = false,
  ) => (
    <Button
      key={label}
      variant='ghost'
      isDisabled={isDisabled}
      onPress={onPress}
      className='flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-none px-1 py-2 text-xs font-medium'
      aria-label={label}
    >
      {icon}
      <span className='truncate'>{label}</span>
    </Button>
  )

  return (
    <>
      <div
        className='ts-bottom-nav fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border,#2a3b32)] bg-[var(--surface,#121a16)] pb-[env(safe-area-inset-bottom,0px)]'
        style={{ height: 'calc(90px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className='mx-auto flex h-[90px] max-w-lg items-stretch'>
          {navAction(t('Add', { defaultValue: 'Add' }), <FolderPlus size={22} />, onAdd, disabled)}
          {navAction(t('Search'), <Search size={22} />, onSearch, disabled)}
          {navAction(t('Category', { defaultValue: 'Category' }), <Layers size={22} />, onCategories)}
          {navAction(t('More', { defaultValue: 'More' }), <Ellipsis size={22} />, moreState.open)}
        </div>
      </div>

      <Modal state={moreState}>
        <Modal.Backdrop isDismissable onClick={closeMore}>
          <Modal.Container placement='bottom' size='md'>
            <Modal.Dialog aria-label={t('More', { defaultValue: 'More' })}>
              <Modal.Body className='flex flex-col gap-1 pb-[env(safe-area-inset-bottom,0px)] pt-2'>
                <Button
                  variant='ghost'
                  isDisabled={disabled}
                  className='justify-start gap-3 px-4 py-3'
                  onPress={() => {
                    closeMore()
                    onRemoveAll()
                  }}
                >
                  <Trash2 size={20} />
                  {t('RemoveAll')}
                </Button>
                <Button
                  variant='ghost'
                  isDisabled={disabled}
                  className='justify-start gap-3 px-4 py-3'
                  onPress={() => {
                    closeMore()
                    onSettings()
                  }}
                >
                  <Settings size={20} />
                  {t('Settings')}
                </Button>
                <Button
                  variant='ghost'
                  className='justify-start gap-3 px-4 py-3'
                  onPress={() => {
                    closeMore()
                    onAbout()
                  }}
                >
                  <Info size={20} />
                  {t('About')}
                </Button>
                <Button
                  variant='ghost'
                  isDisabled={disabled}
                  className='justify-start gap-3 px-4 py-3 text-red-400'
                  onPress={() => {
                    closeMore()
                    onCloseServer()
                  }}
                >
                  <Power size={20} />
                  {t('CloseServer')}
                </Button>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  )
}
