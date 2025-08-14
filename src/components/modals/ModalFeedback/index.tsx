import { colors } from '@/lib/colors/colors'
import { STATUS } from '@/lib/types/feedback'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import CloseIcon from '@mui/icons-material/Close'
import { Modal } from '@mui/material'
import { useEffect, useState } from 'react'

interface ModalFeedBackStatusProps {
  status: string
  open: boolean
  setIsClose: () => void
  title: string
  description: string
}

const ModalFeedBackStatus = ({
  open,
  setIsClose,
  status,
  title,
  description,
}: ModalFeedBackStatusProps) => {
  const [timer, setTimer] = useState<number>(5)
  const StatusIcon = status === STATUS.SUCCESS ? CheckCircleIcon : ErrorIcon

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (open) {
      setTimer(3)
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1
          if (newTimer <= 0) {
            clearInterval(interval!)
            setIsClose()
          }
          return newTimer
        })
      }, 1000)
    } else if (!open && interval) {
      clearInterval(interval)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [open, setIsClose])

  return (
    <Modal
      open={open}
      className="flex justify-center items-center backdrop-blur-sm"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-2xl max-w-sm w-full mx-4">
        <button
          onClick={setIsClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>

        <div
          className={`mx-auto flex items-center justify-center rounded-full w-32 h-32 ${
            status === STATUS.SUCCESS
              ? 'bg-green-100 dark:bg-green-200'
              : 'bg-red-100 dark:bg-red-200'
          }`}
        >
          <StatusIcon
            style={{
              fontSize: 96,
              color:
                status === STATUS.SUCCESS
                  ? colors.green.DEFAULT
                  : colors.red.DEFAULT,
            }}
          />
        </div>

        <h1 className="font-semibold text-2xl pt-4 pb-2 text-gray-800 dark:text-white">
          {title}
        </h1>
        <p className="font-normal text-gray-600">{description}</p>
      </div>
    </Modal>
  )
}

export default ModalFeedBackStatus
