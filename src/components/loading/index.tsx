import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'
import React, { useState } from 'react'

const Loading = ({ text }: { text?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <CircularProgress style={{ fontSize: 36, color: colors.black }} />
      <p className="text-black font-semibold">{text || 'Carregando...'}</p>
    </div>
  )
}

export default Loading
