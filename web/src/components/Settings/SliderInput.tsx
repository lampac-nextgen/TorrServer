import { InputAdornment, OutlinedInput, Slider } from '@mui/material'
import { useRef, type ChangeEvent, type FocusEvent } from 'react'
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
  /** Derived label shown next to the value, e.g. preload size in MB. */
  valueHint?: string
  onBlurCallback?: (value: string) => void
}

const SliderBlock = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SliderTitle = styled.div`
  font-size: 13px;
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
  gap: 8px;
  min-width: 108px;
`

const ValueText = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-align: right;
  font-size: 13px;
  line-height: 1.2;
  opacity: 0.85;
`

const HintText = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1.2;
  opacity: 0.65;
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
  const lastNumericRef = useRef(typeof value === 'number' ? value : sliderMin)

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

  const displayValue = typeof value === 'number' ? value : lastNumericRef.current
  const readOnlyLabel = [displayValue, unit].filter(Boolean).join(' ')

  if (typeof value === 'number') lastNumericRef.current = value

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
                width: unit ? 118 : 96,
                '& .MuiOutlinedInput-input': {
                  py: '6px',
                  px: '8px',
                  fontVariantNumeric: 'tabular-nums',
                  textAlign: 'right',
                  MozAppearance: 'textfield',
                  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                },
              }}
              endAdornment={unit ? <InputAdornment position='end'>{unit}</InputAdornment> : undefined}
              inputProps={{ step, min: inputMin, max: inputMax, type: 'number', 'aria-label': title }}
            />
          ) : (
            <ValueText>{readOnlyLabel}</ValueText>
          )}
          {valueHint ? <HintText aria-hidden={false}>{valueHint}</HintText> : null}
        </ValueBox>
      </SliderRow>
    </SliderBlock>
  )
}
