import React from 'react'

interface InputHeaderProps {
  id: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const InputHeader: React.FC<InputHeaderProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      id={id}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      type="text"
      className="dark:text-white text-center bg-white border border-solid outline-none border-gray rounded-xl p-2 flex items-center justify-between w-[50%] dark:bg-slate-700 dark:border-slate-600"
      placeholder={placeholder}
    />
  )
}

export default InputHeader
