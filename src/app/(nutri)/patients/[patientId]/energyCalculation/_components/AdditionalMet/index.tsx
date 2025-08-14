import { useState } from 'react'
import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import ButtonStyled from '@/components/buttons/button'
import AddIcon from '@mui/icons-material/Add'

const AdditionalMet = () => {
  const [additionalMet, setAdditionalMet] = useState([
    { formula: '', tempo: '' },
  ])

  const formulas = [{ text: 'Harris-Benedict (Homem)', value: 'harris-male' }]

  const handleChange = (index: any, field: any, value: any) => {
    const newList: any = [...additionalMet]
    newList[index][field] = value
    setAdditionalMet(newList)
  }

  const addItem = () => {
    setAdditionalMet([...additionalMet, { formula: '', tempo: '' }])
  }

  const removeItem = (index: any) => {
    setAdditionalMet(additionalMet.filter((_, i) => i !== index))
  }

  return (
    <CollapsibleSection title="Adicional MET">
      {additionalMet.map((item, index) => (
        <div key={index} className="flex gap-4 w-full mb-2 items-center">
          <div className="flex-1 min-w-0">
            <SelectStyled
              id={`formula-${index}`}
              label="Selecionar de MET"
              options={formulas}
              value={item.formula}
              onChange={(e) => handleChange(index, 'formula', e.target.value)}
              placeholder="Selecione a fórmula"
              styles="w-full"
            />
          </div>

          <div className="flex-1 min-w-0">
            <InputStyled
              type="number"
              id={`tempo-${index}`}
              label="Tempo de atividade (MIN)"
              value={item.tempo}
              onChange={(e) => handleChange(index, 'tempo', e.target.value)}
              placeholder="Digite o tempo"
              styles="w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-2 text-red-500 font-bold mt-6"
          >
            X
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <ButtonStyled
          type="button"
          icon={<AddIcon />}
          styles="px-4 bg-primary"
          title="Adicionar"
          onClick={addItem}
        />
      </div>
    </CollapsibleSection>
  )
}

export default AdditionalMet
