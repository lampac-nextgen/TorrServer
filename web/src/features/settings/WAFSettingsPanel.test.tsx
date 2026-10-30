// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { isDisabled } from '../../test/dom'
import { axiosError, callsTo, routeApi } from '../../test/mockApi'
import { renderWithProviders } from '../../test/renderWithProviders'

import WAFSettingsPanel from './WAFSettingsPanel'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

const snapshot = (over: Record<string, unknown> = {}) => ({
  whitelist: '10.0.0.0/8',
  blacklist: '',
  referers: '',
  ip_enabled: true,
  referer_enabled: false,
  read_only: false,
  warnings: [],
  ...over,
})

const saveBtn = () => screen.getByRole('button', { name: 'Save access lists' })

describe('WAFSettingsPanel', () => {
  it('shows a retryable error when the lists fail to load', async () => {
    let fail = true
    routeApi({
      'GET /waf': () => {
        if (fail) throw axiosError(500, { error: 'boom' })
        return snapshot()
      },
    })
    renderWithProviders(<WAFSettingsPanel />)
    expect((await screen.findByRole('alert')).textContent).toBe('boom')
    fail = false
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }))
    expect(await screen.findByLabelText('IP whitelist')).toBeTruthy()
  })

  it('enables Save only when a list changed, reports dirty state, and posts all three lists', async () => {
    routeApi({
      'GET /waf': snapshot(),
      'POST /waf': snapshot({ blacklist: '1.2.3.4' }),
    })
    const onDirty = vi.fn()
    renderWithProviders(<WAFSettingsPanel onDirtyChange={onDirty} />)
    const black = await screen.findByLabelText('IP blacklist')
    expect(isDisabled(saveBtn())).toBe(true)

    await userEvent.type(black, '1.2.3.4')
    expect(isDisabled(saveBtn())).toBe(false)
    expect(onDirty).toHaveBeenLastCalledWith(true)

    await userEvent.click(saveBtn())
    expect(await screen.findByText('Access lists saved and reloaded')).toBeTruthy()
    expect(callsTo('POST', '/waf')[0].body).toEqual({
      whitelist: '10.0.0.0/8',
      blacklist: '1.2.3.4',
      referers: '',
    })
    expect(isDisabled(saveBtn())).toBe(true)
    expect(onDirty).toHaveBeenLastCalledWith(false)
  })

  it('locks the form when the server is read-only', async () => {
    routeApi({ 'GET /waf': snapshot({ read_only: true }) })
    renderWithProviders(<WAFSettingsPanel />)
    expect(await screen.findByRole('status')).toBeTruthy()
    expect(isDisabled(await screen.findByLabelText('IP whitelist'))).toBe(true)
    expect(isDisabled(saveBtn())).toBe(true)
  })

  it('a 403 on save switches to read-only and keeps the edited text', async () => {
    routeApi({
      'GET /waf': snapshot(),
      'POST /waf': () => {
        throw axiosError(403, { error: 'Read-only mode' })
      },
    })
    renderWithProviders(<WAFSettingsPanel />)
    await userEvent.type(await screen.findByLabelText('IP blacklist'), 'x')
    await userEvent.click(saveBtn())
    await waitFor(() =>
      expect(
        screen.getAllByText('Server configuration is read-only. Access lists cannot be changed.').length,
      ).toBeGreaterThan(0),
    )
    expect((screen.getByLabelText('IP blacklist') as HTMLTextAreaElement).value).toBe('x')
    expect(isDisabled(saveBtn())).toBe(true)
  })

  it('lists parse warnings with the list name and reason', async () => {
    routeApi({
      'GET /waf': snapshot({
        warnings: [
          { list: 'blacklist', line: 3, code: 'invalid_ip_range' },
          { list: 'referers', code: 'invalid_ip_range' },
        ],
      }),
    })
    renderWithProviders(<WAFSettingsPanel />)
    const alert = await screen.findByText('Parse warnings:')
    const items = alert.parentElement!.querySelectorAll('li')
    expect(items).toHaveLength(2)
    expect(items[0].textContent).toMatch(/line 3/)
  })
})
