import type { ElementType, ReactNode } from 'react'

import { WidgetFieldWrapper, WidgetFieldIcon, WidgetFieldValue, WidgetFieldTitle } from './style'

interface StatisticsFieldProps {
  icon: ElementType
  title: ReactNode
  value: ReactNode
  iconBg: string
  valueBg: string
}

export default function StatisticsField({ icon: Icon, title, value, iconBg, valueBg }: StatisticsFieldProps) {
  return (
    <WidgetFieldWrapper>
      <WidgetFieldTitle>{title}</WidgetFieldTitle>
      <WidgetFieldIcon $bgColor={iconBg}>
        <Icon />
      </WidgetFieldIcon>

      <WidgetFieldValue $bgColor={valueBg}>{value}</WidgetFieldValue>
    </WidgetFieldWrapper>
  )
}
