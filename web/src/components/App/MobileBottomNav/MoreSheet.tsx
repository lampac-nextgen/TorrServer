import { Drawer, List } from '@mui/material'
import SettingsDialog from 'components/Settings'
import AboutDialog from 'components/About'
import CloseServer from 'components/CloseServer'
import RemoveAll from 'components/RemoveAll'
import type { OfflineAwareProps } from 'types/api'

interface MoreSheetProps extends OfflineAwareProps {
  open: boolean
  onClose: () => void
}

/** Secondary actions — full sidebar parity (Remove All / Settings / About / Close). */
export default function MoreSheet({ open, onClose, isOffline, isLoading }: MoreSheetProps) {
  return (
    <Drawer
      anchor='bottom'
      open={open}
      onClose={onClose}
      keepMounted
      slotProps={{
        paper: {
          sx: {
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            paddingBottom: 'var(--safe-bottom)',
          },
        },
      }}
    >
      {/* Close sheet after pick; keepMounted keeps dialog portals alive */}
      <List onClick={onClose} sx={{ py: 1 }}>
        <RemoveAll isOffline={isOffline} isLoading={isLoading} />
        <SettingsDialog isOffline={isOffline} isLoading={isLoading} />
        <AboutDialog />
        <CloseServer isOffline={isOffline} isLoading={isLoading} />
      </List>
    </Drawer>
  )
}
