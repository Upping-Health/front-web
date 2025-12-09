import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import { Search } from '@mui/icons-material'
import { useContext, useState } from 'react'

interface ModalParams {
  open: boolean
  setIsClose: () => void
}

const ModalSearchProduct = ({ open, setIsClose }: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [query, setQuery] = useState('')
  return (
    <ModalBase
      open={open}
      size="full"
      closeOnBackdropClick
      onClose={setIsClose}
    >
      {/* <ModalHeader /> */}

      <ModalContent>
        <div className="flex flex-col gap-4 w-full">
          <InputStyled
            icon={<Search className="dark:text-white" />}
            id="search"
            placeholder="Digite o nome do alimento"
            type="text"
          />

          {!query && (
            <div className="flex flex-col items-center justify-center text-center pb-6 pt-4 text-gray-500 gap-3">
              <Search className="w-10 h-10 opacity-40" />

              <div>
                <p className="max-w-xs text-sm">
                  Pesquise um alimento digitando o nome no campo acima.
                </p>
              </div>
            </div>
          )}
        </div>
      </ModalContent>
    </ModalBase>
  )
}

export default ModalSearchProduct
