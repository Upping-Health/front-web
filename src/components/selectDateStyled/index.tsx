import React from 'react'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

interface IDatePickerStyled {
  id: string
  label?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  min?: string
  max?: string
  disabled?: boolean
  styles?: string
  stylesInput?: string
  error?: string
  isTouched?: boolean
}

const DatePickerStyled = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  min,
  max,
  disabled,
  styles,
  stylesInput,
  error,
  isTouched
}: IDatePickerStyled) => {
  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 text-darkGray text-sm">{label}</label>}
      <div
        className={`${styles ? styles : ''} bg-none border border-gray border-solid outline-none rounded-xl p-2 flex items-center justify-between ${
          disabled ? 'bg-customGray' : ''
        }`}
      >
        <div className="flex items-center gap-4 w-full">
          {/* <CalendarMonthIcon style={{ color: '#000' }} /> */}
          <input
            type="datetime-local"
            id={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
            disabled={disabled}
            className={`${disabled ? 'bg-customGray' : 'bg-white'} ${
              stylesInput ? stylesInput : ''
            } outline-none text-black font-semibold w-full`}
            placeholder={placeholder}
          />
        </div>
      </div>
      {error && isTouched && (
        <p className="font-light text-red text-sm pt-1 text-center">{error}</p>
      )}
    </div>
  )
}

export default DatePickerStyled
