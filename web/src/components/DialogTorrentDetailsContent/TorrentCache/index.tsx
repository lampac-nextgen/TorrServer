import Measure from 'react-measure'
import { useState, memo, useRef, useEffect, useContext, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import isEqual from 'lodash/isEqual'
import { DarkModeContext } from 'components/App'
import { THEME_MODES } from 'style/materialUISetup'
import type { CacheMapItem, TorrentCache as TorrentCacheData } from 'types/api'

import { useCreateFocusMap } from '../customHooks'
import {
  priorityDebugLabel,
  resolveFocusVisibleCells,
  resolveFocusWindow,
} from './buildCacheMap'
import { SnakeWrapper, ScrollNotification, SnakeTooltip } from './style'
import { snakeSettings, resolvePieceMetrics } from './snakeSettings'
import { drawSnake, setupHiDpiCanvas, hitTestSnakeCell } from './drawSnake'

export type SnakeViewMode = 'detailed' | 'focus' | 'mini'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  /** @deprecated prefer mode="mini" */
  isMini?: boolean
  /** detailed/focus/mini — all use 1:1 reader window (no LOD merge). */
  mode?: SnakeViewMode
  isSnakeDebugMode?: boolean
}

const emptyCell = (): CacheMapItem => ({
  percentage: 0,
  priority: 0,
  isReader: false,
  isReaderRange: false,
})

const TorrentCache = ({ cache, isMini, mode: modeProp, isSnakeDebugMode }: TorrentCacheProps) => {
  const { t } = useTranslation()
  const mode: SnakeViewMode = modeProp || (isMini ? 'mini' : 'detailed')
  const isMiniView = mode === 'mini'

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { width } = dimensions
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const drawRaf = useRef(0)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  const focusVisible = useMemo(() => resolveFocusVisibleCells(width, isMiniView), [width, isMiniView])
  const model = useCreateFocusMap(cache, focusVisible)
  const cacheMap = model.cells

  const settingsTarget = isMiniView ? 'mini' : 'default'
  const { isDarkMode } = useContext(DarkModeContext)
  const theme = isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT

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

  const formatTooltip = useCallback(
    (cell: CacheMapItem) => {
      const start = cell.pieceStart
      const end = cell.pieceEnd
      if (start == null) return ''
      const fill =
        cell.completed || (cell.percentage || 0) >= 99.5 ? 100 : Math.round(cell.percentage || 0)
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
    <Measure bounds onResize={({ bounds }) => bounds && setDimensions(bounds)}>
      {({ measureRef }) => (
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, position: 'relative' }}
          ref={node => {
            rootRef.current = node
            measureRef(node)
          }}
        >
          <SnakeWrapper ref={wrapperRef} $themeType={theme} $isMini={isMiniView} $isFocus>
            {piecesInOneRow > 0 && height > 0 ? (
              <canvas ref={canvasRef} onMouseMove={onCanvasMove} onMouseLeave={() => setTooltip(null)} />
            ) : null}
          </SnakeWrapper>

          {tooltip && <SnakeTooltip style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</SnakeTooltip>}

          {model.windowStart != null && model.windowEnd != null && model.windowEnd >= model.windowStart && (
            <ScrollNotification $themeType={theme}>
              {t('SnakeFocusRange', { start: model.windowStart, end: model.windowEnd })}
            </ScrollNotification>
          )}

          {isMiniView && cacheMaxHeight != null && height >= cacheMaxHeight && (
            <ScrollNotification $themeType={theme}>{t('ScrollDown')}</ScrollNotification>
          )}
        </div>
      )}
    </Measure>
  )
}

export default memo(
  TorrentCache,
  (prev, next) =>
    prev.isMini === next.isMini &&
    prev.mode === next.mode &&
    prev.isSnakeDebugMode === next.isSnakeDebugMode &&
    isEqual(prev.cache.Pieces, next.cache.Pieces) &&
    isEqual(prev.cache.Readers, next.cache.Readers) &&
    prev.cache.PiecesCount === next.cache.PiecesCount &&
    prev.cache.PiecesLength === next.cache.PiecesLength &&
    prev.cache.Capacity === next.cache.Capacity &&
    prev.cache.Filled === next.cache.Filled,
)
