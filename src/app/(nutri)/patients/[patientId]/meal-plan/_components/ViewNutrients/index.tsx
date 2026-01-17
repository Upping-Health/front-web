import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { Search } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'

import { MealItem } from '@/interfaces/forms/mealPlanFormValues.interface'
import { useCalculateNutrients } from '@/hooks/foods/useCalculateNutrients'

interface ModalParams {
  open: boolean
  setIsClose: () => void

  items?: MealItem[]
  item?: MealItem
}

const ModalViewNutrients = ({ open, setIsClose, items, item }: ModalParams) => {
  const [query, setQuery] = useState('')

  const listToCalculate = item ? [item] : (items ?? [])
  const nutrientList = useCalculateNutrients(listToCalculate)

  const filteredNutrients = useMemo(() => {
    return nutrientList.filter((n) =>
      n.label.toLowerCase().includes(query.toLowerCase()),
    )
  }, [nutrientList, query])

  const title = item ? item.name : 'Nutrientes da refeição'

  return (
    <ModalBase open={open} size="lg" closeOnBackdropClick onClose={setIsClose}>
      <ModalHeader onClose={setIsClose} title={title} />
      <ModalContent>
        <div className="flex flex-col gap-4 w-full">
          <InputStyled
            icon={<Search className="dark:text-white" />}
            id="search"
            placeholder="Digite o nome do nutriente"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="overflow-y-auto rounded-lg border border-gray-300 dark:border-gray-600">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-100 dark:bg-gray-900 text-gray-200 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-black dark:text-white">
                    Nutriente
                  </th>
                  <th className="px-4 py-2 text-right text-black dark:text-white">
                    Quantidade
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                {filteredNutrients.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-800/50 transition">
                    <td className="px-4 py-2 dark:text-white">{item.label}</td>
                    <td className="px-4 py-2 text-right dark:text-white">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ModalContent>
    </ModalBase>
  )
}

export default ModalViewNutrients
