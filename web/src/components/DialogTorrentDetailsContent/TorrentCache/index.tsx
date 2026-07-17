import Measure from 'react-measure'
import { useState, memo, useRef, useEffect, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import isEqual from 'lodash/isEqual'
import { DarkModeContext } from 'components/App'
import { THEME_MODES } from 'style/materialUISetup'
import type { CacheMapItem, TorrentCache as TorrentCacheData } from 'types/api'

import { useCreateCacheMap } from '../customHooks'
import { resolveCellBudget } from './buildCacheMap'
import getShortCacheMap from './getShortCacheMap'
import { SnakeWrapper, ScrollNotification } from './style'
import { snakeSettings, resolvePieceMetrics } from './snakeSettings'
import { drawSnake, setupHiDpiCanvas } from './drawSnake'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  isMini?: boolean
  isSnakeDebugMode?: boolean
}

const emptyCell = (): CacheMapItem => ({
  percentage: 0,
  priority: 0,
  isReader: false,
  isReaderRange: false,
})

const TorrentCache = ({ cache, isMini, isSnakeDebugMode }: TorrentCacheProps) => {
  const { t } = useTranslation()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { width } = dimensions
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawRaf = useRef(0)

  const maxCells = useMemo(() => resolveCellBudget(width, !!isMini), [width, isMini])
  const model = useCreateCacheMap(cache, maxCells)
  const cacheMap = model.cells

  const settingsTarget = isMini ? 'mini' : 'default'
  const { isDarkMode } = useContext(DarkModeContext)
  const theme = isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT

  const baseSettings = snakeSettings[theme][settingsTarget]
  const { cacheMaxHeight } = baseSettings

  const { pieceSize, gap } = useMemo(
    () => resolvePieceMetrics(baseSettings, width, !!isMini, cacheMap.length),
    [baseSettings, width, isMini, cacheMap.length],
  )

  const canvasWidth = width > 0 ? (isMini ? Math.max(width - 8, width * 0.96) : width) : 0
  const pieceSizeWithGap = pieceSize + gap
  const piecesInOneRow = canvasWidth > 0 ? Math.max(1, Math.floor(canvasWidth / pieceSizeWithGap)) : 0

  const source = useMemo(() => {
    if (!piecesInOneRow) return []
    if (!isMini) return cacheMap

    const piecesLength = cache?.PiecesLength || 1
    const preloadPiecesAmount = Math.max(0, Math.round((cache?.Capacity || 0) / piecesLength - 1))
    return getShortCacheMap({ cacheMap, preloadPiecesAmount, piecesInOneRow })
  }, [cache?.Capacity, cache?.PiecesLength, cacheMap, isMini, piecesInOneRow])

  const startingXPoint = piecesInOneRow > 0 ? Math.ceil((canvasWidth - pieceSizeWithGap * piecesInOneRow) / 2) : 0
  const emptyPlaceholderRows = isMini ? 3 : 4
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
        isMini,
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
    isMini,
    theme,
    isSnakeDebugMode,
  ])

  return (
    <Measure bounds onResize={({ bounds }) => bounds && setDimensions(bounds)}>
      {({ measureRef }) => (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }} ref={measureRef}>
          <SnakeWrapper $themeType={theme} $isMini={isMini}>
            {piecesInOneRow > 0 && height > 0 ? <canvas ref={canvasRef} /> : null}
          </SnakeWrapper>

          {isMini && cacheMaxHeight != null && height >= cacheMaxHeight && (
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
    prev.isSnakeDebugMode === next.isSnakeDebugMode &&
    isEqual(prev.cache.Pieces, next.cache.Pieces) &&
    isEqual(prev.cache.Readers, next.cache.Readers) &&
    prev.cache.PiecesCount === next.cache.PiecesCount &&
    prev.cache.PiecesLength === next.cache.PiecesLength &&
    prev.cache.Capacity === next.cache.Capacity,
)
