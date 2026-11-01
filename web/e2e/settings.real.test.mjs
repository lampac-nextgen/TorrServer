// Settings: API round trip, read-only mode, and the dialog.
// Real TorrServer binary + loopback seeder, no mocks. Build first: make e2e-real-build.
import { test, before, after, describe } from 'node:test'
import assert from 'node:assert/strict'
import { skip, startServer } from './real-server.mjs'
import { useBrowser, openPage, shot } from './real-browser.mjs'

useBrowser()

describe('settings API', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer()
  })
  after(() => srv?.stop())

  test('settings: round trip, floats rejected, nil sets 400, CacheSize 0 -> 64MiB', async () => {
    const cur = await (await srv.api('/settings', { action: 'get' })).json()
    assert.equal(cur.StoreViewedInJson, false)
    let r = await srv.api('/settings', { action: 'set', sets: { ...cur, ReaderReadAHead: 80, CacheSize: 128 << 20 } })
    assert.equal(r.status, 200)
    let now = await (await srv.api('/settings', { action: 'get' })).json()
    assert.equal(now.ReaderReadAHead, 80)
    assert.equal(now.CacheSize, 128 << 20)

    r = await srv.api('/settings', { action: 'set' })
    assert.equal(r.status, 400, 'nil sets')

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, ConnectionsLimit: 25.5 } })
    assert.equal(r.status, 400, 'float into int')
    now = await (await srv.api('/settings', { action: 'get' })).json()
    assert.equal(now.ConnectionsLimit, 25, 'rejected body must not partially apply')

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, CacheSize: 0 } })
    assert.equal(r.status, 200)
    now = await (await srv.api('/settings', { action: 'get' })).json()
    assert.equal(now.CacheSize, 64 << 20)

    r = await srv.api('/settings', { action: 'set', sets: { ...cur, ReaderReadAHead: 1000, PreloadCache: -5 } })
    assert.ok(r.status === 200 || r.status === 400)
    now = await (await srv.api('/settings', { action: 'get' })).json()
    assert.ok(now.ReaderReadAHead >= 5 && now.ReaderReadAHead <= 100, `ReaderReadAHead ${now.ReaderReadAHead}`)
    assert.ok(now.PreloadCache >= 0 && now.PreloadCache <= 100, `PreloadCache ${now.PreloadCache}`)

    r = await srv.api('/settings', { action: 'nope' })
    assert.equal(r.status, 400)
    await srv.api('/settings', { action: 'set', sets: cur })
  })

  test('storage settings round trip', async () => {
    const r = await srv.api('/storage/settings')
    assert.equal(r.status, 200)
    const j = await r.json()
    assert.ok('settings' in j || 'viewed' in j, JSON.stringify(j))
  })
})

describe('settings dialog', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer()
  })
  after(() => srv?.stop())

  test('save round-trips and persists across reload', async () => {
    const { context, page, problems } = await openPage(srv)
    await page.goto(srv.base)
    await page.getByRole('button', { name: 'Settings' }).first().click()
    const dlg = page.getByRole('dialog')
    await dlg.waitFor()
    const save = dlg.getByRole('button', { name: /^Save$/i })
    await save.waitFor()
    await page.waitForFunction(() => {
      const b = [...document.querySelectorAll('[role=dialog] button')].find(x => /^save$/i.test(x.innerText.trim()))
      return b && !b.disabled
    })
    const before = await (await srv.api('/settings', { action: 'get' })).json()
    await save.click()
    await page.waitForTimeout(5000)
    const after = await (await srv.api('/settings', { action: 'get' })).json()
    assert.deepEqual(after, before, 'saving untouched settings must not change them')
    assert.deepEqual(
      problems.filter(p => !/favicon/.test(p)),
      [],
    )
    await shot(page, 'settings')
    await context.close()
  })
})

describe('read-only server', { skip }, () => {
  let srv
  before(async () => {
    srv = await startServer({ readonly: true })
  })
  after(() => srv?.stop())

  test('settings set/def are 403 Read-only; get works', async () => {
    assert.equal((await srv.api('/settings', { action: 'get' })).status, 200)
    for (const a of ['set', 'def']) {
      const r = await srv.api('/settings', { action: a, sets: {} })
      assert.equal(r.status, 403, a)
      assert.deepEqual(await r.json(), { error: 'Read-only mode' })
    }
  })

  test('library loads and Settings does not offer a working save', async () => {
    const { context, page } = await openPage(srv)
    await page.goto(srv.base)
    await page.getByRole('button', { name: 'Settings' }).first().click()
    const dlg = page.getByRole('dialog')
    await dlg.waitFor()
    await page.waitForTimeout(1500)
    await shot(page, 'readonly-settings')
    const save = dlg.getByRole('button', { name: /^Save$/i })
    const disabled = await save.isDisabled().catch(() => true)
    if (!disabled) {
      await save.click()
      await page.waitForTimeout(800)
      await page.waitForTimeout(500)
      await shot(page, 'readonly-after-save')
      assert.match(await page.locator('body').innerText(), /read-only/i, 'a 403 must be explained')
    }
    await context.close()
  })
})
