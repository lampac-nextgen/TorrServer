import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  SwapVerticalCircle as SwapVerticalCircleIcon,
  ViewAgenda as ViewAgendaIcon,
  Widgets as WidgetsIcon,
  PhotoSizeSelectSmall as PhotoSizeSelectSmallIcon,
  Build as BuildIcon,
  Category as CategoryIcon,
} from '@mui/icons-material'
import { getPeerString, humanizeSize, humanizeSpeed } from 'utils/Utils'
import { useTranslation } from 'react-i18next'
import { GETTING_INFO, IN_DB, CLOSED, PRELOAD, WORKING } from 'torrentStates'
import { TORRENT_CATEGORIES } from 'components/categories'
import type { TorrentStat } from 'types/api'

import StatisticsField from '../StatisticsField'
import useGetWidgetColors from './useGetWidgetColors'

interface SpeedWidgetProps {
  data?: number | null
}

export const DownlodSpeedWidget = ({ data }: SpeedWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('downloadSpeed')

  return (
    <StatisticsField
      title={t('DownloadSpeed')}
      value={humanizeSpeed(data) || `0 ${t('bps')}`}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={ArrowDownwardIcon}
    />
  )
}

export const UploadSpeedWidget = ({ data }: SpeedWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('uploadSpeed')

  return (
    <StatisticsField
      title={t('UploadSpeed')}
      value={humanizeSpeed(data) || `0 ${t('bps')}`}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={ArrowUpwardIcon}
    />
  )
}

interface PeersWidgetProps {
  data?: TorrentStat | null
}

export const PeersWidget = ({ data }: PeersWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor, fontColor } = useGetWidgetColors('peers')

  return (
    <StatisticsField
      title={t('Peers')}
      value={getPeerString(data) || '0 / 0 · 0'}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      fontColor={fontColor}
      icon={SwapVerticalCircleIcon}
    />
  )
}

interface NumberWidgetProps {
  data?: number | null
}

export const PiecesCountWidget = ({ data }: NumberWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('piecesCount')

  return (
    <StatisticsField
      title={t('PiecesCount')}
      value={data}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={WidgetsIcon}
    />
  )
}

export const PiecesLengthWidget = ({ data }: NumberWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('piecesLength')

  return (
    <StatisticsField
      title={t('PiecesLength')}
      value={humanizeSize(data)}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={PhotoSizeSelectSmallIcon}
    />
  )
}

interface StatusWidgetProps {
  stat?: number | null
}

export const StatusWidget = ({ stat }: StatusWidgetProps) => {
  const { t } = useTranslation()

  const values: Record<number, string> = {
    [GETTING_INFO]: t('TorrentGettingInfo'),
    [PRELOAD]: t('TorrentPreload'),
    [WORKING]: t('TorrentWorking'),
    [CLOSED]: t('TorrentClosed'),
    [IN_DB]: t('TorrentInDb'),
  }
  const { iconBGColor, valueBGColor } = useGetWidgetColors('status')

  return (
    <StatisticsField
      title={t('TorrentStatus')}
      value={stat != null ? values[stat] : undefined}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={BuildIcon}
    />
  )
}

export const SizeWidget = ({ data }: NumberWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('size')

  return (
    <StatisticsField
      title={t('TorrentSize')}
      value={humanizeSize(data)}
      iconBg={iconBGColor}
      valueBg={valueBGColor}
      icon={ViewAgendaIcon}
    />
  )
}

interface CategoryWidgetProps {
  data?: string | null
}

export const CategoryWidget = ({ data }: CategoryWidgetProps) => {
  const { t } = useTranslation()
  const { iconBGColor, valueBGColor } = useGetWidgetColors('category')
  // main categories
  const catIndex = TORRENT_CATEGORIES.findIndex(e => e.key === data)
  const catArray = TORRENT_CATEGORIES.find(e => e.key === data)

  if (data) {
    return (
      <StatisticsField
        title={t('Category')}
        value={
          catIndex >= 0 ? t(catArray!.name) : data.length > 1 ? data.charAt(0).toUpperCase() + data.slice(1) : data
        }
        iconBg={iconBGColor}
        valueBg={valueBGColor}
        icon={CategoryIcon}
      />
    )
  }

  return (
    <StatisticsField title={t('Category')} value='—' iconBg={iconBGColor} valueBg={valueBGColor} icon={CategoryIcon} />
  )
}
