import axios from 'axios'
import parseTorrent from 'parse-torrent'
import ptt from 'parse-torrent-title'
import { tmdbSettingsHost } from 'utils/Hosts'
import type { TMDBSettingsConfig } from 'types/api'

type TMDBSettings = Required<Pick<TMDBSettingsConfig, 'APIKey' | 'APIURL' | 'ImageURL' | 'ImageURLRu'>> &
  TMDBSettingsConfig

// Cache for TMDB settings to avoid repeated API calls
let tmdbSettingsCache: TMDBSettings | null = null

// Clear TMDB settings cache - call this when settings are updated
export const clearTMDBCache = () => {
  tmdbSettingsCache = null
}

const defaultTMDBSettings = (): TMDBSettings => ({
  APIKey: import.meta.env.VITE_TMDB_API_KEY || '',
  APIURL: 'https://api.themoviedb.org/3',
  ImageURL: 'https://image.tmdb.org',
  ImageURLRu: 'https://imagetmdb.com',
})

const mergeTMDBSettings = (data?: TMDBSettingsConfig | null): TMDBSettings => ({
  ...defaultTMDBSettings(),
  ...data,
  // Build-time key is a fallback when server settings have no APIKey configured
  APIKey: data?.APIKey || import.meta.env.VITE_TMDB_API_KEY || '',
})

const normalizeUrl = (url: string | undefined, fallback: string): string => {
  const trimmed = (url || fallback).trim().replace(/\/$/, '')
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed.replace(/^\/\//, '')}`
}

const buildTmdbSearchUrl = (apiURL: string | undefined): string => {
  let base = normalizeUrl(apiURL, 'https://api.themoviedb.org')

  if (!base.includes('/3/search/multi')) {
    base = base.replace(/\/3.*$/, '').replace(/\/search.*$/, '')
    base = `${base}/3/search/multi`
  }

  return base
}

// Fetch TMDB settings from backend
const getTMDBSettings = async (): Promise<TMDBSettings> => {
  if (tmdbSettingsCache) {
    return tmdbSettingsCache
  }

  try {
    const { data } = await axios.get(tmdbSettingsHost())
    tmdbSettingsCache = mergeTMDBSettings(data)
    return tmdbSettingsCache
  } catch {
    tmdbSettingsCache = defaultTMDBSettings()
    return tmdbSettingsCache
  }
}

interface TmdbSearchResult {
  poster_path?: string
  [key: string]: unknown
}

export const getMoviePosters = async (movieName: string, language = 'en'): Promise<string[] | null> => {
  const settings = await getTMDBSettings()

  // If no API key is configured, return null
  if (!settings.APIKey) {
    return null
  }

  const url = buildTmdbSearchUrl(settings.APIURL)

  const imgHost = normalizeUrl(
    language === 'ru' ? settings.ImageURLRu : settings.ImageURL,
    language === 'ru' ? 'https://imagetmdb.com' : 'https://image.tmdb.org',
  )

  return axios
    .get(url, {
      params: {
        api_key: settings.APIKey,
        language,
        include_image_language: `${language},null,en`,
        query: movieName,
      },
    })
    .then(({ data: { results } }: { data: { results: TmdbSearchResult[] } }) =>
      results.filter(el => el.poster_path).map(el => `${imgHost}/t/p/w300${el.poster_path}`),
    )
    .catch(() => null)
}

export const checkImageURL = async (url?: string | null): Promise<boolean> => {
  if (!url || !url.match(/.(\.jpg|\.jpeg|\.png|\.gif|\.svg||\.webp).*$/i)) return false
  return true
}

const magnetRegex = /^magnet:\?xt=urn:[a-z0-9].*/i
const hashRegex = /^\b[0-9a-f]{32}\b$|^\b[0-9a-f]{40}\b$|^\b[0-9a-f]{64}\b$/i
const torrentRegex = /^.*\.(torrent)$/i
const linkRegex = /^(http(s?)):\/\/.*/i
const torrsRegex = /^(torrs):\/\/.*/i

export const checkTorrentSource = (source: string): boolean =>
  source.match(hashRegex) !== null ||
  source.match(magnetRegex) !== null ||
  source.match(torrentRegex) !== null ||
  source.match(linkRegex) !== null ||
  source.match(torrsRegex) !== null

/** Max length for TMDB/search API query; long torrent names exceed this. */
const POSTER_SEARCH_MAX_LEN = 50
/** Max words to use from title for poster search. */
const POSTER_SEARCH_MAX_WORDS = 4

/**
 * Shortens a long torrent title for poster search (TMDB).
 * Uses part before " [", " (", " / " and limits by words/length so the API gets a valid query.
 */
export const shortenTitleForPosterSearch = (
  fullTitle: string,
  opts: { maxWords?: number; maxLen?: number } = {},
): string => {
  const maxWords = opts.maxWords ?? POSTER_SEARCH_MAX_WORDS
  const maxLen = opts.maxLen ?? POSTER_SEARCH_MAX_LEN
  if (!fullTitle || typeof fullTitle !== 'string') return ''
  const trimmed = fullTitle.trim()
  if (!trimmed) return ''
  let base = trimmed
  for (const sep of [' [', ' (', ' / ']) {
    const i = base.indexOf(sep)
    if (i > 0) base = base.slice(0, i).trim()
  }
  try {
    const parsed = ptt.parse(base)
    if (parsed?.title && parsed.title.length <= maxLen + 15) base = parsed.title
  } catch {
    // ignore
  }
  const words = base.split(/\s+/).filter(Boolean)
  const byWords = words.slice(0, maxWords).join(' ')
  if (byWords.length <= maxLen) return byWords.trim()
  const cut = byWords.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  const result = lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  return result.trim() || trimmed.slice(0, maxLen).trim()
}

export interface ParseTorrentTitleResult {
  parsedTitle: string | null
  originalName: string | null
}

export const parseTorrentTitle = (
  parsingSource: string | File,
  callback: (result: ParseTorrentTitleResult) => void,
): void => {
  parseTorrent.remote(parsingSource, (err, parsed = {}) => {
    const { name, files } = parsed
    if (!name || err) return callback({ parsedTitle: null, originalName: null })

    const torrentName = ptt.parse(name).title
    const nameOfFileInsideTorrent = files ? ptt.parse(files[0].name || '').title : null

    let newTitle = torrentName
    if (nameOfFileInsideTorrent) {
      // taking shorter title because in most cases it is more accurate
      newTitle = torrentName.length < nameOfFileInsideTorrent.length ? torrentName : nameOfFileInsideTorrent
    }

    callback({ parsedTitle: newTitle, originalName: name })
  })
}
