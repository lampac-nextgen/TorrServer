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
  /** Derived label in a fixed side column, e.g. preload size in MB. */
  valueHint?: string
  onBlurCallback?: (value: string) => void
}

/** Fixed value column so all rows share the same right edge. */
const VALUE_COL = '7.5rem'
const HINT_COL = '4.75rem'

const SliderBlock = styled.div`
  margin-bottom: 14px;

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
  grid-template-columns: minmax(0, 1fr) ${VALUE_COL} ${HINT_COL};
  column-gap: 10px;
  align-items: center;
`

const ValueBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 0;
`

const HintBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-width: 0;
`

const ValueText = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-align: right;
  font-size: 13px;
  line-height: 1.2;
  opacity: 0.9;
`

const HintText = styled.span`
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  font-size: 12px;
  line-height: 1.2;
  opacity: 0.6;
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
              fullWidth
              sx={{
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
        </ValueBox>

        <HintBox>{valueHint ? <HintText>{valueHint}</HintText> : null}</HintBox>
      </SliderRow>
    </SliderBlock>
  )
}
