import type { ElementType, ReactNode } from 'react'

import { WidgetFieldWrapper, WidgetFieldIcon, WidgetFieldValue, WidgetFieldTitle } from './style'

interface StatisticsFieldProps {
  icon: ElementType
  title: ReactNode
  value: ReactNode
  iconBg: string
  valueBg: string
  fontColor?: string
}

export default function StatisticsField({
  icon: Icon,
  title,
  value,
  iconBg,
  valueBg,
  fontColor,
}: StatisticsFieldProps) {
  return (
    <WidgetFieldWrapper>
      <WidgetFieldTitle>{title}</WidgetFieldTitle>
      <WidgetFieldIcon $bgColor={iconBg} $fontColor={fontColor}>
        <Icon />
      </WidgetFieldIcon>

      <WidgetFieldValue $bgColor={valueBg} $fontColor={fontColor}>
        {value}
      </WidgetFieldValue>
    </WidgetFieldWrapper>
  )
}
