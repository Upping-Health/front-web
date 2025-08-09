import React from 'react'

interface ITextAreaStyled {
  maxLength?: number
  disabled?: boolean
  id: string
  label?: string
  placeholder?: string
  value?: any
  onChange?: (value: any) => void
  styles?: string
  stylesTextArea?: string
  error?: string
  onBlur?: any
  isTouched?: boolean
}

const TextAreaStyled = ({
  maxLength,
  disabled,
  label,
  placeholder,
  value,
  onChange,
  id,
  styles,
  stylesTextArea,
  error,
  onBlur,
  isTouched,
}: ITextAreaStyled) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-darkGray dark:text-white">{label}</label>
      )}
      <div
        className={`${styles ? styles : ''} border border-gray rounded-xl p-2 ${disabled ? 'bg-customGray' : ''}`}
      >
        <textarea
          maxLength={maxLength}
          disabled={disabled}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          className={`
            w-full resize-none outline-none text-black font-light
            ${disabled ? 'bg-customGray' : 'bg-white'}
            ${stylesTextArea ? stylesTextArea : ''}
          `}
          rows={2}
        />
      </div>
      {error && isTouched && (
        <p className="font-light text-red text-sm pt-1 text-center">{error}</p>
      )}
    </div>
  )
}

export default TextAreaStyled
