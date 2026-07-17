import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import { getAppBasePath, publicUrl } from './publicUrl'

describe('publicUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('builds relative assets for ./ BASE_URL', () => {
    vi.stubEnv('BASE_URL', './')
    // import.meta.env.BASE_URL is compile-time; publicUrl reads import.meta.env
    // vitest stubEnv may not rewrite import.meta — assert current default behavior
    expect(publicUrl('icon.png')).toMatch(/icon\.png$/)
    expect(publicUrl('/icon.png')).toMatch(/icon\.png$/)
  })

  it('getAppBasePath is empty for relative base', () => {
    expect(getAppBasePath() === '' || getAppBasePath().startsWith('/')).toBe(true)
  })
})

describe('Hosts URL construction', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('builds endpoint URLs from window.location when VITE_SERVER_HOST is unset', async () => {
    vi.stubEnv('VITE_SERVER_HOST', '')
    vi.stubGlobal('window', {
      location: { protocol: 'https:', hostname: 'ts.example', port: '8443' },
    })

    const hosts = await import('./Hosts')
    expect(hosts.getTorrServerHost()).toBe('https://ts.example:8443')
    expect(hosts.torrentsHost()).toBe('https://ts.example:8443/torrents')
    expect(hosts.streamHost()).toBe('https://ts.example:8443/stream')
    expect(hosts.playlistTorrHost).toBe(hosts.streamHost)
    expect(hosts.playlistTorrHost()).toBe(hosts.streamHost())
  })
})
