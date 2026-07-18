import {
  Alert,
  Description,
  Input,
  Label,
  ListBox,
  Select,
  Separator,
  Switch,
  TextField,
} from '@heroui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gstEchoHost } from 'shared/api/hosts'

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
    <div className='mb-2 flex min-h-11 items-center justify-between gap-4'>
      <Label>{label}</Label>
      <Switch isSelected={checked} onChange={onChange}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch>
    </div>
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
    <div className='space-y-4'>
      <p className='text-xs uppercase tracking-wide text-default-500'>
        {t('GStreamer.Settings', { defaultValue: 'GStreamer' })}
      </p>

      {echo ? (
        <Alert status='accent'>
          <Alert.Description>
            {t('GStreamer.Runtime', { defaultValue: 'Runtime' })}: {statusLabel(echo.gstreamer)} ·{' '}
            {t('GStreamer.Discoverer', { defaultValue: 'Discoverer' })}: {statusLabel(echo.gst_discoverer)}
          </Alert.Description>
        </Alert>
      ) : null}

      <p className='text-sm font-semibold'>{t('GStreamer.SectionGeneral', { defaultValue: 'General' })}</p>
      <TextField value={String(config.GSTVersion)} onChange={value => update('GSTVersion', Number(value) || GST_MIN_VERSION)}>
        <Label>{t('GStreamer.Version', { defaultValue: 'Min GStreamer version' })}</Label>
        <Input type='number' min={1} step={0.01} />
        <Description>{t('GStreamer.VersionHint', { defaultValue: 'Minimum required version (e.g. 1.22)' })}</Description>
      </TextField>
      <TextField value={config.GSTPath || ''} onChange={value => update('GSTPath', value)}>
        <Label>{t('GStreamer.Path', { defaultValue: 'GStreamer path' })}</Label>
        <Input />
        <Description>{t('GStreamer.PathHint', { defaultValue: 'Optional custom binary/plugin path' })}</Description>
      </TextField>
      <Select selectedKey={config.Source || 'stream'} onSelectionChange={key => update('Source', String(key))}>
        <Label>{t('GStreamer.Source', { defaultValue: 'Source mode' })}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id='stream'>{t('GStreamer.SourceStream', { defaultValue: 'Stream (HLS)' })}</ListBox.Item>
            <ListBox.Item id='play'>{t('GStreamer.SourcePlay', { defaultValue: 'Play' })}</ListBox.Item>
          </ListBox>
        </Select.Popover>
        <Description>{t('GStreamer.SourceHint', { defaultValue: 'stream = HLS pipeline, play = direct' })}</Description>
      </Select>

      <Separator />
      <p className='text-sm font-semibold'>{t('GStreamer.SectionPipeline', { defaultValue: 'Pipeline' })}</p>
      {(['MaxTasks', 'InactiveMinutes', 'SegmentSeconds', 'SegmentDiff'] as const).map(key => (
        <TextField key={key} value={String(config[key] ?? 0)} onChange={value => update(key, Number(value))}>
          <Label>{t(`GStreamer.${key}`, { defaultValue: key })}</Label>
          <Input type='number' />
        </TextField>
      ))}

      <Separator />
      <p className='text-sm font-semibold'>{t('GStreamer.SectionAudio', { defaultValue: 'Audio' })}</p>
      <TextField value={String(config.AACBitrateKbps ?? 256)} onChange={value => update('AACBitrateKbps', Number(value))}>
        <Label>{t('GStreamer.AACBitrateKbps', { defaultValue: 'AAC bitrate (kbps)' })}</Label>
        <Input type='number' />
      </TextField>
      <TextField value={String(config.AACChannels ?? 0)} onChange={value => update('AACChannels', Number(value))}>
        <Label>{t('GStreamer.AACChannels', { defaultValue: 'AAC channels' })}</Label>
        <Input type='number' />
        <Description>{t('GStreamer.AACChannelsHint', { defaultValue: '0 = keep source' })}</Description>
      </TextField>
      <TextField value={String(config.AACSamplerate ?? 0)} onChange={value => update('AACSamplerate', Number(value))}>
        <Label>{t('GStreamer.AACSamplerate', { defaultValue: 'AAC sample rate' })}</Label>
        <Input type='number' />
        <Description>{t('GStreamer.AACSamplerateHint', { defaultValue: '0 = keep source' })}</Description>
      </TextField>

      <Separator />
      <p className='text-sm font-semibold'>{t('GStreamer.SectionTranscoding', { defaultValue: 'Transcoding' })}</p>
      <TextField value={String(config.VideoBitrate ?? 10000)} onChange={value => update('VideoBitrate', Number(value))}>
        <Label>{t('GStreamer.VideoBitrate', { defaultValue: 'Video bitrate (kbps)' })}</Label>
        <Input type='number' />
      </TextField>
      <div>
        <GstSwitch label={t('GStreamer.TranscodeH264')} checked={Boolean(config.TranscodeH264)} onChange={v => update('TranscodeH264', v)} />
        <GstSwitch label={t('GStreamer.TranscodeH265')} checked={Boolean(config.TranscodeH265)} onChange={v => update('TranscodeH265', v)} />
        <GstSwitch label={t('GStreamer.TranscodeAV1', { defaultValue: 'Transcode AV1' })} checked={Boolean(config.TranscodeAV1)} onChange={v => update('TranscodeAV1', v)} />
        <GstSwitch label={t('GStreamer.TranscodeVP9', { defaultValue: 'Transcode VP9' })} checked={Boolean(config.TranscodeVP9)} onChange={v => update('TranscodeVP9', v)} />
        <GstSwitch label={t('GStreamer.TranscodeVP8', { defaultValue: 'Transcode VP8' })} checked={Boolean(config.TranscodeVP8)} onChange={v => update('TranscodeVP8', v)} />
        <GstSwitch label={t('GStreamer.TranscodeAVI')} checked={Boolean(config.TranscodeAVI)} onChange={v => update('TranscodeAVI', v)} />
        <GstSwitch label={t('GStreamer.HDRToSDR', { defaultValue: 'HDR → SDR' })} checked={Boolean(config.HDRToSDR)} onChange={v => update('HDRToSDR', v)} />
      </div>

      <Separator />
      <p className='text-sm font-semibold'>{t('GStreamer.SectionAdvanced', { defaultValue: 'Advanced' })}</p>
      <div>
        <GstSwitch label={t('GStreamer.Subtitles', { defaultValue: 'Subtitles' })} checked={Boolean(config.Subtitles)} onChange={v => update('Subtitles', v)} />
        <GstSwitch label={t('GStreamer.UseGPU', { defaultValue: 'Use GPU' })} checked={Boolean(config.UseGPU)} onChange={v => update('UseGPU', v)} />
        <GstSwitch label={t('GStreamer.HardwareAcceleration')} checked={Boolean(config.HardwareAcceleration)} onChange={v => update('HardwareAcceleration', v)} />
        <GstSwitch label={t('GStreamer.X264Ultrafast', { defaultValue: 'x264 ultrafast' })} checked={Boolean(config.X264Ultrafast)} onChange={v => update('X264Ultrafast', v)} />
      </div>
      <Description>{t('GStreamer.SaveHint', { defaultValue: 'Changes apply when you press Save.' })}</Description>
    </div>
  )
}
