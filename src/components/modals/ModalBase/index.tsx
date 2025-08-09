import { Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode } from 'react'

interface ModalBaseProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

interface ModalHeaderProps {
  title?: string
  onClose: () => void
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center pb-4">
      <h2 className="font-semibold text-xl text-center uppercase dark:text-white">
        {title}
      </h2>
      <button
        onClick={onClose}
        aria-label="Fechar modal"
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        type="button"
      >
        <CloseIcon className="text-gray-700 dark:text-white" />
      </button>
    </div>
  )
}

export const ModalContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex-grow overflow-auto">{children}</div>
}

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="pt-5 flex gap-5 justify-end">{children}</div>
}

const ModalBase = ({ open, onClose, children }: ModalBaseProps) => {
  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          onClose()
        }
      }}
      className="flex justify-center items-center"
    >
      <div className="bg-white dark:bg-gray-800 rounded-20 px-5 py-4 w-[85%] max-w-[500px] max-h-[90vh] flex flex-col gap-2">
        {children}
      </div>
    </Modal>
  )
}

export default ModalBase
