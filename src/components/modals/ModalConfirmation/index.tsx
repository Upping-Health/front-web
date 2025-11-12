import ButtonStyled from '@/components/buttons/button'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import { CircularProgress } from '@mui/material'
import { useContext, useState } from 'react'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  onConfirm?: () => Promise<void> | void
}

const ModalConfirmation = ({ open, setIsClose, onConfirm }: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      if (onConfirm) await onConfirm()
      setIsClose()
    } catch (error: any) {
      const message = error?.response?.message || 'Erro ao confirmar ação.'
      onShowFeedBack({
        status: 'error',
        title: 'Erro',
        description: message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalBase open={open}>
      <ModalHeader title="Confirmação de exclusão" onClose={setIsClose} />

      <ModalContent>
        <p className="text-gray-700 dark:text-white text-center">
          Tem certeza que deseja excluir? Essa ação não pode ser desfeita.
        </p>
      </ModalContent>

      <ModalFooter>
        <ButtonStyled
          type="button"
          onClick={handleConfirm}
          styles="w-full bg-green-600"
          title={loading ? 'Deletando...' : 'Confirmar'}
          icon={
            loading && (
              <CircularProgress
                style={{ width: 20, height: 20, color: '#FFFFFF' }}
              />
            )
          }
        />
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalConfirmation
