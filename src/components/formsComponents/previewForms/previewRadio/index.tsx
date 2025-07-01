'use client'

import { RadioButtonChecked } from '@mui/icons-material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useState } from 'react'
interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

const PreviewRadio = ({ question }: { question: IQuestion }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
  }
  return (
    <div className="flex flex-col gap-3">
     
      {question.options?.map((option, index) => {
        const isChecked = selectedOption === option
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleSelect(option)}
            className="flex items-center gap-2 mt-1 rounded-full"
          >
            {isChecked ? (
              <RadioButtonChecked className="text-terciary dark:text-white text-3xl" />
            ) : (
              <RadioButtonUncheckedIcon className="text-gray-400 dark:text-white text-3xl" />
            )}
            <span className="font-light text-black dark:text-white">{option}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PreviewRadio
