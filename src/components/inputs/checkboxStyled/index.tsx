'use client'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

interface SingleCheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const SingleCheckbox = ({ label, checked, onChange }: SingleCheckboxProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 mt-1 rounded-full"
    >
      {checked ? (
        <CheckBoxIcon className="text-terciary dark:text-white text-3xl" />
      ) : (
        <CheckBoxOutlineBlankIcon className="text-gray-400 dark:text-white text-3xl" />
      )}
      <span className="font-light text-black dark:text-white">{label}</span>
    </button>
  )
}

export default SingleCheckbox
