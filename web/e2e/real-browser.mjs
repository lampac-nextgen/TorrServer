// Playwright helpers for the real-server suites.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { before, after } from 'node:test'
import { chromium } from 'playwright'
import { skip } from './real-server.mjs'

const ARTIFACTS = path.join(path.dirname(fileURLToPath(import.meta.url)), '.artifacts')

let browser

/** Call once at the top of a test file: launches Chromium for the file and closes it after. */
export function useBrowser() {
  before(async () => {
    if (!skip) browser = await chromium.launch()
  })
  after(() => browser?.close())
}

/** New page that records every console error, page error, failed and 4xx/5xx request. */
export async function openPage(srv, { viewport = { width: 1440, height: 900 }, ctx = {} } = {}) {
  const context = await browser.newContext({ viewport, acceptDownloads: true, ...ctx })
  const page = await context.newPage()
  const problems = []
  page.on('console', m => {
    if (m.type() === 'error') problems.push(`console.error: ${m.text()}`)
  })
  page.on('pageerror', e => problems.push(`pageerror: ${e.message}`))
  page.on('requestfailed', r => {
    if (!/net::ERR_ABORTED/.test(r.failure()?.errorText || ''))
      problems.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`)
  })
  page.on('response', r => {
    if (r.status() >= 400) problems.push(`HTTP ${r.status()}: ${r.request().method()} ${r.url()}`)
  })
  const requests = []
  page.on('request', r => requests.push({ t: Date.now(), m: r.method(), url: r.url(), post: r.postData() }))
  return { context, page, problems, requests }
}

export async function shot(page, name) {
  fs.mkdirSync(ARTIFACTS, { recursive: true })
  await page.screenshot({ path: path.join(ARTIFACTS, name + '.png') }).catch(() => {})
}

export const card = (page, title) =>
  page.locator('.torrent-card').filter({ has: page.getByRole('button', { name: title, exact: true }) })

/** Open the details dialog the keyboard way (Enter on the focused card). */
export async function openDetails(page, title) {
  const b = card(page, title).getByRole('button', { name: title, exact: true }).first()
  await b.focus()
  await page.keyboard.press('Enter')
  await page.locator('.ts-details-modal').waitFor()
}
