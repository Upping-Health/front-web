import { CircularProgress } from '@mui/material'
import React from 'react'
import clsx from 'clsx'

interface LoadingProps {
  text?: string
  className?: string
  color?: string
}

const Loading = ({ text, className, color }: LoadingProps) => {
  const fixedColor = color ? { color } : {}

  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center h-screen gap-4',
        className,
      )}
    >
      <CircularProgress
        sx={fixedColor}
        className={clsx(
          'text-2xl',
          color ? null : 'text-primary dark:text-white',
        )}
      />
      <p
        style={fixedColor}
        className={clsx(
          'font-semibold',
          color ? null : 'text-primary dark:text-white',
        )}
      >
        {text || 'Carregando...'}
      </p>
    </div>
  )
}

export default Loading
