import 'styled-components'

import { mainColors, themeColors } from './colors'

type AppStyledTheme = (typeof themeColors)['light'] & (typeof mainColors)['light']

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppStyledTheme {}
}
