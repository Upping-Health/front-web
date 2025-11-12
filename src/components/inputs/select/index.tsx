import React, { useMemo } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface ISelectStyled {
  id: string
  label?: string
  icon?: React.ReactElement
  placeholder?: string
  value?: any
  onChange?: (value: any) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  styles?: string
  options?: any
  stylesInput?: string
  stylesLabel?: string
  required?: boolean
}

const SelectStyled = ({
  label,
  icon,
  value,
  onChange,
  onBlur,
  id,
  styles,
  options,
  stylesLabel,
  required,
}: ISelectStyled) => {
  const optionsSex = [
    { value: 'male', text: 'Masculino' },
    { value: 'female', text: 'Feminino' },
  ]

  const optionsSelect = useMemo(() => {
    return options?.length > 0 ? options : optionsSex
  }, [options, optionsSex])

  return (
    <div className="flex flex-col ">
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
        className={`${styles} border border-gray dark:border-slate-700 border-solid outline-none rounded-xl p-2 flex items-center justify-between text-black`}
      >
        <div className="flex items-center w-full relative">
          {icon && <>{icon}</>}
          <select
            name={id}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full appearance-none outline-none bg-transparent dark:text-white ${icon ? 'pl-4' : 'pl-1'}`}
          >
            {optionsSelect?.map((item: any) => (
              <option
                className="text-black"
                value={item.value}
                key={item.value}
              >
                {item.text}
              </option>
            ))}
          </select>
          <div className="absolute right-0 pointer-events-none">
            <KeyboardArrowDownIcon className="dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectStyled
