import { useEffect, useState, type ReactNode } from 'react'
import axios from 'axios'
import { Spinner } from '@heroui/react'

import {
  applyAuthToAxios,
  clearCredentials,
  getAuthorizationHeader,
  getStoredCredentials,
} from 'shared/api/authCredentials'
import { torrentsHost } from 'shared/api/hosts'

import LoginScreen from './LoginScreen'

type GateState = 'loading' | 'login' | 'ready'

const spaHeaders = {
  Accept: 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
} as const

async function postTorrentsList(authorization?: string) {
  const hadDefault = axios.defaults.headers.common.Authorization
  try {
    if (!authorization) delete axios.defaults.headers.common.Authorization
    return await axios.post(
      torrentsHost(),
      { action: 'list' },
      {
        headers: authorization ? { ...spaHeaders, Authorization: authorization } : { ...spaHeaders },
        validateStatus: status => status === 200 || status === 401 || status === 403,
      },
    )
  } finally {
    if (hadDefault) axios.defaults.headers.common.Authorization = hadDefault as string
    else applyAuthToAxios()
  }
}

async function checkServerRequiresAuth(): Promise<'ok' | 'auth' | 'error'> {
  try {
    const response = await postTorrentsList()
    if (response.status === 401 || response.status === 403) return 'auth'
    return 'ok'
  } catch {
    return 'error'
  }
}

async function validateStoredCredentials(): Promise<boolean> {
  const header = getAuthorizationHeader()
  if (!header) return false
  try {
    const response = await postTorrentsList(header)
    return response.status === 200
  } catch {
    return false
  }
}

export interface AuthGateProps {
  children: ReactNode
}

/**
 * When `--httpauth` + accs.db are active, show LoginScreen until Basic credentials work.
 * Third-party API clients are unaffected (they send Authorization themselves).
 */
export default function AuthGate({ children }: AuthGateProps) {
  const [state, setState] = useState<GateState>('loading')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      applyAuthToAxios()

      if (getStoredCredentials()) {
        const valid = await validateStoredCredentials()
        if (cancelled) return
        if (valid) {
          setState('ready')
          return
        }
        clearCredentials()
        applyAuthToAxios()
      }

      const result = await checkServerRequiresAuth()
      if (cancelled) return
      setState(result === 'auth' ? 'login' : 'ready')
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (state === 'loading') {
    return (
      <div className='grid min-h-dvh place-items-center bg-background'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (state === 'login') {
    return (
      <LoginScreen
        onSuccess={() => {
          applyAuthToAxios()
          setState('ready')
        }}
      />
    )
  }

  return children
}
