// Resilience: polling discipline and server outage.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { expect, requireBinaries, test, useServer } from '../fixtures/test'

requireBinaries()

test.describe('polling', () => {
  const s = useServer({ seed: true }, ['show'])

  test('polling is single-flight under a slow /torrents', async ({ page, tracker }) => {
    let inflight = 0
    let maxInflight = 0
    await page.route('**/torrents', async route => {
      inflight++
      maxInflight = Math.max(maxInflight, inflight)
      await new Promise(r => setTimeout(r, 2500))
      try {
        await route.continue()
      } catch {
        /* page closed */
      }
      inflight--
    })
    await page.goto(s.srv.base)
    // Several poll cycles must happen, otherwise the max proves nothing.
    await expect.poll(() => tracker.count('/torrents'), { timeout: 20_000 }).toBeGreaterThanOrEqual(3)
    expect(maxInflight, `concurrent /torrents requests: ${maxInflight}`).toBe(1)
  })

  test('hidden tab does not poll /torrents', async ({ page, tracker }) => {
    await page.goto(s.srv.base)
    await expect(page.locator('.torrent-card').first()).toBeVisible()
    // Emulate a hidden document.
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true })
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    // Absence check: settle in-flight requests, then watch a quiet window.
    await page.waitForTimeout(500)
    const n0 = tracker.count('/torrents')
    await page.waitForTimeout(4000)
    expect(tracker.count('/torrents') - n0, 'requests while hidden').toBeLessThanOrEqual(1)
  })
})

test.describe('server outage', () => {
  const s = useServer({ seed: true }, ['show'])

  test('UI survives a killed server: no page errors, no retry storm', async ({ page, tracker }) => {
    await page.goto(s.srv.base)
    await expect(page.locator('.torrent-card').first()).toBeVisible()
    s.srv.child.kill('SIGKILL')
    const t0 = Date.now()
    // Absence check over a fixed window against the dead server.
    await page.waitForTimeout(8000)
    const sent = tracker.count('/torrents', t0)
    expect(tracker.problems.filter(p => p.startsWith('pageerror'))).toEqual([])
    expect(sent, `${sent} /torrents requests in 8s against a dead server`).toBeLessThanOrEqual(20)
  })
})
