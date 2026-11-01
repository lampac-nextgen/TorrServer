// @vitest-environment happy-dom
import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchTorznabCaps, searchRutor, searchTorznab } from './search'

vi.mock('axios', () => ({ default: { get: vi.fn() } }))

const get = vi.mocked(axios.get)

beforeEach(() => get.mockReset())

describe('searchTorznab', () => {
  it('sends only the query by default', async () => {
    get.mockResolvedValue({ data: [{ Title: 'a' }] })
    expect(await searchTorznab('matrix')).toEqual([{ Title: 'a' }])
    expect(get).toHaveBeenCalledWith(expect.stringContaining('/torznab/search'), {
      params: { query: 'matrix' },
      signal: undefined,
    })
  })

  it('adds index, category, positive offset/limit and the abort signal', async () => {
    get.mockResolvedValue({ data: [] })
    const signal = new AbortController().signal
    await searchTorznab('x', { index: 0, cat: '2000', offset: 20, limit: 10, signal })
    expect(get.mock.calls[0][1]).toEqual({
      params: { query: 'x', index: 0, cat: '2000', offset: 20, limit: 10 },
      signal,
    })
  })

  it('drops empty category and non-positive offset/limit', async () => {
    get.mockResolvedValue({ data: [] })
    await searchTorznab('x', { cat: '', offset: 0, limit: -1 })
    expect(get.mock.calls[0][1]).toMatchObject({ params: { query: 'x' } })
  })

  it('returns an empty list for a non-array body', async () => {
    get.mockResolvedValue({ data: { error: 'nope' } })
    expect(await searchTorznab('x')).toEqual([])
  })
})

describe('fetchTorznabCaps', () => {
  it('requests caps for an indexer index', async () => {
    get.mockResolvedValue({ data: { categories: [] } })
    const signal = new AbortController().signal
    expect(await fetchTorznabCaps(2, signal)).toEqual({ categories: [] })
    expect(get).toHaveBeenCalledWith(expect.stringContaining('/torznab/caps'), { params: { index: 2 }, signal })
  })
})

describe('searchRutor', () => {
  it('queries the built-in search and tolerates a non-array body', async () => {
    get.mockResolvedValueOnce({ data: [{ Title: 'r' }] })
    expect(await searchRutor('q')).toEqual([{ Title: 'r' }])
    expect(get.mock.calls[0][0]).toMatch(/\/search\/?$/)
    get.mockResolvedValueOnce({ data: null })
    expect(await searchRutor('q')).toEqual([])
  })
})
