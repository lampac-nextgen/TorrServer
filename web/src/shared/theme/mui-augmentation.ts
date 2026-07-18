import type {} from '@mui/material/themeCssVarsAugmentation'

export {}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    cardAction: true
  }
}
