import type { Page } from '@playwright/test'
import { JAC_RED_HOST, JAC_RED_KEY, JAC_RED_NAME } from './indexers.ts'

export const HASH = '0123456789abcdef0123456789abcdef01234567'

export const fixtureTorrent = {
  hash: HASH,
  title: 'E2E Mock Torrent',
  name: 'e2e.mock.mkv',
  category: 'movie',
  poster: '',
  torrent_size: 1024 * 1024 * 100,
  loaded_size: 0,
  stat: 5,
  file_stats: [{ id: 1, path: 'e2e.mock.mkv', length: 1024 * 1024 * 100 }],
}

/** Extra library rows so phone poster-grid column counts are testable. */
export const fixtureLibrary = [
  fixtureTorrent,
  ...[2, 3, 4, 5, 6].map(i => ({
    ...fixtureTorrent,
    hash: `${HASH.slice(0, 38)}${String(i).padStart(2, '0')}`,
    title: `E2E Mock Torrent ${i}`,
    name: `e2e.mock.${i}.mkv`,
  })),
]

export const fixtureSettings = {
  CacheSize: 64 * 1024 * 1024,
  ReaderReadAHead: 95,
  PreloadCache: 50,
  EnableBonjour: false,
  EnableDLNA: false,
  EnableTorznabSearch: true,
  EnableRutorSearch: false,
  TrackersListURL: 'https://example.test/trackers.txt',
  DefaultTrackers: 'udp://audit.example:1337/announce',
  TorznabUrls: [
    {
      Host: JAC_RED_HOST,
      Key: JAC_RED_KEY,
      Name: JAC_RED_NAME,
      Categories: '2000',
      CatType: 'manual',
    },
  ],
  RetrackersMode: 1,
  TorrentDisconnectTimeout: 30,
  ConnectionsLimit: 25,
  ResponsiveMode: true,
  ShowFSActiveTorr: true,
  StoreSettingsInJson: true,
  TMDBSettings: { APIKey: '', APIURL: 'https://api.themoviedb.org/3' },
}

export const fixtureCache = { Hash: HASH, Pieces: {}, Readers: [] }

/** Long Cyrillic title, 4 big episodes: stresses the details modal on a phone. */
export const fixtureDragon = {
  hash: HASH,
  title: '[LAMPA] Дом дракона (3 сезон: 1-4 серии из 8) / House of the Dragon / 2026 / 4 х ДБ, 3 х ПМ, WEB-DLRip 2160p',
  name: 'House.of.the.Dragon.S03E01-E04.2160p.WEB-DL.x265',
  category: 'tv',
  poster: '',
  torrent_size: 37.09 * 1024 ** 3,
  loaded_size: 0,
  preloaded_bytes: 0,
  preload_size: 0,
  download_speed: 0,
  upload_speed: 0,
  active_peers: 1,
  total_peers: 51,
  connected_seeders: 0,
  pending_peers: 51,
  half_open_peers: 0,
  bytes_read: 95100,
  bytes_written: 955,
  stat: 3,
  file_stats: [1, 2, 3, 4].map((id, i) => ({
    id,
    path: `House of the Dragon/S03E0${id}.mkv`,
    length: [9.02, 10.6, 8.9, 8.57][i] * 1024 ** 3,
  })),
}

export const fixtureDragonCache = {
  Hash: HASH,
  Capacity: 256 * 1024 * 1024,
  Filled: 0,
  PiecesLength: 8 * 1024 * 1024,
  PiecesCount: 4748,
  Pieces: {},
  Readers: [],
}

export const fixtureWaf = {
  whitelist: '',
  blacklist: '',
  referers: '',
  ip_enabled: false,
  referer_enabled: true,
  read_only: false,
  warnings: [],
}

export const fixtureRuntime = {
  dlna_enabled: false,
  bonjour_enabled: false,
  friendly_name: '',
  webdav_enabled: false,
  webdav_path: '/dav',
  fuse_enabled: false,
  fuse_path: '',
}

const json = (body: unknown) => ({
  status: 200,
  contentType: 'application/json',
  body: JSON.stringify(body),
})

/** Intercept TorrServer APIs so the embedded SPA can run without a backend. */
export interface MockOptions {
  requireAuth?: boolean
  /** Rows returned by `action: list`. */
  library?: unknown[]
  /** Body returned by every other `/torrents` action. */
  torrent?: unknown
  /** Body returned by `/cache`. */
  cache?: unknown
}

export async function installMocks(
  page: Page,
  { requireAuth = false, library = fixtureLibrary, torrent = fixtureTorrent, cache = fixtureCache }: MockOptions = {},
) {
  const waf: Record<string, unknown> = { ...fixtureWaf }

  await page.route('**/echo', route => route.fulfill({ status: 200, contentType: 'text/plain', body: 'MatriX.144' }))
  await page.route('**/gst/echo', route => route.fulfill({ status: 404, body: '' }))
  await page.route('**/gst/settings', route => route.fulfill(json({})))
  await page.route('**/storage/settings', route => route.fulfill(json({})))
  await page.route('**/viewed', route => route.fulfill(json([])))
  await page.route('**/runtime/status', route => route.fulfill(json(fixtureRuntime)))
  await page.route('**/cache', route => route.fulfill(json(cache)))

  await page.route('**/waf', async route => {
    if (requireAuth && !route.request().headers().authorization) {
      await route.fulfill({ status: 401, body: '' })
      return
    }
    if (route.request().method() === 'POST') {
      const body = route.request().postDataJSON() || {}
      waf.whitelist = body.whitelist ?? waf.whitelist
      waf.blacklist = body.blacklist ?? waf.blacklist
      waf.referers = body.referers ?? waf.referers
    }
    await route.fulfill(json(waf))
  })

  await page.route('**/settings', async route => {
    if (requireAuth && !route.request().headers().authorization) {
      await route.fulfill({ status: 401, body: '' })
      return
    }
    await route.fulfill(json(fixtureSettings))
  })

  await page.route('**/torrents', async route => {
    if (route.request().method() !== 'POST') {
      await route.continue()
      return
    }
    if (requireAuth && !route.request().headers().authorization) {
      await route.fulfill({ status: 401, body: '' })
      return
    }
    let action = 'list'
    try {
      action = route.request().postDataJSON()?.action || 'list'
    } catch {
      /* ignore */
    }
    if (action === 'list') {
      await route.fulfill(json(library))
      return
    }
    await route.fulfill(json(torrent))
  })

  await page.route('**/torznab/search**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/xml',
      body: `<?xml version="1.0"?><rss version="2.0"><channel><item><title>Mock Result</title><guid>${HASH}</guid></item></channel></rss>`,
    })
  })
  await page.route('**/torznab/caps**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/xml',
      body: `<?xml version="1.0"?><caps><categories><category id="2000" name="Movies"/></categories></caps>`,
    })
  })
}
