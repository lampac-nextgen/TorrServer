// Auth gate: Basic auth, login form, WAF-free search, player URLs.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import { skip, startServer, addSeeded, waitReady } from './real-server.mjs'
import { useBrowser, openPage, shot, card, openDetails } from './real-browser.mjs'

useBrowser()

const creds = { user: 'ts', pass: 'p@ss:w/rd#1&x' }

describe('auth API', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ auth: creds, seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('API requires auth; /echo does not; XHR gets 401 without challenge', async () => {
    assert.equal((await fetch(srv.base + '/echo')).status, 200)
    for (const [p, body] of [
      ['/torrents', { action: 'list' }],
      ['/settings', { action: 'get' }],
      ['/cache', { action: 'get', hash: 'x' }],
    ]) {
      const r = await fetch(srv.base + p, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      })
      assert.equal(r.status, 401, p)
      assert.equal(r.headers.get('www-authenticate'), null, `${p} must not trigger the browser prompt`)
    }
    const bad = await fetch(srv.base + '/torrents', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from('ts:wrong').toString('base64') },
      body: '{"action":"list"}',
    })
    assert.equal(bad.status, 401)
    const ok = await srv.api('/torrents', { action: 'list' })
    assert.equal(ok.status, 200)
  })

  test('password with : / # authenticates', async () => {
    const r = await srv.api('/settings', { action: 'get' })
    assert.equal(r.status, 200)
  })

  test('stream URL with userinfo works; without auth is rejected', async () => {
    const h = srv.seed.show.hash
    // Design: /stream is outside the auth group and TestLink lets a known
    // infohash play without credentials (players cannot send Basic auth).
    const noauth = await fetch(`${srv.base}/stream/episode1.mkv?link=${h}&index=2&play`)
    assert.equal(noauth.status, 200, 'known hash plays anonymously')
    await noauth.arrayBuffer()
    const unk = await fetch(`${srv.base}/stream/x.mkv?link=${'1'.repeat(40)}&index=1&play`)
    assert.ok([401, 403].includes(unk.status), `unknown hash without auth -> ${unk.status}`)
    const mag = await fetch(
      `${srv.base}/stream/x.mkv?link=${encodeURIComponent('http://127.0.0.1:1/a.torrent')}&index=1&play`,
    )
    assert.ok([400, 401, 403].includes(mag.status), `remote .torrent URL without auth -> ${mag.status}`)
    const ok = await fetch(`${srv.base}/stream/episode1.mkv?link=${h}&index=2&play`, { headers: srv.headers() })
    assert.equal(ok.status, 200)
    await ok.arrayBuffer()
  })

  test('/search and /torznab need auth without -s', async () => {
    const r = await fetch(srv.base + '/torznab/caps')
    assert.ok([401, 403].includes(r.status), `${r.status}`)
  })

  test('shell and static assets stay public so the login form can render', async () => {
    assert.equal((await fetch(srv.base + '/')).status, 200)
    assert.equal((await fetch(srv.base + '/sw.js')).status, 200)
  })
})

describe('searchwa server', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ auth: { user: 'a', pass: 'b' }, searchwa: true })
  })
  after(() => srv?.stop())

  test('torznab caps are public with -s but settings are not', async () => {
    const caps = await fetch(srv.base + '/torznab/caps')
    assert.notEqual(caps.status, 401)
    const s = await fetch(srv.base + '/settings', { method: 'POST', body: '{"action":"get"}' })
    assert.equal(s.status, 401)
  })
})

describe('login form', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ auth: creds, seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('wrong password keeps the form, right password loads the library', async () => {
    const { context, page } = await openPage(srv)
    await page.goto(srv.base)
    const user = page.locator('input[name=username]')
    await user.waitFor()
    await user.fill('ts')
    await page.locator('input[name=password]').fill('nope')
    await page.getByRole('button', { name: /sign in/i }).click()
    await page.waitForTimeout(800)
    assert.ok(await page.locator('input[name=password]').isVisible(), 'form stays after a wrong password')
    await page.locator('input[name=password]').fill(creds.pass)
    await page.getByRole('button', { name: /sign in/i }).click()
    await card(page, 'Show').first().waitFor({ timeout: 15000 })
    await shot(page, 'auth-library')
    await context.close()
  })

  test('copied stream URL works for a player: credentials only for the page host', async () => {
    const { context, page } = await openPage(srv, { ctx: { permissions: ['clipboard-read', 'clipboard-write'] } })
    await page.goto(srv.base)
    await page.locator('input[name=username]').fill('ts')
    await page.locator('input[name=password]').fill(creds.pass)
    await page.getByRole('button', { name: /sign in/i }).click()
    await card(page, 'Show').first().waitFor({ timeout: 15000 })
    await openDetails(page, 'Show')
    await page.locator('.ts-details-modal').locator('button[aria-label="Copy URL"]').first().click()
    await page.waitForTimeout(300)
    const url = await page.evaluate(() => navigator.clipboard.readText())
    const u = new URL(url)
    assert.equal(u.hostname, '127.0.0.1')
    // The same URL as a player would use it, userinfo included.
    const headers = u.username
      ? {
          Authorization:
            'Basic ' +
            Buffer.from(`${decodeURIComponent(u.username)}:${decodeURIComponent(u.password)}`).toString('base64'),
        }
      : {}
    u.username = ''
    u.password = ''
    const r = await fetch(u, { headers })
    assert.equal(r.status, 200, `${url} (userinfo ${u.username ? 'present' : 'stripped'})`)
    await r.arrayBuffer()
    await context.close()
  })
})
