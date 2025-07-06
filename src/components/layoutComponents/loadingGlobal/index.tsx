'use client'
import { CircularProgress, Modal } from '@mui/material'
import { colors } from '@/utils/colors/colors'
import { useEffect } from 'react'

const LoadingFullScreen = ({
  open,
  labelLoading,
}: {
  open: boolean
  labelLoading: string | null
}) => {
  useEffect(() => {
    console.log(open, 'OPEN')
  }, [open])
  return (
    <Modal
      open={open}
      className="flex justify-center items-center backdrop-blur-md"
    >
      <div className="flex flex-col justify-center items-center">
        <CircularProgress size={100} style={{ color: colors.white }} />

        <p className="text-white mt-4">
          {labelLoading ? labelLoading : 'Carregando...'}
        </p>
      </div>
    </Modal>
  )
}

export default LoadingFullScreen
