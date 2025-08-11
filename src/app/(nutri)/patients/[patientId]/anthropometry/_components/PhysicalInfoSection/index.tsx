import InputStyled from '@/components/inputs/inputStyled'
import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import { FormikErrors, FormikTouched } from 'formik'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'

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
  errors: FormikErrors<AnthropometryFormValues>
  touched: FormikTouched<AnthropometryFormValues>
}

export const PhysicalInfoSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: Props) => (
  <CollapsibleSection title="Informações Físicas">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full">
        <InputStyled
          id="evaluation_date"
          label="Data da avaliação"
          type="date"
          placeholder="Observações"
          value={values.evaluation_date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.evaluation_date}
          isTouched={touched.evaluation_date}
        />
      </div>
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
            error={errors.weight}
            isTouched={touched.weight}
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
            error={errors.weight}
            isTouched={touched.weight}
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
            error={errors.body_fat_percentage}
            isTouched={touched.body_fat_percentage}
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
            error={errors.muscle_mass_percentage}
            isTouched={touched.muscle_mass_percentage}
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
          error={errors.observations}
          isTouched={touched.observations}
        />
      </div>
    </div>
  </CollapsibleSection>
)
