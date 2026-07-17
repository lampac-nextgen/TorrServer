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
      borderColor: rgba('#fff', 0.28),
      completeColor: mainColors.dark.primary,
      backgroundColor: '#2f3538',
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
      borderColor: '#9fcbb8',
      completeColor: mainColors.light.primary,
      backgroundColor: '#eef5f1',
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
 * Keep cells readable. Detailed view uses classic ~14px pieces; LOD merges pieces instead of shrinking.
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

  // Detailed: fixed classic size — never shrink below 12px (tiny grids are unreadable).
  return { pieceSize: Math.max(12, basePiece), gap: Math.max(3, baseGap) }
}
