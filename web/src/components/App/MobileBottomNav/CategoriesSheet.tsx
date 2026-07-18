import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { TORRENT_CATEGORIES } from 'components/categories'
import { useTranslation } from 'react-i18next'

interface CategoriesSheetProps {
  open: boolean
  onClose: () => void
  selectedCategory: string
  setGlobalFilterCategory: (key: string) => void
}

export default function CategoriesSheet({
  open,
  onClose,
  selectedCategory,
  setGlobalFilterCategory,
}: CategoriesSheetProps) {
  const { t } = useTranslation()

  const pick = (key: string) => {
    setGlobalFilterCategory(key)
    onClose()
  }

  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            maxHeight: 'min(70dvh, calc(100dvh - var(--app-chrome-top) - var(--app-chrome-bottom)))',
            paddingBottom: 'var(--safe-bottom)',
          },
        },
      }}
    >
      <List dense sx={{ py: 1 }}>
        <ListItemButton selected={selectedCategory === 'all'} onClick={() => pick('all')}>
          <ListItemIcon>
            <CheckIcon />
          </ListItemIcon>
          <ListItemText primary={t('All')} />
        </ListItemButton>
        {TORRENT_CATEGORIES.map(category => (
          <ListItemButton
            key={category.key}
            selected={selectedCategory === category.key}
            onClick={() => pick(category.key)}
          >
            <ListItemIcon>{category.icon}</ListItemIcon>
            <ListItemText primary={t(category.name)} />
          </ListItemButton>
        ))}
        <ListItemButton selected={selectedCategory === ''} onClick={() => pick('')}>
          <ListItemIcon>
            <ClearIcon />
          </ListItemIcon>
          <ListItemText primary={t('Uncategorized')} />
        </ListItemButton>
      </List>
    </Drawer>
  )
}
