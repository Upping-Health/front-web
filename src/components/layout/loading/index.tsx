import { colors } from '@/lib/colors/colors'
import { CircularProgress } from '@mui/material'
import React from 'react'
import clsx from 'clsx'

interface LoadingProps {
  text?: string
  className?: string
}

const Loading = ({ text, className }: LoadingProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center h-screen gap-4',
        className,
      )}
    >
      <CircularProgress className="dark:text-white text-primary text-2xl" />
      <p className="text-primary dark:text-white font-semibold">
        {text || 'Carregando...'}
      </p>
    </div>
  )
}

export default Loading
