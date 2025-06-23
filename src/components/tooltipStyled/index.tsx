import { colors } from '@/utils/colors/colors'
import { Tooltip } from '@mui/material'
import React from 'react'

interface ITooltipStyled {
  children: any,
  title: string
}
const TooltipStyled = ({
  children,
  title
}: ITooltipStyled) => {
  return (
    <Tooltip
      title={title}
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
    {children}
    </Tooltip>
  )
}

export default TooltipStyled
