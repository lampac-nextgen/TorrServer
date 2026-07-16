import axios from 'axios'

import i18n from '../i18n'
import type { TorrentStat } from '../types/api'
import { torrentsHost } from './Hosts'

export function humanizeSize(size?: number | null): string {
  if (!size) return ''
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return `${Number((size / Math.pow(1024, i)).toFixed(2))} ${
    [i18n.t('B'), i18n.t('KB'), i18n.t('MB'), i18n.t('GB'), i18n.t('TB')][i]
  }`
}

export function humanizeSpeed(speed?: number | null): string {
  if (!speed) return ''
  const i = Math.floor(Math.log(speed * 8) / Math.log(1000))
  return `${Number(((speed * 8) / Math.pow(1000, i)).toFixed(0))} ${
    [i18n.t('bps'), i18n.t('kbps'), i18n.t('Mbps'), i18n.t('Gbps'), i18n.t('Tbps')][i]
  }`
}

export function getPeerString(torrent?: TorrentStat | null): string | null {
  if (!torrent) return null
  const active = torrent.ActivePeers ?? torrent.active_peers
  const total = torrent.TotalPeers ?? torrent.total_peers
  if (active == null) return null
  const seeders = torrent.connected_seeders ?? 0
  return `${active} / ${total ?? 0} · ${seeders}`
}

export const shortenText = (text: string | undefined | null, symbolAmount: number): string =>
  text ? text.slice(0, symbolAmount) + (text.length > symbolAmount ? '…' : '') : ''

export const removeRedundantCharacters = (string: string): string => {
  let newString = string
  const brackets: Array<[string, string]> = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ]

  brackets.forEach(el => {
    const leftBracketRegex = new RegExp(`\\${el[0]}`, 'g')
    const leftBracketAmount = [...newString.matchAll(leftBracketRegex)].length
    const rightBracketRegex = new RegExp(`\\${el[1]}`, 'g')
    const rightBracketAmount = [...newString.matchAll(rightBracketRegex)].length

    if (leftBracketAmount !== rightBracketAmount) {
      const removeRegex = new RegExp(`(\\${el[0]})(?!.*\\1).*`, 'g')
      newString = newString.replace(removeRegex, '')
    }
  })

  const hasThreeDotsAtTheEnd = !!newString.match(/\.{3}$/g)
  const trimmedString = newString.replace(/[\\.| ]+$/g, '').trim()

  return hasThreeDotsAtTheEnd ? `${trimmedString}..` : trimmedString
}

export const getTorrents = async (): Promise<TorrentStat[]> => {
  try {
    const { data } = await axios.post<TorrentStat[]>(torrentsHost(), { action: 'list' })
    return data
  } catch {
    throw new Error('Failed to load torrents')
  }
}

export const detectStandaloneApp = (): boolean => {
  if (typeof window === 'undefined') return false

  const matchMedia = window.matchMedia?.bind(window)
  const isDisplayModeStandalone = (mode: string) => {
    try {
      return !!matchMedia && matchMedia(mode).matches
    } catch {
      return false
    }
  }

  const byDisplayMode =
    isDisplayModeStandalone('(display-mode: standalone)') ||
    isDisplayModeStandalone('screen and (display-mode: standalone)')

  return byDisplayMode || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
}

export const isStandaloneApp = detectStandaloneApp()

export const detectApplePlatform = (): { isMac: boolean; isIOS: boolean } => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isMac: false, isIOS: false }
  }

  const userAgent = navigator.userAgent || ''
  const platform =
    (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform || ''

  const isMac = userAgent.includes('Macintosh') || (platform && platform.toLowerCase().includes('mac'))
  const isIOS =
    /iPad|iPhone|iPod/.test(userAgent) || (userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)

  return { isMac: Boolean(isMac), isIOS }
}

export const isAppleDevice = (): boolean => {
  const { isMac, isIOS } = detectApplePlatform()
  return isMac || isIOS
}

export const isMacOS = (): boolean => {
  const { isMac, isIOS } = detectApplePlatform()
  return isMac && !isIOS
}

export const isDesktop = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const userAgent = navigator.userAgent || ''
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
  const isTabletWithTouch = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1

  return !isMobile && !isTabletWithTouch
}

export function formatSizeToClassicUnits(bytes?: number | null): string {
  if (!bytes || bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`
}

export function parseSizeToBytes(sizeStr?: string | null): number {
  if (!sizeStr || typeof sizeStr !== 'string') return 0

  if (sizeStr.trim().match(/^\d+\s*B$/i)) {
    const digits = sizeStr.trim().match(/^\d+/)
    return digits ? parseInt(digits[0], 10) : 0
  }

  const match = sizeStr.trim().match(/^([\d.]+)\s*([KMGT]?)(i?B|CiB)$/i)
  if (!match) return 0

  const value = parseFloat(match[1])
  const unit = match[2].toUpperCase()
  const suffix = match[3].toUpperCase()

  if (Number.isNaN(value)) return 0

  const isBinary = suffix.includes('I') || suffix.includes('C')
  const base = isBinary ? 1024 : 1000
  const multipliers: Record<string, number> = { '': 1, K: 1, M: 2, G: 3, T: 4 }
  const multiplier = multipliers[unit] || 1

  return Math.round(value * Math.pow(base, multiplier))
}
