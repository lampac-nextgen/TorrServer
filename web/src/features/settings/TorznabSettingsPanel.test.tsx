// @vitest-environment happy-dom
import { useEffect, useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { BTSets } from 'shared/api/types'
import { isDisabled } from '../../test/dom'
import { axiosError, postBodies, routeApi } from '../../test/mockApi'
import { renderWithProviders } from '../../test/renderWithProviders'

import TorznabSettingsPanel from './TorznabSettingsPanel'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

let latest: BTSets = {}

function Harness({ initial = [] }: { initial?: BTSets['TorznabUrls'] }) {
  const [settings, setSettings] = useState<BTSets>({ TorznabUrls: initial })
  useEffect(() => {
    latest = settings
  }, [settings])
  return <TorznabSettingsPanel settings={settings} onUpdate={(k, v) => setSettings(p => ({ ...p, [k]: v }))} />
}

const HOST = 'http://jackett:9117/api/v2.0/indexers/all/results/torznab'

async function fillDraft(host = HOST, key = 'abcdef123456', name = '') {
  if (name) await userEvent.type(screen.getByLabelText('Name (Optional)'), name)
  await userEvent.type(screen.getByLabelText(/Torznab host/i), host)
  await userEvent.type(screen.getByLabelText('API Key'), key)
}

beforeEach(() => {
  latest = {}
})

describe('TorznabSettingsPanel', () => {
  it('keeps Add and Test disabled until host and key are filled', async () => {
    routeApi({})
    renderWithProviders(<Harness />)
    const add = screen.getByRole('button', { name: 'Add server' })
    expect(isDisabled(add)).toBe(true)
    await userEvent.type(screen.getByLabelText(/Torznab host/i), HOST)
    expect(isDisabled(add)).toBe(true)
    await userEvent.type(screen.getByLabelText('API Key'), 'k')
    expect(isDisabled(add)).toBe(false)
  })

  it('adds a trimmed entry with the default category type and clears the draft', async () => {
    routeApi({})
    renderWithProviders(<Harness />)
    await fillDraft(`  ${HOST} `, ' abcdef123456 ', 'My indexer')
    await userEvent.click(screen.getByRole('button', { name: 'Add server' }))

    expect(latest.TorznabUrls).toEqual([
      {
        Host: HOST,
        Key: 'abcdef123456',
        Name: 'My indexer',
        CatType: 'default',
        Categories: undefined,
      },
    ])
    expect(screen.getByText('My indexer')).toBeTruthy()
    // Only the first 5 characters of the key are shown.
    expect(screen.getByText(/abcde…/)).toBeTruthy()
    expect((screen.getByLabelText(/Torznab host/i) as HTMLInputElement).value).toBe('')
  })

  it('keeps manual categories only for the manual category type', async () => {
    routeApi({})
    renderWithProviders(<Harness />)
    await fillDraft()
    await userEvent.click(screen.getByRole('button', { name: /Categories to search/i }))
    await userEvent.click(await screen.findByRole('option', { name: 'Manual' }))
    await userEvent.type(screen.getByLabelText('Category'), '5030,5040')
    await userEvent.click(screen.getByRole('button', { name: 'Add server' }))
    expect(latest.TorznabUrls?.[0]).toMatchObject({
      CatType: 'manual',
      Categories: '5030,5040',
    })
  })

  it('tests a saved row against /torznab/test and shows success', async () => {
    routeApi({ 'POST /torznab/test': { success: true } })
    renderWithProviders(<Harness initial={[{ Host: HOST, Key: 'abcdef123456', Name: 'Jackett' }]} />)
    const row = screen.getByText('Jackett').closest('li') as HTMLElement
    await userEvent.click(within(row).getByRole('button', { name: 'Test' }))
    expect(await within(row).findByText('Connection successful')).toBeTruthy()
    expect(postBodies('/torznab/test')).toEqual([{ host: HOST, key: 'abcdef123456' }])
  })

  it('shows the server error when the test is refused, and the message when the request fails', async () => {
    routeApi({
      'POST /torznab/test': () => ({ success: false, error: 'bad api key' }),
    })
    renderWithProviders(<Harness />)
    await fillDraft()
    await userEvent.click(screen.getAllByRole('button', { name: 'Test' })[0])
    expect(await screen.findByText('bad api key')).toBeTruthy()

    routeApi({
      'POST /torznab/test': () => {
        throw axiosError(502, {}, 'Network Error')
      },
    })
    await userEvent.click(screen.getAllByRole('button', { name: 'Test' })[0])
    expect(await screen.findByText('Network Error')).toBeTruthy()
  })

  it('removes a row and keeps the test message of the row that shifts up', async () => {
    routeApi({ 'POST /torznab/test': { success: true } })
    renderWithProviders(
      <Harness
        initial={[
          { Host: 'http://a', Key: 'aaaaaaa', Name: 'A' },
          { Host: 'http://b', Key: 'bbbbbbb', Name: 'B' },
        ]}
      />,
    )
    const rowB = screen.getByText('B').closest('li') as HTMLElement
    await userEvent.click(within(rowB).getByRole('button', { name: 'Test' }))
    await within(rowB).findByText('Connection successful')

    const rowA = screen.getByText('A').closest('li') as HTMLElement
    await userEvent.click(within(rowA).getByRole('button', { name: 'Delete' }))

    expect(latest.TorznabUrls).toEqual([{ Host: 'http://b', Key: 'bbbbbbb', Name: 'B' }])
    await waitFor(() => expect(screen.queryByText('A')).toBeNull())
    expect(screen.getByText('Connection successful')).toBeTruthy()
  })
})
