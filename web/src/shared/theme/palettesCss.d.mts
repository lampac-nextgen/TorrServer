export interface PaletteEntry {
  id: string
  note?: string
  light: Record<string, string>
  dark: Record<string, string>
}
export interface PaletteData {
  default: string
  aliases?: Record<string, string>
  palettes: PaletteEntry[]
}
export const PALETTE_TOKENS: string[]
export function renderPalettesCss(data: PaletteData): string
export function renderPrepaintData(data: PaletteData): string
export function spliceIndexHtml(html: string, data: PaletteData): string
export const PREPAINT_START: string
export const PREPAINT_END: string
