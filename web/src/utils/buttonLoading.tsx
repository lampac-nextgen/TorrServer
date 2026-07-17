import CircularProgress from '@mui/material/CircularProgress'
import type { ReactNode } from 'react'

/** Shared loading affordance for MUI Button — use with startIcon + disabled. */
export function buttonLoadingIcon(loading: boolean, size = 16): ReactNode {
  return loading ? <CircularProgress size={size} color='inherit' /> : undefined
}
