import { Grid, OutlinedInput, Slider } from '@mui/material'
import type { ChangeEvent, FocusEvent } from 'react'

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
  onBlurCallback?: (value: string) => void
}

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

  return (
    <>
      <div>{title}</div>

      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider
            min={sliderMin}
            max={sliderMax}
            value={typeof value === 'number' ? value : 0}
            onChange={onSliderChange}
            step={step}
            color='secondary'
          />
        </Grid>

        {isProMode && (
          <Grid item>
            <OutlinedInput
              value={value}
              margin='dense'
              onChange={onInputChange}
              onBlur={onBlur}
              style={{ width: '91px', marginTop: '-6px' }}
              inputProps={{ step, min: inputMin, max: inputMax, type: 'number' }}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
