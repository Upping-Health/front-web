import React from "react"

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
      className={`${disabled ? 'bg-darkGray' : ''} ${bgColor ? bgColor : ''} ${textColor ? textColor : 'text-white'} py-3 bg-black rounded-xl font-semibold flex justify-center items-center gap-2 hover:opacity-70 hover:shadow ${styles ? styles : ''} `}
      onClick={onClick}
    >
      {icon && React.cloneElement(icon)}

      {title}
    </button>
  )
}

export default ButtonHeader;