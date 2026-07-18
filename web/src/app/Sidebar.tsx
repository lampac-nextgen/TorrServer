import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CategoryIcon from '@mui/icons-material/Category'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import DeleteIcon from '@mui/icons-material/Delete'
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
}: ShellNavProps) {
  const { t } = useTranslation()
  const disabled = isOffline || isLoading

  return (
    <>
      <List dense disablePadding>
        <ListItemButton disabled={disabled} onClick={onAdd}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={t('Add', { defaultValue: 'Add' })} />
        </ListItemButton>

        <ListItemButton disabled={disabled} onClick={onSearch}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={t('Search')} />
        </ListItemButton>

        <ListItemButton onClick={onCategories}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('Category', { defaultValue: 'Category' })} />
        </ListItemButton>

        <ListItemButton disabled={disabled} onClick={onRemoveAll}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={t('RemoveAll')} />
        </ListItemButton>
      </List>

      <Divider />

      <List dense disablePadding>
        <ListItemButton disabled={disabled} onClick={onSettings}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={t('Settings')} />
        </ListItemButton>

        <ListItemButton onClick={onAbout}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={t('About')} />
        </ListItemButton>

        <ListItemButton disabled={disabled} onClick={onCloseServer}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary={t('CloseServer')} />
        </ListItemButton>
      </List>
    </>
  )
}
