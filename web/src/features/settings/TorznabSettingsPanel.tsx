import { Button, Input, Label, Spinner, TextField } from '@heroui/react'
import axios from 'axios'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { BTSets, TorznabUrl } from 'shared/api/types'
import { torznabTestHost } from 'shared/api/hosts'

export interface TorznabSettingsPanelProps {
  settings: BTSets
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  footerButtonClassName?: string
}

/** Torznab indexer list (Jackett/Prowlarr) with add/remove/test-connection rows. */
export default function TorznabSettingsPanel({ settings, onUpdate, footerButtonClassName }: TorznabSettingsPanelProps) {
  const { t } = useTranslation()
  const [newHost, setNewHost] = useState('')
  const [newKey, setNewKey] = useState('')
  const [newName, setNewName] = useState('')
  const [testing, setTesting] = useState(false)
  const [testMsg, setTestMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const urls = settings.TorznabUrls || []

  const handleAdd = () => {
    if (!newHost.trim() || !newKey.trim()) return
    const next: TorznabUrl = { Host: newHost.trim(), Key: newKey.trim(), Name: newName.trim() || undefined }
    onUpdate('TorznabUrls', [...urls, next])
    setNewHost('')
    setNewKey('')
    setNewName('')
    setTestMsg(null)
  }

  const handleRemove = (index: number) => {
    const next = [...urls]
    next.splice(index, 1)
    onUpdate('TorznabUrls', next)
  }

  const handleTest = async () => {
    setTesting(true)
    setTestMsg(null)
    try {
      const { data } = await axios.post(torznabTestHost(), { host: newHost, key: newKey })
      if (data.success) setTestMsg({ ok: true, text: t('Torznab.ConnectionSuccessful') })
      else setTestMsg({ ok: false, text: String(data.error || t('Error')) })
    } catch (err) {
      setTestMsg({ ok: false, text: (err as Error).message || t('Torznab.SearchFailed') })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div className='space-y-5'>
      {urls.length > 0 ? (
        <ul className='space-y-2'>
          {urls.map((url, index) => (
            <li
              key={`${url.Host}-${url.Key}-${index}`}
              className='flex items-start justify-between gap-3 rounded-lg border border-border bg-surface-secondary px-3 py-2.5'
            >
              <div className='min-w-0'>
                <p className='truncate font-medium text-foreground'>{url.Name || url.Host}</p>
                <p className='truncate text-sm text-muted'>
                  {url.Host} &middot; {t('Torznab.APIKey')}: {url.Key.slice(0, 5)}&hellip;
                </p>
              </div>
              <Button
                isIconOnly
                variant='ghost'
                aria-label={t('Delete')}
                onPress={() => handleRemove(index)}
                className='min-h-11 min-w-11 shrink-0'
              >
                <Trash2 className='size-4' />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className='space-y-3 rounded-lg border border-border bg-surface-secondary p-4'>
        <TextField value={newName} onChange={setNewName}>
          <Label>{t('Torznab.NameOptional')}</Label>
          <Input />
        </TextField>
        <TextField value={newHost} onChange={setNewHost}>
          <Label>{t('Torznab.TorznabHostURL')}</Label>
          <Input placeholder='http://localhost:9696/1' />
        </TextField>
        <TextField value={newKey} onChange={setNewKey}>
          <Label>{t('Torznab.APIKey')}</Label>
          <Input />
        </TextField>

        {testMsg ? <p className={`text-sm ${testMsg.ok ? 'text-accent' : 'text-danger'}`}>{testMsg.text}</p> : null}

        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button
            variant='secondary'
            onPress={() => void handleTest()}
            isDisabled={!newHost || !newKey || testing}
            className={footerButtonClassName}
          >
            {testing ? <Spinner size='sm' color='current' /> : t('Torznab.Test')}
          </Button>
          <Button
            variant='primary'
            onPress={handleAdd}
            isDisabled={!newHost || !newKey}
            className={footerButtonClassName}
          >
            <Plus className='size-4' />
            {t('Torznab.AddServer')}
          </Button>
        </div>
      </div>
    </div>
  )
}
