import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import ButtonStyled from '@/components/buttons/button'
import AddIcon from '@mui/icons-material/Add'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  values: Partial<EnergyCalculation>
  setFieldValue: (field: string, value: any) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<EnergyCalculation>
  touched: FormikTouched<EnergyCalculation>
}

const metActivities = [
  { text: 'Caminhada leve (2 km/h) - 2.0 MET', value: '2.0' },
  { text: 'Caminhada moderada (4 km/h) - 3.3 MET', value: '3.3' },
  { text: 'Caminhada rápida (5,5 km/h) - 4.3 MET', value: '4.3' },
  { text: 'Caminhada subindo ladeira - 6.3 MET', value: '6.3' },
  { text: 'Corrida 8 km/h - 8.3 MET', value: '8.3' },
  { text: 'Corrida 10 km/h - 10.0 MET', value: '10.0' },
  { text: 'Corrida 12 km/h - 12.5 MET', value: '12.5' },
  { text: 'Corrida 16 km/h - 16.0 MET', value: '16.0' },
  { text: 'Bicicleta lazer 16 km/h - 4.0 MET', value: '4.0' },
  { text: 'Bicicleta moderada 20 km/h - 8.0 MET', value: '8.0' },
  { text: 'Bicicleta rápida 25 km/h - 10.0 MET', value: '10.0' },
  { text: 'Bicicleta >32 km/h - 16.0 MET', value: '16.0' },
  { text: 'Nado leve - 6.0 MET', value: '6.0' },
  { text: 'Nado crawl rápido - 9.5 MET', value: '9.5' },
  { text: 'Nado peito - 8.0 MET', value: '8.0' },
  { text: 'Musculação leve - 3.5 MET', value: '3.5' },
  { text: 'Musculação moderada - 6.0 MET', value: '6.0' },
  { text: 'Crossfit intenso - 9.0 MET', value: '9.0' },
  { text: 'Futebol - 7.0 MET', value: '7.0' },
  { text: 'Basquete - 8.0 MET', value: '8.0' },
  { text: 'Tênis simples - 7.3 MET', value: '7.3' },
  { text: 'Tênis duplas - 5.0 MET', value: '5.0' },
  { text: 'Vôlei recreativo - 4.0 MET', value: '4.0' },
  { text: 'Vôlei competitivo - 6.0 MET', value: '6.0' },
  { text: 'Limpar casa - 3.5 MET', value: '3.5' },
  { text: 'Subir escada - 8.8 MET', value: '8.8' },
  { text: 'Dançar - 5.5 MET', value: '5.5' },
]

const AdditionalMet = ({
  values,
  setFieldValue,
  errors,
  touched,
  handleBlur,
}: Props) => {
  const additionalMet = values.additionalMet || []

  const handleMetChange = (
    index: number,
    field: 'met_factor' | 'met_time',
    value: any,
  ) => {
    const updated = [...additionalMet]
    updated[index] = { ...updated[index], [field]: value }
    setFieldValue('additionalMet', updated)
  }

  const addMet = () => {
    setFieldValue('additionalMet', [
      ...additionalMet,
      { met_factor: '', met_time: '' },
    ])
  }

  const removeMet = (index: number) => {
    const updated = [...additionalMet]
    updated.splice(index, 1)
    setFieldValue('additionalMet', updated)
  }

  return (
    <CollapsibleSection title="Adicional MET">
      {additionalMet.map((item, index) => (
        <div key={index} className="flex gap-4 w-full mb-2 items-center">
          <div className="flex-1 min-w-0">
            <SelectStyled
              id={`additionalMet.${index}.met_factor`}
              label="Selecionar MET"
              options={metActivities}
              value={item.met_factor}
              onChange={(e) =>
                handleMetChange(index, 'met_factor', e.target.value)
              }
              placeholder="Selecione a atividade"
              styles="w-full"
            />
          </div>

          <div className="flex-1 min-w-0">
            <InputStyled
              type="number"
              id={`additionalMet.${index}.met_time`}
              label="Tempo de atividade (MIN)"
              value={item.met_time}
              onChange={(e) =>
                handleMetChange(index, 'met_time', e.target.value)
              }
              placeholder="Digite o tempo"
              styles="w-full"
              onBlur={handleBlur}
            />
          </div>

          <button
            type="button"
            onClick={() => removeMet(index)}
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
          onClick={addMet}
        />
      </div>
    </CollapsibleSection>
  )
}

export default AdditionalMet
