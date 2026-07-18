import { useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CategoryIcon from '@mui/icons-material/Category'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SearchIcon from '@mui/icons-material/Search'
import AddDialogButton from 'components/Add'
import type { OfflineAwareProps } from 'types/api'
import { useTranslation } from 'react-i18next'

import CategoriesSheet from './CategoriesSheet'
import MoreSheet from './MoreSheet'
import StyledBottomNav from './style'

interface MobileBottomNavProps extends OfflineAwareProps {
  setGlobalFilterCategory: (key: string) => void
  onOpenSearch: () => void
}

export default function MobileBottomNav({
  isOffline,
  isLoading,
  setGlobalFilterCategory,
  onOpenSearch,
}: MobileBottomNavProps) {
  const { t } = useTranslation()
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <>
      <StyledBottomNav className='ts-bottom-nav' aria-label={t('Menu', { defaultValue: 'Menu' })}>
        <AddDialogButton isOffline={isOffline} isLoading={isLoading} />

        <ListItemButton disabled={isOffline || isLoading} onClick={onOpenSearch}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary={t('Search')} />
        </ListItemButton>

        <ListItemButton onClick={() => setCategoriesOpen(true)}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('Category', { defaultValue: 'Category' })} />
        </ListItemButton>

        <ListItemButton onClick={() => setMoreOpen(true)}>
          <ListItemIcon>
            <MoreHorizIcon />
          </ListItemIcon>
          <ListItemText primary={t('More', { defaultValue: 'More' })} />
        </ListItemButton>
      </StyledBottomNav>

      <CategoriesSheet
        open={categoriesOpen}
        onClose={() => setCategoriesOpen(false)}
        setGlobalFilterCategory={setGlobalFilterCategory}
      />

      <MoreSheet open={moreOpen} onClose={() => setMoreOpen(false)} isOffline={isOffline} isLoading={isLoading} />
    </>
  )
}
