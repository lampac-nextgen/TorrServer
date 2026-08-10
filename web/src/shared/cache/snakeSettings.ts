import { alphaCss } from 'shared/theme/color'

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
  /** Optional light ring so black stroke reads on dark fills. */
  readerHaloColor?: string
  rangeColor: string
  rangeEmptyColor?: string
  cacheMaxHeight?: number
}

/** Layout-only defaults — colors come from {@link resolveSnakeSettings} via CSS vars. */
const layoutDefaults: Record<
  SnakeVariant,
  Pick<SnakePieceSettings, 'borderWidth' | 'pieceSize' | 'gapBetweenPieces' | 'cacheMaxHeight'>
> = {
  default: {
    borderWidth: 1,
    pieceSize: 20,
    gapBetweenPieces: 4,
  },
  mini: {
    cacheMaxHeight: 420,
    borderWidth: 2,
    pieceSize: 26,
    gapBetweenPieces: 5,
  },
}

/** Fallback when CSS vars are unavailable (SSR / tests). Matches forest palette. */
const forestFallback = {
  light: {
    accent: '#00a572',
    surface: '#ffffff',
    surfaceSecondary: '#eef5f1',
    border: '#dbe7e0',
  },
  dark: {
    accent: '#2ecf9a',
    surface: '#121a16',
    surfaceSecondary: '#161f1b',
    border: '#2a3b32',
  },
} as const

function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined' || typeof getComputedStyle === 'undefined') return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

function readThemeSwatches(mode: SnakeThemeMode) {
  const fb = forestFallback[mode]
  return {
    accent: readCssVar('--accent', fb.accent),
    surface: readCssVar('--surface', fb.surface),
    surfaceSecondary: readCssVar('--surface-secondary', fb.surfaceSecondary),
    border: readCssVar('--border', fb.border),
  }
}

/**
 * Visual hierarchy:
 * 1. reader (playhead) — black square outline
 * 2. range — warm amber window (not violet; stable across palettes)
 * 3. cached — current `--accent` from the active palette
 * 4. idle — quiet empty from surface/border tokens
 */
export function resolveSnakeSettings(mode: SnakeThemeMode, variant: SnakeVariant): SnakePieceSettings {
  const layout = layoutDefaults[variant]
  const { accent, surface, surfaceSecondary, border } = readThemeSwatches(mode)
  const isDark = mode === 'dark'
  const rangeColor = isDark ? '#c4a882' : '#6b8fd4'

  return {
    ...layout,
    borderColor: isDark ? alphaCss(accent, 0.3) : border,
    completeColor: accent,
    backgroundColor: isDark ? surfaceSecondary : variant === 'mini' ? surfaceSecondary : surface,
    readerColor: isDark ? '#050807' : variant === 'mini' ? '#0a0a0a' : '#000',
    readerHaloColor: alphaCss('#fff', isDark ? 0.42 : 0.9),
    rangeColor,
    rangeEmptyColor: alphaCss(rangeColor, isDark ? 0.28 : 0.3),
  }
}

/**
 * @deprecated Prefer {@link resolveSnakeSettings} so colors track `data-palette`.
 * Static forest snapshot for tests / rare callers — not palette-aware.
 */
export const snakeSettings: Record<SnakeThemeMode, Record<SnakeVariant, SnakePieceSettings>> = {
  dark: {
    default: {
      ...layoutDefaults.default,
      borderColor: alphaCss(forestFallback.dark.accent, 0.28),
      completeColor: forestFallback.dark.accent,
      backgroundColor: forestFallback.dark.surfaceSecondary,
      readerColor: '#050807',
      readerHaloColor: alphaCss('#fff', 0.45),
      rangeColor: '#c4a882',
      rangeEmptyColor: alphaCss('#c4a882', 0.28),
    },
    mini: {
      ...layoutDefaults.mini,
      borderColor: alphaCss(forestFallback.dark.accent, 0.32),
      completeColor: forestFallback.dark.accent,
      backgroundColor: forestFallback.dark.surface,
      readerColor: '#050807',
      readerHaloColor: alphaCss('#fff', 0.4),
      rangeColor: '#c4a882',
      rangeEmptyColor: alphaCss('#c4a882', 0.3),
    },
  },
  light: {
    default: {
      ...layoutDefaults.default,
      borderColor: forestFallback.light.border,
      completeColor: forestFallback.light.accent,
      backgroundColor: forestFallback.light.surface,
      readerColor: '#000',
      readerHaloColor: alphaCss('#fff', 0.9),
      rangeColor: '#6b8fd4',
      rangeEmptyColor: alphaCss('#6b8fd4', 0.28),
    },
    mini: {
      ...layoutDefaults.mini,
      borderColor: '#b7d9c8',
      completeColor: forestFallback.light.accent,
      backgroundColor: forestFallback.light.surfaceSecondary,
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

/** Upper bound for grown cells — past this the map reads as blocks, not a piece map. */
export const SNAKE_MAX_PIECE_SIZE = 48

/** Gap grows with the cell so large squares do not look glued together. */
const gapForPieceSize = (pieceSize: number, baseGap: number): number =>
  Math.min(8, Math.max(baseGap, Math.round(pieceSize * 0.18)))

/**
 * Largest cell size that still fits `cellCount` cells into width × height.
 * The reader-range window is far smaller than the drawable grid, so without
 * this the pane is mostly empty; growing the cells fills it without padding
 * the map with pieces that are not in the cache.
 */
export const fitPieceMetricsToArea = (
  base: { pieceSize: number; gap: number },
  width: number,
  height: number,
  cellCount: number,
): { pieceSize: number; gap: number } => {
  if (cellCount <= 0 || width <= 0 || height <= 0) return base
  for (let pieceSize = SNAKE_MAX_PIECE_SIZE; pieceSize > base.pieceSize; pieceSize--) {
    const gap = gapForPieceSize(pieceSize, base.gap)
    const stride = pieceSize + gap
    const cols = Math.floor(width / stride)
    const rows = Math.floor(height / stride)
    if (cols >= 1 && rows >= 1 && cols * rows >= cellCount) return { pieceSize, gap }
  }
  return base
}
