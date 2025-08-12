import InputStyled from '@/components/inputs/inputStyled'
import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import { FormikErrors, FormikTouched } from 'formik'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'

interface Props {
  values: {
    title: string
    weight: number
    height: number
    fatFreedough: number
  }
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: any
  touched: any
}

export const BasicInfoSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
}: Props) => (
  <CollapsibleSection title="Informações Básicas">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full">
        <InputStyled
          id="title"
          label="Título da avaliação"
          type="text"
          placeholder="Título"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          isTouched={touched.title}
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

      <div className="flex flex-col w-full">
        <InputStyled
          id="body_fat_percentage"
          label="Massa livre de gordura"
          type="number"
          placeholder="Massa livre de gordura"
          value={values.fatFreedough}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fatFreedough}
          isTouched={touched.fatFreedough}
        />
      </div>
    </div>
  </CollapsibleSection>
)
