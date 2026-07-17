import { Grid, InputAdornment, OutlinedInput, Slider, Typography } from '@mui/material'
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
  unit?: string
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
  unit,
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

  return (
    <>
      <div>{title}</div>

      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider
            min={sliderMin}
            max={sliderMax}
            value={displayValue}
            onChange={onSliderChange}
            step={step}
            color='secondary'
          />
        </Grid>

        {isProMode ? (
          <Grid item>
            <OutlinedInput
              value={value}
              margin='dense'
              onChange={onInputChange}
              onBlur={onBlur}
              style={{ width: unit ? '110px' : '91px', marginTop: '-6px' }}
              endAdornment={unit ? <InputAdornment position='end'>{unit}</InputAdornment> : undefined}
              inputProps={{ step, min: inputMin, max: inputMax, type: 'number' }}
            />
          </Grid>
        ) : (
          <Grid item>
            <Typography
              component='span'
              variant='body2'
              sx={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', minWidth: 64, textAlign: 'right' }}
            >
              {displayValue}
              {unit ? ` ${unit}` : ''}
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  )
}
