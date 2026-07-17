import { DarkModeContext } from 'components/App'
import { useContext } from 'react'
import { THEME_MODES } from 'style/materialUISetup'

const { LIGHT, DARK } = THEME_MODES

/**
 * Light keeps the classic colored widgets.
 * Dark uses charcoal greys only — neon green/blue/purple accents read as broken on
 * the master-style dark shell (#323637 / #545a5e).
 */
const colors = {
  light: {
    downloadSpeed: { iconBGColor: '#118f00', valueBGColor: '#13a300' },
    uploadSpeed: { iconBGColor: '#0146ad', valueBGColor: '#0058db' },
    peers: { iconBGColor: '#cdc118', valueBGColor: '#d8cb18', fontColor: '#1a1a1a' },
    piecesCount: { iconBGColor: '#b6c95e', valueBGColor: '#c0d076' },
    piecesLength: { iconBGColor: '#0982c8', valueBGColor: '#098cd7' },
    status: { iconBGColor: '#aea25b', valueBGColor: '#b4aa6e' },
    size: { iconBGColor: '#9b01ad', valueBGColor: '#ac03bf' },
    category: { iconBGColor: '#914820', valueBGColor: '#c9632c' },
  },
  dark: {
    downloadSpeed: { iconBGColor: '#3c4244', valueBGColor: '#4a5256' },
    uploadSpeed: { iconBGColor: '#3c4244', valueBGColor: '#545a5e' },
    peers: { iconBGColor: '#454b4f', valueBGColor: '#5a6166', fontColor: '#f1eff3' },
    piecesCount: { iconBGColor: '#3c4244', valueBGColor: '#4a5256' },
    piecesLength: { iconBGColor: '#454b4f', valueBGColor: '#5a6166' },
    status: { iconBGColor: '#4a5256', valueBGColor: '#656f76' },
    size: { iconBGColor: '#3c4244', valueBGColor: '#545a5e' },
    category: { iconBGColor: '#454b4f', valueBGColor: '#5a6166' },
  },
} as const

export type WidgetColorName = keyof typeof colors.light

export type WidgetColors = {
  iconBGColor: string
  valueBGColor: string
  fontColor?: string
}

export default function useGetWidgetColors(widgetName: WidgetColorName): WidgetColors {
  const { isDarkMode } = useContext(DarkModeContext)
  return colors[isDarkMode ? DARK : LIGHT][widgetName]
}
