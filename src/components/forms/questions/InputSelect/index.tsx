'use client'

import { KeyboardArrowDown } from '@mui/icons-material'
import { useMemo } from 'react'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

interface PreviewSelectProps {
  question: IQuestion
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

const InputSelect = ({
  question,
  value = '',
  onChange,
  disabled = false,
  placeholder,
}: PreviewSelectProps) => {
  const optionsMenu = useMemo(
    () =>
      question.options?.map((opt) => ({
        value: opt,
        label: opt,
      })) ?? [],
    [question.options],
  )

  return (
    <div className="relative">
      <select
        id={question.label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`appearance-none text-black dark:text-white text-center bg-white border border-solid outline-none border-gray rounded-xl px-4 py-2 pr-10 w-full dark:bg-slate-700 dark:border-slate-600 h-[48px] ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
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

export default InputSelect
