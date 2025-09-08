'use client'

import { RadioButtonChecked } from '@mui/icons-material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

interface PreviewRadioProps {
  question: IQuestion
  value?: string | null
  onChange?: (value: string) => void
  disabled?: boolean
}

const InputRadio = ({
  question,
  value = null,
  onChange,
  disabled = false,
}: PreviewRadioProps) => {
  const handleSelect = (option: string) => {
    if (!onChange) return
    onChange(option)
  }

  return (
    <div className="flex flex-col gap-3">
      {question.options?.map((option, index) => {
        const isChecked = value === option
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => handleSelect(option)}
            className={`flex items-center gap-2 mt-1 rounded-full ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isChecked ? (
              <RadioButtonChecked className="text-terciary dark:text-white text-3xl" />
            ) : (
              <RadioButtonUncheckedIcon className="text-gray-400 dark:text-white text-3xl" />
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

export default InputRadio
