import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTranslation } from 'react-i18next'
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

  const select = (key: string) => {
    onSelectCategory(key)
    onClose()
  }

  return (
    <Drawer anchor='left' open={open} onClose={onClose}>
      <List sx={{ width: 280, pt: 1 }}>
        <ListItemButton selected={selectedCategory === 'all'} onClick={() => select('all')}>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary={t('All')} />
        </ListItemButton>

        {TORRENT_CATEGORIES.map(category => (
          <ListItemButton
            key={category.key}
            selected={selectedCategory === category.key}
            onClick={() => select(category.key)}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={t(category.name)} />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 1 }} />

        <ListItemButton selected={selectedCategory === ''} onClick={() => select('')}>
          <ListItemIcon>
            <ClearIcon />
          </ListItemIcon>
          <ListItemText primary={t('Uncategorized')} />
        </ListItemButton>
      </List>
    </Drawer>
  )
}
