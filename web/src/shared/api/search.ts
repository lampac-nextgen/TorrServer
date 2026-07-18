import axios from 'axios'

import type { SearchResultItem } from 'shared/api/types'
import { searchHost, torznabSearchHost } from 'shared/api/hosts'

export type { SearchResultItem }

export const searchTorznab = async (
  query: string,
  index?: number,
  signal?: AbortSignal,
): Promise<SearchResultItem[]> => {
  const params: { query: string; index?: number } = { query }
  if (index != null) params.index = index
  const { data } = await axios.get<SearchResultItem[]>(torznabSearchHost(), { params, signal })
  return Array.isArray(data) ? data : []
}

export const searchRutor = async (query: string, signal?: AbortSignal): Promise<SearchResultItem[]> => {
  const { data } = await axios.get<SearchResultItem[]>(searchHost(), { params: { query }, signal })
  return Array.isArray(data) ? data : []
}
