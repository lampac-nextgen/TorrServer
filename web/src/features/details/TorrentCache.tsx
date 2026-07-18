import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import type { CacheMapItem, TorrentCache as TorrentCacheData } from 'shared/api/types'
import { priorityDebugLabel, resolveFocusVisibleCells, resolveFocusWindow } from 'shared/cache/buildCacheMap'
import { drawSnake, hitTestSnakeCell, setupHiDpiCanvas } from 'shared/cache/drawSnake'
import { resolvePieceMetrics, snakeSettings, type SnakeThemeMode } from 'shared/cache/snakeSettings'
import { useCreateFocusMap } from 'shared/cache/useUpdateCache'

export type SnakeViewMode = 'detailed' | 'mini'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  /** @deprecated prefer mode="mini" */
  isMini?: boolean
  /** detailed/mini — both use 1:1 reader window (no LOD merge). */
  mode?: SnakeViewMode
  isSnakeDebugMode?: boolean
}

const emptyCell = (): CacheMapItem => ({
  percentage: 0,
  priority: 0,
  isReader: false,
  isReaderRange: false,
})

const piecesFingerprint = (pieces: TorrentCacheData['Pieces']) => {
  if (!pieces) return ''
  if (Array.isArray(pieces)) {
    let acc = ''
    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i]
      if (!p) continue
      acc += `${i}:${p.Size ?? 0}:${p.Priority ?? 0};`
    }
    return acc
  }
  let acc = ''
  for (const [key, p] of Object.entries(pieces)) {
    if (!p) continue
    acc += `${key}:${p.Size ?? 0}:${p.Priority ?? 0};`
  }
  return acc
}

const readersFingerprint = (readers: TorrentCacheData['Readers']) => {
  if (!readers?.length) return ''
  return readers.map(r => `${r.Reader ?? ''}:${r.Start ?? ''}-${r.End ?? ''}`).join('|')
}

function TorrentCache({ cache, isMini, mode: modeProp, isSnakeDebugMode }: TorrentCacheProps) {
  const { t } = useTranslation()
  const { mode: colorMode, systemMode } = useColorScheme()
  const theme: SnakeThemeMode = (colorMode === 'system' ? systemMode : colorMode) === 'dark' ? 'dark' : 'light'

  const mode: SnakeViewMode = modeProp || (isMini ? 'mini' : 'detailed')
  const isMiniView = mode === 'mini'

  const [width, setWidth] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const drawRaf = useRef(0)
  const followPlayheadRef = useRef(true)
  const followResumeTimer = useRef(0)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect.width ?? 0
      setWidth(w)
    })
    ro.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  const focusVisible = useMemo(() => resolveFocusVisibleCells(width, isMiniView), [width, isMiniView])
  const model = useCreateFocusMap(cache, focusVisible)
  const cacheMap = model.cells

  const settingsTarget = isMiniView ? 'mini' : 'default'
  const baseSettings = snakeSettings[theme][settingsTarget]
  const { cacheMaxHeight } = baseSettings

  const { pieceSize, gap } = useMemo(
    () => resolvePieceMetrics(baseSettings, width, isMiniView, cacheMap.length),
    [baseSettings, width, isMiniView, cacheMap.length],
  )

  const canvasWidth = width > 0 ? (isMiniView ? Math.max(width - 8, width * 0.96) : width) : 0
  const pieceSizeWithGap = pieceSize + gap
  const piecesInOneRow = canvasWidth > 0 ? Math.max(1, Math.floor(canvasWidth / pieceSizeWithGap)) : 0

  const source = useMemo(() => {
    if (!piecesInOneRow) return []
    return cacheMap
  }, [cacheMap, piecesInOneRow])

  const startingXPoint = piecesInOneRow > 0 ? Math.ceil((canvasWidth - pieceSizeWithGap * piecesInOneRow) / 2) : 0
  const emptyPlaceholderRows = isMiniView ? 4 : 6
  const height =
    piecesInOneRow > 0
      ? Math.max(
          source.length > 0 ? Math.ceil(source.length / piecesInOneRow) : emptyPlaceholderRows,
          emptyPlaceholderRows,
        ) * pieceSizeWithGap
      : 0

  const drawSource = useMemo(
    () =>
      source.length > 0
        ? source
        : Array.from({ length: Math.max(piecesInOneRow, 1) * emptyPlaceholderRows }, emptyCell),
    [source, piecesInOneRow, emptyPlaceholderRows],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvasWidth || !height || !piecesInOneRow) return

    cancelAnimationFrame(drawRaf.current)
    drawRaf.current = requestAnimationFrame(() => {
      const ctx = setupHiDpiCanvas(canvas, canvasWidth, height)
      if (!ctx) return
      drawSnake({
        ctx,
        cells: drawSource,
        canvasWidth,
        canvasHeight: height,
        piecesInOneRow,
        pieceSize,
        gap,
        startingX: startingXPoint,
        theme,
        variant: settingsTarget,
        isSnakeDebugMode,
        isMini: isMiniView,
      })
    })

    return () => cancelAnimationFrame(drawRaf.current)
  }, [
    height,
    canvasWidth,
    piecesInOneRow,
    startingXPoint,
    pieceSize,
    gap,
    drawSource,
    settingsTarget,
    isMiniView,
    theme,
    isSnakeDebugMode,
  ])

  useEffect(() => {
    if (!wrapperRef.current || !piecesInOneRow || pieceSizeWithGap <= 0) return
    if (!followPlayheadRef.current) return
    const win = resolveFocusWindow(cache, focusVisible)
    if (!win || model.windowStart == null) return
    const localIndex = win.readerPiece - model.windowStart
    if (localIndex < 0) return
    const row = Math.floor(localIndex / piecesInOneRow)
    const top = row * pieceSizeWithGap
    const el = wrapperRef.current
    const viewTop = el.scrollTop
    const viewBottom = viewTop + el.clientHeight
    if (top < viewTop || top + pieceSizeWithGap > viewBottom) {
      el.scrollTop = Math.max(0, top - el.clientHeight / 3)
    }
  }, [cache, focusVisible, model.windowStart, piecesInOneRow, pieceSizeWithGap, drawSource])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const pauseFollow = () => {
      followPlayheadRef.current = false
      window.clearTimeout(followResumeTimer.current)
      followResumeTimer.current = window.setTimeout(() => {
        followPlayheadRef.current = true
      }, 4000)
    }
    el.addEventListener('wheel', pauseFollow, { passive: true })
    el.addEventListener('touchstart', pauseFollow, { passive: true })
    el.addEventListener('pointerdown', pauseFollow)
    return () => {
      window.clearTimeout(followResumeTimer.current)
      el.removeEventListener('wheel', pauseFollow)
      el.removeEventListener('touchstart', pauseFollow)
      el.removeEventListener('pointerdown', pauseFollow)
    }
  }, [width])

  const formatTooltip = useCallback(
    (cell: CacheMapItem) => {
      const start = cell.pieceStart
      const end = cell.pieceEnd
      if (start == null) return ''
      const fill = cell.completed || (cell.percentage || 0) >= 99.5 ? 100 : Math.round(cell.percentage || 0)
      const prio = priorityDebugLabel(cell.priority || 0)
      const prioPart = prio ? ` · ${prio}` : ''
      if (end != null && end !== start) {
        return t('SnakeTooltipBucket', { start, end, fill }) + prioPart
      }
      return t('SnakeTooltipPiece', { id: start, fill }) + prioPart
    },
    [t],
  )

  const onCanvasMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!piecesInOneRow) {
        setTooltip(null)
        return
      }
      const canvas = canvasRef.current
      const root = rootRef.current
      if (!canvas || !root) return
      const canvasRect = canvas.getBoundingClientRect()
      const rootRect = root.getBoundingClientRect()
      const localX = e.clientX - canvasRect.left
      const localY = e.clientY - canvasRect.top
      const index = hitTestSnakeCell(localX, localY, {
        piecesInOneRow,
        pieceSize,
        gap,
        startingX: startingXPoint,
        cellCount: drawSource.length,
      })
      if (index < 0) {
        setTooltip(null)
        return
      }
      const text = formatTooltip(drawSource[index])
      if (!text) {
        setTooltip(null)
        return
      }
      setTooltip({
        x: e.clientX - rootRect.left + 12,
        y: e.clientY - rootRect.top + 12,
        text,
      })
    },
    [piecesInOneRow, pieceSize, gap, startingXPoint, drawSource, formatTooltip],
  )

  return (
    <Box
      ref={rootRef}
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, position: 'relative' }}
    >
      <Box
        ref={wrapperRef}
        sx={{
          width: '100%',
          minWidth: 0,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          position: 'relative',
          ...(isMiniView
            ? {
                display: 'grid',
                justifyContent: 'center',
                maxHeight: cacheMaxHeight ?? 420,
              }
            : { maxHeight: 'min(70dvh, 640px)' }),
          '& canvas': { display: 'block', maxWidth: '100%' },
        }}
      >
        {piecesInOneRow > 0 && height > 0 ? (
          <canvas ref={canvasRef} onMouseMove={onCanvasMove} onMouseLeave={() => setTooltip(null)} />
        ) : null}
      </Box>

      {tooltip ? (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 2,
            pointerEvents: 'none',
            left: tooltip.x,
            top: tooltip.y,
            px: 1,
            py: 0.5,
            borderRadius: 0.5,
            fontSize: 12,
            lineHeight: 1.3,
            whiteSpace: 'nowrap',
            bgcolor: 'rgba(20, 28, 24, 0.92)',
            color: '#fff',
          }}
        >
          {tooltip.text}
        </Box>
      ) : null}

      {model.windowStart != null && model.windowEnd != null && model.windowEnd >= model.windowStart ? (
        <Typography
          variant='caption'
          sx={{
            mt: 1,
            textTransform: 'uppercase',
            alignSelf: 'center',
            letterSpacing: '0.4px',
            color: 'text.secondary',
          }}
        >
          {t('SnakeFocusRange', { start: model.windowStart, end: model.windowEnd })}
        </Typography>
      ) : null}

      {isMiniView && cacheMaxHeight != null && height >= cacheMaxHeight ? (
        <Typography
          variant='caption'
          sx={{
            mt: 1,
            textTransform: 'uppercase',
            alignSelf: 'center',
            letterSpacing: '0.4px',
            color: 'text.secondary',
          }}
        >
          {t('ScrollDown')}
        </Typography>
      ) : null}
    </Box>
  )
}

export default memo(TorrentCache, (prev, next) => {
  if (prev.isMini !== next.isMini) return false
  if (prev.mode !== next.mode) return false
  if (prev.isSnakeDebugMode !== next.isSnakeDebugMode) return false
  const a = prev.cache
  const b = next.cache
  return (
    a.PiecesCount === b.PiecesCount &&
    a.PiecesLength === b.PiecesLength &&
    a.Capacity === b.Capacity &&
    a.Filled === b.Filled &&
    piecesFingerprint(a.Pieces) === piecesFingerprint(b.Pieces) &&
    readersFingerprint(a.Readers) === readersFingerprint(b.Readers)
  )
})
