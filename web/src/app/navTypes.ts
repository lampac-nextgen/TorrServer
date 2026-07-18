import type { OfflineAwareProps } from 'shared/api/types'

/** Shared action surface for Sidebar (desktop) and BottomNav (mobile). */
export interface ShellNavProps extends OfflineAwareProps {
  onAdd: () => void
  onSearch: () => void
  onCategories: () => void
  onSettings: () => void
  onAbout: () => void
  onCloseServer: () => void
  onRemoveAll: () => void
}
