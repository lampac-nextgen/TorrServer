// Usage: node scripts/gen-palettes.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { renderPalettesCss, spliceIndexHtml } from '../src/shared/theme/palettesCss.mjs'

const src = fileURLToPath(new URL('../src/shared/theme/palettes.json', import.meta.url))
const out = fileURLToPath(new URL('../src/palettes.generated.css', import.meta.url))

const palettes = JSON.parse(readFileSync(src, 'utf8'))
const css = renderPalettesCss(palettes)
const htmlPath = fileURLToPath(new URL('../index.html', import.meta.url))
const html = spliceIndexHtml(readFileSync(htmlPath, 'utf8'), palettes)

if (process.argv.includes('--check')) {
  let current = ''
  try {
    current = readFileSync(out, 'utf8')
  } catch {
    /* missing */
  }
  if (current !== css || readFileSync(htmlPath, 'utf8') !== html) {
    console.error('palettes.generated.css or the index.html pre-paint block is stale — run `yarn gen:palettes`')
    process.exit(1)
  }
  console.log('palette outputs are up to date')
} else {
  writeFileSync(out, css)
  writeFileSync(htmlPath, html)
  console.log(`wrote ${out}`)
}
