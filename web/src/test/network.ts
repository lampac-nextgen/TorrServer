import axios, { type AxiosAdapter, type InternalAxiosRequestConfig } from 'axios'
import { vi } from 'vitest'

export interface MockRequest {
  method: string
  url: string
  /** Parsed JSON body (axios) or the raw string/undefined (fetch). */
  body: unknown
  signal?: AbortSignal | null
  headers?: Record<string, string>
}

/** Return a value to answer with JSON 200, `{ status, data }` for another status, or `undefined` for 404. */
export type MockReply = unknown | { status: number; data?: unknown }
export type MockHandler = (req: MockRequest) => MockReply | Promise<MockReply>

const isStatusReply = (reply: unknown): reply is { status: number; data?: unknown } =>
  typeof reply === 'object' &&
  reply != null &&
  'status' in reply &&
  typeof (reply as { status: unknown }).status === 'number'

export interface NetworkMock {
  /** Every request seen, axios and fetch alike, in order. */
  requests: MockRequest[]
  restore: () => void
}

const parseBody = (raw: unknown): unknown => {
  if (typeof raw !== 'string') return raw
  try {
    return JSON.parse(raw)
  } catch {
    return raw
  }
}

/**
 * Routes axios (via a custom adapter, so real axios code runs) and `fetch` (via `vi.stubGlobal`)
 * through one handler. No test reaches a real server.
 */
export function mockNetwork(handler: MockHandler): NetworkMock {
  const requests: MockRequest[] = []
  const previousAdapter = axios.defaults.adapter

  const adapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
    const req: MockRequest = {
      method: (config.method || 'get').toUpperCase(),
      url: axios.getUri(config),
      body: parseBody(config.data),
      signal: config.signal as AbortSignal | undefined,
    }
    requests.push(req)
    if (req.signal?.aborted) throw new axios.CanceledError('canceled', config)
    const reply = await handler(req)
    const status = isStatusReply(reply) ? reply.status : reply === undefined ? 404 : 200
    const data = isStatusReply(reply) ? reply.data : reply
    const response = {
      data,
      status,
      statusText: String(status),
      headers: {},
      config,
    }
    if (status >= 400) throw new axios.AxiosError(`status ${status}`, 'ERR_BAD_REQUEST', config, undefined, response)
    return response
  }
  axios.defaults.adapter = adapter

  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url
    const req: MockRequest = {
      method: (init?.method || 'GET').toUpperCase(),
      url,
      body: parseBody(init?.body),
      signal: init?.signal,
    }
    requests.push(req)
    const reply = await handler(req)
    const status = isStatusReply(reply) ? reply.status : reply === undefined ? 404 : 200
    const data = isStatusReply(reply) ? reply.data : reply
    return new Response(status === 204 || data === undefined ? null : JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  })
  vi.stubGlobal('fetch', fetchMock)

  return {
    requests,
    restore: () => {
      axios.defaults.adapter = previousAdapter
      vi.unstubAllGlobals()
    },
  }
}

/** Path + query of a request URL, without the origin. */
export const pathOf = (url: string): string => {
  const parsed = new URL(url, 'http://localhost')
  return `${parsed.pathname}${parsed.search}`
}
