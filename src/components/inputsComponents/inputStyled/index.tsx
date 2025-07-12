import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

interface IInputStyled {
  maxLength?: number
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
  edit?: boolean
  error?: string
  onBlur?: any
  isTouched?: boolean
  stylesLabel?: string
}

const InputStyled = ({
  maxLength,
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
  edit,
  error,
  onBlur,
  isTouched,
  stylesContainer,
  stylesLabel,
}: IInputStyled) => {
  return (
    <div className={`${stylesContainer ?? ''} flex flex-col `}>
      {label && (
        <label className={` mb-1 text-darkGray text-sm ${stylesLabel ?? ''}`}>
          {label}
        </label>
      )}
      <div
        className={`bg-none border border-solid outline-none border-gray rounded-xl p-2 flex items-center justify-between dark:border-slate-700 ${
          disabled ? 'bg-customGray' : ''
        } ${styles ?? ''}`}
      >
        <div
          className={`flex items-center gap-3 w-full ${type === 'color' ? 'justify-center' : ''}`}
        >
          {icon}
          <input
            maxLength={maxLength}
            disabled={disabled}
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            onBlur={onBlur}
            className={`dark:bg-slate-800 outline-none text-black w-[70%] dark:text-white ${stylesInput ?? ''}`}
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
