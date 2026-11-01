// Auth gate: Basic auth, login form, WAF-free search, player URLs.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { expect, requireBinaries, test, useServer } from '../fixtures/test'
import { openDetails, card, signIn } from '../fixtures/helpers'

requireBinaries()

const creds = { user: 'ts', pass: 'p@ss:w/rd#1&x' }

test.describe('auth API', () => {
  const s = useServer({ auth: creds, seed: true }, ['show'])

  test('API requires auth; /echo does not; XHR gets 401 without challenge', async () => {
    const { srv } = s
    expect((await fetch(srv.base + '/echo')).status).toBe(200)
    for (const [p, body] of [
      ['/torrents', { action: 'list' }],
      ['/settings', { action: 'get' }],
      ['/cache', { action: 'get', hash: 'x' }],
    ] as const) {
      const r = await fetch(srv.base + p, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      })
      expect(r.status, p).toBe(401)
      expect(r.headers.get('www-authenticate'), `${p} must not trigger the browser prompt`).toBeNull()
    }
    const bad = await fetch(srv.base + '/torrents', {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from('ts:wrong').toString('base64') },
      body: '{"action":"list"}',
    })
    expect(bad.status).toBe(401)
    expect((await srv.api('/torrents', { action: 'list' })).status).toBe(200)
  })

  test('password with : / # authenticates', async () => {
    expect((await s.srv.api('/settings', { action: 'get' })).status).toBe(200)
  })

  test('stream URL with userinfo works; without auth is rejected', async () => {
    const { srv } = s
    const h = srv.seed.show.hash
    // Design: /stream is outside the auth group and TestLink lets a known
    // infohash play without credentials (players cannot send Basic auth).
    const noauth = await fetch(`${srv.base}/stream/episode1.mkv?link=${h}&index=2&play`)
    expect(noauth.status, 'known hash plays anonymously').toBe(200)
    await noauth.arrayBuffer()
    const unk = await fetch(`${srv.base}/stream/x.mkv?link=${'1'.repeat(40)}&index=1&play`)
    expect([401, 403], `unknown hash without auth -> ${unk.status}`).toContain(unk.status)
    const mag = await fetch(
      `${srv.base}/stream/x.mkv?link=${encodeURIComponent('http://127.0.0.1:1/a.torrent')}&index=1&play`,
    )
    expect([400, 401, 403], `remote .torrent URL without auth -> ${mag.status}`).toContain(mag.status)
    const ok = await fetch(`${srv.base}/stream/episode1.mkv?link=${h}&index=2&play`, { headers: srv.headers() })
    expect(ok.status).toBe(200)
    await ok.arrayBuffer()
  })

  test('/search and /torznab need auth without -s', async () => {
    const r = await fetch(s.srv.base + '/torznab/caps')
    expect([401, 403]).toContain(r.status)
  })

  test('shell and static assets stay public so the login form can render', async () => {
    expect((await fetch(s.srv.base + '/')).status).toBe(200)
    expect((await fetch(s.srv.base + '/sw.js')).status).toBe(200)
  })
})

test.describe('searchwa server', () => {
  const s = useServer({ auth: { user: 'a', pass: 'b' }, searchwa: true })

  test('torznab caps are public with -s but settings are not', async () => {
    const caps = await fetch(s.srv.base + '/torznab/caps')
    expect(caps.status).not.toBe(401)
    const settings = await fetch(s.srv.base + '/settings', { method: 'POST', body: '{"action":"get"}' })
    expect(settings.status).toBe(401)
  })
})

test.describe('login form', () => {
  const s = useServer({ auth: creds, seed: true }, ['show'])

  test('wrong password keeps the form, right password loads the library', async ({ page }) => {
    await page.goto(s.srv.base)
    await expect(page.locator('input[name=username]')).toBeVisible()
    await page.locator('input[name=username]').fill('ts')
    await page.locator('input[name=password]').fill('nope')
    const rejected = page.waitForResponse(r => r.status() === 401 && new URL(r.url()).pathname === '/torrents')
    await page.getByRole('button', { name: /sign in/i }).click()
    await rejected
    await expect(page.locator('input[name=password]'), 'form stays after a wrong password').toBeVisible()
    await page.locator('input[name=password]').fill(creds.pass)
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(card(page, 'Show').first()).toBeVisible()
  })

  test.describe('clipboard', () => {
    test.use({ permissions: ['clipboard-read', 'clipboard-write'] })

    test('copied stream URL works for a player: credentials only for the page host', async ({ page }) => {
      await page.goto(s.srv.base)
      await signIn(page, creds.user, creds.pass)
      await expect(card(page, 'Show').first()).toBeVisible()
      await openDetails(page, 'Show')
      await page.locator('.ts-details-modal').locator('button[aria-label="Copy URL"]').first().click()
      await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toMatch(/^http/)
      const url = await page.evaluate(() => navigator.clipboard.readText())
      const u = new URL(url)
      expect(u.hostname).toBe('127.0.0.1')
      // The same URL as a player would use it, userinfo included.
      const headers: Record<string, string> = u.username
        ? {
            Authorization:
              'Basic ' +
              Buffer.from(`${decodeURIComponent(u.username)}:${decodeURIComponent(u.password)}`).toString('base64'),
          }
        : {}
      const hadUserinfo = !!u.username
      u.username = ''
      u.password = ''
      const r = await fetch(u, { headers })
      expect(r.status, `${url} (userinfo ${hadUserinfo ? 'present' : 'stripped'})`).toBe(200)
      await r.arrayBuffer()
    })
  })
})
