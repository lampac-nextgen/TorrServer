import { rgba } from 'polished'
import { mainColors } from 'style/colors'

export type SnakeThemeMode = 'dark' | 'light'
export type SnakeVariant = 'default' | 'mini'

export interface SnakePieceSettings {
  borderWidth: number
  pieceSize: number
  gapBetweenPieces: number
  borderColor: string
  completeColor: string
  backgroundColor: string
  progressColor: string
  readerColor: string
  readerFillColor?: string
  rangeColor: string
  cacheMaxHeight?: number
}

export const snakeSettings: Record<SnakeThemeMode, Record<SnakeVariant, SnakePieceSettings>> = {
  dark: {
    default: {
      borderWidth: 1,
      pieceSize: 14,
      gapBetweenPieces: 3,
      borderColor: rgba('#fff', 0.18),
      completeColor: mainColors.dark.primary,
      backgroundColor: '#3d4448',
      progressColor: rgba('#fff', 0.15),
      readerColor: '#ff4d4f',
      readerFillColor: rgba('#ff4d4f', 0.55),
      rangeColor: '#e6b089',
    },
    mini: {
      cacheMaxHeight: 360,
      borderWidth: 2,
      pieceSize: 22,
      gapBetweenPieces: 5,
      borderColor: '#5c6469',
      completeColor: mainColors.dark.primary,
      backgroundColor: '#3d4448',
      progressColor: '#5c6469',
      readerColor: '#ff6b6b',
      readerFillColor: rgba('#ff6b6b', 0.5),
      rangeColor: '#e6b089',
    },
  },
  light: {
    default: {
      borderWidth: 1,
      pieceSize: 14,
      gapBetweenPieces: 3,
      borderColor: '#cfe8dc',
      completeColor: mainColors.light.primary,
      backgroundColor: '#f4f7f6',
      progressColor: '#b3dfc9',
      readerColor: '#c62828',
      readerFillColor: rgba('#c62828', 0.45),
      rangeColor: '#7e6bc4',
    },
    mini: {
      cacheMaxHeight: 360,
      borderWidth: 2,
      pieceSize: 22,
      gapBetweenPieces: 5,
      borderColor: '#4db380',
      completeColor: mainColors.light.primary,
      backgroundColor: '#ffffff',
      progressColor: '#c8e6d7',
      readerColor: '#b71c1c',
      readerFillColor: rgba('#b71c1c', 0.4),
      rangeColor: '#7e6bc4',
    },
  },
}

/**
 * Fit `cellCount` into the container: denser grid for huge torrents, larger cells when few.
 */
export const resolvePieceMetrics = (
  settings: SnakePieceSettings,
  containerWidth: number,
  isMini: boolean,
  cellCount = 0,
): { pieceSize: number; gap: number } => {
  const basePiece = settings.pieceSize
  const baseGap = settings.gapBetweenPieces

  if (!containerWidth || containerWidth <= 0) {
    return { pieceSize: basePiece, gap: baseGap }
  }

  if (isMini) {
    const targetCells = containerWidth < 400 ? 10 : containerWidth < 600 ? 12 : 14
    const pieceSize = Math.max(14, Math.min(basePiece, Math.floor((containerWidth - 8) / targetCells) - baseGap))
    return { pieceSize, gap: Math.max(3, Math.min(baseGap, Math.round(pieceSize * 0.22))) }
  }

  // Detailed: adapt to cell count so the full map stays readable and scrollable.
  const gap = cellCount > 8000 ? 1 : cellCount > 4000 ? 2 : baseGap
  const minPiece = cellCount > 8000 ? 6 : cellCount > 4000 ? 7 : 8
  const maxPiece = basePiece
  const targetCols = Math.max(1, Math.floor(containerWidth / (minPiece + gap)))
  const pieceSize = Math.max(
    minPiece,
    Math.min(maxPiece, Math.floor((containerWidth - targetCols * gap) / targetCols)),
  )
  return { pieceSize, gap }
}
