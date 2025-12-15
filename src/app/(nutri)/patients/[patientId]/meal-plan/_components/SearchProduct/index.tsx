import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadFoods from '@/hooks/foods/useLoadFoods'
import { Search } from '@mui/icons-material'
import { useContext, useEffect, useMemo, useState } from 'react'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  onSelect: (food: any) => void
}

const ModalSearchProduct = ({ open, setIsClose, onSelect }: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const { data, loadData, loading } = useLoadFoods(open)
  const [query, setQuery] = useState('')

  const filteredFoods = useMemo(() => {
    if (!query) return []
    return data.filter((food: any) =>
      food.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, data])

  return (
    <ModalBase open={open} size="md" closeOnBackdropClick onClose={setIsClose}>
      <ModalContent>
        <div className="flex flex-col gap-4 w-full">
          <InputStyled
            icon={<Search className="dark:text-white" />}
            id="search"
            placeholder="Digite o nome do alimento"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {!query && (
            <div className="flex flex-col items-center justify-center text-center pb-6 pt-4 text-gray-500 gap-3">
              <Search className="w-10 h-10 opacity-40" />
              <p className="max-w-xs text-sm">
                Pesquise um alimento digitando o nome no campo acima.
              </p>
            </div>
          )}

          {query && !loading && filteredFoods.length === 0 && (
            <div className="py-6 text-center text-gray-500 text-sm">
              Nenhum alimento encontrado.
            </div>
          )}

          <div className="flex flex-col gap-2">
            {filteredFoods.map((food) => {
              const name = food.name
              const q = query.toLowerCase()
              const index = name.toLowerCase().indexOf(q)

              let before = name
              let match = ''
              let after = ''

              if (index !== -1) {
                before = name.substring(0, index)
                match = name.substring(index, index + query.length)
                after = name.substring(index + query.length)
              }

              return (
                <button
                  key={food.uuid}
                  onClick={() => {
                    onSelect(food)
                    setIsClose()
                  }}
                  className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex justify-between items-center"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {before}
                      <span className="font-semibold text-green-500">
                        {match}
                      </span>
                      {after}
                    </span>

                    <span className="text-xs font-light text-gray-600 dark:text-gray-300">
                      {food?.source?.name}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </ModalContent>
    </ModalBase>
  )
}

export default ModalSearchProduct
