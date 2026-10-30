import type { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'

import 'shared/i18n'

/** A QueryClient that fails fast and never retries, so a test sees the first error. */
export function makeTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, gcTime: Infinity },
      mutations: { retry: false },
    },
  })
}

/** Render with the providers the app wraps `<App />` in (see src/index.tsx). */
export function renderWithProviders(
  ui: ReactElement,
  options: { queryClient?: QueryClient } & Omit<RenderOptions, 'wrapper'> = {},
) {
  const { queryClient = makeTestQueryClient(), ...rest } = options
  const result = render(ui, {
    wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
    ...rest,
  })
  return { ...result, queryClient }
}
