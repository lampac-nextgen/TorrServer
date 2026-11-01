// Usage: node scripts/gen-icons.mjs
// Builds the opaque / maskable PWA icons from the master mark (docs/assets/logo-mark.png):
//   public/icon-192.png                                  (transparent "any" icon, 192x192)
//   public/icon-maskable-192.png, icon-maskable-512.png  (full-bleed, mark inside the 80% safe zone)
//   public/apple-touch-icon.png                          (180x180, opaque: iOS applies its own mask)
// Run after changing the mark; outputs are committed.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const master = fileURLToPath(new URL('../../docs/assets/logo-mark.png', import.meta.url))
const pub = name => fileURLToPath(new URL(`../public/${name}`, import.meta.url))

// Background = the default palette's dark background (also the splash/manifest colour).
const palettes = JSON.parse(
  readFileSync(fileURLToPath(new URL('../src/shared/theme/palettes.json', import.meta.url)), 'utf8'),
)
const hex = palettes.palettes.find(p => p.id === palettes.default).dark.background
const background = {
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
  alpha: 1,
}

async function icon(size, markRatio, file) {
  const mark = await sharp(master)
    .resize(Math.round(size * markRatio), Math.round(size * markRatio), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'centre' }])
    .flatten({ background })
    .removeAlpha()
    .png({ compressionLevel: 9 })
    .toFile(pub(file))
  console.log('wrote', file)
}

// Transparent-corner "any" icon at the 192px size Chrome requires for installability.
await sharp(master).resize(192, 192).png({ compressionLevel: 9 }).toFile(pub('icon-192.png'))
console.log('wrote icon-192.png')

await icon(192, 0.62, 'icon-maskable-192.png')
await icon(512, 0.62, 'icon-maskable-512.png')
await icon(180, 0.94, 'apple-touch-icon.png')
