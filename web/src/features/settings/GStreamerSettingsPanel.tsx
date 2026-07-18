import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { gstEchoHost, gstSettingsHost } from 'shared/api/hosts'

export interface GStreamerConfig {
  GSTVersion: number
  GSTPath: string
  Source: string
  MaxTasks: number
  InactiveMinutes: number
  AACBitrateKbps: number
  AACChannels: number
  AACSamplerate: number
  SegmentSeconds: number
  SegmentDiff: number
  Subtitles: boolean
  TranscodeH264: boolean
  TranscodeH265: boolean
  TranscodeAV1: boolean
  TranscodeVP9: boolean
  TranscodeVP8: boolean
  TranscodeAVI: boolean
  HDRToSDR: boolean
  HardwareAcceleration: boolean
  UseGPU: boolean
  X264Ultrafast: boolean
  VideoBitrate: number
  [key: string]: unknown
}

interface GstComponentStatus {
  works?: boolean
  available?: boolean
  found?: boolean
  error?: string
}

interface GstEchoStatus {
  gstreamer?: GstComponentStatus
  gst_discoverer?: GstComponentStatus
}

const GST_MIN_VERSION = 1.22

export const emptyGstConfig = (): GStreamerConfig => ({
  GSTVersion: GST_MIN_VERSION,
  GSTPath: '',
  Source: 'stream',
  MaxTasks: 0,
  InactiveMinutes: 5,
  AACBitrateKbps: 256,
  AACChannels: 0,
  AACSamplerate: 0,
  SegmentSeconds: 6,
  SegmentDiff: 20,
  Subtitles: true,
  TranscodeH264: false,
  TranscodeH265: false,
  TranscodeAV1: false,
  TranscodeVP9: false,
  TranscodeVP8: false,
  TranscodeAVI: false,
  HDRToSDR: false,
  HardwareAcceleration: true,
  UseGPU: true,
  X264Ultrafast: false,
  VideoBitrate: 10000,
})

const touchTargetSx = { minHeight: 44, minWidth: 44 }

function GstSwitch({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={e => onChange(e.target.checked)} sx={touchTargetSx} />}
      label={label}
      labelPlacement='start'
      sx={{ ml: 0, width: '100%', justifyContent: 'space-between', mr: 0, mb: 0.5 }}
    />
  )
}

interface GStreamerSettingsPanelProps {
  config: GStreamerConfig
  onChange: (next: GStreamerConfig) => void
}

export default function GStreamerSettingsPanel({ config, onChange }: GStreamerSettingsPanelProps) {
  const { t } = useTranslation()
  const [echo, setEcho] = useState<GstEchoStatus | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(gstEchoHost())
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!cancelled && data) setEcho(data)
      })
      .catch(() => undefined)
    return () => {
      cancelled = true
    }
  }, [])

  const update = <K extends keyof GStreamerConfig>(key: K, value: GStreamerConfig[K]) => {
    onChange({ ...config, [key]: value })
  }

  const statusLabel = (component?: GstComponentStatus) => {
    if (!component) return t('GStreamer.StatusMissing', { defaultValue: 'Missing' })
    if (component.works) return t('GStreamer.StatusWorks', { defaultValue: 'Works' })
    if (component.available || component.found) return t('GStreamer.StatusAvailable', { defaultValue: 'Available' })
    return t('GStreamer.StatusMissing', { defaultValue: 'Missing' })
  }

  return (
    <Stack spacing={2}>
      <Typography variant='overline' color='text.secondary'>
        {t('GStreamer.Settings', { defaultValue: 'GStreamer' })}
      </Typography>

      {echo ? (
        <Alert severity='info'>
          {t('GStreamer.Runtime', { defaultValue: 'Runtime' })}: {statusLabel(echo.gstreamer)} ·{' '}
          {t('GStreamer.Discoverer', { defaultValue: 'Discoverer' })}: {statusLabel(echo.gst_discoverer)}
        </Alert>
      ) : null}

      <Typography variant='subtitle2'>{t('GStreamer.SectionGeneral', { defaultValue: 'General' })}</Typography>
      <TextField
        label={t('GStreamer.Version', { defaultValue: 'Min GStreamer version' })}
        type='number'
        value={config.GSTVersion}
        onChange={e => update('GSTVersion', Number(e.target.value) || GST_MIN_VERSION)}
        helperText={t('GStreamer.VersionHint', { defaultValue: 'Minimum required version (e.g. 1.22)' })}
        fullWidth
        size='small'
        slotProps={{ htmlInput: { min: 1, step: 0.01 } }}
      />
      <TextField
        label={t('GStreamer.Path', { defaultValue: 'GStreamer path' })}
        value={config.GSTPath || ''}
        onChange={e => update('GSTPath', e.target.value)}
        helperText={t('GStreamer.PathHint', { defaultValue: 'Optional custom binary/plugin path' })}
        fullWidth
        size='small'
      />
      <TextField
        select
        label={t('GStreamer.Source', { defaultValue: 'Source mode' })}
        value={config.Source || 'stream'}
        onChange={e => update('Source', e.target.value)}
        helperText={t('GStreamer.SourceHint', { defaultValue: 'stream = HLS pipeline, play = direct' })}
        fullWidth
        size='small'
      >
        <MenuItem value='stream'>{t('GStreamer.SourceStream', { defaultValue: 'Stream (HLS)' })}</MenuItem>
        <MenuItem value='play'>{t('GStreamer.SourcePlay', { defaultValue: 'Play' })}</MenuItem>
      </TextField>

      <Divider />
      <Typography variant='subtitle2'>{t('GStreamer.SectionPipeline', { defaultValue: 'Pipeline' })}</Typography>
      <TextField
        label={t('GStreamer.MaxTasks', { defaultValue: 'Max tasks' })}
        type='number'
        value={config.MaxTasks ?? 0}
        onChange={e => update('MaxTasks', Number(e.target.value))}
        fullWidth
        size='small'
      />
      <TextField
        label={t('GStreamer.InactiveMinutes', { defaultValue: 'Inactive minutes' })}
        type='number'
        value={config.InactiveMinutes ?? 5}
        onChange={e => update('InactiveMinutes', Number(e.target.value))}
        fullWidth
        size='small'
      />
      <TextField
        label={t('GStreamer.SegmentSeconds', { defaultValue: 'Segment seconds' })}
        type='number'
        value={config.SegmentSeconds ?? 6}
        onChange={e => update('SegmentSeconds', Number(e.target.value))}
        fullWidth
        size='small'
      />
      <TextField
        label={t('GStreamer.SegmentDiff', { defaultValue: 'Segment diff' })}
        type='number'
        value={config.SegmentDiff ?? 20}
        onChange={e => update('SegmentDiff', Number(e.target.value))}
        fullWidth
        size='small'
      />

      <Divider />
      <Typography variant='subtitle2'>{t('GStreamer.SectionAudio', { defaultValue: 'Audio' })}</Typography>
      <TextField
        label={t('GStreamer.AACBitrateKbps', { defaultValue: 'AAC bitrate (kbps)' })}
        type='number'
        value={config.AACBitrateKbps ?? 256}
        onChange={e => update('AACBitrateKbps', Number(e.target.value))}
        fullWidth
        size='small'
      />
      <TextField
        label={t('GStreamer.AACChannels', { defaultValue: 'AAC channels' })}
        type='number'
        value={config.AACChannels ?? 0}
        onChange={e => update('AACChannels', Number(e.target.value))}
        helperText={t('GStreamer.AACChannelsHint', { defaultValue: '0 = keep source' })}
        fullWidth
        size='small'
      />
      <TextField
        label={t('GStreamer.AACSamplerate', { defaultValue: 'AAC sample rate' })}
        type='number'
        value={config.AACSamplerate ?? 0}
        onChange={e => update('AACSamplerate', Number(e.target.value))}
        helperText={t('GStreamer.AACSamplerateHint', { defaultValue: '0 = keep source' })}
        fullWidth
        size='small'
      />

      <Divider />
      <Typography variant='subtitle2'>{t('GStreamer.SectionTranscoding', { defaultValue: 'Transcoding' })}</Typography>
      <TextField
        label={t('GStreamer.VideoBitrate', { defaultValue: 'Video bitrate (kbps)' })}
        type='number'
        value={config.VideoBitrate ?? 10000}
        onChange={e => update('VideoBitrate', Number(e.target.value))}
        fullWidth
        size='small'
      />
      <Box>
        <GstSwitch
          label={t('GStreamer.TranscodeH264')}
          checked={Boolean(config.TranscodeH264)}
          onChange={v => update('TranscodeH264', v)}
        />
        <GstSwitch
          label={t('GStreamer.TranscodeH265')}
          checked={Boolean(config.TranscodeH265)}
          onChange={v => update('TranscodeH265', v)}
        />
        <GstSwitch
          label={t('GStreamer.TranscodeAV1', { defaultValue: 'Transcode AV1' })}
          checked={Boolean(config.TranscodeAV1)}
          onChange={v => update('TranscodeAV1', v)}
        />
        <GstSwitch
          label={t('GStreamer.TranscodeVP9', { defaultValue: 'Transcode VP9' })}
          checked={Boolean(config.TranscodeVP9)}
          onChange={v => update('TranscodeVP9', v)}
        />
        <GstSwitch
          label={t('GStreamer.TranscodeVP8', { defaultValue: 'Transcode VP8' })}
          checked={Boolean(config.TranscodeVP8)}
          onChange={v => update('TranscodeVP8', v)}
        />
        <GstSwitch
          label={t('GStreamer.TranscodeAVI')}
          checked={Boolean(config.TranscodeAVI)}
          onChange={v => update('TranscodeAVI', v)}
        />
        <GstSwitch
          label={t('GStreamer.HDRToSDR', { defaultValue: 'HDR → SDR' })}
          checked={Boolean(config.HDRToSDR)}
          onChange={v => update('HDRToSDR', v)}
        />
      </Box>

      <Divider />
      <Typography variant='subtitle2'>{t('GStreamer.SectionAdvanced', { defaultValue: 'Advanced' })}</Typography>
      <Box>
        <GstSwitch
          label={t('GStreamer.Subtitles', { defaultValue: 'Subtitles' })}
          checked={Boolean(config.Subtitles)}
          onChange={v => update('Subtitles', v)}
        />
        <GstSwitch
          label={t('GStreamer.UseGPU', { defaultValue: 'Use GPU' })}
          checked={Boolean(config.UseGPU)}
          onChange={v => update('UseGPU', v)}
        />
        <GstSwitch
          label={t('GStreamer.HardwareAcceleration')}
          checked={Boolean(config.HardwareAcceleration)}
          onChange={v => update('HardwareAcceleration', v)}
        />
        <GstSwitch
          label={t('GStreamer.X264Ultrafast', { defaultValue: 'x264 ultrafast' })}
          checked={Boolean(config.X264Ultrafast)}
          onChange={v => update('X264Ultrafast', v)}
        />
      </Box>
      <FormHelperText>{t('GStreamer.SaveHint', { defaultValue: 'Changes apply when you press Save.' })}</FormHelperText>
    </Stack>
  )
}
