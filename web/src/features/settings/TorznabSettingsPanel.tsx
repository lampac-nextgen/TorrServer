import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import type { BTSets, TorznabUrl } from 'shared/api/types'
import { torznabTestHost } from 'shared/api/hosts'

import { SETTINGS_TOUCH_SX } from './SettingSwitch'

export interface TorznabSettingsPanelProps {
  settings: BTSets
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  footerButtonSx?: object
}

export default function TorznabSettingsPanel({ settings, onUpdate, footerButtonSx }: TorznabSettingsPanelProps) {
  const { t } = useTranslation()
  const [newTorznabHost, setNewTorznabHost] = useState('')
  const [newTorznabKey, setNewTorznabKey] = useState('')
  const [newTorznabName, setNewTorznabName] = useState('')
  const [torznabTesting, setTorznabTesting] = useState(false)
  const [torznabTestMsg, setTorznabTestMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const handleAdd = () => {
    if (!newTorznabHost.trim() || !newTorznabKey.trim()) return
    const next: TorznabUrl = {
      Host: newTorznabHost.trim(),
      Key: newTorznabKey.trim(),
      Name: newTorznabName.trim() || undefined,
    }
    onUpdate('TorznabUrls', [...(settings.TorznabUrls || []), next])
    setNewTorznabHost('')
    setNewTorznabKey('')
    setNewTorznabName('')
    setTorznabTestMsg(null)
  }

  const handleRemove = (index: number) => {
    const urls = [...(settings.TorznabUrls || [])]
    urls.splice(index, 1)
    onUpdate('TorznabUrls', urls)
  }

  const handleTest = async () => {
    setTorznabTesting(true)
    setTorznabTestMsg(null)
    try {
      const { data } = await axios.post(torznabTestHost(), { host: newTorznabHost, key: newTorznabKey })
      if (data.success) {
        setTorznabTestMsg({ ok: true, text: t('Torznab.ConnectionSuccessful') })
      } else {
        setTorznabTestMsg({ ok: false, text: String(data.error || t('Error')) })
      }
    } catch (e) {
      setTorznabTestMsg({ ok: false, text: (e as Error).message })
    } finally {
      setTorznabTesting(false)
    }
  }

  return (
    <>
      <List dense sx={{ mb: 2 }}>
        {(settings.TorznabUrls || []).map((url, index) => (
          <ListItem
            key={`${url.Host}-${url.Key}-${index}`}
            secondaryAction={
              <IconButton edge='end' aria-label='delete' onClick={() => handleRemove(index)} sx={SETTINGS_TOUCH_SX}>
                <DeleteIcon />
              </IconButton>
            }
            sx={{ px: 0 }}
          >
            <ListItemText primary={url.Name || url.Host} secondary={`${url.Host} · Key: ${url.Key.slice(0, 5)}…`} />
          </ListItem>
        ))}
      </List>

      <Stack spacing={2}>
        <TextField
          label={t('Torznab.NameOptional')}
          value={newTorznabName}
          onChange={e => setNewTorznabName(e.target.value)}
          fullWidth
        />
        <TextField
          label={t('Torznab.TorznabHostURL')}
          value={newTorznabHost}
          onChange={e => setNewTorznabHost(e.target.value)}
          fullWidth
        />
        <TextField
          label={t('Torznab.APIKey')}
          value={newTorznabKey}
          onChange={e => setNewTorznabKey(e.target.value)}
          fullWidth
        />
        {torznabTestMsg ? (
          <Typography variant='body2' color={torznabTestMsg.ok ? 'success.main' : 'error.main'}>
            {torznabTestMsg.text}
          </Typography>
        ) : null}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button
            variant='outlined'
            onClick={() => void handleTest()}
            disabled={!newTorznabHost || !newTorznabKey || torznabTesting}
            sx={footerButtonSx}
          >
            {torznabTesting ? <CircularProgress size={20} /> : t('Torznab.Test')}
          </Button>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAdd}
            disabled={!newTorznabHost || !newTorznabKey}
            sx={footerButtonSx}
          >
            {t('Torznab.AddServer')}
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
