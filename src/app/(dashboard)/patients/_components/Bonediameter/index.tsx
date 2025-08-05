import InputStyled from '@/components/inputsComponents/inputStyled'
import { CollapsibleSection } from '../CollapsibleSection'

interface Props {
  values: {
    evaluation_date: string
    weight: number
    height: number
    body_fat_percentage: number
    muscle_mass_percentage: number
    observations: string
  }
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
}

export const BoneDiameter = ({ values, handleChange, handleBlur }: Props) => (
  <CollapsibleSection title="Informações Físicas">
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <InputStyled
            id="weight"
            label="Peso (KG)"
            type="number"
            placeholder="Peso em kg"
            value={values.weight}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col w-full">
          <InputStyled
            id="height"
            label="Altura (CM)"
            type="number"
            placeholder="Altura em cm"
            value={values.height}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col w-full">
          <InputStyled
            id="body_fat_percentage"
            label="Percentual de Gordura (%)"
            type="number"
            placeholder="Percentual de gordura"
            value={values.body_fat_percentage}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col w-full">
          <InputStyled
            id="muscle_mass_percentage"
            label="Percentual de Massa Muscular (%)"
            type="number"
            placeholder="Percentual de massa muscular"
            value={values.muscle_mass_percentage}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <InputStyled
          id="observations"
          label="Observações"
          type="text"
          placeholder="Observações"
          value={values.observations}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  </CollapsibleSection>
)
