'use client'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import { useState } from 'react'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

const PreviewCheckbox = ({ question }: { question: IQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {question.options?.map((option, index) => {
        const isChecked = selectedOptions.includes(option)
        return (
          <button
            key={index}
            type="button"
            onClick={() => toggleOption(option)}
            className="flex items-center gap-2 mt-1 rounded-full"
          >
            {isChecked ? (
              <CheckBoxIcon className="text-terciary dark:text-white text-3xl" />
            ) : (
              <CheckBoxOutlineBlankIcon className="text-gray-400 dark:text-white text-3xl" />
            )}
            <span className="font-light text-black dark:text-white">{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PreviewCheckbox
