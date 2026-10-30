import { vi } from 'vitest'

/**
 * Fake `axios` default export for `vi.mock('axios', ...)`. Component tests route requests by
 * `METHOD /path` with `routeApi`; an unrouted request fails loudly so no test reaches a network.
 *
 *   vi.mock('axios', async () => (await import('test/mockApi')).axiosModule)
 */
export interface FakeRequest {
  method: 'GET' | 'POST'
  url: string
  path: string
  body: unknown
}
export type FakeHandler = (req: FakeRequest) => unknown | Promise<unknown>

export const axiosMock = {
  get: vi.fn(),
  post: vi.fn(),
  defaults: { headers: { common: {} as Record<string, string> } },
  isCancel: (e: unknown) => (e as { code?: string })?.code === 'ERR_CANCELED',
  isAxiosError: (e: unknown) => (e as { isAxiosError?: boolean })?.isAxiosError === true,
}
export const axiosModule = { default: axiosMock }

/** An error shaped like axios's, so `axios.isAxiosError` and `response.status` work. */
export const axiosError = (status: number, data: unknown = {}, message = `Request failed with status code ${status}`) =>
  Object.assign(new Error(message), {
    isAxiosError: true,
    response: { status, data },
  })

const pathOf = (url: string) => new URL(url, 'http://localhost').pathname

/** Calls recorded for `METHOD /path` (axios or fetch). */
export const calls: FakeRequest[] = []

/** Install route handlers. Return a value for `{data}`, or throw (e.g. `axiosError(403)`) to reject. */
export function routeApi(routes: Record<string, FakeHandler | unknown>) {
  calls.length = 0
  const handle = async (method: 'GET' | 'POST', url: string, body?: unknown) => {
    const path = pathOf(url)
    const req: FakeRequest = { method, url, path, body }
    calls.push(req)
    const route = routes[`${method} ${path}`]
    if (route === undefined) throw new Error(`unrouted request: ${method} ${path}`)
    return typeof route === 'function' ? (route as FakeHandler)(req) : route
  }
  axiosMock.get.mockImplementation(async (url: string) => ({
    data: await handle('GET', url),
  }))
  axiosMock.post.mockImplementation(async (url: string, body: unknown) => ({
    data: await handle('POST', url, body),
  }))
  // fetch (authFetch) goes through the same table; a thrown error becomes a network failure.
  const fetchFake = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const method = (init?.method || 'GET').toUpperCase() as 'GET' | 'POST'
    let body: unknown = init?.body
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        /* keep raw */
      }
    }
    const data = await handle(method, String(input), body)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  })
  vi.stubGlobal('fetch', fetchFake)
  return fetchFake
}

/** Bodies of all `POST path` calls, in order. */
export const postBodies = (path: string) => calls.filter(c => c.method === 'POST' && c.path === path).map(c => c.body)
export const callsTo = (method: 'GET' | 'POST', path: string) =>
  calls.filter(c => c.method === method && c.path === path)
