import { InputAdornment, OutlinedInput, Slider } from '@mui/material'
import type { ChangeEvent, FocusEvent } from 'react'
import styled from 'styled-components'

interface SliderInputProps {
  isProMode?: boolean
  title: string
  value: number | ''
  setValue: (value: number | '') => void
  sliderMin: number
  sliderMax: number
  inputMin: number
  inputMax: number
  step?: number
  unit?: string
  /** Extra text next to the value, e.g. computed MB for preload %. */
  valueHint?: string
  onBlurCallback?: (value: string) => void
}

const SliderBlock = styled.div`
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SliderTitle = styled.div`
  font-size: 14px;
  line-height: 1.35;
  margin-bottom: 4px;
  word-break: break-word;
`

const SliderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
`

const ValueBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 88px;
`

const ValueText = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-align: right;
  font-size: 13px;
  line-height: 1.2;
  opacity: 0.85;
`

const ValueHint = styled.div`
  margin-top: 4px;
  text-align: right;
  font-size: 12px;
  line-height: 1.2;
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
`

export default function SliderInput({
  isProMode,
  title,
  value,
  setValue,
  sliderMin,
  sliderMax,
  inputMin,
  inputMax,
  step = 1,
  unit,
  valueHint,
  onBlurCallback,
}: SliderInputProps) {
  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const blurValue = event.target.value
    const numeric = Number(blurValue)
    if (numeric < inputMin) return setValue(inputMin)
    if (numeric > inputMax) return setValue(inputMax)

    onBlurCallback?.(blurValue)
  }

  const onInputChange = ({ target: { value: next } }: ChangeEvent<HTMLInputElement>) =>
    setValue(next === '' ? '' : Number(next))
  const onSliderChange = (_: Event, newValue: number | number[]) => setValue(newValue as number)

  const displayValue = typeof value === 'number' ? value : 0
  const readOnlyLabel = [displayValue, unit, valueHint ? `(${valueHint})` : null].filter(Boolean).join(' ')

  return (
    <SliderBlock>
      <SliderTitle>{title}</SliderTitle>

      <SliderRow>
        <Slider
          min={sliderMin}
          max={sliderMax}
          value={displayValue}
          onChange={onSliderChange}
          step={step}
          color='secondary'
          size='small'
        />

        <ValueBox>
          {isProMode ? (
            <OutlinedInput
              value={value}
              margin='dense'
              size='small'
              onChange={onInputChange}
              onBlur={onBlur}
              sx={{
                width: 96,
                '& .MuiOutlinedInput-input': {
                  py: '8px',
                  px: '10px',
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                },
              }}
              endAdornment={unit ? <InputAdornment position='end'>{unit}</InputAdornment> : undefined}
              inputProps={{ step, min: inputMin, max: inputMax, type: 'number', 'aria-label': title }}
            />
          ) : (
            <ValueText>{readOnlyLabel}</ValueText>
          )}
        </ValueBox>
      </SliderRow>

      {isProMode && valueHint ? <ValueHint>{valueHint}</ValueHint> : null}
    </SliderBlock>
  )
}
