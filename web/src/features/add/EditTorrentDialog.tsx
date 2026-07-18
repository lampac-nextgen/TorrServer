import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import type { TorrentStat } from 'shared/api/types'
import { TORRENTS_QUERY_KEY, updateTorrent } from 'shared/api/torrents'
import { getMoviePosters, shortenTitleForPosterSearch } from 'shared/lib/torrentHelpers'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import AppDialog from 'shared/ui/AppDialog'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'

export interface EditTorrentDialogProps {
  torrent: TorrentStat | null
  open: boolean
  onClose: () => void
}

export default function EditTorrentDialog({ torrent, open, onClose }: EditTorrentDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const posterRequestRef = useRef(0)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [poster, setPoster] = useState('')
  const [posterOptions, setPosterOptions] = useState<string[]>([])
  const [postersLoading, setPostersLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useSyncModalOpen(open)

  useEffect(() => {
    if (!open || !torrent) return
    setTitle(torrent.title || torrent.name || '')
    setCategory(torrent.category || '')
    setPoster(torrent.poster || '')
    setPosterOptions(torrent.poster ? [torrent.poster] : [])
  }, [open, torrent])

  useEffect(() => {
    if (!open) return undefined
    const query = shortenTitleForPosterSearch(title.trim()) || title.trim()
    if (!query || query.length < 2) {
      setPosterOptions(prev => (poster ? Array.from(new Set([poster, ...prev])) : prev))
      return undefined
    }

    const requestId = ++posterRequestRef.current
    const timer = window.setTimeout(() => {
      setPostersLoading(true)
      const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en'
      void getMoviePosters(query, lang)
        .then(urls => {
          if (requestId !== posterRequestRef.current) return
          const next = urls || []
          setPosterOptions(poster ? Array.from(new Set([poster, ...next])) : next)
        })
        .finally(() => {
          if (requestId === posterRequestRef.current) setPostersLoading(false)
        })
    }, 450)

    return () => window.clearTimeout(timer)
  }, [open, title, i18n.language, poster])

  const handleSave = async () => {
    if (!torrent) return
    setSaving(true)
    try {
      await updateTorrent({
        hash: torrent.hash,
        title: title.trim() || torrent.name || torrent.hash,
        category: category || undefined,
        poster: poster || '',
      })
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({ message: t('Saved'), severity: 'success' })
      onClose()
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppDialog open={open && Boolean(torrent)} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{t('EditTorrent')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Typography variant='caption' color='text.secondary' sx={{ fontFamily: 'monospace' }}>
            {torrent?.hash}
          </Typography>
          <TextField
            label={t('AddDialog.TitleBlank')}
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            autoFocus
          />
          <FormControl fullWidth>
            <InputLabel id='edit-torrent-category'>{t('Category')}</InputLabel>
            <Select
              labelId='edit-torrent-category'
              label={t('Category')}
              value={category}
              onChange={e => setCategory(String(e.target.value))}
            >
              <MenuItem value=''>
                <em>{t('Uncategorized')}</em>
              </MenuItem>
              {TORRENT_CATEGORIES.map(cat => (
                <MenuItem key={cat.key} value={cat.key}>
                  {t(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t('PosterURL', { defaultValue: 'Poster URL' })}
            value={poster}
            onChange={e => setPoster(e.target.value)}
            fullWidth
          />
          {(postersLoading || posterOptions.length > 0) && (
            <Box>
              <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
                {t('Poster', { defaultValue: 'Poster' })} {postersLoading ? '…' : ''}
              </Typography>
              <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {posterOptions.map(url => (
                  <Box
                    key={url}
                    component='button'
                    type='button'
                    onClick={() => setPoster(url)}
                    sx={{
                      p: 0,
                      border: 2,
                      borderColor: poster === url ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'transparent',
                      width: 72,
                      height: 108,
                    }}
                  >
                    <Box component='img' src={url} alt='' sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} autoFocus>
          {t('Cancel')}
        </Button>
        <Button variant='contained' onClick={() => void handleSave()} disabled={saving || !torrent}>
          {saving ? <CircularProgress size={20} color='inherit' /> : t('Save')}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}
