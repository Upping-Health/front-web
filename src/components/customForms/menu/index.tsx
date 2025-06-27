import React from 'react'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import NotesIcon from '@mui/icons-material/Notes'
import NumbersIcon from '@mui/icons-material/Numbers'
import ListIcon from '@mui/icons-material/List'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle'
import { formDescriptions, formLabels } from '@/utils/forms'
interface ICustomFormMenu {
  onPushQuestions: (e: any) => void
}

export const formIcons: Record<string, React.ElementType> = {
  text: TextFieldsIcon,
  textarea: NotesIcon,
  checkbox: CheckBoxIcon,
  radio: RadioButtonCheckedIcon,
  select: ArrowDropDownCircleIcon,
  number: NumbersIcon,
  date: CalendarTodayIcon,
  file: AttachFileIcon,
  default: FormatAlignJustifyIcon,
}

const ButtonFormMenu = ({ label, type, onClick }: any) => {
  const Icon = formIcons[type] || formIcons.default
  return (
    <button
      onClick={onClick}
      className="py-2 px-3 rounded-xl border flex items-center gap-2 bg-white flex-shrink-0 transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 shadow-sm hover:shadow-md dark:bg-slate-700 dark:border-slate-600"
    >
      {Icon && <Icon className="text-base text-gray-700 dark:text-white" />}
      <p className="text-black font-semibold text-base dark:text-white">{label}</p>
    </button>
  )
}

const CustomFormMenu = ({ onPushQuestions }: ICustomFormMenu) => {
  const options = Object.keys(formLabels).map((type) => ({
    type,
    label: formLabels[type],
    description: formDescriptions[type],
  }))
  

  return (
    <nav className="grid grid-cols-4 grid-rows-2 gap-2 max-w-full">
      {options.map((opt) => (
        <ButtonFormMenu
          key={opt.type}
          label={opt.label}
          type={opt.type}
          onClick={() => onPushQuestions(opt)}
        />
      ))}
    </nav>
  )
}

export default CustomFormMenu
