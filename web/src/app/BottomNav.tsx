import { useState } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import CategoryIcon from '@mui/icons-material/Category'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import DeleteIcon from '@mui/icons-material/Delete'
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
  const [moreOpen, setMoreOpen] = useState(false)
  useSyncModalOpen(moreOpen)

  return (
    <>
      <Box
        className='ts-bottom-nav'
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: theme => theme.zIndex.appBar,
          height: 'calc(90px + env(safe-area-inset-bottom, 0px))',
          pb: 'env(safe-area-inset-bottom, 0px)',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <BottomNavigation showLabels sx={{ height: 90, maxHeight: 90 }}>
          <BottomNavigationAction
            label={t('Add', { defaultValue: 'Add' })}
            icon={<AddIcon />}
            disabled={disabled}
            onClick={onAdd}
          />
          <BottomNavigationAction label={t('Search')} icon={<SearchIcon />} disabled={disabled} onClick={onSearch} />
          <BottomNavigationAction
            label={t('Category', { defaultValue: 'Category' })}
            icon={<CategoryIcon />}
            onClick={onCategories}
          />
          <BottomNavigationAction
            label={t('More', { defaultValue: 'More' })}
            icon={<MoreHorizIcon />}
            onClick={() => setMoreOpen(true)}
          />
        </BottomNavigation>
      </Box>

      <Drawer anchor='bottom' open={moreOpen} onClose={() => setMoreOpen(false)}>
        <List sx={{ pb: 'env(safe-area-inset-bottom, 0px)' }}>
          <ListItemButton
            disabled={disabled}
            onClick={() => {
              setMoreOpen(false)
              onRemoveAll()
            }}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={t('RemoveAll')} />
          </ListItemButton>

          <ListItemButton
            disabled={disabled}
            onClick={() => {
              setMoreOpen(false)
              onSettings()
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={t('Settings')} />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setMoreOpen(false)
              onAbout()
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={t('About')} />
          </ListItemButton>

          <ListItemButton
            disabled={disabled}
            onClick={() => {
              setMoreOpen(false)
              onCloseServer()
            }}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary={t('CloseServer')} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}
