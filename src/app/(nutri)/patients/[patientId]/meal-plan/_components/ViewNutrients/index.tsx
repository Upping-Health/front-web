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
}

const nutrients = [
  { label: 'Energia', value: '70,9 kcal' },
  { label: 'Proteínas', value: '0,8 g' },
  { label: 'Lipídios', value: '0,1 g' },
  { label: 'Carboidratos', value: '17,4 g' },
  { label: 'Fibras', value: '1,5 g' },
  { label: 'Ácidos graxos saturados', value: '0 g' },
  { label: 'Ácidos graxos monoinsaturados', value: '0 g' },
  { label: 'Ácidos graxos poliinsaturados', value: '0 g' },
  { label: 'Ácidos graxos trans', value: '0 g' },
  { label: 'Colesterol', value: '0 mg' },
  { label: 'Cálcio', value: '2,8 mg' },
  { label: 'Ferro', value: '0,2 mg' },
  { label: 'Magnésio', value: '20,2 mg' },
  { label: 'Fósforo', value: '15 mg' },
  { label: 'Potássio', value: '224,9 mg' },
  { label: 'Sódio', value: '0 mg' },
  { label: 'Zinco', value: '0 mg' },
  { label: 'Cobre', value: '0 mg' },
  { label: 'Manganês', value: '0 mg' },
  { label: 'Selênio', value: '0 mg' },
  { label: 'Vitamina A (RAE)', value: '0 mg' },
  { label: 'Tiamina (Vit. B1)', value: '0 mg' },
  { label: 'Riboflavina (Vit. B2)', value: '0 mg' },
  { label: 'Niacina (Vit. B3)', value: '0 mg' },
  { label: 'Piridoxina (Vit. B6)', value: '0 mg' },
  { label: 'Alfa-tocoferol (Vit. E)', value: '0 mg' },
  { label: 'Vitamina D (D2 + D3)', value: '0 mg' },
  { label: 'Álcool', value: '0 mg' },
]

const ModalViewNutrients = ({ open, setIsClose }: ModalParams) => {
  const { data, loadData, loading } = useLoadFoods(open)
  const [query, setQuery] = useState('')

  const filteredNutrients = useMemo(() => {
    return nutrients.filter((n) =>
      n.label.toLowerCase().includes(query.toLowerCase()),
    )
  }, [nutrients, query])

  return (
    <ModalBase open={open} size="lg" closeOnBackdropClick onClose={setIsClose}>
      <ModalHeader onClose={setIsClose} title="Nutrientes do alimento" />
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
