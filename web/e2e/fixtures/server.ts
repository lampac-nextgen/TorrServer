// Real-server harness: starts the built TorrServer binary offline on loopback
// and a loopback seeder (e2e-seed) that dials its peer port.
import { spawn, spawnSync, type ChildProcess } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
export const repoRoot = path.resolve(here, '../../..')
export const BIN = process.env.TS_BIN || path.join(repoRoot, 'tmp/e2e/torrserver')
export const SEED_BIN = process.env.TS_SEED_BIN || path.join(repoRoot, 'tmp/e2e/e2e-seed')

export function binariesReady(): boolean {
  return fs.existsSync(BIN) && fs.existsSync(SEED_BIN)
}

export const MISSING_BINARIES = 'run `make e2e-real-build` first'

export const sha = (b: Buffer | Uint8Array): string => crypto.createHash('sha256').update(b).digest('hex')

/** encodeURIComponent plus the RFC 3986 extras, as streamLinks.encodePathSegment does. */
export const enc = (s: string): string =>
  encodeURIComponent(s).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())

export function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const s = net.createServer()
    s.listen(0, '127.0.0.1', () => {
      const { port } = s.address() as net.AddressInfo
      s.close(() => resolve(port))
    })
    s.on('error', reject)
  })
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

const OFFLINE_SETS = {
  CacheSize: 64 << 20,
  ReaderReadAHead: 95,
  PreloadCache: 0,
  ConnectionsLimit: 25,
  RetrackersMode: 0,
  TorrentDisconnectTimeout: 120,
  ResponsiveMode: true,
  EnableIPv6: false,
  DisableDHT: true,
  DisablePEX: true,
  DisableUPNP: true,
  DisableUTP: true,
  EnableLPD: false,
  EnableDLNA: false,
  EnableBonjour: false,
  EnableRutorSearch: false,
  EnableTorznabSearch: false,
  StoreSettingsInJson: true,
  StoreViewedInJson: false,
}

export function makeVideo(dest: string): boolean {
  const r = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-loglevel',
      'error',
      '-f',
      'lavfi',
      '-i',
      'testsrc=duration=3:size=320x240:rate=15',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      dest,
    ],
    { stdio: 'ignore' },
  )
  return r.status === 0 && fs.existsSync(dest)
}

export interface SeedFile {
  path: string
  size: number
  sha256: string
}

export interface SeedEntry {
  profile: string
  hash: string
  name: string
  torrent: string
  files: SeedFile[]
}

export interface ServerOpts {
  auth?: { user: string; pass: string }
  readonly?: boolean
  searchwa?: boolean
  seed?: boolean
  extraArgs?: string[]
}

export interface FileStat {
  id: number
  path: string
  length: number
}

export interface TorrentStatus {
  hash: string
  title?: string
  file_stats?: FileStat[]
  [k: string]: unknown
}

export interface Srv {
  base: string
  port: number
  peerPort: number
  dir: string
  data: string
  child: ChildProcess
  authHeader?: string
  opts: ServerOpts
  logPath: string
  seed: Record<string, SeedEntry>
  seedChild: ChildProcess | null
  seedDir: string
  log(): string
  headers(h?: Record<string, string>): Record<string, string>
  api(p: string, body?: unknown, init?: RequestInit): Promise<Response>
  stop(): Promise<void>
}

export async function startServer(opts: ServerOpts = {}): Promise<Srv> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-e2e-'))
  const data = path.join(dir, 'data')
  fs.mkdirSync(data)
  if (opts.auth) fs.writeFileSync(path.join(data, 'accs.db'), JSON.stringify({ [opts.auth.user]: opts.auth.pass }))
  const port = await freePort()
  const peerPort = await freePort()
  const args = ['-d', data, '-p', String(port), '-i', '127.0.0.1', '--torrentaddr', `127.0.0.1:${peerPort}`, '--pprof']
  if (opts.auth) args.push('-a')
  if (opts.readonly) args.push('-r')
  if (opts.searchwa) args.push('-s')
  if (opts.extraArgs) args.push(...opts.extraArgs)
  const logFile = fs.openSync(path.join(dir, 'server.log'), 'a')
  const child = spawn(BIN, args, { stdio: ['ignore', logFile, logFile], cwd: data })
  const base = `http://127.0.0.1:${port}`
  const authHeader = opts.auth
    ? 'Basic ' + Buffer.from(`${opts.auth.user}:${opts.auth.pass}`).toString('base64')
    : undefined
  const srv: Srv = {
    base,
    port,
    peerPort,
    dir,
    data,
    child,
    authHeader,
    opts,
    logPath: path.join(dir, 'server.log'),
    seed: {},
    seedChild: null,
    seedDir: '',
    log: () => fs.readFileSync(path.join(dir, 'server.log'), 'utf8'),
    headers: (h = {}) => (authHeader ? { Authorization: authHeader, ...h } : h),
    async api(p, body, init = {}) {
      return fetch(base + p, {
        method: body === undefined ? 'GET' : 'POST',
        headers: srv.headers(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        body: body === undefined ? undefined : JSON.stringify(body),
        ...init,
      })
    },
    async stop() {
      for (const c of [srv.seedChild, child]) {
        if (c && c.exitCode === null) c.kill('SIGKILL')
      }
      await sleep(100)
      if (!process.env.TS_E2E_KEEP) fs.rmSync(dir, { recursive: true, force: true })
    },
  }
  try {
    await waitEcho(srv)
    if (!opts.readonly) {
      const r = await srv.api('/settings', { action: 'set', sets: OFFLINE_SETS })
      if (!r.ok) throw new Error(`offline settings failed: ${r.status} ${await r.text()}`)
      await waitEcho(srv)
    }
    if (opts.seed) await startSeed(srv)
  } catch (e) {
    await srv.stop()
    throw e
  }
  return srv
}

async function waitEcho(srv: Srv, ms = 30000): Promise<void> {
  const end = Date.now() + ms
  while (Date.now() < end) {
    if (srv.child.exitCode !== null) throw new Error('server exited early:\n' + srv.log().slice(-2000))
    try {
      const r = await fetch(srv.base + '/echo')
      if (r.ok) return
    } catch {
      /* not listening yet */
    }
    await sleep(100)
  }
  throw new Error('server did not answer /echo:\n' + srv.log().slice(-2000))
}

async function startSeed(srv: Srv): Promise<void> {
  const sd = path.join(srv.dir, 'seed')
  fs.mkdirSync(sd)
  const args = ['-dir', sd, '-peer', `127.0.0.1:${srv.peerPort}`]
  const video = path.join(srv.dir, 'clip.mp4')
  if (makeVideo(video)) args.push('-video', video)
  const out = fs.openSync(path.join(srv.dir, 'seed.log'), 'a')
  srv.seedChild = spawn(SEED_BIN, args, { stdio: ['ignore', out, out] })
  const mf = path.join(sd, 'manifest.json')
  const end = Date.now() + 60000
  while (!fs.existsSync(mf)) {
    if (Date.now() > end || srv.seedChild.exitCode !== null) throw new Error('seed did not start')
    await sleep(100)
  }
  const list = JSON.parse(fs.readFileSync(mf, 'utf8')) as SeedEntry[]
  srv.seed = Object.fromEntries(list.map(e => [e.profile, e]))
  srv.seedDir = sd
}

/** Add a seeded profile via POST /torrent/upload. Returns the status JSON. */
export async function addSeeded(srv: Srv, profile: string, extra: Record<string, string> = {}): Promise<TorrentStatus> {
  const e = srv.seed[profile]
  const fd = new FormData()
  fd.append('file', new Blob([fs.readFileSync(e.torrent)]), `${profile}.torrent`)
  fd.append('save', 'true')
  for (const [k, v] of Object.entries(extra)) fd.append(k, v)
  const r = await fetch(srv.base + '/torrent/upload', { method: 'POST', body: fd, headers: srv.headers() })
  if (!r.ok) throw new Error(`upload ${profile}: ${r.status} ${await r.text()}`)
  return r.json()
}

export async function getTorrent(srv: Srv, hash: string): Promise<{ status: number; body: TorrentStatus | string }> {
  const r = await srv.api('/torrents', { action: 'get', hash })
  return { status: r.status, body: r.ok ? ((await r.json()) as TorrentStatus) : await r.text() }
}

/** Poll until the torrent has file_stats and a connected seeder. */
export async function waitReady(
  srv: Srv,
  hash: string,
  ms = 30000,
): Promise<TorrentStatus & { file_stats: FileStat[] }> {
  const end = Date.now() + ms
  let last
  while (Date.now() < end) {
    last = await getTorrent(srv, hash)
    if (last.status === 200 && typeof last.body !== 'string' && last.body.file_stats?.length)
      return last.body as TorrentStatus & { file_stats: FileStat[] }
    await sleep(300)
  }
  throw new Error('torrent not ready: ' + JSON.stringify(last).slice(0, 500))
}

/** Add every profile that exists in the seed manifest and wait until each is ready. */
export async function addAndWait(srv: Srv, profiles: string[], ms = 30000): Promise<void> {
  for (const p of profiles) {
    if (!srv.seed[p]) continue
    await addSeeded(srv, p)
    await waitReady(srv, srv.seed[p].hash, ms)
  }
}
