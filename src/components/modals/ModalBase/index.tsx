import { Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ReactNode } from 'react'

interface ModalBaseProps {
  open: boolean
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  onClose?: () => void
  closeOnBackdropClick?: boolean
}

interface ModalHeaderProps {
  title?: string
  onClose?: () => void
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center pb-4 px-2">
      <h2 className="font-semibold text-base text-center uppercase dark:text-white">
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
  return (
    <div className="flex-grow overflow-auto scroll-mini px-2">{children}</div>
  )
}

export const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className="pt-5 flex gap-5 justify-end px-2">{children}</div>
}

const sizeClasses = {
  sm: 'max-w-[400px]',
  md: 'max-w-[500px]',
  lg: 'max-w-[600px]',
  xl: 'max-w-[800px]',
  full: 'w-[calc(100vw-40px)]',
}

const ModalBase = ({
  open,
  children,
  size = 'md',
  onClose,
  closeOnBackdropClick = false,
}: ModalBaseProps) => {
  return (
    <Modal
      open={open}
      onClose={closeOnBackdropClick ? onClose : undefined}
      className="flex justify-center items-center"
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-20 px-2 py-4 w-[85%] max-h-[90vh] flex flex-col gap-2 ${sizeClasses[size]}`}
      >
        {children}
      </div>
    </Modal>
  )
}

export default ModalBase
