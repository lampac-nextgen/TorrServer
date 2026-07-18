import type { Theme } from '@mui/material/styles'

import { createAppTheme } from 'shared/theme/createAppTheme'

/** Singleton app theme (cssVariables + colorSchemes). */
export const appTheme: Theme = createAppTheme()
