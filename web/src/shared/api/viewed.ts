import axios from 'axios'

import type { ViewedFileEntry } from 'shared/api/types'
import { viewedHost } from 'shared/api/hosts'

export const listViewedFiles = async (hash: string): Promise<number[] | undefined> => {
  const { data } = await axios.post<ViewedFileEntry[] | null>(viewedHost(), { action: 'list', hash })
  if (!data) return undefined
  return data.map(itm => itm.file_index).sort((a, b) => a - b)
}

export const clearViewedFiles = async (hash: string): Promise<void> => {
  await axios.post(viewedHost(), { action: 'rem', hash, file_index: -1 })
}

export const setViewedFile = async (hash: string, fileIndex: number): Promise<void> => {
  await axios.post(viewedHost(), { action: 'set', hash, file_index: fileIndex })
}
