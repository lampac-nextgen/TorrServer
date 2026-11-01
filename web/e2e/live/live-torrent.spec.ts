/**
 * Live torrent / stream / ffp checks.
 *
 *   LIVE=1 TORRSERVER_URL=http://127.0.0.1:18091 TS_USER=ts TS_PASS=ts yarn test:e2e:live
 *
 * JacRed in tests: https://jacred.stream (Jackett path, apikey pp).
 */
import { expect, test } from '@playwright/test'

import { JAC_RED_HOST, JAC_RED_KEY, JAC_RED_NAME, SEARCH_QUERIES } from '../fixtures/indexers'

const BASE = process.env.TORRSERVER_URL || ''
const USER = process.env.TS_USER || 'ts'
const PASS = process.env.TS_PASS || 'ts'
const HASH = (process.env.LIVE_TORRENT_HASH || 'b0e4e3cf193431debd67b54ad7936356c0e5c6a7').toLowerCase()
const live = process.env.LIVE === '1' && BASE !== ''

function authHeader() {
  return 'Basic ' + Buffer.from(`${USER}:${PASS}`).toString('base64')
}

async function api(
  path: string,
  { method = 'GET', json, headers = {} }: { method?: string; json?: unknown; headers?: Record<string, string> } = {},
) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
      ...(json ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: json ? JSON.stringify(json) : undefined,
  })
  return res
}

test.skip(!live, 'set LIVE=1 TORRSERVER_URL=http://127.0.0.1:PORT')

test('live echo is NextGen', async () => {
  const testInfo = test.info()
  testInfo.setTimeout(15_000)
  const res = await api('/echo')
  const body = await res.text()
  expect(res.status).toBe(200)
  expect(body).toMatch(/(NextGen|MatriX)/)
})

test('live torrent get/add + stream stat + play range + ffp', async () => {
  const testInfo = test.info()
  testInfo.setTimeout(180_000)

  const got = await api('/torrents', { method: 'POST', json: { action: 'get', hash: HASH } })
  if (got.status !== 200) {
    const add = await api('/torrents', {
      method: 'POST',
      json: { action: 'add', link: HASH, save_to_db: true, title: 'live-e2e' },
    })
    expect(add.status, `add torrent failed: ${add.status} ${await add.text()}`).toBe(200)
  }

  let torrent
  const deadline = Date.now() + 120_000
  while (Date.now() < deadline) {
    const statRes = await fetch(`${BASE}/stream?link=${HASH}&stat`, {
      headers: { Authorization: authHeader(), Accept: 'application/json' },
    })
    if (statRes.ok) {
      torrent = await statRes.json()
      const files = torrent.file_stats || torrent.FileStats || []
      if (files.length > 0 && torrent.stat !== 1) break
    }
    await new Promise(r => setTimeout(r, 2000))
  }
  expect(torrent, 'no stream?stat payload').toBeTruthy()
  const files = torrent.file_stats || []
  expect(files.length, `no file_stats: ${JSON.stringify(torrent).slice(0, 400)}`).toBeGreaterThan(0)
  const fileId = files[0].id ?? files[0].Id ?? 1

  const play = await fetch(`${BASE}/stream?link=${HASH}&index=${fileId}&play`, {
    headers: { Authorization: authHeader(), Range: 'bytes=0-1023' },
  })
  const playStatus = play.status
  const buf = Buffer.from(await play.arrayBuffer())
  expect([200, 206], `play status ${playStatus}`).toContain(playStatus)
  expect(buf.length, 'empty play body').toBeGreaterThan(0)

  const ffp = await api(`/ffp/${HASH}/${fileId}`)
  const ffpStatus = ffp.status
  const ffpText = await ffp.text()
  if (ffpStatus === 200) {
    const probe = JSON.parse(ffpText) as { format?: unknown; streams?: unknown }
    expect(probe.format || probe.streams, `ffp json missing format/streams: ${ffpText.slice(0, 200)}`).toBeTruthy()
  } else {
    testInfo.annotations.push({ type: 'ffp', description: `non-200: ${ffpStatus} ${ffpText.slice(0, 200)}` })
  }
})

test('live torznab searches (матрица 1999 / matrix 1999)', async () => {
  const testInfo = test.info()
  testInfo.setTimeout(180_000)
  const setsRes = await api('/settings', { method: 'POST', json: { action: 'get' } })
  expect(setsRes.status).toBe(200)
  const prev = await setsRes.json()

  const urls = [{ Host: JAC_RED_HOST, Key: JAC_RED_KEY, Name: JAC_RED_NAME, CatType: 'all' }]
  const setRes = await api('/settings', {
    method: 'POST',
    json: { action: 'set', sets: { ...prev, EnableTorznabSearch: true, TorznabUrls: urls } },
  })
  expect(setRes.status, await setRes.text()).toBe(200)

  for (const q of SEARCH_QUERIES) {
    const search = await api(`/torznab/search/?query=${encodeURIComponent(q)}`)
    const searchStatus = search.status
    const body = await search.text()
    expect(searchStatus, `${q}: ${searchStatus} ${body.slice(0, 200)}`).toBe(200)
    const parsed = JSON.parse(body)
    expect(Array.isArray(parsed), `${q}: not a JSON array`).toBe(true)
    expect(parsed.length, `${q}: expected hits`).toBeGreaterThan(0)
    testInfo.annotations.push({ type: 'hits', description: `${q}: ${parsed.length}` })
    await new Promise(r => setTimeout(r, 400))
  }
})

test('live Playwright library card for hash', async ({ page }) => {
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30_000 })
  const userBox = page.locator('input[name="username"]')
  await expect(userBox.or(page.locator('.torrent-card').first())).toBeVisible({ timeout: 20_000 })
  if (await userBox.isVisible()) {
    await userBox.fill(USER)
    await page.locator('input[name="password"]').fill(PASS)
    await page.getByRole('button', { name: /sign in|войти/i }).click()
  }
  await expect(page.locator(`.torrent-card[data-hash="${HASH}" i]`)).toBeVisible({ timeout: 30_000 })
})
