'use client'

import { RadioButtonChecked } from '@mui/icons-material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

interface SingleCheckboxProps {
  id?: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const RadioStyled = ({ id, label, checked, onChange }: SingleCheckboxProps) => {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 rounded-full"
    >
      {checked ? (
        <RadioButtonChecked className="text-terciary dark:text-white text-3xl" />
      ) : (
        <RadioButtonUncheckedIcon className="text-gray-400 dark:text-white text-3xl" />
      )}
      <span className="font-light text-black dark:text-white">{label}</span>
    </button>
  )
}

export default RadioStyled
