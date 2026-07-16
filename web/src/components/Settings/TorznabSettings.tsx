import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Switch,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { torznabTestHost } from 'utils/Hosts'

import { SecondarySettingsContent, SettingSectionLabel } from './style'
import type { BTSets, SettingsInputHandler, SettingsUpdater } from 'types/api'

interface TorznabSettingsProps {
  settings?: BTSets
  inputForm: SettingsInputHandler
  updateSettings: SettingsUpdater
}

export default function TorznabSettings({ settings, inputForm, updateSettings }: TorznabSettingsProps) {
  const { t } = useTranslation()
  const { EnableRutorSearch, EnableTorznabSearch, TorznabUrls } = settings || {}
  const [newHost, setNewHost] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newName, setNewName] = useState('')
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; msg?: string } | null>(null)

  const handleAdd = () => {
    if (newHost && newKey) {
      const currentUrls = TorznabUrls || []
      updateSettings({ TorznabUrls: [...currentUrls, { Host: newHost, Key: newKey, Name: newName }] })
      setNewHost('')
      setNewKey('')
      setNewName('')
    }
  }

  const handleDelete = (index: number) => {
    const currentUrls = TorznabUrls || []
    const newUrls = [...currentUrls]
    newUrls.splice(index, 1)
    updateSettings({ TorznabUrls: newUrls })
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const { data } = await axios.post(torznabTestHost(), {
        host: newHost,
        key: newKey,
      })
      if (data.success) {
        setTestResult({ success: true, msg: t('Torznab.ConnectionSuccessful') })
      } else {
        setTestResult({ success: false, msg: data.error })
      }
    } catch (e) {
      setTestResult({ success: false, msg: (e as Error).message })
    }
    setTesting(false)
  }

  return (
    <SecondarySettingsContent>
      <SettingSectionLabel>{t('Search')}</SettingSectionLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={EnableRutorSearch} onChange={inputForm} id='EnableRutorSearch' color='secondary' />}
          label={t('SettingsDialog.EnableRutorSearch')}
          labelPlacement='start'
        />
        <FormHelperText>{t('SettingsDialog.EnableRutorSearchHint')}</FormHelperText>
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={EnableTorznabSearch || false}
              onChange={inputForm}
              id='EnableTorznabSearch'
              color='secondary'
            />
          }
          label={t('Torznab.EnableTorznabSearch')}
          labelPlacement='start'
        />
        <FormHelperText>{t('Torznab.EnableSearchViaTorznab')}</FormHelperText>
      </FormGroup>

      <div
        style={{
          padding: '20px 0',
          opacity: EnableTorznabSearch ? 1 : 0.5,
          pointerEvents: EnableTorznabSearch ? 'auto' : 'none',
        }}
      >
        <List dense>
          {(TorznabUrls || []).map((url, index) => (
            <ListItem
              key={`${url.Host}-${url.Key}`}
              style={{ paddingLeft: 0 }}
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => handleDelete(index)}
                  sx={{ minWidth: 44, minHeight: 44 }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={url.Name || url.Host}
                secondary={
                  <>
                    {url.Name && (
                      <Typography component='span' variant='body2' display='block' color='text.secondary'>
                        {url.Host}
                      </Typography>
                    )}
                    {`Key: ${url.Key.substring(0, 5)}...`}
                  </>
                }
                slotProps={{
                  primary: { sx: { wordBreak: 'break-all' } },
                  secondary: { sx: { wordBreak: 'break-all' } },
                }}
              />
            </ListItem>
          ))}
        </List>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 10,
          }}
        >
          <TextField
            label={t('Torznab.NameOptional')}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder='My Tracker'
            variant='outlined'
            size='small'
            fullWidth
          />
          <TextField
            label={t('Torznab.TorznabHostURL')}
            value={newHost}
            onChange={e => setNewHost(e.target.value)}
            placeholder='http://localhost:9117'
            variant='outlined'
            size='small'
            fullWidth
          />
          <TextField
            label={t('Torznab.APIKey')}
            value={newKey}
            onChange={e => setNewKey(e.target.value)}
            variant='outlined'
            size='small'
            fullWidth
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleTest}
              disabled={!newHost || !newKey || testing}
              style={{ flex: '1 1 auto', minWidth: 100 }}
            >
              {testing ? <CircularProgress size={24} color='inherit' /> : t('Torznab.Test')}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleAdd}
              disabled={!newHost || !newKey}
              style={{ flex: '1 1 auto', minWidth: 100 }}
            >
              {t('Torznab.AddServer')}
            </Button>
          </div>
          {testResult && (
            <Typography variant='caption' style={{ color: testResult.success ? 'green' : 'red' }}>
              {testResult.msg}
            </Typography>
          )}
        </div>
      </div>
      <br />
    </SecondarySettingsContent>
  )
}
