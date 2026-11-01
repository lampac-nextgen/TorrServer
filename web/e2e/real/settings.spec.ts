// Settings: API round trip, read-only mode, and the dialog.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { expect, requireBinaries, test, useServer } from '../fixtures/test'

requireBinaries()

type Sets = Record<string, number | boolean | string | unknown>

test.describe('settings API', () => {
  const s = useServer()
  const get = async () => (await (await s.srv.api('/settings', { action: 'get' })).json()) as Sets

  test('round trip, floats rejected, nil sets 400, CacheSize 0 -> 64MiB', async () => {
    const { srv } = s
    const cur = await get()
    expect(cur.StoreViewedInJson).toBe(false)
    let r = await srv.api('/settings', { action: 'set', sets: { ...cur, ReaderReadAHead: 80, CacheSize: 128 << 20 } })
    expect(r.status).toBe(200)
    let now = await get()
    expect(now.ReaderReadAHead).toBe(80)
    expect(now.CacheSize).toBe(128 << 20)

    r = await srv.api('/settings', { action: 'set' })
    expect(r.status, 'nil sets').toBe(400)

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, ConnectionsLimit: 25.5 } })
    expect(r.status, 'float into int').toBe(400)
    now = await get()
    expect(now.ConnectionsLimit, 'rejected body must not partially apply').toBe(25)

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, CacheSize: 0 } })
    expect(r.status).toBe(200)
    now = await get()
    expect(now.CacheSize).toBe(64 << 20)

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, ReaderReadAHead: 1000, PreloadCache: -5 } })
    expect([200, 400]).toContain(r.status)
    now = await get()
    expect(now.ReaderReadAHead as number).toBeGreaterThanOrEqual(5)
    expect(now.ReaderReadAHead as number).toBeLessThanOrEqual(100)
    expect(now.PreloadCache as number).toBeGreaterThanOrEqual(0)
    expect(now.PreloadCache as number).toBeLessThanOrEqual(100)

    r = await srv.api('/settings', { action: 'nope' })
    expect(r.status).toBe(400)
    await srv.api('/settings', { action: 'set', sets: cur })
  })

  test('storage settings round trip', async () => {
    const r = await s.srv.api('/storage/settings')
    expect(r.status).toBe(200)
    const j = (await r.json()) as object
    expect('settings' in j || 'viewed' in j, JSON.stringify(j)).toBe(true)
  })
})

test.describe('settings dialog', () => {
  const s = useServer()

  test('save round-trips and persists across reload', async ({ page, tracker }) => {
    await page.goto(s.srv.base)
    await page.getByRole('button', { name: 'Settings' }).first().click()
    const dlg = page.getByRole('dialog')
    await expect(dlg).toBeVisible()
    const save = dlg.getByRole('button', { name: /^Save$/i })
    await expect(save).toBeEnabled()
    const before = await (await s.srv.api('/settings', { action: 'get' })).json()
    const saved = page.waitForResponse(
      r => new URL(r.url()).pathname === '/settings' && r.request().postData()?.includes('"set"') === true,
    )
    await save.click()
    expect((await saved).status()).toBe(200)
    expect(
      await (await s.srv.api('/settings', { action: 'get' })).json(),
      'saving untouched settings must not change them',
    ).toEqual(before)
    expect(tracker.problems).toEqual([])
  })
})

test.describe('read-only server', () => {
  const s = useServer({ readonly: true })

  test('settings set/def are 403 Read-only; get works', async () => {
    expect((await s.srv.api('/settings', { action: 'get' })).status).toBe(200)
    for (const a of ['set', 'def']) {
      const r = await s.srv.api('/settings', { action: a, sets: {} })
      expect(r.status, a).toBe(403)
      expect(await r.json()).toEqual({ error: 'Read-only mode' })
    }
  })

  test('library loads and Settings does not offer a working save', async ({ page }) => {
    await page.goto(s.srv.base)
    await page.getByRole('button', { name: 'Settings' }).first().click()
    const dlg = page.getByRole('dialog')
    await expect(dlg).toBeVisible()
    const save = dlg.getByRole('button', { name: /^Save$/i })
    // Either Save is disabled, or clicking it must explain the 403.
    await page.waitForLoadState('networkidle')
    if (await save.isEnabled().catch(() => false)) {
      await save.click()
      await expect(page.locator('body')).toContainText(/read-only/i)
    }
  })
})
