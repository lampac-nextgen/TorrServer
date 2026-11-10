import { useTranslation } from 'react-i18next'
import { useLocalBoolPref } from 'shared/hooks/useLocalPref'
import { detectStandaloneApp, isAppleDevice, isMacOS, playerLinkPlatform } from 'shared/lib/platform'
import type { PosterPlayPlayerFlags } from 'shared/lib/posterPlay'
import {
  buildExternalPlayerHref,
  buildInfusePlaylistHref,
  episodesFrom,
  type PlaylistEpisode,
} from 'shared/lib/streamLinks'

export {
  buildEpisodeList,
  buildExternalPlayerHref,
  buildInfusePlaylistHref,
  episodesFrom,
  playlistActionHref,
} from 'shared/lib/streamLinks'
export type { PlaylistEpisode } from 'shared/lib/streamLinks'

export interface ExternalPlayerLink {
  label: string
  href: string
}

/**
 * Reads the user's configured mobile/desktop player preferences (Settings → App) and exposes a
 * builder for the matching deep-link scheme per direct-stream URL. Shared between the per-file
 * action row and the torrent card's quick-open action so both stay in sync.
 */
export function useExternalPlayers() {
  const { t } = useTranslation()
  const [isVlcUsed] = useLocalBoolPref('isVlcUsed')
  const [isInfuseUsed] = useLocalBoolPref('isInfuseUsed')
  const [isSenPlayerUsed] = useLocalBoolPref('isSenPlayerUsed')
  const [isVidHubUsed] = useLocalBoolPref('isVidHubUsed')
  const [isIinaUsed] = useLocalBoolPref('isIinaUsed')
  const isStandaloneApp = detectStandaloneApp()
  const isMac = isMacOS()
  const isApple = isAppleDevice()
  const playerPlatform = playerLinkPlatform()

  const playerFlags: PosterPlayPlayerFlags = {
    isVlcUsed,
    isInfuseUsed,
    isSenPlayerUsed,
    isVidHubUsed,
    isIinaUsed,
    isApple,
    isMac,
  }

  const hasAnyExternalPlayer =
    (isApple && isInfuseUsed) ||
    (isApple && isSenPlayerUsed) ||
    (isApple && isVidHubUsed) ||
    isVlcUsed ||
    (isMac && isIinaUsed)

  /** Whether the plain "open direct link" fallback should also be shown alongside app deep links. */
  const shouldShowOpenLink = !isStandaloneApp || !hasAnyExternalPlayer

  const buildExternalPlayers = (fullLink: string): ExternalPlayerLink[] => {
    const links: ExternalPlayerLink[] = []
    if (isApple && isInfuseUsed) links.push({ label: t('Infuse'), href: buildExternalPlayerHref('infuse', fullLink) })
    if (isApple && isSenPlayerUsed)
      links.push({ label: t('SenPlayer'), href: buildExternalPlayerHref('senPlayer', fullLink) })
    if (isApple && isVidHubUsed) links.push({ label: t('VidHub'), href: buildExternalPlayerHref('vidHub', fullLink) })
    if (isVlcUsed) links.push({ label: t('VLC'), href: buildExternalPlayerHref('vlc', fullLink, playerPlatform) })
    if (isMac && isIinaUsed) links.push({ label: t('IINA'), href: buildExternalPlayerHref('iina', fullLink) })
    return links
  }

  /**
   * Series footer: Infuse gets one url per episode; VLC and IINA open the torrent m3u.
   * VidHub and SenPlayer document a single video `url` only (no playlist), so they are not offered.
   */
  const buildSeriesExternalPlayers = (playlistUrl: string, episodes: PlaylistEpisode[]): ExternalPlayerLink[] => {
    const links: ExternalPlayerLink[] = []
    if (isApple && isInfuseUsed) links.push({ label: t('Infuse'), href: buildInfusePlaylistHref(episodes) })
    if (isVlcUsed) links.push({ label: t('VLC'), href: buildExternalPlayerHref('vlc', playlistUrl, playerPlatform) })
    if (isMac && isIinaUsed) links.push({ label: t('IINA'), href: buildExternalPlayerHref('iina', playlistUrl) })
    return links
  }

  /**
   * "Play from this file": Infuse gets the url list sliced at the file; VLC and IINA open the torrent m3u
   * with the server's `index` start. VidHub and SenPlayer take a single url, so they are not offered.
   */
  const buildFromFilePlayers = (
    fileId: number,
    episodes: PlaylistEpisode[],
    playlistUrl: string,
  ): ExternalPlayerLink[] => {
    const links: ExternalPlayerLink[] = []
    const m3u = `${playlistUrl}&index=${fileId}`
    if (isApple && isInfuseUsed)
      links.push({ label: t('Infuse'), href: buildInfusePlaylistHref(episodesFrom(episodes, fileId)) })
    if (isVlcUsed) links.push({ label: t('VLC'), href: buildExternalPlayerHref('vlc', m3u, playerPlatform) })
    if (isMac && isIinaUsed) links.push({ label: t('IINA'), href: buildExternalPlayerHref('iina', m3u) })
    return links
  }

  return {
    buildExternalPlayers,
    buildSeriesExternalPlayers,
    buildFromFilePlayers,
    shouldShowOpenLink,
    hasAnyExternalPlayer,
    playerFlags,
    playerPlatform,
  }
}
