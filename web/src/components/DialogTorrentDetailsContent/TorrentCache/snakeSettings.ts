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
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: rgba('#fff', 0.22),
      completeColor: mainColors.dark.primary,
      backgroundColor: '#2a3033',
      progressColor: rgba('#fff', 0.15),
      readerColor: '#ff5252',
      readerFillColor: rgba('#ff5252', 0.65),
      rangeColor: '#f0b48a',
    },
    mini: {
      cacheMaxHeight: 360,
      borderWidth: 2,
      pieceSize: 23,
      gapBetweenPieces: 6,
      borderColor: '#5c6469',
      completeColor: mainColors.dark.primary,
      backgroundColor: '#3d4448',
      progressColor: '#5c6469',
      readerColor: '#ff6b6b',
      readerFillColor: rgba('#ff6b6b', 0.55),
      rangeColor: '#f0b48a',
    },
  },
  light: {
    default: {
      borderWidth: 1,
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: '#8fbfa8',
      completeColor: mainColors.light.primary,
      backgroundColor: '#e8f2ec',
      progressColor: '#b3dfc9',
      readerColor: '#b71c1c',
      readerFillColor: rgba('#c62828', 0.5),
      rangeColor: '#6a5acd',
    },
    mini: {
      cacheMaxHeight: 360,
      borderWidth: 2,
      pieceSize: 23,
      gapBetweenPieces: 6,
      borderColor: '#4db380',
      completeColor: mainColors.light.primary,
      backgroundColor: '#ffffff',
      progressColor: '#c8e6d7',
      readerColor: '#b71c1c',
      readerFillColor: rgba('#b71c1c', 0.45),
      rangeColor: '#6a5acd',
    },
  },
}

/**
 * Keep cells readable. Detailed view uses fixed ~20px pieces (1:1 window, no shrink).
 */
export const resolvePieceMetrics = (
  settings: SnakePieceSettings,
  containerWidth: number,
  isMini: boolean,
  _cellCount = 0,
): { pieceSize: number; gap: number } => {
  const basePiece = settings.pieceSize
  const baseGap = settings.gapBetweenPieces

  if (!containerWidth || containerWidth <= 0) {
    return { pieceSize: basePiece, gap: baseGap }
  }

  if (isMini) {
    const targetCells = containerWidth < 400 ? 10 : containerWidth < 600 ? 12 : 14
    const pieceSize = Math.max(16, Math.min(basePiece, Math.floor((containerWidth - 8) / targetCells) - baseGap))
    return { pieceSize, gap: Math.max(4, Math.min(baseGap, Math.round(pieceSize * 0.22))) }
  }

  return { pieceSize: Math.max(18, basePiece), gap: Math.max(4, baseGap) }
}
