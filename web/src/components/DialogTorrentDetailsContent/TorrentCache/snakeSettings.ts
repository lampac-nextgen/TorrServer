import { rgba } from 'polished'
import { mainColors } from 'style/colors'

export type SnakeThemeMode = 'dark' | 'light'
export type SnakeVariant = 'default' | 'mini'

export interface SnakePieceSettings {
  borderWidth: number
  pieceSize: number
  gapBetweenPieces: number
  /** Idle cell outline */
  borderColor: string
  /** Fully / partially cached fill */
  completeColor: string
  /** Empty cell fill */
  backgroundColor: string
  progressColor: string
  /** Playhead (reader) outline — black on light (classic), bright on dark */
  readerColor: string
  /** Optional top playhead tick */
  readerMarkColor?: string
  /** Readahead / reader-range outline */
  rangeColor: string
  /** Empty cells inside reader range */
  rangeEmptyColor?: string
  cacheMaxHeight?: number
}

/**
 * Color roles (classic TorrServer + clearer contrast):
 * - idle: quiet outline, empty fill
 * - cached: brand green fill + matching border
 * - range: soft violet (light) / warm sand (dark) — window around playhead
 * - reader: black on light (master), light red on dark — highest priority chrome
 */
export const snakeSettings: Record<SnakeThemeMode, Record<SnakeVariant, SnakePieceSettings>> = {
  dark: {
    default: {
      borderWidth: 1,
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: rgba('#fff', 0.18),
      completeColor: mainColors.dark.primary,
      backgroundColor: '#32383c',
      progressColor: rgba('#fff', 0.12),
      readerColor: '#ff8a80',
      readerMarkColor: '#ff8a80',
      rangeColor: '#cda184',
      rangeEmptyColor: rgba('#cda184', 0.28),
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
      readerColor: '#e8e8e8',
      readerMarkColor: '#e8e8e8',
      rangeColor: '#cda184',
      rangeEmptyColor: rgba('#cda184', 0.3),
    },
  },
  light: {
    default: {
      borderWidth: 1,
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: '#d5ebe0',
      completeColor: mainColors.light.primary,
      backgroundColor: '#ffffff',
      progressColor: '#b3dfc9',
      // Classic master playhead — black reads clearly on green/white
      readerColor: '#111111',
      readerMarkColor: '#111111',
      rangeColor: '#8b7fd4',
      rangeEmptyColor: rgba('#afa6e3', 0.35),
    },
    mini: {
      cacheMaxHeight: 360,
      borderWidth: 2,
      pieceSize: 23,
      gapBetweenPieces: 6,
      borderColor: '#4db380',
      completeColor: mainColors.light.primary,
      backgroundColor: '#dbf2e8',
      progressColor: '#c8e6d7',
      readerColor: '#0a0a0a',
      readerMarkColor: '#0a0a0a',
      rangeColor: '#8b7fd4',
      rangeEmptyColor: rgba('#afa6e3', 0.4),
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
