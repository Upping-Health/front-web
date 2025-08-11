import { colors } from '@/lib/colors/colors'
import { Tooltip } from '@mui/material'
import React from 'react'

interface IButtonStyled {
  styles: string
  icon?: any
  onClick?: () => void
  type: 'submit' | 'button' | undefined
  disabled?: boolean
}
const ButtonIconStyled = ({
  styles,
  onClick,
  type,
  icon,
  disabled,
}: IButtonStyled) => {
  return (
    <Tooltip
      title="Iniciar consulta"
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: colors.white,
            color: colors.black,
            fontSize: '0.875rem',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
          },
        },

        arrow: {
          sx: {
            color: colors.black,
          },
        },
      }}
    >
      <button
        disabled={disabled}
        type={type}
        className={`${disabled ? 'bg-darkGray' : ''} ${styles} p-3 bg-black  rounded-[6px] font-semibold flex justify-center items-center gap-2 `}
        onClick={onClick}
      >
        {icon && React.cloneElement(icon)}
      </button>
    </Tooltip>
  )
}

export default ButtonIconStyled
