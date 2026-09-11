import { describe, expect, it } from 'vitest'

import { CLOSED, GETTING_INFO, IN_DB, PRELOAD, WORKING, isLiveTorrentStat } from './states'

describe('isLiveTorrentStat', () => {
  it('treats IN_DB as idle and the rest as open', () => {
    expect(isLiveTorrentStat(IN_DB)).toBe(false)
    expect(isLiveTorrentStat(undefined)).toBe(false)
    expect(isLiveTorrentStat(GETTING_INFO)).toBe(true)
    expect(isLiveTorrentStat(PRELOAD)).toBe(true)
    expect(isLiveTorrentStat(WORKING)).toBe(true)
    expect(isLiveTorrentStat(CLOSED)).toBe(true)
  })
})
