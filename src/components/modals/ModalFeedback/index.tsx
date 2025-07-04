import { colors } from '@/utils/colors/colors'
import { STATUS } from '@/utils/types/feedback'
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
            //setIsClose()
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
      <div className="relative bg-white rounded-3xl p-6 text-center shadow-2xl max-w-sm w-full mx-4">
        <button
          onClick={setIsClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon />
        </button>

        <div
          className={`mx-auto flex items-center justify-center rounded-full w-32 h-32 ${
            status === STATUS.SUCCESS ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <StatusIcon
            style={{
              fontSize: 96,
              color:
                status === STATUS.SUCCESS ? colors.newGreen : colors.newRed,
            }}
          />
        </div>

        <h1 className="font-semibold text-2xl pt-4 pb-2 text-gray-800">
          {title}
        </h1>
        <p className="font-normal text-gray-600">{description}</p>
      </div>
    </Modal>
  )
}

export default ModalFeedBackStatus
