import Measure from 'react-measure'
import { useState, memo, useRef, useEffect, useContext, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import isEqual from 'lodash/isEqual'
import { DarkModeContext } from 'components/App'
import { THEME_MODES } from 'style/materialUISetup'
import type { CacheMapItem, TorrentCache as TorrentCacheData } from 'types/api'

import { useCreateCacheMap, useCreateFocusMap } from '../customHooks'
import {
  resolveCellBudget,
  resolveFocusVisibleCells,
  resolveFocusWindow,
} from './buildCacheMap'
import getShortCacheMap from './getShortCacheMap'
import { SnakeWrapper, ScrollNotification, SnakeTooltip } from './style'
import { snakeSettings, resolvePieceMetrics } from './snakeSettings'
import { drawSnake, setupHiDpiCanvas, hitTestSnakeCell } from './drawSnake'

export type SnakeViewMode = 'detailed' | 'focus' | 'mini' | 'overview'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  /** @deprecated prefer mode="mini" */
  isMini?: boolean
  /**
   * detailed/focus — 1:1 reader window (no LOD merge).
   * mini — short strip (may use LOD).
   * overview — legacy LOD full map (unused in UI).
   */
  mode?: SnakeViewMode
  isSnakeDebugMode?: boolean
}

const emptyCell = (): CacheMapItem => ({
  percentage: 0,
  priority: 0,
  isReader: false,
  isReaderRange: false,
})

const priorityLabel = (priority: number) => {
  if (priority === 2) return 'H'
  if (priority === 3) return 'R'
  if (priority === 4) return 'N'
  if (priority === 5) return 'A'
  return ''
}

const TorrentCache = ({ cache, isMini, mode: modeProp, isSnakeDebugMode }: TorrentCacheProps) => {
  const { t } = useTranslation()
  const mode: SnakeViewMode = modeProp || (isMini ? 'mini' : 'detailed')
  const isMiniView = mode === 'mini'
  // Detailed cache view = 1:1 piece window (same algorithm as former focus panel).
  const isPieceWindow = mode === 'detailed' || mode === 'focus'

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { width } = dimensions
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const drawRaf = useRef(0)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  const maxCells = useMemo(() => resolveCellBudget(width, isMiniView), [width, isMiniView])
  const focusVisible = useMemo(() => resolveFocusVisibleCells(width), [width])

  const overviewModel = useCreateCacheMap(cache, maxCells)
  const focusModel = useCreateFocusMap(cache, focusVisible)
  const model = isPieceWindow ? focusModel : overviewModel
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
    if (!isMiniView) return cacheMap

    const piecesLength = cache?.PiecesLength || 1
    const preloadPiecesAmount = Math.max(0, Math.round((cache?.Capacity || 0) / piecesLength - 1))
    return getShortCacheMap({ cacheMap, preloadPiecesAmount, piecesInOneRow })
  }, [cache?.Capacity, cache?.PiecesLength, cacheMap, isMiniView, piecesInOneRow])

  const startingXPoint = piecesInOneRow > 0 ? Math.ceil((canvasWidth - pieceSizeWithGap * piecesInOneRow) / 2) : 0
  const emptyPlaceholderRows = isMiniView ? 3 : 6
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

  // Keep reader cell visible in the piece window.
  useEffect(() => {
    if (!isPieceWindow || !wrapperRef.current || !piecesInOneRow || pieceSizeWithGap <= 0) return
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
  }, [isPieceWindow, cache, focusVisible, model.windowStart, piecesInOneRow, pieceSizeWithGap, drawSource])

  const formatTooltip = useCallback(
    (cell: CacheMapItem) => {
      const start = cell.pieceStart
      const end = cell.pieceEnd
      if (start == null) return ''
      const fill = Math.round(cell.percentage || 0)
      const prio = priorityLabel(cell.priority || 0)
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
      if (isMiniView || !piecesInOneRow) {
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
      const cell = drawSource[index]
      const text = formatTooltip(cell)
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
    [isMiniView, piecesInOneRow, pieceSize, gap, startingXPoint, drawSource, formatTooltip],
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
          <SnakeWrapper ref={wrapperRef} $themeType={theme} $isMini={isMiniView} $isFocus={isPieceWindow}>
            {piecesInOneRow > 0 && height > 0 ? (
              <canvas ref={canvasRef} onMouseMove={onCanvasMove} onMouseLeave={() => setTooltip(null)} />
            ) : null}
          </SnakeWrapper>

          {tooltip && <SnakeTooltip style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</SnakeTooltip>}

          {isPieceWindow &&
            model.windowStart != null &&
            model.windowEnd != null &&
            model.windowEnd >= model.windowStart && (
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
