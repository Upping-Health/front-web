import React from 'react'

interface IButtonStyled {
  active: boolean
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
}

const ButtonActive = ({ onClick, type, active, disabled }: IButtonStyled) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        text-black
        h-[35px]
        px-3
        w-[65px]
        rounded-[6px]
        font-medium
        flex
        justify-center
        items-center
        hover:opacity-60 
        hover:font-bold
        transition
        duration-300
        text-[12.8px]
        ${active ? 'bg-paid' : 'bg-unpaid'}
      `}
    >
      <p
        className={`${active ? 'text-paidFont' : 'text-unpaidFont'} font-[600]`}
      >
        {active ? 'Ativo' : 'Inativo'}
      </p>
    </button>
  )
}

export default ButtonActive
