import type { ReactNode } from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CategoryIcon from '@mui/icons-material/Category'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import type { OfflineAwareProps } from 'shared/api/types'
import { getThemeColors } from 'shared/theme/colors'

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
  const theme = useTheme()
  const disabled = isOffline || isLoading
  const mode = theme.palette.mode === 'dark' ? 'dark' : 'light'
  const { sidebarBGColor: sidebarBg, sidebarFillColor: sidebarFill } = getThemeColors(mode).app

  const items: Array<{
    key: string
    label: string
    icon: ReactNode
    onClick: () => void
    disabled?: boolean
  }> = [
    { key: 'add', label: t('Add'), icon: <AddIcon />, onClick: onAdd, disabled },
    { key: 'search', label: t('Search'), icon: <SearchIcon />, onClick: onSearch, disabled },
    { key: 'category', label: t('Category'), icon: <CategoryIcon />, onClick: onCategories },
    { key: 'removeAll', label: t('RemoveAll'), icon: <DeleteIcon />, onClick: onRemoveAll, disabled },
  ]

  const footerItems = [
    { key: 'settings', label: t('Settings'), icon: <SettingsIcon />, onClick: onSettings, disabled },
    { key: 'about', label: t('About'), icon: <InfoIcon />, onClick: onAbout },
    {
      key: 'close',
      label: t('CloseServer'),
      icon: <PowerSettingsNewIcon />,
      onClick: onCloseServer,
      disabled,
    },
  ]

  const renderItem = (item: (typeof items)[number]) => {
    const button = (
      <ListItemButton
        key={item.key}
        disabled={item.disabled}
        onClick={item.onClick}
        sx={{
          justifyContent: collapsed ? 'center' : 'flex-start',
          px: collapsed ? 1 : 2,
          minHeight: 48,
          color: sidebarFill,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
          '&.Mui-disabled': { opacity: 0.45 },
          '& .MuiListItemIcon-root': { color: 'inherit', minWidth: collapsed ? 0 : 40 },
          '& .MuiListItemText-primary': { fontSize: '0.95rem', fontWeight: 500 },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        {!collapsed ? <ListItemText primary={item.label} /> : null}
      </ListItemButton>
    )

    return collapsed ? (
      <Tooltip key={item.key} title={item.label} placement='right'>
        <span>{button}</span>
      </Tooltip>
    ) : (
      button
    )
  }

  return (
    <List
      dense
      disablePadding
      sx={{
        height: '100%',
        bgcolor: sidebarBg,
        color: sidebarFill,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {items.map(renderItem)}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 0.5 }} />
      {footerItems.map(renderItem)}
    </List>
  )
}
