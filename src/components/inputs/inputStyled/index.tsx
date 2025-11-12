import React from 'react'

interface IInputStyled {
  maxLength?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  id: string
  label?: string
  type: string
  icon?: React.ReactElement
  placeholder?: string
  value?: any
  onChange?: (value: any) => void
  stylesContainer?: string
  styles?: string
  stylesInput?: string
  error?: string
  onBlur?: any
  isTouched?: boolean
  stylesLabel?: string
  highlight?: boolean
  required?: boolean
}

const InputStyled = ({
  maxLength,
  min,
  max,
  step,
  disabled,
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
  id,
  styles,
  stylesInput,
  error,
  onBlur,
  isTouched,
  stylesContainer,
  stylesLabel,
  highlight,
  required,
}: IInputStyled) => {
  return (
    <div className={`${stylesContainer ?? ''} flex flex-col`}>
      {label && (
        <label
          htmlFor={id}
          className={`mb-1 text-black dark:text-gray-300 text-sm flex items-center gap-1 ${stylesLabel ?? ''}`}
        >
          {label}
          {required && <span className="text-red">*</span>}
        </label>
      )}
      <div
        className={`bg-none relative border border-solid outline-none rounded-xl p-2 flex items-center justify-between
          border-gray-300 dark:border-slate-700
          ${disabled ? 'bg-customGray' : ''}
          ${styles ?? ''}`}
      >
        {highlight && (
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md bg-primary" />
        )}
        <div className={`flex items-center gap-2 w-full relative`}>
          {icon}
          <input
            maxLength={maxLength}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            required={required}
            className={`dark:bg-gray-800 outline-none text-black dark:text-white w-full pl-1 ${stylesInput ?? ''}`}
          />
        </div>
      </div>
      {error && isTouched && (
        <p className="font-light text-red text-sm pt-1 text-center">{error}</p>
      )}
    </div>
  )
}

export default InputStyled
