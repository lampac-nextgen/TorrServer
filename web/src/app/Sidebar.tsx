import type { ReactNode } from 'react'
import { Button, Tooltip } from '@heroui/react'
import {
  FolderPlus,
  Info,
  Layers,
  Power,
  Search,
  Settings,
  Trash2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { OfflineAwareProps } from 'shared/api/types'

export interface ShellNavProps extends OfflineAwareProps {
  onAdd: () => void
  onSearch: () => void
  onCategories: () => void
  onSettings: () => void
  onAbout: () => void
  onCloseServer: () => void
  onRemoveAll: () => void
  collapsed?: boolean
}

type NavItem = {
  key: string
  label: string
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
}

export default function Sidebar({
  isOffline,
  isLoading,
  onAdd,
  onSearch,
  onCategories,
  onSettings,
  onAbout,
  onCloseServer,
  onRemoveAll,
  collapsed = false,
}: ShellNavProps) {
  const { t } = useTranslation()
  const disabled = isOffline || isLoading

  const items: NavItem[] = [
    { key: 'add', label: t('Add'), icon: <FolderPlus size={20} />, onClick: onAdd, disabled },
    { key: 'search', label: t('Search'), icon: <Search size={20} />, onClick: onSearch, disabled },
    { key: 'category', label: t('Category'), icon: <Layers size={20} />, onClick: onCategories },
    { key: 'removeAll', label: t('RemoveAll'), icon: <Trash2 size={20} />, onClick: onRemoveAll, disabled },
  ]

  const footerItems: NavItem[] = [
    { key: 'settings', label: t('Settings'), icon: <Settings size={20} />, onClick: onSettings, disabled },
    { key: 'about', label: t('About'), icon: <Info size={20} />, onClick: onAbout },
    {
      key: 'close',
      label: t('CloseServer'),
      icon: <Power size={20} />,
      onClick: onCloseServer,
      disabled,
    },
  ]

  const renderItem = (item: NavItem) => {
    const button = (
      <Button
        key={item.key}
        variant='ghost'
        isDisabled={item.disabled}
        onPress={item.onClick}
        isIconOnly={collapsed}
        className={`w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-app-rail-foreground hover:bg-white/8 ${
          collapsed ? 'justify-center px-2' : ''
        }`}
        aria-label={item.label}
      >
        {item.icon}
        {!collapsed ? <span className='truncate text-sm font-medium'>{item.label}</span> : null}
      </Button>
    )

    return collapsed ? (
      <Tooltip key={item.key}>
        <Tooltip.Trigger>{button}</Tooltip.Trigger>
        <Tooltip.Content placement='right'>{item.label}</Tooltip.Content>
      </Tooltip>
    ) : (
      button
    )
  }

  return (
    <nav className='flex h-full flex-col gap-1 bg-app-rail p-2'>
      {items.map(renderItem)}
      <div className='my-1 h-px bg-white/12' />
      <div className='mt-auto flex flex-col gap-1'>{footerItems.map(renderItem)}</div>
    </nav>
  )
}
