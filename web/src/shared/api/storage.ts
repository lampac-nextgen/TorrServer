import axios from 'axios'

import { storageSettingsHost } from 'shared/api/hosts'

export type StorageBackend = 'json' | 'bbolt'

export interface StorageSettings {
  settings: StorageBackend
  viewed: StorageBackend
}

export const defaultStorageSettings = (): StorageSettings => ({
  settings: 'json',
  viewed: 'bbolt',
})

export const getStorageSettings = async (signal?: AbortSignal): Promise<StorageSettings> => {
  const { data } = await axios.get<Partial<StorageSettings>>(storageSettingsHost(), { signal })
  return {
    settings: data.settings === 'bbolt' ? 'bbolt' : 'json',
    viewed: data.viewed === 'json' ? 'json' : 'bbolt',
  }
}

export const setStorageSettings = async (prefs: StorageSettings): Promise<void> => {
  const { data } = await axios.post<{ status?: string; error?: string }>(storageSettingsHost(), prefs)
  if (data?.error) throw new Error(data.error)
  if (data?.status && data.status !== 'ok') throw new Error(data.status)
}
