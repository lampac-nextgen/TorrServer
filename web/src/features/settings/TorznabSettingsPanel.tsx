import { Button, Input, Label, Spinner, TextField } from '@heroui/react'
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import type { BTSets, TorznabUrl } from 'shared/api/types'
import { torznabTestHost } from 'shared/api/hosts'

export interface TorznabSettingsPanelProps {
  settings: BTSets
  onUpdate: <K extends keyof BTSets>(key: K, value: BTSets[K]) => void
  footerButtonClassName?: string
}

export default function TorznabSettingsPanel({ settings, onUpdate, footerButtonClassName }: TorznabSettingsPanelProps) {
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
      <ul className='mb-4 space-y-2'>
        {(settings.TorznabUrls || []).map((url, index) => (
          <li key={`${url.Host}-${url.Key}-${index}`} className='flex items-start justify-between gap-3 border-b border-default-200 pb-2'>
            <div className='min-w-0'>
              <p className='font-medium'>{url.Name || url.Host}</p>
              <p className='text-sm text-default-500'>
                {url.Host} · Key: {url.Key.slice(0, 5)}…
              </p>
            </div>
            <Button isIconOnly variant='ghost' aria-label='delete' onPress={() => handleRemove(index)} className='min-h-11 min-w-11'>
              <Trash2 className='size-4' />
            </Button>
          </li>
        ))}
      </ul>

      <div className='space-y-3'>
        <TextField value={newTorznabName} onChange={setNewTorznabName}>
          <Label>{t('Torznab.NameOptional')}</Label>
          <Input />
        </TextField>
        <TextField value={newTorznabHost} onChange={setNewTorznabHost}>
          <Label>{t('Torznab.TorznabHostURL')}</Label>
          <Input />
        </TextField>
        <TextField value={newTorznabKey} onChange={setNewTorznabKey}>
          <Label>{t('Torznab.APIKey')}</Label>
          <Input />
        </TextField>
        {torznabTestMsg ? (
          <p className={`text-sm ${torznabTestMsg.ok ? 'text-success' : 'text-danger'}`}>{torznabTestMsg.text}</p>
        ) : null}
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button
            variant='secondary'
            onPress={() => void handleTest()}
            isDisabled={!newTorznabHost || !newTorznabKey || torznabTesting}
            className={footerButtonClassName}
          >
            {torznabTesting ? <Spinner size='sm' /> : t('Torznab.Test')}
          </Button>
          <Button
            variant='primary'
            onPress={handleAdd}
            isDisabled={!newTorznabHost || !newTorznabKey}
            className={footerButtonClassName}
          >
            <Plus className='size-4' />
            {t('Torznab.AddServer')}
          </Button>
        </div>
      </div>
    </>
  )
}
