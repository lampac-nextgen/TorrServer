import type { CacheMapItem } from 'types/api'

import { snakeSettings, type SnakeThemeMode, type SnakeVariant } from './snakeSettings'

export interface DrawSnakeArgs {
  ctx: CanvasRenderingContext2D
  cells: CacheMapItem[]
  canvasWidth: number
  canvasHeight: number
  piecesInOneRow: number
  pieceSize: number
  gap: number
  startingX: number
  theme: SnakeThemeMode
  variant: SnakeVariant
  isSnakeDebugMode?: boolean
  isMini?: boolean
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

/** Bottom-up solid fill — clearer than linearGradient for piece progress. */
const fillProgress = (
  ctx: CanvasRenderingContext2D,
  size: number,
  percentage: number,
  emptyColor: string,
  fillColor: string,
) => {
  ctx.fillStyle = emptyColor
  ctx.fillRect(0, 0, size, size)

  const ratio = clamp01(percentage / 100)
  if (ratio <= 0) return

  if (ratio >= 1) {
    ctx.fillStyle = fillColor
    ctx.fillRect(0, 0, size, size)
    return
  }

  // At least 2px so early fill in large LOD buckets stays noticeable.
  const filledH = Math.max(2, Math.round(size * ratio))
  ctx.fillStyle = fillColor
  ctx.fillRect(0, size - filledH, size, Math.min(filledH, size))
}

/**
 * Crisp HiDPI snake render: empty → fill → range → reader (reader always on top).
 */
export const drawSnake = ({
  ctx,
  cells,
  canvasWidth,
  canvasHeight,
  piecesInOneRow,
  pieceSize,
  gap,
  startingX,
  theme,
  variant,
  isSnakeDebugMode,
  isMini,
}: DrawSnakeArgs) => {
  const settings = snakeSettings[theme][variant]
  const {
    borderWidth,
    backgroundColor,
    borderColor,
    completeColor,
    readerColor,
    rangeColor,
    readerFillColor,
  } = settings

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.imageSmoothingEnabled = false

  const inset = borderWidth / 2
  // Align strokes to device pixels for sharp 1px borders.
  const pixelAlign = borderWidth % 2 === 1 ? 0.5 : 0

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i] || { percentage: 0, priority: 0 }
    const percentage = cell.percentage || 0
    const isCompleted = Boolean(cell.completed) || percentage >= 100
    const inProgress = percentage > 0 && !isCompleted
    const isReader = Boolean(cell.isReader)
    const isReaderRange = Boolean(cell.isReaderRange)

    const col = i % piecesInOneRow
    const row = Math.floor(i / piecesInOneRow)
    const x = startingX + col * (pieceSize + gap) + pixelAlign
    const y = row * (pieceSize + gap) + pixelAlign

    ctx.save()
    ctx.translate(x, y)

    // Body
    if (isReader && readerFillColor) {
      fillProgress(ctx, pieceSize, Math.max(percentage, 8), backgroundColor, completeColor)
      ctx.fillStyle = readerFillColor
      ctx.fillRect(0, 0, pieceSize, Math.max(2, Math.round(pieceSize * 0.18)))
    } else {
      fillProgress(
        ctx,
        pieceSize,
        isCompleted ? 100 : percentage,
        backgroundColor,
        inProgress || isCompleted ? completeColor : backgroundColor,
      )
    }

    // Range wash (under border, over fill) — subtle so progress stays readable
    if (isReaderRange && !isReader) {
      ctx.fillStyle = rangeColor
      ctx.globalAlpha = theme === 'dark' ? 0.28 : 0.22
      ctx.fillRect(inset, inset, pieceSize - borderWidth, pieceSize - borderWidth)
      ctx.globalAlpha = 1
    }

    // Border priority: reader > range > complete/progress > idle
    let stroke = borderColor
    let line = borderWidth
    if (isReader) {
      stroke = readerColor
      line = Math.max(borderWidth + 1, isMini ? 3 : 2)
    } else if (isReaderRange) {
      stroke = rangeColor
      line = Math.max(borderWidth, 2)
    } else if (inProgress || isCompleted) {
      stroke = completeColor
    }

    const strokeInset = line / 2
    ctx.lineWidth = line
    ctx.strokeStyle = stroke
    ctx.strokeRect(strokeInset, strokeInset, pieceSize - line, pieceSize - line)

    if (isSnakeDebugMode && (cell.priority || 0) > 0) {
      let info = ''
      const priority = cell.priority || 0
      if (priority === 2) info = 'H'
      else if (priority === 3) info = 'R'
      else if (priority === 4) info = 'N'
      else if (priority === 5) info = 'A'
      if (info) {
        ctx.font = `${isMini ? 12 : 9}px ui-monospace, SFMono-Regular, Menlo, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = theme === 'dark' ? '#fff' : '#111'
        ctx.fillText(info, pieceSize / 2, pieceSize / 2)
      }
    }

    ctx.restore()
  }
}

export const setupHiDpiCanvas = (
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number,
): CanvasRenderingContext2D | null => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.round(cssWidth * dpr))
  canvas.height = Math.max(1, Math.round(cssHeight * dpr))
  canvas.style.width = `${cssWidth}px`
  canvas.style.height = `${cssHeight}px`
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

export interface HitTestArgs {
  piecesInOneRow: number
  pieceSize: number
  gap: number
  startingX: number
  cellCount: number
}

/** CSS-pixel hit test → cell index, or -1. */
export const hitTestSnakeCell = (x: number, y: number, args: HitTestArgs): number => {
  const { piecesInOneRow, pieceSize, gap, startingX, cellCount } = args
  if (piecesInOneRow < 1 || cellCount < 1 || pieceSize <= 0) return -1
  const stride = pieceSize + gap
  const localX = x - startingX
  if (localX < 0 || y < 0) return -1
  const col = Math.floor(localX / stride)
  const row = Math.floor(y / stride)
  if (col < 0 || col >= piecesInOneRow) return -1
  const inCellX = localX - col * stride
  const inCellY = y - row * stride
  if (inCellX > pieceSize || inCellY > pieceSize) return -1
  const index = row * piecesInOneRow + col
  if (index < 0 || index >= cellCount) return -1
  return index
}
