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
  rangeColor: string
  cacheMaxHeight?: number
}

export const snakeSettings: Record<SnakeThemeMode, Record<SnakeVariant, SnakePieceSettings>> = {
  dark: {
    default: {
      borderWidth: 1,
      pieceSize: 14,
      gapBetweenPieces: 3,
      borderColor: rgba('#fff', 0.2),
      completeColor: rgba(mainColors.dark.primary, 0.5),
      backgroundColor: '#949ca0',
      progressColor: rgba('#fff', 0.2),
      readerColor: '#8f0405',
      rangeColor: '#cda184',
    },
    mini: {
      cacheMaxHeight: 340,
      borderWidth: 2,
      pieceSize: 23,
      gapBetweenPieces: 6,
      borderColor: '#5c6469',
      completeColor: '#5c6469',
      backgroundColor: '#949ca0',
      progressColor: '#949ca0',
      readerColor: '#ccc',
      rangeColor: '#cda184',
    },
  },
  light: {
    default: {
      borderWidth: 1,
      pieceSize: 14,
      gapBetweenPieces: 3,
      borderColor: '#dbf2e8',
      completeColor: mainColors.light.primary,
      backgroundColor: '#fff',
      progressColor: '#b3dfc9',
      readerColor: '#000',
      rangeColor: '#afa6e3',
    },
    mini: {
      cacheMaxHeight: 340,
      borderWidth: 2,
      pieceSize: 23,
      gapBetweenPieces: 6,
      borderColor: '#4db380',
      completeColor: '#4db380',
      backgroundColor: '#9fd0b8',
      progressColor: '#9fd0b8',
      readerColor: '#0a0a0a',
      rangeColor: '#afa6e3',
    },
  },
}

/** Scale piece size down on narrow containers so the mini snake stays readable. */
export const resolvePieceMetrics = (
  settings: SnakePieceSettings,
  containerWidth: number,
  isMini: boolean,
): { pieceSize: number; gap: number } => {
  const basePiece = settings.pieceSize
  const baseGap = settings.gapBetweenPieces

  if (!containerWidth || containerWidth <= 0) {
    return { pieceSize: basePiece, gap: baseGap }
  }

  if (!isMini) {
    const scaled = Math.max(10, Math.min(basePiece, Math.floor(containerWidth / 28)))
    return { pieceSize: scaled, gap: Math.max(2, Math.round(scaled * 0.2)) }
  }

  // Aim for ~10–14 cells per row on phones, up to default size on wider panels
  const targetCells = containerWidth < 400 ? 10 : containerWidth < 600 ? 12 : 14
  const pieceSize = Math.max(12, Math.min(basePiece, Math.floor((containerWidth - 8) / targetCells) - baseGap))
  return { pieceSize, gap: Math.max(3, Math.min(baseGap, Math.round(pieceSize * 0.25))) }
}

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  percentage: number,
  theme: SnakeThemeMode,
  snakeType: SnakeVariant,
  overridePieceSize?: number,
): CanvasGradient => {
  const { pieceSize: defaultSize, completeColor, progressColor } = snakeSettings[theme][snakeType]
  const pieceSize = overridePieceSize || defaultSize

  const gradient = ctx.createLinearGradient(0, pieceSize, 0, 0)
  gradient.addColorStop(0, completeColor)
  gradient.addColorStop(percentage / 100, completeColor)
  gradient.addColorStop(percentage / 100, progressColor)
  gradient.addColorStop(1, progressColor)

  return gradient
}
