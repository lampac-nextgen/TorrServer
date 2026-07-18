import { useCallback, useEffect, useRef, useState } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
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
import useMediaQuery from '@mui/material/useMediaQuery'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { addTorrent, TORRENTS_QUERY_KEY } from 'shared/api/torrents'
import { checkTorrentSource, getMoviePosters, shortenTitleForPosterSearch } from 'shared/lib/torrentHelpers'
import { queryMax } from 'shared/theme/breakpoints'
import { TORRENT_CATEGORIES } from 'shared/torrent/categories'
import AppDialog from 'shared/ui/AppDialog'
import { useSyncModalOpen } from 'shared/ui/ModalOpenContext'
import { useOptionalAppToast } from 'shared/ui/Toast'
import MultiAddDialog from './MultiAddDialog'

export interface AddDialogProps {
  open: boolean
  onClose: () => void
  /** Pre-fill magnet/hash (PWA protocol / share_target). */
  initialSource?: string | null
}

export default function AddDialog({ open, onClose, initialSource }: AddDialogProps) {
  const { t, i18n } = useTranslation()
  const queryClient = useQueryClient()
  const toast = useOptionalAppToast()
  const isMobile = useMediaQuery(queryMax('mobile'))

  const [source, setSource] = useState(initialSource || '')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [poster, setPoster] = useState('')
  const [posterOptions, setPosterOptions] = useState<string[]>([])
  const [postersLoading, setPostersLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [multiFiles, setMultiFiles] = useState<File[] | null>(null)
  const posterRequestRef = useRef(0)

  useSyncModalOpen(open && !multiFiles)

  useEffect(() => {
    if (open && initialSource) setSource(initialSource)
  }, [open, initialSource])

  const resetForm = () => {
    setSource('')
    setTitle('')
    setCategory('')
    setPoster('')
    setPosterOptions([])
  }

  const handleFiles = useCallback((files: File[]) => {
    if (!files.length) return
    setMultiFiles(files)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    accept: { 'application/x-bittorrent': ['.torrent'] },
    multiple: true,
    noClick: false,
    disabled: saving,
  })

  useEffect(() => {
    const query = shortenTitleForPosterSearch(title.trim()) || title.trim()
    if (!query || query.length < 2) {
      setPosterOptions([])
      return undefined
    }

    const requestId = ++posterRequestRef.current
    const timer = window.setTimeout(() => {
      setPostersLoading(true)
      const lang = i18n.language?.startsWith('ru') ? 'ru' : 'en'
      void getMoviePosters(query, lang)
        .then(urls => {
          if (requestId !== posterRequestRef.current) return
          setPosterOptions(urls || [])
          setPoster(prev => prev || urls?.[0] || '')
        })
        .finally(() => {
          if (requestId === posterRequestRef.current) setPostersLoading(false)
        })
    }, 450)

    return () => window.clearTimeout(timer)
  }, [title, i18n.language])

  const handleAdd = async () => {
    const trimmed = source.trim()
    if (!trimmed) return
    if (!checkTorrentSource(trimmed)) {
      toast?.showToast({
        message: t('AddDialog.WrongTorrentSource'),
        severity: 'error',
      })
      return
    }

    setSaving(true)
    try {
      await addTorrent({
        link: trimmed,
        title: title || undefined,
        category: category || undefined,
        poster: poster || '',
      })
      await queryClient.invalidateQueries({ queryKey: TORRENTS_QUERY_KEY })
      toast?.showToast({ message: t('TorrentAdded'), severity: 'success' })
      resetForm()
      onClose()
    } catch {
      toast?.showToast({ message: t('Error'), severity: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const footerButtonSx = isMobile ? { minHeight: 44, px: 2.5 } : undefined

  if (multiFiles) {
    return (
      <MultiAddDialog
        files={multiFiles}
        open={open}
        onClose={() => {
          setMultiFiles(null)
          onClose()
        }}
      />
    )
  }

  return (
    <AppDialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{t('AddNewTorrent')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={2}
            label={t('AddDialog.TorrentSourceLink')}
            helperText={t('AddDialog.TorrentSourceOptions')}
            value={source}
            onChange={e => setSource(e.target.value)}
            disabled={saving}
          />

          <TextField
            fullWidth
            label={t('AddDialog.TitleBlank')}
            helperText={t('AddDialog.CustomTorrentTitleHelperText')}
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={saving}
          />

          <FormControl fullWidth disabled={saving}>
            <InputLabel>{t('AddDialog.CategoryHelperText')}</InputLabel>
            <Select
              label={t('AddDialog.CategoryHelperText')}
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value=''>
                <em>—</em>
              </MenuItem>
              {TORRENT_CATEGORIES.map(cat => (
                <MenuItem key={cat.key} value={cat.key}>
                  {t(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {(postersLoading || posterOptions.length > 0 || poster) && (
            <Box>
              <Typography variant='caption' color='text.secondary' sx={{ mb: 1, display: 'block' }}>
                {t('AddDialog.AddPosterLinkInput')}
                {postersLoading ? '…' : ''}
              </Typography>
              <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', pb: 0.5 }}>
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
                      flexShrink: 0,
                      width: 64,
                      height: 96,
                    }}
                  >
                    <Box component='img' src={url} alt='' sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}
              </Stack>
              <TextField
                fullWidth
                size='small'
                margin='dense'
                label={t('AddDialog.AddPosterLinkInput')}
                value={poster}
                onChange={e => setPoster(e.target.value)}
                disabled={saving}
              />
            </Box>
          )}

          <Box
            {...getRootProps()}
            sx={{
              border: 2,
              borderStyle: 'dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              minHeight: 44,
              display: 'grid',
              placeItems: 'center',
              gap: 1,
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon color='action' />
            <Typography variant='body2' color='text.secondary'>
              {t('AddDialog.AppendFile.ClickOrDrag')}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving} sx={footerButtonSx}>
          {t('Cancel')}
        </Button>
        <Button
          variant='contained'
          onClick={() => void handleAdd()}
          disabled={saving || !source.trim()}
          sx={footerButtonSx}
        >
          {saving ? <CircularProgress size={20} color='inherit' /> : t('Add')}
        </Button>
      </DialogActions>
    </AppDialog>
  )
}
