import { Alert, Description, Input, Label, ListBox, Select, Separator, Switch, TextField } from '@heroui/react'
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
  helper,
  checked,
  onChange,
}: {
  label: string
  helper?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className='flex min-h-11 items-start justify-between gap-4 py-1.5'>
      <div className='min-w-0 flex-1'>
        <p className='block text-sm font-medium leading-snug text-foreground'>{label}</p>
        {helper ? <p className='mt-1.5 block text-sm leading-relaxed text-muted'>{helper}</p> : null}
      </div>
      <Switch isSelected={checked} onChange={onChange} className='mt-0.5 shrink-0'>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Content>
      </Switch>
    </div>
  )
}

interface GStreamerSettingsPanelProps {
  config: GStreamerConfig
  onChange: (next: GStreamerConfig) => void
}

/** GStreamer transcoding pipeline settings — runtime probe + pipeline/audio/transcode/advanced controls. */
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
    if (!component) return t('GStreamer.StatusMissing')
    if (component.works) return t('GStreamer.StatusWorks')
    if (component.available || component.found) return t('GStreamer.StatusAvailable')
    return t('GStreamer.StatusMissing')
  }

  return (
    <div className='space-y-5'>
      {echo ? (
        <Alert status='accent'>
          <Alert.Description>
            {t('GStreamer.Runtime')}: {statusLabel(echo.gstreamer)} &middot; {t('GStreamer.Discoverer')}:{' '}
            {statusLabel(echo.gst_discoverer)}
          </Alert.Description>
        </Alert>
      ) : null}

      <div>
        <p className='mb-3 text-sm font-semibold text-foreground'>{t('GStreamer.SectionGeneral')}</p>
        <div className='space-y-4'>
          <TextField
            value={String(config.GSTVersion)}
            onChange={value => update('GSTVersion', Number(value) || GST_MIN_VERSION)}
          >
            <Label>{t('GStreamer.Version')}</Label>
            <Input type='number' min={1} step={0.01} />
            <Description>{t('GStreamer.VersionHint')}</Description>
          </TextField>
          <TextField value={config.GSTPath || ''} onChange={value => update('GSTPath', value)}>
            <Label>{t('GStreamer.Path')}</Label>
            <Input />
            <Description>{t('GStreamer.PathHint')}</Description>
          </TextField>
          <Select selectedKey={config.Source || 'stream'} onSelectionChange={key => update('Source', String(key))}>
            <Label>{t('GStreamer.Source')}</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id='stream'>{t('GStreamer.SourceStream')}</ListBox.Item>
                <ListBox.Item id='play'>{t('GStreamer.SourcePlay')}</ListBox.Item>
              </ListBox>
            </Select.Popover>
            <Description>{t('GStreamer.SourceHint')}</Description>
          </Select>
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-3 text-sm font-semibold text-foreground'>{t('GStreamer.SectionPipeline')}</p>
        <div className='grid gap-4 sm:grid-cols-2'>
          {(
            [
              ['MaxTasks', t('GStreamer.MaxTasks'), t('GStreamer.MaxTasksHint')],
              ['InactiveMinutes', t('GStreamer.InactiveMinutes'), t('GStreamer.InactiveMinutesHint')],
              ['SegmentSeconds', t('GStreamer.SegmentSeconds'), t('GStreamer.SegmentSecondsHint')],
              ['SegmentDiff', t('GStreamer.SegmentDiff'), t('GStreamer.SegmentDiffHint')],
            ] as const
          ).map(([key, label, hint]) => (
            <TextField key={key} value={String(config[key] ?? 0)} onChange={value => update(key, Number(value))}>
              <Label>{label}</Label>
              <Input type='number' />
              <Description>{hint}</Description>
            </TextField>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-3 text-sm font-semibold text-foreground'>{t('GStreamer.SectionAudio')}</p>
        <div className='grid gap-4 sm:grid-cols-2'>
          <TextField
            value={String(config.AACBitrateKbps ?? 256)}
            onChange={value => update('AACBitrateKbps', Number(value))}
          >
            <Label>{t('GStreamer.AACBitrateKbps')}</Label>
            <Input type='number' />
            <Description>{t('GStreamer.AACBitrateKbpsHint')}</Description>
          </TextField>
          <TextField value={String(config.AACChannels ?? 0)} onChange={value => update('AACChannels', Number(value))}>
            <Label>{t('GStreamer.AACChannels')}</Label>
            <Input type='number' />
            <Description>{t('GStreamer.AACChannelsHint')}</Description>
          </TextField>
          <TextField
            value={String(config.AACSamplerate ?? 0)}
            onChange={value => update('AACSamplerate', Number(value))}
          >
            <Label>{t('GStreamer.AACSamplerate')}</Label>
            <Input type='number' />
            <Description>{t('GStreamer.AACSamplerateHint')}</Description>
          </TextField>
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-3 text-sm font-semibold text-foreground'>{t('GStreamer.SectionTranscoding')}</p>
        <TextField
          value={String(config.VideoBitrate ?? 10000)}
          onChange={value => update('VideoBitrate', Number(value))}
          className='mb-2 max-w-[220px]'
        >
          <Label>{t('GStreamer.VideoBitrate')}</Label>
          <Input type='number' />
          <Description>{t('GStreamer.VideoBitrateHint')}</Description>
        </TextField>
        <div className='divide-y divide-separator border-y border-separator'>
          <GstSwitch
            label={t('GStreamer.TranscodeH264')}
            helper={t('GStreamer.TranscodeHint')}
            checked={Boolean(config.TranscodeH264)}
            onChange={v => update('TranscodeH264', v)}
          />
          <GstSwitch
            label={t('GStreamer.TranscodeH265')}
            checked={Boolean(config.TranscodeH265)}
            onChange={v => update('TranscodeH265', v)}
          />
          <GstSwitch
            label={t('GStreamer.TranscodeAV1')}
            checked={Boolean(config.TranscodeAV1)}
            onChange={v => update('TranscodeAV1', v)}
          />
          <GstSwitch
            label={t('GStreamer.TranscodeVP9')}
            checked={Boolean(config.TranscodeVP9)}
            onChange={v => update('TranscodeVP9', v)}
          />
          <GstSwitch
            label={t('GStreamer.TranscodeVP8')}
            checked={Boolean(config.TranscodeVP8)}
            onChange={v => update('TranscodeVP8', v)}
          />
          <GstSwitch
            label={t('GStreamer.TranscodeAVI')}
            checked={Boolean(config.TranscodeAVI)}
            onChange={v => update('TranscodeAVI', v)}
          />
          <GstSwitch
            label={t('GStreamer.HDRToSDR')}
            helper={t('GStreamer.HDRToSDRHint')}
            checked={Boolean(config.HDRToSDR)}
            onChange={v => update('HDRToSDR', v)}
          />
        </div>
      </div>

      <Separator />

      <div>
        <p className='mb-3 text-sm font-semibold text-foreground'>{t('GStreamer.SectionAdvanced')}</p>
        <div className='divide-y divide-separator border-y border-separator'>
          <GstSwitch
            label={t('GStreamer.Subtitles')}
            helper={t('GStreamer.SubtitlesHint')}
            checked={Boolean(config.Subtitles)}
            onChange={v => update('Subtitles', v)}
          />
          <GstSwitch
            label={t('GStreamer.UseGPU')}
            helper={t('GStreamer.UseGPUHint')}
            checked={Boolean(config.UseGPU)}
            onChange={v => update('UseGPU', v)}
          />
          <GstSwitch
            label={t('GStreamer.HardwareAcceleration')}
            helper={t('GStreamer.HardwareAccelerationHint')}
            checked={Boolean(config.HardwareAcceleration)}
            onChange={v => update('HardwareAcceleration', v)}
          />
          <GstSwitch
            label={t('GStreamer.X264Ultrafast')}
            helper={t('GStreamer.X264UltrafastHint')}
            checked={Boolean(config.X264Ultrafast)}
            onChange={v => update('X264Ultrafast', v)}
          />
        </div>
      </div>

      <Description>{t('GStreamer.SaveHint', { defaultValue: 'Changes apply when you press Save.' })}</Description>
    </div>
  )
}
