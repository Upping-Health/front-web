import React from 'react'
import SaveIcon from '@mui/icons-material/Save'
import VisibilityIcon from '@mui/icons-material/Visibility'
interface ICustomFormMenu {
}




interface IButtonStyled {
  styles: string
  stylesIcon?: any
  textColor?: string
  bgColor?: string
  title: any
  icon?: any
  onClick?: () => void
  type: 'submit' | 'button' | undefined
  disabled?: boolean
}

const InputHeader = ({ label, placeholder, onChange, id, value }: any) => {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      type={'text'}
      className={`text-black dark:text-white text-center  bg-white border border-solid outline-none border-gray  rounded-xl p-2 flex items-center justify-between w-[50%] dark:bg-slate-700 dark:border-slate-600`}
      placeholder={placeholder}
    />
  )
}

const ButtonHeader = ({
  styles,
  bgColor,
  textColor,
  title,
  onClick,
  type,
  icon,
  disabled,
}: IButtonStyled) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${disabled ? 'bg-darkGray' : ''} ${bgColor ? bgColor : ''} ${textColor ? textColor : 'text-white'} py-3 bg-black  rounded-xl font-semibold flex justify-center items-center gap-2 ${styles ? styles : ''} `}
      onClick={onClick}
    >
      {icon && React.cloneElement(icon)}

      {title}
    </button>
  )
}

const HeaderFormMenu = ({}: ICustomFormMenu) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between ">
        <InputHeader placeholder="Título do formulário" />
        <ButtonHeader
          onClick={() => {}}
          title="Salvar"
          type="button"
          styles="w-[200px] bg-primary"
          icon={<SaveIcon />}
        />
      </div>

      <div className="flex justify-between ">
        <InputHeader placeholder="Descrição do formulário" />
        <ButtonHeader
          onClick={() => {}}
          title="Visualizar"
          type="button"
          styles="w-[200px] dark:bg-white dark:text-black"
          icon={<VisibilityIcon />}
        />
      </div>
    </div>
  )
}

export default HeaderFormMenu
