import { useTranslation } from 'react-i18next'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import type { TorrentCache, TorrentStat } from 'types/api'

import { SectionTitle, WidgetWrapper } from '../style'
import { DetailedViewCacheSection, DetailedViewWidgetSection } from './style'
import TorrentCacheView from '../TorrentCache'
import {
  SizeWidget,
  PiecesLengthWidget,
  StatusWidget,
  PiecesCountWidget,
  PeersWidget,
  UploadSpeedWidget,
  DownlodSpeedWidget,
} from '../widgets'

interface DetailedViewProps {
  downloadSpeed?: number | null
  uploadSpeed?: number | null
  torrent?: TorrentStat | null
  torrentSize?: number | null
  PiecesCount?: number | null
  PiecesLength?: number | null
  stat?: number | null
  cache: TorrentCache
}

export default function DetailedView({
  downloadSpeed,
  uploadSpeed,
  torrent,
  torrentSize,
  PiecesCount,
  PiecesLength,
  stat,
  cache,
}: DetailedViewProps) {
  const { t } = useTranslation()
  const [isSnakeDebugMode, setIsSnakeDebugMode] = useState(
    JSON.parse(localStorage.getItem('isSnakeDebugMode') || 'false') as boolean,
  )

  return (
    <>
      <DetailedViewWidgetSection>
        <SectionTitle $mb={20}>{t('Data')}</SectionTitle>

        <WidgetWrapper $detailedView>
          <DownlodSpeedWidget data={downloadSpeed} />
          <UploadSpeedWidget data={uploadSpeed} />
          <PeersWidget data={torrent} />
          <SizeWidget data={torrentSize} />
          <PiecesCountWidget data={PiecesCount} />
          <PiecesLengthWidget data={PiecesLength} />
          <StatusWidget stat={stat} />
        </WidgetWrapper>
      </DetailedViewWidgetSection>

      <DetailedViewCacheSection>
        <SectionTitle $mb={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{t('Cache')}</span>

            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={isSnakeDebugMode}
                  disableRipple
                  onChange={({ target: { checked } }) => {
                    setIsSnakeDebugMode(checked)
                    localStorage.setItem('isSnakeDebugMode', String(checked))
                  }}
                />
              }
              label={t('DebugMode')}
              labelPlacement='start'
            />
          </div>
        </SectionTitle>

        <TorrentCacheView cache={cache} mode='overview' isSnakeDebugMode={isSnakeDebugMode} />

        {isSnakeDebugMode && (
          <>
            <SectionTitle $mb={12} style={{ marginTop: 24 }}>
              {t('SnakeFocus')}
            </SectionTitle>
            <TorrentCacheView cache={cache} mode='focus' isSnakeDebugMode />
          </>
        )}
      </DetailedViewCacheSection>
    </>
  )
}
