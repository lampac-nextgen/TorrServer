// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'

import { renderWithProviders } from '@/test/renderWithProviders'

import SpeedCharts from './SpeedCharts'

const stat = (label: string) => screen.getByText(label).textContent ?? ''

describe('SpeedCharts peak and average', () => {
  it('averages real samples only, not the zero placeholders the history starts with', () => {
    const { rerender } = renderWithProviders(<SpeedCharts downloadSpeed={1_000_000} uploadSpeed={0} />)
    rerender(<SpeedCharts downloadSpeed={1_000_000} uploadSpeed={1} />)
    // Two samples of the same speed: average equals peak (a 60-slot mean would be ~1/30 of it).
    const peak = stat('Peak').replace('Peak', '').trim()
    const avg = stat('Avg').replace('Avg', '').trim()
    expect(avg).toBe(peak)
  })

  it('shows the server-side peak when it is above anything the chart sampled', () => {
    renderWithProviders(<SpeedCharts downloadSpeed={1000} uploadSpeed={0} peakDownloadSpeed={50_000_000} />)
    const peak = stat('Peak').replace('Peak', '').trim()
    const avg = stat('Avg').replace('Avg', '').trim()
    expect(peak).not.toBe(avg)
    expect(peak).toMatch(/Mbps|Gbps/)
  })
})
