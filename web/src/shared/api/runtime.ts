import axios from 'axios'

import { runtimeStatusHost } from 'shared/api/hosts'

export interface RuntimeStatus {
  dlna_enabled?: boolean
  bonjour_enabled?: boolean
  friendly_name?: string
  webdav_enabled?: boolean
  webdav_path?: string
  fuse_path?: string
  fuse_enabled?: boolean
}

export const getRuntimeStatus = async (signal?: AbortSignal): Promise<RuntimeStatus> => {
  const { data } = await axios.get<RuntimeStatus>(runtimeStatusHost(), { signal })
  return data
}
