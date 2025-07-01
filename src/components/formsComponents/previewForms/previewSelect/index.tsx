interface ISelectHeaderProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder?: string
}

import { KeyboardArrowDown } from '@mui/icons-material'
import { useMemo } from 'react'

const PreviewSelect = ({
  id,
  value,
  onChange,
  options,
  placeholder,
}: ISelectHeaderProps) => {
  const optionsMenu = useMemo(() => {
    return options.map((opt) => ({
      value: opt,
      label: opt,
    }))
  }, [])
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="appearance-none text-black dark:text-white text-center bg-white border border-solid outline-none border-gray rounded-xl px-4 py-2 pr-10 w-full dark:bg-slate-700 dark:border-slate-600 h-[48px]"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {optionsMenu.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <KeyboardArrowDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white" />
    </div>
  )
}

export default PreviewSelect
