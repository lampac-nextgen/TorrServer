// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { routeApi } from '../../test/mockApi'
import { renderWithProviders } from '../../test/renderWithProviders'

import HTTPSSettingsPanel from './HTTPSSettingsPanel'

vi.mock('axios', async () => (await import('../../test/mockApi')).axiosModule)

const status = (over: Record<string, unknown> = {}, cert: Record<string, unknown> = {}) => ({
  enabled: true,
  port: '8091',
  http_port: '8090',
  http_enabled: true,
  force_https: false,
  http_media: false,
  read_only: false,
  cert_from_flags: false,
  cert: { source: 'uploaded', cert_file: '/d/a.crt', key_file: '/d/a.key', trusted: true, ...cert },
  ...over,
})

const show = async (s: ReturnType<typeof status>) => {
  routeApi({ 'GET /ssl/status': s })
  const view = renderWithProviders(<HTTPSSettingsPanel onUpdate={vi.fn()} />)
  await screen.findAllByText(/^HTTPS/)
  return view
}

afterEach(() => vi.unstubAllGlobals())

describe('HTTPSSettingsPanel: status details', () => {
  it.each([
    [{}, 'HTTPS on port 8091, HTTP on port 8090'],
    [{ http_enabled: false }, 'HTTPS only, port 8091'],
    [{ http_media: true }, 'HTTPS on port 8091, HTTP for media only'],
  ])('describes the serving mode %j', async (over, text) => {
    await show(status(over))
    expect(screen.getByText(text)).toBeTruthy()
  })

  it('lists subject, issuer, SANs, files in use and the trusted state for a CA certificate', async () => {
    await show(
      status(
        {},
        {
          subject: 'CN=ts.local',
          issuer: 'CN=Let’s CA',
          dns_names: ['ts.local'],
          ips: ['10.0.0.2'],
          not_after: '2999-01-01T00:00:00Z',
        },
      ),
    )
    expect(screen.getByText('CN=ts.local')).toBeTruthy()
    expect(screen.getByText('CN=Let’s CA')).toBeTruthy()
    expect(screen.getByText(/ts\.local, 10\.0\.0\.2/)).toBeTruthy()
    expect(screen.getByText(/\/d\/a\.crt/)).toBeTruthy()
    expect(screen.getByText('Yes')).toBeTruthy()
  })

  it('hides the issuer of a self-signed certificate and shows its hint', async () => {
    await show(status({}, { source: 'self-signed', issuer: 'CN=self', trusted: false }))
    expect(screen.queryByText('CN=self')).toBeNull()
    expect(screen.getByText('No')).toBeTruthy()
  })

  it('flags a certificate that expires within 30 days', async () => {
    const soon = new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString()
    await show(status({}, { not_after: soon }))
    const valid = screen.getByText(new Date(soon).toLocaleDateString())
    expect(valid.className).toContain('text-danger')
  })

  it('surfaces a certificate error and the "from flags" hint, with no cert actions for none', async () => {
    await show(status({ cert_from_flags: true }, { source: 'none', error: 'bad pem' }))
    expect(screen.getByText('bad pem')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Download certificate' })).toBeNull()
  })

  it('warns when the page is plain HTTP on a non-local host', async () => {
    const original = window.location
    Object.defineProperty(window, 'location', {
      value: { ...original, protocol: 'http:', hostname: '192.168.1.5' },
      configurable: true,
    })
    try {
      await show(status())
      expect(screen.getByText(/plain HTTP/)).toBeTruthy()
    } finally {
      Object.defineProperty(window, 'location', { value: original, configurable: true })
    }
  })
})

describe('HTTPSSettingsPanel: download', () => {
  const click = () => userEvent.click(screen.getByRole('button', { name: 'Download certificate' }))

  it('saves the certificate through a temporary link', async () => {
    const created: string[] = []
    URL.createObjectURL = (() => (created.push('blob:x'), 'blob:x')) as typeof URL.createObjectURL
    URL.revokeObjectURL = () => {}
    const clicked = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      expect(this.download).toBe('torrserver.crt')
    })
    await show(status())
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('PEM', { status: 200 })),
    )
    await click()
    await waitFor(() => expect(clicked).toHaveBeenCalled())
    expect(created).toHaveLength(1)
  })

  it('reports a failed download', async () => {
    await show(status())
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('no', { status: 500 })),
    )
    await click()
    // The thrown message lands in the panel's message area next to the button.
    await waitFor(() => expect(screen.getAllByText('Download certificate').length).toBeGreaterThan(1))
  })
})
