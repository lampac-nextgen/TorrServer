import { alphaCss } from 'shared/theme/color'
import { brand, mainColors } from 'shared/theme/colors'

export type SnakeThemeMode = 'dark' | 'light'
export type SnakeVariant = 'default' | 'mini'

export interface SnakePieceSettings {
  borderWidth: number
  pieceSize: number
  gapBetweenPieces: number
  borderColor: string
  completeColor: string
  backgroundColor: string
  /** Playhead outline — black like master. */
  readerColor: string
  /** Optional light ring so black stroke reads on dark green. */
  readerHaloColor?: string
  rangeColor: string
  rangeEmptyColor?: string
  cacheMaxHeight?: number
}

/**
 * Visual hierarchy:
 * 1. reader (playhead) — black square outline
 * 2. range — warm window (not legacy violet in dark)
 * 3. cached — brand green
 * 4. idle — quiet empty
 */
export const snakeSettings: Record<SnakeThemeMode, Record<SnakeVariant, SnakePieceSettings>> = {
  dark: {
    default: {
      borderWidth: 1,
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: alphaCss(brand.greenBright, 0.28),
      completeColor: brand.greenBright,
      backgroundColor: brand.inkElevated,
      readerColor: '#050807',
      readerHaloColor: alphaCss('#fff', 0.45),
      rangeColor: '#c4a882',
      rangeEmptyColor: alphaCss('#c4a882', 0.28),
    },
    mini: {
      cacheMaxHeight: 420,
      borderWidth: 2,
      pieceSize: 26,
      gapBetweenPieces: 5,
      borderColor: alphaCss(brand.greenBright, 0.32),
      completeColor: brand.greenBright,
      backgroundColor: brand.inkSoft,
      readerColor: '#050807',
      readerHaloColor: alphaCss('#fff', 0.4),
      rangeColor: '#c4a882',
      rangeEmptyColor: alphaCss('#c4a882', 0.3),
    },
  },
  light: {
    default: {
      borderWidth: 1,
      pieceSize: 20,
      gapBetweenPieces: 4,
      borderColor: '#c5d9ce',
      completeColor: mainColors.light.primary,
      backgroundColor: '#ffffff',
      readerColor: '#000',
      readerHaloColor: alphaCss('#fff', 0.9),
      rangeColor: '#6b8fd4',
      rangeEmptyColor: alphaCss('#6b8fd4', 0.28),
    },
    mini: {
      cacheMaxHeight: 420,
      borderWidth: 2,
      pieceSize: 26,
      gapBetweenPieces: 5,
      borderColor: '#b7d9c8',
      completeColor: mainColors.light.primary,
      backgroundColor: brand.greenMist,
      readerColor: '#0a0a0a',
      readerHaloColor: alphaCss('#fff', 0.9),
      rangeColor: '#6b8fd4',
      rangeEmptyColor: alphaCss('#6b8fd4', 0.32),
    },
  },
}

/**
 * Mini: keep cells large and readable (do not shrink to cram ~10 into a row).
 * Detailed: fixed ~20px.
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
    // Prefer 8–12 large cells per row; never go below 22px.
    const targetCells = containerWidth < 280 ? 7 : containerWidth < 400 ? 9 : 11
    const fitted = Math.floor((containerWidth - 8) / targetCells) - baseGap
    const pieceSize = Math.max(22, Math.min(28, fitted > 0 ? fitted : basePiece))
    return { pieceSize, gap: Math.max(4, Math.min(baseGap, 6)) }
  }

  return { pieceSize: Math.max(18, basePiece), gap: Math.max(4, baseGap) }
}
