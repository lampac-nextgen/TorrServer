// Usage: node scripts/gen-palettes.mjs [--check]
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { renderPalettesCss } from '../src/shared/theme/palettesCss.mjs'

const src = fileURLToPath(new URL('../src/shared/theme/palettes.json', import.meta.url))
const out = fileURLToPath(new URL('../src/palettes.generated.css', import.meta.url))

const css = renderPalettesCss(JSON.parse(readFileSync(src, 'utf8')))

if (process.argv.includes('--check')) {
  let current = ''
  try {
    current = readFileSync(out, 'utf8')
  } catch {
    /* missing */
  }
  if (current !== css) {
    console.error('palettes.generated.css is stale — run `yarn gen:palettes`')
    process.exit(1)
  }
  console.log('palettes.generated.css is up to date')
} else {
  writeFileSync(out, css)
  console.log(`wrote ${out}`)
}
