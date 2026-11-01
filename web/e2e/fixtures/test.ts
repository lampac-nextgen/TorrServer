import { test as base, expect } from '@playwright/test'

import { MISSING_BINARIES, addAndWait, binariesReady, startServer, type ServerOpts, type Srv } from './server'

export interface RequestLog {
  t: number
  m: string
  url: string
  post: string | null
}

export interface Tracker {
  /** console.error, pageerror, failed requests and 4xx/5xx responses (favicon excluded). */
  problems: string[]
  requests: RequestLog[]
  /** Count of requests whose pathname ends with `suffix`, optionally since `since` (ms epoch). */
  count(suffix: string, since?: number): number
}

/** `@playwright/test` with a `tracker` fixture that records page problems and requests. */
export const test = base.extend<{ tracker: Tracker }>({
  tracker: async ({ page }, use) => {
    const problems: string[] = []
    const requests: RequestLog[] = []
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
    page.on('request', r => requests.push({ t: Date.now(), m: r.method(), url: r.url(), post: r.postData() }))
    const tracker: Tracker = {
      get problems() {
        return problems.filter(p => !/favicon/.test(p))
      },
      requests,
      count: (suffix, since = 0) =>
        requests.filter(r => r.t >= since && new URL(r.url).pathname.endsWith(suffix)).length,
    }
    await use(tracker)
  },
})

export { expect }

/**
 * One server (plus optional seeded torrents) shared by the tests of the enclosing describe.
 * Call inside `test.describe`; the describe runs serially because the tests build on each other.
 */
export function useServer(opts: ServerOpts = {}, profiles: string[] = [], readyMs = 30000): { readonly srv: Srv } {
  test.describe.configure({ mode: 'serial' })
  const holder: { srv?: Srv } = {}
  test.beforeAll(async () => {
    holder.srv = await startServer(opts)
    await addAndWait(holder.srv, profiles, readyMs)
  })
  test.afterAll(async () => {
    await holder.srv?.stop()
  })
  return {
    get srv() {
      return holder.srv as Srv
    },
  }
}

/** Skip the whole file unless the e2e binaries were built. */
export function requireBinaries(): void {
  test.skip(!binariesReady(), MISSING_BINARIES)
}

/** Server log must not contain a panic, fatal error or data race. */
export function expectCleanLog(srv: Srv): void {
  expect(srv.log()).not.toMatch(/panic:|fatal error|DATA RACE/)
}
