// Resilience: polling discipline and server outage.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import { skip, startServer, addSeeded, waitReady } from './real-server.mjs'
import { useBrowser, openPage, shot } from './real-browser.mjs'

useBrowser()

describe('polling', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('polling is single-flight under a slow /torrents', async () => {
    const { context, page } = await openPage(srv)
    let inflight = 0,
      maxInflight = 0
    await page.route('**/torrents', async route => {
      inflight++
      maxInflight = Math.max(maxInflight, inflight)
      await new Promise(r => setTimeout(r, 2500))
      try {
        await route.continue()
      } catch {}
      inflight--
    })
    await page.goto(srv.base)
    await page.waitForTimeout(9000)
    assert.equal(maxInflight, 1, `concurrent /torrents requests: ${maxInflight}`)
    await context.close()
  })

  test('hidden tab does not poll /torrents', async () => {
    const { context, page, requests } = await openPage(srv)
    await page.goto(srv.base)
    await page.locator('.torrent-card').first().waitFor()
    // Emulate a hidden document.
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    await page.waitForTimeout(500)
    const n0 = requests.filter(r => /\/torrents$/.test(new URL(r.url).pathname)).length
    await page.waitForTimeout(4000)
    const n1 = requests.filter(r => /\/torrents$/.test(new URL(r.url).pathname)).length
    assert.ok(n1 - n0 <= 1, `${n1 - n0} /torrents requests while hidden`)
    await context.close()
  })
})

describe('server outage', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ seed: true })
    await addSeeded(srv, 'show')
    await waitReady(srv, srv.seed.show.hash)
  })
  after(() => srv?.stop())

  test('UI survives a killed server: no page errors, no retry storm', async () => {
    const { context, page, problems, requests } = await openPage(srv)
    await page.goto(srv.base)
    await page.locator('.torrent-card').first().waitFor()
    srv.child.kill('SIGKILL')
    const t0 = Date.now()
    await page.waitForTimeout(8000)
    const sent = requests.filter(r => r.t >= t0 && /\/torrents$/.test(new URL(r.url).pathname)).length
    await shot(page, 'outage')
    assert.deepEqual(
      problems.filter(p => p.startsWith('pageerror')),
      [],
    )
    assert.ok(sent <= 20, `${sent} /torrents requests in 8s against a dead server`)
    await context.close()
  })
})
