import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
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

  return (
    <Box>
      <Typography variant='overline' color='text.secondary' sx={{ display: 'block', mb: 1 }}>
        {t('TMDB.Settings')}
      </Typography>
      <FormGroup sx={{ gap: 2 }}>
        <Box>
          <TextField
            label={t('TMDB.APIKey')}
            value={APIKey}
            onChange={e => handleChange('APIKey', e.target.value)}
            placeholder='Enter your TMDB API key'
            size='small'
            fullWidth
          />
          <FormHelperText>{t('TMDB.APIKeyHint')}</FormHelperText>
        </Box>
        <Box>
          <TextField
            label={t('TMDB.APIURL')}
            value={APIURL}
            onChange={e => handleChange('APIURL', e.target.value)}
            placeholder='https://api.themoviedb.org/3'
            size='small'
            fullWidth
          />
          <FormHelperText>{t('TMDB.APIURLHint')}</FormHelperText>
        </Box>
        <Box>
          <TextField
            label={t('TMDB.ImageURL')}
            value={ImageURL}
            onChange={e => handleChange('ImageURL', e.target.value)}
            placeholder='https://image.tmdb.org'
            size='small'
            fullWidth
          />
          <FormHelperText>{t('TMDB.ImageURLHint')}</FormHelperText>
        </Box>
        <Box>
          <TextField
            label={t('TMDB.ImageURLRu')}
            value={ImageURLRu}
            onChange={e => handleChange('ImageURLRu', e.target.value)}
            placeholder='https://imagetmdb.com'
            size='small'
            fullWidth
          />
          <FormHelperText>{t('TMDB.ImageURLRuHint')}</FormHelperText>
        </Box>
      </FormGroup>
    </Box>
  )
}
