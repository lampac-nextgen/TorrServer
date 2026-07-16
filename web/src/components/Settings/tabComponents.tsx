import type { ReactNode } from 'react'

export const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
})

interface TabPanelProps {
  children?: ReactNode
  value: number
  index: number
  [key: string]: unknown
}

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => (
  <div role='tabpanel' hidden={value !== index} id={`full-width-tabpanel-${index}`} {...other}>
    {value === index && <>{children}</>}
  </div>
)
