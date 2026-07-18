import axios from 'axios'

import type { BTSets } from 'shared/api/types'
import { settingsHost } from 'shared/api/hosts'

export const SETTINGS_QUERY_KEY = ['settings'] as const

export const getSettings = async (signal?: AbortSignal): Promise<BTSets> => {
  const { data } = await axios.post<BTSets>(settingsHost(), { action: 'get' }, { signal })
  return data
}

export const setSettings = async (sets: BTSets): Promise<void> => {
  await axios.post(settingsHost(), { action: 'set', sets })
}
