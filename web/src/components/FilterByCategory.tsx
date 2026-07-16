import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface FilterByCategoryProps {
  categoryKey: string
  categoryName: string
  setGlobalFilterCategory: (key: string) => void
  icon: ReactNode
}

export default function FilterByCategory({
  categoryKey,
  categoryName,
  setGlobalFilterCategory,
  icon,
}: FilterByCategoryProps) {
  const { t } = useTranslation()

  return (
    <ListItemButton onClick={() => setGlobalFilterCategory(categoryKey)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={t(categoryName)} />
    </ListItemButton>
  )
}
