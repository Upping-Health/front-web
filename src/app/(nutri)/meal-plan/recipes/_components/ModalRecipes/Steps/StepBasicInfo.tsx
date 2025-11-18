import InputImageStyled from '@/components/inputs/inputImageStyled'
import InputStyled from '@/components/inputs/inputStyled'
import { nutrientsStep1Fields } from '@/lib/formik/validators/validate-food'
import { FormikProps } from 'formik'

interface StepBasicInfoProps {
  formik: FormikProps<FoodFormValues>
}

const StepBasicInfo = ({ formik }: StepBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex w-full items-center justify-center">
        <InputImageStyled
          value={formik.values.image_url}
          onChange={(file) => formik.setFieldValue('image_file', file)}
        />
      </div> */}

      <div className="grid grid-cols-2 gap-4">
        <InputStyled
          id="name"
          label="Nome da receita"
          type="text"
          placeholder="Nome"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          onBlur={formik.handleBlur}
          isTouched={formik.touched.name}
          required
        />

        <InputStyled
          id="sku"
          label="SKU"
          type="text"
          value={formik.values.sku}
          onChange={(e) => formik.setFieldValue('sku', e.target.value)}
        />
      </div>

      <InputStyled
        id="description"
        label="Descrição do alimento"
        type="text"
        value={formik.values.description}
        onChange={(e) => formik.setFieldValue('sku', e.target.value)}
      />

      <h1 className="font-semibold text-base uppercase dark:text-white">
        Nutrientes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {nutrientsStep1Fields.map(({ key, label }) => (
          <InputStyled
            key={key}
            id={key}
            label={label}
            type="number"
            value={formik.values.nutrient?.[key] ?? ''}
            onChange={(e) =>
              formik.setFieldValue(`nutrient.${key}`, e.target.value)
            }
            onBlur={formik.handleBlur}
            error={formik.errors.nutrient?.[key]}
            isTouched={formik.touched.nutrient?.[key]}
            required
          />
        ))}
      </div>
    </div>
  )
}

export default StepBasicInfo
