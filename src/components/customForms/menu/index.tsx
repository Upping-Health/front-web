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

interface ICustomFormMenu {}

const iconMap: Record<string, React.ElementType> = {
  text: TextFieldsIcon,
  textarea: NotesIcon,
  number: NumbersIcon,
  select: ListIcon,
  checkbox: CheckBoxIcon,
  date: CalendarTodayIcon,
  file: AttachFileIcon,
  radio: RadioButtonCheckedIcon,
}

const ButtonFormMenu = ({ label, icon: Icon }: any) => {
  return (
    <button
      className="py-2 px-3 rounded-xl border flex items-center gap-2 bg-white flex-shrink-0 transition-all duration-200 ease-in-out hover:bg-gray-100 active:scale-95 shadow-sm hover:shadow-md"
    >
      {Icon && <Icon className="text-base text-gray-700" />}
      <p className="text-black font-semibold text-base">{label}</p>
    </button>
  )
}


const CustomFormMenu = ({}: ICustomFormMenu) => {
  const options = [
    { label: 'Texto curto', value: 'text', icon: TextFieldsIcon },
    { label: 'Texto longo', value: 'textarea', icon: NotesIcon },
    { label: 'Número', value: 'number', icon: NumbersIcon },
    { label: 'Lista Suspensa', value: 'select', icon: CheckBoxIcon },
    { label: 'Múltiplica seleção', value: 'checkbox', icon: CheckBoxIcon },
    { label: 'Data', value: 'date', icon: CalendarTodayIcon },
    { label: 'Arquivo', value: 'file', icon: AttachFileIcon },
    { label: 'Caixa de Seleção', value: 'radio', icon: RadioButtonCheckedIcon },
  ]

  return (
    <nav className="flex flex-row flex-wrap gap-1 max-w-full">
      {options.map((opt) => (
        <ButtonFormMenu
          key={opt.value}
          label={opt.label}
          icon={opt.icon|| FormatAlignJustifyIcon}
        />
      ))}
    </nav>
  )
}

export default CustomFormMenu
