import { Description, Input, Label, TextField } from '@heroui/react'
import { useTranslation } from 'react-i18next'

import type { BTSets, SettingsUpdater, TMDBSettingsConfig } from 'shared/api/types'

interface TMDBSettingsSectionProps {
  settings?: BTSets
  updateSettings: SettingsUpdater
}

type TMDBField = keyof Pick<TMDBSettingsConfig, 'APIKey' | 'APIURL' | 'ImageURL' | 'ImageURLRu'>

/** TMDB poster-search credentials — API key + overridable API/image base URLs. */
export default function TMDBSettingsSection({ settings, updateSettings }: TMDBSettingsSectionProps) {
  const { t } = useTranslation()
  const tmdb = settings?.TMDBSettings || {}

  const handleChange = (field: TMDBField, value: string) => {
    updateSettings({ TMDBSettings: { ...tmdb, [field]: value } })
  }

  const fields: Array<{ field: TMDBField; label: string; hint: string; placeholder: string }> = [
    { field: 'APIKey', label: t('TMDB.APIKey'), hint: t('TMDB.APIKeyHint'), placeholder: 'Enter your TMDB API key' },
    {
      field: 'APIURL',
      label: t('TMDB.APIURL'),
      hint: t('TMDB.APIURLHint'),
      placeholder: 'https://api.themoviedb.org/3',
    },
    {
      field: 'ImageURL',
      label: t('TMDB.ImageURL'),
      hint: t('TMDB.ImageURLHint'),
      placeholder: 'https://image.tmdb.org',
    },
    {
      field: 'ImageURLRu',
      label: t('TMDB.ImageURLRu'),
      hint: t('TMDB.ImageURLRuHint'),
      placeholder: 'https://imagetmdb.com',
    },
  ]

  return (
    <div>
      <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted'>{t('TMDB.Settings')}</p>
      <div className='space-y-4'>
        {fields.map(({ field, label, hint, placeholder }) => (
          <TextField
            key={field}
            value={String(tmdb[field] ?? (field === 'APIKey' ? '' : placeholder))}
            onChange={value => handleChange(field, value)}
          >
            <Label>{label}</Label>
            <Input placeholder={placeholder} />
            <Description>{hint}</Description>
          </TextField>
        ))}
      </div>
    </div>
  )
}
