import { useEffect, useMemo, useRef, useState } from 'react'

const HISTORY = 30

interface SpeedChartsProps {
  downloadSpeed?: number | null
  uploadSpeed?: number | null
}

function buildPoints(values: number[], max: number, height: number, width: number): string {
  if (values.length === 0) return ''
  return values
    .map((value, index) => {
      const x = values.length <= 1 ? 0 : (index / (values.length - 1)) * width
      const y = height - (Math.max(0, value) / max) * height
      return `${x},${y}`
    })
    .join(' ')
}

/** Live DL/UL sparkline for torrent details. */
export default function SpeedCharts({ downloadSpeed, uploadSpeed }: SpeedChartsProps) {
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

  const max = useMemo(() => Math.max(...dl, ...ul, 1), [dl, ul])
  const width = 320
  const height = 80
  const dlPoints = buildPoints(dl, max, height, width)
  const ulPoints = buildPoints(ul, max, height, width)

  return (
    <div className='w-full min-w-0'>
      <p className='mb-1 text-xs text-default-500'>Download / Upload</p>
      <svg viewBox={`0 0 ${width} ${height}`} className='h-[120px] w-full' preserveAspectRatio='none' aria-hidden>
        <polyline
          fill='rgba(0,165,114,0.12)'
          stroke='#00a572'
          strokeWidth='2'
          points={`0,${height} ${dlPoints} ${width},${height}`}
        />
        <polyline fill='none' stroke='#00a572' strokeWidth='2' points={dlPoints} />
        <polyline fill='none' stroke='#3d9edd' strokeWidth='2' points={ulPoints} />
      </svg>
    </div>
  )
}
