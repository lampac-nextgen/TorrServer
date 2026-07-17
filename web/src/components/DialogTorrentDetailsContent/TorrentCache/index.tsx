import Measure from 'react-measure'
import { useState, useRef, useEffect, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DarkModeContext } from 'components/App'
import { THEME_MODES } from 'style/materialUISetup'
import type { TorrentCache as TorrentCacheData } from 'types/api'

import { useCreateCacheMap } from '../customHooks'
import getShortCacheMap from './getShortCacheMap'
import { SnakeWrapper, ScrollNotification } from './style'
import { createGradient, snakeSettings, resolvePieceMetrics } from './snakeSettings'

export interface TorrentCacheProps {
  cache: TorrentCacheData
  isMini?: boolean
  isSnakeDebugMode?: boolean
}

const TorrentCache = ({ cache, isMini, isSnakeDebugMode }: TorrentCacheProps) => {
  const { t } = useTranslation()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { width } = dimensions
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const cacheMap = useCreateCacheMap(cache)
  const settingsTarget = isMini ? 'mini' : 'default'
  const { isDarkMode } = useContext(DarkModeContext)
  const theme = isDarkMode ? THEME_MODES.DARK : THEME_MODES.LIGHT

  const baseSettings = snakeSettings[theme][settingsTarget]
  const { readerColor, rangeColor, borderWidth, backgroundColor, borderColor, cacheMaxHeight, completeColor } =
    baseSettings

  const { pieceSize, gap } = useMemo(
    () => resolvePieceMetrics(baseSettings, width, !!isMini),
    [baseSettings, width, isMini],
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
        : Array.from({ length: Math.max(piecesInOneRow, 1) * emptyPlaceholderRows }, () => ({
            percentage: 0,
            priority: 0,
            isReader: false,
            isReaderRange: false,
          })),
    [source, piecesInOneRow, emptyPlaceholderRows],
  )

  useEffect(() => {
    if (!canvasWidth || !height || !piecesInOneRow) return

    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = canvasWidth
    canvas.height = height
    ctxRef.current = canvas.getContext('2d')
  }, [height, canvasWidth, piecesInOneRow])

  useEffect(() => {
    const ctx = ctxRef.current
    if (!ctx || !piecesInOneRow || !canvasWidth || !height) return

    ctx.clearRect(0, 0, canvasWidth, height)

    drawSource.forEach(({ percentage = 0, priority = 0, isReader, isReaderRange }, i) => {
      const inProgress = percentage > 0 && percentage < 100
      const isCompleted = percentage === 100
      const currentRow = i % piecesInOneRow
      const currentColumn = Math.floor(i / piecesInOneRow)
      const fixBlurStroke = borderWidth % 2 === 0 ? 0 : 0.5
      const requiredFix = Math.ceil(borderWidth / 2) + 1 + fixBlurStroke
      const x = currentRow * pieceSize + currentRow * gap + startingXPoint + requiredFix
      const y = currentColumn * pieceSize + currentColumn * gap + requiredFix

      ctx.lineWidth = borderWidth
      ctx.fillStyle = inProgress
        ? createGradient(ctx, percentage, theme, settingsTarget, pieceSize)
        : isCompleted
          ? completeColor
          : backgroundColor
      ctx.strokeStyle = isReader
        ? readerColor
        : inProgress || isCompleted
          ? completeColor
          : isReaderRange
            ? rangeColor
            : borderColor

      ctx.translate(x, y)
      ctx.fillRect(0, 0, pieceSize, pieceSize)
      ctx.strokeRect(0, 0, pieceSize, pieceSize)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      if (isSnakeDebugMode && priority > 0) {
        let info = ''
        if (priority === 2) info = 'H'
        else if (priority === 3) info = 'R'
        else if (priority === 4) info = 'N'
        else if (priority === 5) info = 'A'
        if (!info) return

        ctx.font = isMini ? '13px monospace' : '10px monospace'
        const xpad = isMini ? pieceSize * 0.35 : pieceSize * 0.29
        const ypad = isMini ? pieceSize * 0.69 : pieceSize * 0.78
        ctx.fillStyle = theme === THEME_MODES.DARK ? '#fff' : '#000'
        ctx.fillText(info, x + xpad, y + ypad)
      }
    })
  }, [
    height,
    canvasWidth,
    piecesInOneRow,
    startingXPoint,
    pieceSize,
    gap,
    source,
    drawSource,
    backgroundColor,
    borderColor,
    borderWidth,
    settingsTarget,
    completeColor,
    readerColor,
    rangeColor,
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

export default TorrentCache
