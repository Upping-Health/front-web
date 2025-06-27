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
interface ICustomFormMenu {
  onPushQuestions: (e: any) => void
}

const ButtonFormMenu = ({ label, icon: Icon, onClick }: any) => {
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
  const options = [
    {
      label: 'Texto',
      type: 'text',
      icon: TextFieldsIcon,
      description:
        'Ideal para nomes, títulos ou pequenas informações.',
    },
    {
      label: 'Parágrafo',
      type: 'textarea',
      icon: NotesIcon,
      description:
        'Adequado para descrições ou respostas mais detalhadas.',
    },
    {
      label: 'Múltipla Escolha',
      type: 'checkbox',
      icon: CheckBoxIcon,
      description:
        'Permite selecionar uma ou mais opção entre as disponíveis.',
    },
    {
      label: 'Caixa de Seleção',
      type: 'radio',
      icon: RadioButtonCheckedIcon,
      description:
        'Permite selecionar apenas uma opção entre as disponíveis.',
    },
    {
      label: 'Lista Suspensa',
      type: 'select',
      icon: ArrowDropDownCircleIcon,
      description:
        'Menu em formato de lista que permite escolher uma única opção.',
    },
    {
      label: 'Número',
      type: 'number',
      icon: NumbersIcon,
      description: 'Campo para inserir apenas valores numéricos.',
    },
    {
      label: 'Data',
      type: 'date',
      icon: CalendarTodayIcon,
      description: 'Campo para selecionar uma data específica no calendário.',
    },
    {
      label: 'Arquivo',
      type: 'file',
      icon: AttachFileIcon,
      description: 'Permite o envio (upload) de um arquivo pelo usuário.',
    },
  ]

  return (
    <nav className="grid grid-cols-4 grid-rows-2 gap-2 max-w-full">
      {options.map((opt) => (
        <ButtonFormMenu
          key={opt.type}
          label={opt.label}
          icon={opt.icon || FormatAlignJustifyIcon}
          onClick={() => onPushQuestions(opt)}
        />
      ))}
    </nav>
  )
}

export default CustomFormMenu
