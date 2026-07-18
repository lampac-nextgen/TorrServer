import { useEffect, useMemo, useRef, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

const HISTORY = 30

interface SpeedChartsProps {
  downloadSpeed?: number | null
  uploadSpeed?: number | null
}

/** Live DL/UL sparkline for torrent details (MUI X Charts). */
export default function SpeedCharts({ downloadSpeed, uploadSpeed }: SpeedChartsProps) {
  const { t } = useTranslation()
  const [dl, setDl] = useState<number[]>(() => Array(HISTORY).fill(0))
  const [ul, setUl] = useState<number[]>(() => Array(HISTORY).fill(0))
  const tick = useRef(0)

  useEffect(() => {
    const d = Math.max(0, downloadSpeed ?? 0)
    const u = Math.max(0, uploadSpeed ?? 0)
    setDl(prev => [...prev.slice(1), d])
    setUl(prev => [...prev.slice(1), u])
    tick.current += 1
  }, [downloadSpeed, uploadSpeed])

  const xData = useMemo(() => Array.from({ length: HISTORY }, (_, i) => i), [])

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Typography variant='caption' color='text.secondary' sx={{ mb: 0.5, display: 'block' }}>
        {t('DownloadSpeed')} / {t('UploadSpeed')}
      </Typography>
      <LineChart
        height={120}
        series={[
          { data: dl, label: t('DownloadSpeed'), showMark: false, area: true },
          { data: ul, label: t('UploadSpeed'), showMark: false },
        ]}
        xAxis={[{ data: xData, hideTooltip: true }]}
        yAxis={[{ width: 56, tickLabelStyle: { fontSize: 11 } }]}
        margin={{ left: 4, right: 8, top: 8, bottom: 8 }}
        hideLegend
      />
    </Box>
  )
}
