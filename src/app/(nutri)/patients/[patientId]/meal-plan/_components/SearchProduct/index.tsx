import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, { ModalContent } from '@/components/modals/ModalBase'
import useLoadFoods from '@/hooks/foods/useLoadFoods'
import { Search } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  onSelect: (food: any) => void
}

const ModalSearchProduct = ({ open, setIsClose, onSelect }: ModalParams) => {
  const { data, loadData, loading, search, setSearch } = useLoadFoods(open)

  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const formatNutrient = (value?: unknown) => {
    const num = Number(value)
    return Number.isFinite(num) ? num.toFixed(1) : '-'
  }

  const formatGram = (value?: unknown) => {
    const num = Number(value)
    return Number.isFinite(num) ? `${num.toFixed(1)}g` : '-'
  }
  const filteredFoods = useMemo(() => {
    if (!search) return []
    return data.filter((food: any) =>
      food.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, data])

  return (
    <ModalBase open={open} size="lg" closeOnBackdropClick onClose={setIsClose}>
      <ModalContent>
        <div className="flex flex-col gap-4 w-full">
          <InputStyled
            icon={<Search className="dark:text-white" />}
            id="search"
            placeholder="Digite o nome do alimento"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {!search && (
            <div className="flex flex-col items-center justify-center text-center pb-6 pt-4 text-gray-500 gap-3">
              <Search className="w-10 h-10 opacity-40" />
              <p className="max-w-xs text-sm">
                Pesquise um alimento digitando o nome no campo acima.
              </p>
            </div>
          )}

          {search && !loading && filteredFoods.length === 0 && (
            <div className="py-6 text-center text-gray-500 text-sm">
              Nenhum alimento encontrado.
            </div>
          )}

          <div className="flex flex-col gap-2">
            {filteredFoods.length > 0 && (
              <div className="grid grid-cols-8 px-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span className="col-span-4">Alimento</span>
                <span className="text-center">Prot.</span>
                <span className="text-center">Carb.</span>
                <span className="text-center">Lip.</span>
                <span className="text-center">Kcal</span>
              </div>
            )}

            {filteredFoods.map((food) => {
              const name = food.name
              const q = search.toLowerCase()
              const index = name.toLowerCase().indexOf(q)

              let before = name
              let match = ''
              let after = ''

              if (index !== -1) {
                before = name.substring(0, index)
                match = name.substring(index, index + search.length)
                after = name.substring(index + search.length)
              }

              return (
                <button
                  key={food.uuid}
                  onClick={() => {
                    onSelect(food)
                    setIsClose()
                  }}
                  className="grid grid-cols-8 items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                >
                  <div className="flex flex-col col-span-4">
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {before}
                      <span className="font-semibold text-green-500">
                        {match}
                      </span>
                      {after}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {food?.source?.name}
                    </span>
                  </div>

                  <span className="text-center text-sm">
                    {formatGram(food.nutrient?.protein)}
                  </span>
                  <span className="text-center text-sm">
                    {formatGram(food.nutrient?.carbohydrate)}
                  </span>
                  <span className="text-center text-sm">
                    {formatGram(food.nutrient?.total_lipids)}
                  </span>
                  <span className="text-center text-sm">
                    {formatNutrient(food.nutrient?.energy_kcal)}
                  </span>
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
