export interface PaletteEntry {
  id: string
  note?: string
  light: Record<string, string>
  dark: Record<string, string>
}
export interface PaletteData {
  default: string
  palettes: PaletteEntry[]
}
export const PALETTE_TOKENS: string[]
export function renderPalettesCss(data: PaletteData): string
