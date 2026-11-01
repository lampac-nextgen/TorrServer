// Usage: node scripts/gen-logos.mjs
// Builds public/brand/logo-{dark,light}.svg: the mark (downscaled PNG) plus the "TorrServer"
// wordmark converted to outlines with Outfit, so the files render identically without the font
// and stay small. `dark` is for dark backgrounds, `light` for light ones. Also refreshes docs/assets/logo-*.{svg,png}.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import opentype from 'opentype.js'
import sharp from 'sharp'

const here = rel => fileURLToPath(new URL(rel, import.meta.url))
const font = weight => {
  const buf = readFileSync(here(`../node_modules/@fontsource/outfit/files/outfit-latin-${weight}-normal.woff`))
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))
}
const bold = font(800)
const regular = font(400)

const mark = (
  await sharp(here('../../docs/assets/logo-mark.png'))
    .resize(96, 96)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
).toString('base64')

const SIZE = 26
const X = 58
const Y = 33
const TRACKING = -0.5 // px, as in the original SVG

/** Glyph-by-glyph outline (skips opentype.js text shaping, which chokes on Outfit's GSUB tables). */
function outline(f, text, x0) {
  let x = x0
  const d = []
  for (const ch of text) {
    const g = f.charToGlyph(ch)
    d.push(g.getPath(x, Y, SIZE).toPathData(2))
    x += (g.advanceWidth * SIZE) / f.unitsPerEm + TRACKING
  }
  return { d: d.join(''), end: x }
}
const torr = outline(bold, 'Torr', X)
const server = outline(regular, 'Server', torr.end)

const variants = {
  dark: {
    torr: ['#FFF088', '#FFBA08', '#F48C06'],
    torrMid: '50%',
    server: [
      ['0%', '#00F0FF'],
      ['35%', '#38BDF8'],
      ['75%', '#FFAA00'],
      ['100%', '#FF7700'],
    ],
  },
  light: {
    torr: ['#D97706', '#B45309', '#92400E'],
    torrMid: '60%',
    server: [
      ['0%', '#0284C7'],
      ['35%', '#0369A1'],
      ['75%', '#EA580C'],
      ['100%', '#C2410C'],
    ],
  },
}

mkdirSync(here('../public/brand'), { recursive: true })
const docsAssets = name => here(`../../docs/assets/${name}`)
for (const [name, v] of Object.entries(variants)) {
  const stops = list => list.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="196" height="48" viewBox="0 0 196 48" role="img" aria-label="TorrServer"><defs><linearGradient id="t" x1="0%" y1="0%" x2="100%" y2="100%">${stops(
    [
      ['0%', v.torr[0]],
      [v.torrMid, v.torr[1]],
      ['100%', v.torr[2]],
    ],
  )}</linearGradient><linearGradient id="s" x1="0%" y1="0%" x2="100%" y2="100%">${stops(v.server)}</linearGradient></defs><image x="0" y="0" width="48" height="48" href="data:image/png;base64,${mark}"/><path fill="url(#t)" d="${torr.d}"/><path fill="url(#s)" d="${server.d}"/></svg>\n`
  writeFileSync(here(`../public/brand/logo-${name}.svg`), svg)
  // README / docs copies: same outlined SVG plus a 4x transparent PNG (GitHub renders the <picture> sources).
  writeFileSync(docsAssets(`logo-${name}.svg`), svg)
  await sharp(Buffer.from(svg), { density: 288 })
    .resize(784, 192)
    .png({ compressionLevel: 9 })
    .toFile(docsAssets(`logo-${name}.png`))
  console.log(`logo-${name}.svg`, svg.length, 'bytes')
}
