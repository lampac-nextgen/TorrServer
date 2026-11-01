// Usage: node scripts/palettes-report.mjs   (after `yarn test:e2e:palettes`)
// Aggregates e2e/.artifacts/palettes/report/*.json: prints findings grouped by element and
// writes a contact sheet (e2e/.artifacts/palettes/index.html) with every screenshot.
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const dir = fileURLToPath(new URL('../e2e/.artifacts/palettes/', import.meta.url))
const reportDir = `${dir}report/`
if (!existsSync(reportDir)) {
  console.error('no report — run `yarn test:e2e:palettes` first')
  process.exit(1)
}

const runs = readdirSync(reportDir)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(readFileSync(reportDir + f, 'utf8')))
  .sort((a, b) => a.id.localeCompare(b.id) || a.mode.localeCompare(b.mode))

const byElement = new Map()
let total = 0
for (const run of runs) {
  for (const f of run.findings) {
    total++
    const key = `${f.selector} "${f.text}" [${f.screen}]`
    const e = byElement.get(key) ?? { count: 0, worst: 99, runs: [] }
    e.count++
    e.worst = Math.min(e.worst, f.ratio)
    e.runs.push(`${run.id}/${run.mode}/${run.viewport}`)
    byElement.set(key, e)
  }
}

console.log(`${runs.length} palette×mode runs, ${total} low-contrast findings`)
const rows = [...byElement.entries()].sort((a, b) => b[1].count - a[1].count)
for (const [key, e] of rows.slice(0, 40)) {
  console.log(`${String(e.count).padStart(4)}×  worst ${e.worst.toFixed(2)}  ${key}`)
}
const perRun = runs.filter(r => r.findings.length).map(r => `${r.id}/${r.mode}/${r.viewport}:${r.findings.length}`)
if (perRun.length) console.log(`\nruns with findings (${perRun.length}): ${perRun.join(' ')}`)

const files = readdirSync(dir).filter(f => f.endsWith('.png'))
const rows2 = (id, mode) =>
  files
    .filter(f => f.startsWith(`${id}-${mode}-`))
    .sort()
    .map(f => `<td><img loading="lazy" width="200" src="${f}" title="${f}"></td>`)
    .join('')
const html = `<!doctype html><meta charset="utf-8"><title>Palette matrix</title>
<style>body{font:12px system-ui;margin:12px}td{padding:2px}h3{margin:14px 0 2px}table{display:block;overflow-x:auto;white-space:nowrap}</style>
${[...new Set(runs.map(r => r.id))]
  .map(
    id =>
      `<h3>${id} ${runs
        .filter(r => r.id === id)
        .map(r => `${r.mode}/${r.viewport}: ${r.findings.length}`)
        .join(' · ')}</h3><table>` +
      ['light', 'dark'].map(m => `<tr>${rows2(id, m)}</tr>`).join('') +
      '</table>',
  )
  .join('')}`
writeFileSync(`${dir}index.html`, html)
console.log(`\ncontact sheet: ${dir}index.html`)
