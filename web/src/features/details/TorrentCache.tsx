import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CacheMapItem, TorrentCache as TorrentCacheData } from 'shared/api/types'
import {
  isReaderActive,
  priorityDebugLabel,
  resolveFocusVisibleCells,
  resolveFocusWindowSize,
  SNAKE_FOCUS_TARGET_ROWS,
  SNAKE_FOCUS_TARGET_ROWS_MINI,
} from 'shared/cache/buildCacheMap'
import { cheapPiecesFingerprint, cheapReadersFingerprint } from 'shared/cache/cacheFingerprint'
import { drawSnake, hitTestSnakeCell, setupHiDpiCanvas } from 'shared/cache/drawSnake'
import {
  fitPieceMetricsToArea,
  resolvePieceMetrics,
  resolveSnakeSettings,
  type SnakeThemeMode,
} from 'shared/cache/snakeSettings'
import { snakeCameraKey } from 'shared/cache/snakeSession'
import { useCreateFocusMap } from 'shared/cache/useUpdateCache'
import { humanizeSize } from 'shared/lib/format'
import { useThemePreference } from 'shared/theme/useThemePreference'

export type SnakeViewMode = 'detailed' | 'mini'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  /** detailed — 1:1 reader window sized to the drawable grid. */
  mode?: SnakeViewMode
  isSnakeDebugMode?: boolean
  /** Torrent hash — restores the focus window after the dialog or tab is remounted. */
  hash?: string
}

/**
 * ResizeObserver reports the content box, so the first synchronous read must
 * subtract padding too — otherwise the grid is laid out for a pane ~18px wider
 * than reality and reflows right after mount. `clientWidth` is used instead of
 * `getBoundingClientRect` because the modal enter animation scales the subtree.
 */
const measureContentBox = (el: HTMLElement) => {
  const style = getComputedStyle(el)
  const width = el.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0)
  const height = el.clientHeight - (parseFloat(style.paddingTop) || 0) - (parseFloat(style.paddingBottom) || 0)
  return { width: Math.max(0, width), height: Math.max(0, height) }
}

/** Cell-count bucket for cell-size fitting — avoids resizing on tiny window drift. */
const CELL_FIT_STEP = 16

const emptyCell = (): CacheMapItem => ({
  percentage: 0,
  priority: 0,
  isReader: false,
  isReaderRange: false,
})

/** Canvas-based piece map ("snake") showing cache fill, playhead and priorities. */
function TorrentCache({ cache, mode = 'detailed', isSnakeDebugMode, hash }: TorrentCacheProps) {
  const { t } = useTranslation()
  const { isDark, palette } = useThemePreference()
  const theme: SnakeThemeMode = isDark ? 'dark' : 'light'
  const isMiniView = mode === 'mini'

  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const drawFrame = useRef(0)
  const resizeFrame = useRef(0)
  const lastDrawKey = useRef('')
  const [tooltip, setTooltip] = useState<{ index: number; x: number; y: number; text: string } | null>(null)

  // Layout effect: measuring after paint showed an empty pane for one frame on
  // every mount (dialog open, tab switch) before the snake appeared.
  useLayoutEffect(() => {
    const el = isMiniView ? rootRef.current : scrollWrapperRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(entries => {
      const box = entries[0]?.contentRect
      cancelAnimationFrame(resizeFrame.current)
      resizeFrame.current = requestAnimationFrame(() => {
        setContainerWidth(box?.width ?? 0)
        if (!isMiniView) setContainerHeight(box?.height ?? 0)
      })
    })
    observer.observe(el)
    const box = measureContentBox(el)
    setContainerWidth(box.width)
    if (!isMiniView) setContainerHeight(box.height)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(resizeFrame.current)
    }
  }, [isMiniView])

  const variant = isMiniView ? 'mini' : 'default'
  const baseSettings = useMemo(() => {
    void palette
    return resolveSnakeSettings(theme, variant)
  }, [theme, variant, palette])

  const baseMetrics = useMemo(
    () => resolvePieceMetrics(baseSettings, containerWidth, isMiniView, 0),
    [baseSettings, containerWidth, isMiniView],
  )

  const canvasWidth =
    containerWidth > 0 ? (isMiniView ? Math.max(containerWidth - 8, containerWidth * 0.96) : containerWidth) : 0

  const emptyRowCount = isMiniView ? 4 : 6
  const targetRows = isMiniView ? SNAKE_FOCUS_TARGET_ROWS_MINI : SNAKE_FOCUS_TARGET_ROWS

  // Detailed: grow cells so the reader-range window fills the pane instead of
  // leaving it half empty. Sizing runs at the base cell first to learn how many
  // cells the window wants, then picks the largest cell that still fits them.
  const { pieceSize, gap } = useMemo(() => {
    const baseStride = baseMetrics.pieceSize + baseMetrics.gap
    if (isMiniView || canvasWidth <= 0 || baseStride <= 0) return baseMetrics
    if (containerHeight < baseStride * 2) return baseMetrics

    const baseCols = Math.max(1, Math.floor(canvasWidth / baseStride))
    const baseRows = Math.max(2, Math.floor(containerHeight / baseStride))
    const budget = baseCols * baseRows
    const wanted = resolveFocusWindowSize(cache, budget)
    // Near the file edges the reader range grows piece by piece; rounding to a
    // coarse step keeps the cells from resizing on every poll.
    const quantized = Math.min(budget, Math.ceil(wanted / CELL_FIT_STEP) * CELL_FIT_STEP)
    return fitPieceMetricsToArea(baseMetrics, canvasWidth, containerHeight, quantized)
  }, [baseMetrics, canvasWidth, containerHeight, isMiniView, cache])

  const cellStride = pieceSize + gap
  const piecesPerRow = canvasWidth > 0 ? Math.max(1, Math.floor(canvasWidth / cellStride)) : 0

  // Detailed: fit rows to pane once RO reports real height (≥2 footprints).
  const heightReady = !isMiniView && cellStride > 0 && containerHeight >= cellStride * 2
  const maxFitRows = heightReady
    ? Math.max(2, Math.floor(containerHeight / cellStride))
    : isMiniView
      ? emptyRowCount
      : targetRows

  // Drawable budget first — focus window must match cols × rows (no silent slice).
  const visibleCellBudget =
    piecesPerRow > 0
      ? piecesPerRow * maxFitRows
      : resolveFocusVisibleCells(containerWidth, isMiniView, isMiniView ? 0 : containerHeight)

  // Withhold the key until the pane is measured: the first render runs on a
  // placeholder budget and would otherwise overwrite the saved window with it.
  const isMeasured = containerWidth > 0 && (isMiniView || containerHeight > 0)
  const focusModel = useCreateFocusMap(cache, visibleCellBudget, isMeasured ? snakeCameraKey(hash, mode) : undefined)
  const cells = focusModel.cells
  // A reader reported as idle keeps its square on screen but stops moving.
  const hasActiveReaders = (cache.Readers ?? []).some(isReaderActive)

  const rowCount =
    piecesPerRow > 0
      ? Math.max(
          cells.length > 0 ? Math.ceil(cells.length / piecesPerRow) : emptyRowCount,
          isMiniView ? emptyRowCount : 1,
        )
      : 0
  const fittedRows = Math.min(rowCount, maxFitRows)
  const canvasHeight = fittedRows > 0 ? fittedRows * cellStride : 0

  const startingX = piecesPerRow > 0 ? Math.ceil((canvasWidth - cellStride * piecesPerRow) / 2) : 0

  const drawCells = useMemo(() => {
    if (cells.length > 0) return cells
    return Array.from({ length: Math.max(piecesPerRow, 1) * emptyRowCount }, emptyCell)
  }, [cells, piecesPerRow, emptyRowCount])

  const cacheAriaLabel = useMemo(() => {
    const { Filled, Capacity } = cache
    if (Filled != null && Capacity != null) {
      return t('SnakeCacheSummary', {
        filled: humanizeSize(Filled),
        capacity: humanizeSize(Capacity),
      })
    }
    return t('Cache')
  }, [cache, t])

  // Footer range matches drawn cells (window is sized to the grid).
  const footerStart = focusModel.windowStart
  const footerEnd =
    focusModel.windowStart != null && drawCells.length > 0 && drawCells[0]?.pieceStart != null
      ? (drawCells[drawCells.length - 1]?.pieceEnd ??
        drawCells[drawCells.length - 1]?.pieceStart ??
        focusModel.windowEnd)
      : focusModel.windowEnd

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvasWidth || !canvasHeight || !piecesPerRow) return

    const drawKey = [
      canvasWidth,
      canvasHeight,
      piecesPerRow,
      pieceSize,
      gap,
      isSnakeDebugMode ? 1 : 0,
      theme,
      palette,
      cheapPiecesFingerprint(cache.Pieces),
      cheapReadersFingerprint(cache.Readers),
      drawCells.length,
      footerStart ?? -1,
    ].join('|')
    if (drawKey === lastDrawKey.current) return
    lastDrawKey.current = drawKey

    cancelAnimationFrame(drawFrame.current)
    drawFrame.current = requestAnimationFrame(() => {
      const ctx = setupHiDpiCanvas(canvas, canvasWidth, canvasHeight)
      if (!ctx) return
      drawSnake({
        ctx,
        cells: drawCells,
        canvasWidth,
        canvasHeight,
        piecesInOneRow: piecesPerRow,
        pieceSize,
        gap,
        startingX,
        theme,
        variant,
        isSnakeDebugMode,
        isMini: isMiniView,
      })
    })

    return () => cancelAnimationFrame(drawFrame.current)
  }, [
    canvasHeight,
    canvasWidth,
    piecesPerRow,
    startingX,
    pieceSize,
    gap,
    drawCells,
    variant,
    isMiniView,
    theme,
    palette,
    isSnakeDebugMode,
    cache.Pieces,
    cache.Readers,
    footerStart,
  ])

  const formatTooltipText = useCallback(
    (cell: CacheMapItem) => {
      const start = cell.pieceStart
      const end = cell.pieceEnd
      if (start == null) return ''
      const fillPercent = cell.completed || (cell.percentage || 0) >= 99.5 ? 100 : Math.round(cell.percentage || 0)
      const priorityLabel = priorityDebugLabel(cell.priority || 0)
      const priorityPart = priorityLabel ? ` · ${priorityLabel}` : ''
      if (end != null && end !== start) {
        return t('SnakeTooltipBucket', { start, end, fill: fillPercent }) + priorityPart
      }
      return t('SnakeTooltipPiece', { id: start, fill: fillPercent }) + priorityPart
    },
    [t],
  )

  const cellAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      if (!piecesPerRow) return null
      const canvas = canvasRef.current
      const root = rootRef.current
      if (!canvas || !root) return null
      const canvasRect = canvas.getBoundingClientRect()
      const rootRect = root.getBoundingClientRect()
      const localX = clientX - canvasRect.left
      const localY = clientY - canvasRect.top
      const index = hitTestSnakeCell(localX, localY, {
        piecesInOneRow: piecesPerRow,
        pieceSize,
        gap,
        startingX,
        cellCount: drawCells.length,
      })
      if (index < 0) return null
      const text = formatTooltipText(drawCells[index])
      if (!text) return null
      return { index, x: clientX - rootRect.left + 12, y: clientY - rootRect.top + 12, text }
    },
    [piecesPerRow, pieceSize, gap, startingX, drawCells, formatTooltipText],
  )

  const handleCanvasMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      setTooltip(cellAtPoint(event.clientX, event.clientY))
    },
    [cellAtPoint],
  )

  const handleCanvasTap = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const next = cellAtPoint(event.clientX, event.clientY)
      setTooltip(current => (next && current?.index === next.index ? null : next))
    },
    [cellAtPoint],
  )

  useEffect(() => {
    if (!tooltip) return
    const dismissIfOutside = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !rootRef.current?.contains(event.target)) {
        setTooltip(null)
      }
    }
    document.addEventListener('pointerdown', dismissIfOutside)
    return () => document.removeEventListener('pointerdown', dismissIfOutside)
  }, [tooltip])

  return (
    <div ref={rootRef} className={`relative flex w-full min-w-0 flex-col ${isMiniView ? '' : 'min-h-0 flex-1'}`}>
      <div
        ref={scrollWrapperRef}
        className={`ts-details-cache-snake relative w-full min-w-0 rounded-lg border border-border bg-surface-secondary p-2 ${
          isMiniView ? 'grid max-h-[420px] justify-center overflow-hidden' : 'min-h-0 min-w-0 flex-1 overflow-hidden'
        }`}
      >
        {piecesPerRow > 0 && canvasHeight > 0 ? (
          <canvas
            ref={canvasRef}
            role='img'
            aria-label={cacheAriaLabel}
            className='block max-w-full'
            onMouseMove={handleCanvasMove}
            onMouseLeave={() => setTooltip(null)}
            onClick={handleCanvasTap}
          />
        ) : null}
      </div>

      {tooltip ? (
        <div
          className='pointer-events-none absolute z-20 whitespace-nowrap rounded-md border border-border bg-surface-tertiary px-2 py-1 text-xs leading-snug text-foreground shadow-lg'
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      ) : null}

      {footerStart != null && footerEnd != null && footerEnd >= footerStart ? (
        <p className='mt-2 shrink-0 self-center text-xs uppercase tracking-wide text-muted'>
          {t('SnakeFocusRange', { start: footerStart, end: footerEnd })}
          {!hasActiveReaders ? ` · ${t('SnakeIdleFrozen')}` : null}
        </p>
      ) : null}
    </div>
  )
}

export default memo(TorrentCache, (prev, next) => {
  if (prev.mode !== next.mode) return false
  if (prev.isSnakeDebugMode !== next.isSnakeDebugMode) return false
  if (prev.hash !== next.hash) return false
  const a = prev.cache
  const b = next.cache
  return (
    a.PiecesCount === b.PiecesCount &&
    a.PiecesLength === b.PiecesLength &&
    a.Capacity === b.Capacity &&
    a.Filled === b.Filled &&
    cheapPiecesFingerprint(a.Pieces) === cheapPiecesFingerprint(b.Pieces) &&
    cheapReadersFingerprint(a.Readers) === cheapReadersFingerprint(b.Readers)
  )
})
