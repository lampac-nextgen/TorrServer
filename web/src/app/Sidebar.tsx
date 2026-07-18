import type { ReactNode } from 'react'
import { Button, Tooltip } from '@heroui/react'
import { FolderPlus, Info, Layers, Power, Search, Settings, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { iconNav } from 'shared/ui/iconProps'

import type { ShellNavProps } from './navTypes'

export interface SidebarProps extends ShellNavProps {
  collapsed?: boolean
}

type NavItem = {
  key: string
  label: string
  icon: ReactNode
  onClick: () => void
  disabled?: boolean
  active?: boolean
}

/** Desktop / tablet left rail; collapse to icons on narrow desktop layouts. */
export default function Sidebar({
  isOffline,
  isLoading,
  isCategoryFilterActive,
  onAdd,
  onSearch,
  onCategories,
  onSettings,
  onAbout,
  onCloseServer,
  onRemoveAll,
  collapsed = false,
}: SidebarProps) {
  const { t } = useTranslation()
  const disabled = isOffline || isLoading

  const primaryItems: NavItem[] = [
    { key: 'add', label: t('Add'), icon: <FolderPlus {...iconNav} />, onClick: onAdd, disabled },
    { key: 'search', label: t('nav.Search'), icon: <Search {...iconNav} />, onClick: onSearch, disabled },
    {
      key: 'category',
      label: t('Category'),
      icon: <Layers {...iconNav} />,
      onClick: onCategories,
      active: isCategoryFilterActive,
    },
    { key: 'removeAll', label: t('RemoveAll'), icon: <Trash2 {...iconNav} />, onClick: onRemoveAll, disabled },
  ]

  const footerItems: NavItem[] = [
    { key: 'settings', label: t('nav.Settings'), icon: <Settings {...iconNav} />, onClick: onSettings, disabled },
    { key: 'about', label: t('About'), icon: <Info {...iconNav} />, onClick: onAbout },
    { key: 'close', label: t('CloseServer'), icon: <Power {...iconNav} />, onClick: onCloseServer, disabled },
  ]

  const renderItem = (item: NavItem) => {
    const button = (
      <Button
        key={item.key}
        variant='ghost'
        isDisabled={item.disabled}
        onPress={item.onClick}
        isIconOnly={collapsed}
        aria-label={item.label}
        aria-current={item.active ? 'true' : undefined}
        className={
          collapsed
            ? `mx-auto inline-flex size-10 shrink-0 items-center justify-center rounded-xl p-0 text-app-rail-foreground hover-fine:bg-white/10 [&_svg]:m-0 [&_svg]:block ${
                item.active ? 'bg-white/15' : ''
              }`
            : `w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-app-rail-foreground hover-fine:bg-white/10 ${
                item.active ? 'bg-white/15' : ''
              }`
        }
      >
        <span className='inline-flex size-5 shrink-0 items-center justify-center [&>svg]:m-0 [&>svg]:block [&>svg]:size-5'>
          {item.icon}
        </span>
        {!collapsed ? <span className='truncate text-sm font-medium'>{item.label}</span> : null}
      </Button>
    )

    if (!collapsed) return button

    return (
      <Tooltip key={item.key}>
        <Tooltip.Trigger>{button}</Tooltip.Trigger>
        <Tooltip.Content placement='right'>{item.label}</Tooltip.Content>
      </Tooltip>
    )
  }

  return (
    <nav className='flex h-full flex-col gap-1 bg-app-rail p-2'>
      {primaryItems.map(renderItem)}
      <div className='my-1 h-px bg-white/12' />
      <div className='mt-auto flex flex-col gap-1'>{footerItems.map(renderItem)}</div>
    </nav>
  )
}
