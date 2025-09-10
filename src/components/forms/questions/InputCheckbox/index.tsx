'use client'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { useCallback } from 'react'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

interface PreviewCheckboxProps {
  question: IQuestion
  value: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
}

const InputCheckbox = ({
  question,
  value = [],
  onChange,
  disabled = false,
}: PreviewCheckboxProps) => {
  const toggleOption = useCallback(
    (option: string) => {
      if (!onChange) return
      const newValue = value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option]
      onChange(newValue)
    },
    [value, onChange],
  )

  return (
    <div className="flex flex-col gap-2">
      {question.options?.map((option, index) => {
        const isChecked = value.includes(option)
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => toggleOption(option)}
            className={`flex items-center gap-2 mt-1 rounded-full ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isChecked ? (
              <CheckBoxIcon className="text-terciary dark:text-white text-3xl" />
            ) : (
              <CheckBoxOutlineBlankIcon className="text-gray-400 dark:text-white text-3xl" />
            )}
            <span className="font-light text-black dark:text-white">
              {option}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default InputCheckbox
