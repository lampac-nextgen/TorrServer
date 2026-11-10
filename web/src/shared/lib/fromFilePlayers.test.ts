// @vitest-environment happy-dom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
vi.mock('shared/lib/platform', () => ({
  detectStandaloneApp: () => false,
  isAppleDevice: () => true,
  isMacOS: () => true,
  playerLinkPlatform: () => ({}),
}))

describe('useExternalPlayers().buildFromFilePlayers', () => {
  beforeEach(() => {
    localStorage.clear()
    for (const key of ['isVlcUsed', 'isInfuseUsed', 'isIinaUsed', 'isSenPlayerUsed', 'isVidHubUsed'])
      localStorage.setItem(key, 'true')
    vi.resetModules()
  })

  it('slices Infuse at the file and points VLC / IINA at the m3u index; skips single-url players', async () => {
    const { useExternalPlayers, buildEpisodeList } = await import('./externalPlayers')
    const { result } = renderHook(() => useExternalPlayers())
    const episodes = buildEpisodeList('h', [
      { id: 1, path: 'a.mkv' },
      { id: 2, path: 'b.mkv' },
      { id: 3, path: 'c.mkv' },
    ])
    const links = result.current.buildFromFilePlayers(2, episodes, 'http://ts/Show.m3u?link=h&m3u')
    const byLabel = Object.fromEntries(links.map(link => [link.label, link.href]))
    expect(Object.keys(byLabel).sort()).toEqual(['IINA', 'Infuse', 'VLC'])
    expect(byLabel.Infuse.match(/url=/g)).toHaveLength(2)
    expect(byLabel.Infuse).not.toContain('a.mkv')
    expect(decodeURIComponent(byLabel.VLC)).toContain('index=2')
    expect(decodeURIComponent(byLabel.IINA)).toContain('&index=2')
  })
})
