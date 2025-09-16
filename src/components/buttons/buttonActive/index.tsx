import { CircularProgress } from '@mui/material'
import React from 'react'

interface IButtonStyled {
  active: boolean
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
  loading?: boolean
}

const ButtonActive = ({
  onClick,
  type,
  active,
  disabled,
  loading,
}: IButtonStyled) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        text-black
        h-[35px]
        px-3
        w-16
        rounded-6
        shadow-md
        font-semibold
        flex
        justify-center
        items-center
        hover:opacity-60 
        hover:font-bold
        transition
        duration-300
        text-xs
        ${active ? 'bg-paid' : 'bg-unpaid'}
      `}
    >
      {loading ? (
        <CircularProgress
          size={16}
          className={`${active ? 'text-paidFont' : 'text-unpaidFont'}`}
        />
      ) : (
        <p className={`${active ? 'text-paidFont' : 'text-unpaidFont'}`}>
          {active ? 'Ativo' : 'Inativo'}
        </p>
      )}
    </button>
  )
}

export default ButtonActive
