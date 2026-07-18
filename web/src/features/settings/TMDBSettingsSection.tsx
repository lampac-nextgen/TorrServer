import { Description, Input, Label, TextField } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import type { BTSets, SettingsUpdater, TMDBSettingsConfig } from 'shared/api/types'

interface TMDBSettingsSectionProps {
  settings?: BTSets
  updateSettings: SettingsUpdater
}

export default function TMDBSettingsSection({ settings, updateSettings }: TMDBSettingsSectionProps) {
  const { t } = useTranslation()
  const tmdb = settings?.TMDBSettings || {}
  const {
    APIKey = '',
    APIURL = 'https://api.themoviedb.org/3',
    ImageURL = 'https://image.tmdb.org',
    ImageURLRu = 'https://imagetmdb.com',
  } = tmdb

  const handleChange = (field: keyof TMDBSettingsConfig, value: string) => {
    updateSettings({
      TMDBSettings: {
        ...tmdb,
        [field]: value,
      },
    })
  }

  const fields: Array<[keyof TMDBSettingsConfig, string, string, string]> = [
    ['APIKey', t('TMDB.APIKey'), t('TMDB.APIKeyHint'), 'Enter your TMDB API key'],
    ['APIURL', t('TMDB.APIURL'), t('TMDB.APIURLHint'), 'https://api.themoviedb.org/3'],
    ['ImageURL', t('TMDB.ImageURL'), t('TMDB.ImageURLHint'), 'https://image.tmdb.org'],
    ['ImageURLRu', t('TMDB.ImageURLRu'), t('TMDB.ImageURLRuHint'), 'https://imagetmdb.com'],
  ]

  return (
    <div>
      <p className='mb-3 text-xs uppercase tracking-wide text-default-500'>{t('TMDB.Settings')}</p>
      <div className='space-y-4'>
        {fields.map(([field, label, hint, placeholder]) => (
          <TextField key={field} value={String(tmdb[field] ?? (field === 'APIKey' ? '' : placeholder))} onChange={value => handleChange(field, value)}>
            <Label>{label}</Label>
            <Input placeholder={placeholder} />
            <Description>{hint}</Description>
          </TextField>
        ))}
      </div>
    </div>
  )
}
