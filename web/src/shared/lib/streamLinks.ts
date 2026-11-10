import ptt from 'parse-torrent-title'
import { playlistTorrHost, streamHost } from 'shared/api/hosts'

import type { ExternalPosterPlayAction, PlaylistButtonAction } from './posterPlay'

/**
 * RFC 3986 path segment. `encodeURIComponent` leaves `!'()*` raw; those break
 * Infuse, VLC, and IINA when a torrent name contains them.
 */
export const encodePathSegment = (segment: string): string =>
  encodeURIComponent(segment).replace(/[!'()*]/g, ch => `%${ch.charCodeAt(0).toString(16).toUpperCase()}`)

const fileBaseName = (path: string): string => path.split('\\').pop()?.split('/').pop() || path

/** Query string for `/stream`. Flag keys (`play`, `m3u`) stay valueless — Gin `GetQuery` only checks presence. */
export const streamQuery = (hash: string, params: Record<string, string>, flags: readonly string[]): string => {
  const query = new URLSearchParams({ link: hash, ...params }).toString()
  return flags.length ? `${query}&${flags.join('&')}` : query
}

/** Direct play stream URL. Path segment and `link` are encoded (`#`, `?`, `&`, `%`, `'`, `!`, non-ASCII). */
export const streamPlayUrl = (hash: string, file: { id: number; path: string }): string =>
  `${streamHost()}/${encodePathSegment(fileBaseName(file.path))}?${streamQuery(hash, { index: String(file.id) }, ['play'])}`

/** Buffer a file without opening it (`GET /stream?…&preload`). */
export const streamPreloadUrl = (hash: string, fileId: number): string =>
  `${streamHost()}?${streamQuery(hash, { index: String(fileId) }, ['preload'])}`

/**
 * M3U playlist URL for the whole torrent.
 * `fn=file.m3u` matches server `all.m3u` entries — ForkPlayer mishandles a link whose path ends in `.m3u`.
 * Basic userinfo is applied later by `externalLink` / `withAuthMediaUrl`, and only for the page host.
 */
export const torrentPlaylistUrl = (hash: string, displayName: string): string =>
  `${playlistTorrHost()}/${encodePathSegment(displayName)}.m3u?${streamQuery(hash, {}, ['m3u', 'fn=file.m3u'])}`

export interface PlayerLinkPlatform {
  ios?: boolean
  android?: boolean
}

/**
 * Android view intent. `absoluteUrl` keeps userinfo and the encoded path;
 * the scheme moves into the Intent fragment so `#` in the stream URL cannot appear
 * (path encoding already percent-encodes it).
 */
export const buildAndroidIntentHref = (absoluteUrl: string): string => {
  let scheme = 'http'
  let rest: string
  try {
    const parsed = new URL(absoluteUrl)
    scheme = parsed.protocol.replace(/:$/, '') || scheme
    rest = absoluteUrl.slice(parsed.protocol.length)
  } catch {
    rest = absoluteUrl.replace(/^[a-z][a-z0-9+.-]*:/i, '')
  }
  return `intent:${rest}#Intent;scheme=${scheme};type=video/*;end`
}

/** Deep-link scheme for a single enabled external player and an absolute stream URL. */
export const buildExternalPlayerHref = (
  player: ExternalPosterPlayAction,
  fullLink: string,
  platform: PlayerLinkPlatform = {},
): string => {
  const encoded = encodeURIComponent(fullLink)
  switch (player) {
    case 'infuse':
      return `infuse://x-callback-url/play?url=${encoded}`
    case 'senPlayer':
      return `senplayer://x-callback-url/play?url=${encoded}`
    case 'vidHub':
      return `open-vidhub://x-callback-url/play?url=${encoded}`
    case 'vlc':
      if (platform.ios) return `vlc-x-callback://x-callback-url/stream?url=${encoded}`
      if (platform.android) return buildAndroidIntentHref(fullLink)
      return `vlc://${fullLink}`
    case 'iina':
      return `iina://weblink?url=${encoded}`
    default:
      return fullLink
  }
}

/** Constrain Infuse playlist href size, never swapped for an m3u. */
export const INFUSE_PLAYLIST_HREF_LIMIT = 65536

/**
 * Infuse plays every repeated `url` in order as a temporary playlist; each `filename` follows its own `url`.
 * Infuse documents no m3u input, so there is no single-playlist fallback. Episodes past
 * {@link INFUSE_PLAYLIST_HREF_LIMIT} characters are dropped (the first always stays).
 */
export const buildInfusePlaylistHref = (episodes: { url: string; filename: string }[]): string => {
  let href = 'infuse://x-callback-url/play?'
  episodes.forEach((episode, index) => {
    const part = `url=${encodeURIComponent(episode.url)}&filename=${encodeURIComponent(episode.filename)}`
    const next = href + (index ? '&' : '') + part
    if (index && next.length > INFUSE_PLAYLIST_HREF_LIMIT) return
    href = next
  })
  return href
}

export interface PlaylistEpisode {
  /** Torrent file id (`index` on the server). */
  id: number
  url: string
  filename: string
}

/**
 * Infuse reads metadata from the name only when it follows its styles (`Show S01E02.mkv`).
 * Episodes get that form; anything without a title and season/episode keeps the torrent file name.
 */
export const infuseFilename = (path: string): string => {
  const base = fileBaseName(path)
  const { title, season, episode } = ptt.parse(base)
  if (!title || season == null || episode == null) return base
  const ext = /\.[A-Za-z0-9]{2,5}$/.exec(base)?.[0] ?? ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${title} S${pad(season)}E${pad(episode)}${ext}`
}

/** One entry per playable file, in list order. `absolutize` applies the external media base and auth. */
export const buildEpisodeList = (
  hash: string,
  files: { id: number; path: string }[],
  absolutize: (url: string) => string = url => url,
): PlaylistEpisode[] =>
  files.map(file => ({
    id: file.id,
    url: absolutize(streamPlayUrl(hash, file)),
    filename: infuseFilename(file.path),
  }))

/**
 * Episodes from `fileId` onward (inclusive). An unknown or missing id keeps the whole list,
 * as the server does for an `index` it cannot find.
 */
export const episodesFrom = (episodes: PlaylistEpisode[], fileId: number | undefined): PlaylistEpisode[] => {
  if (fileId == null) return episodes
  const start = episodes.findIndex(episode => episode.id === fileId)
  return start > 0 ? episodes.slice(start) : episodes
}

/**
 * Player deep link for the Playlist button. Download and copy stay on the page.
 * Infuse takes a url list (never an m3u); without `episodes` it returns null and the button downloads.
 */
export const playlistActionHref = (
  action: PlaylistButtonAction,
  absoluteUrl: string,
  platform: PlayerLinkPlatform = {},
  episodes?: PlaylistEpisode[],
): string | null => {
  if (action === 'download' || action === 'copyLink') return null
  if (action === 'infuse') return episodes?.length ? buildInfusePlaylistHref(episodes) : null
  return buildExternalPlayerHref(action, absoluteUrl, platform)
}
