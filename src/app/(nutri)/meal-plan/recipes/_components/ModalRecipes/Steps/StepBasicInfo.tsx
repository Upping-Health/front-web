import InputImageStyled from '@/components/inputs/inputImageStyled'
import InputStyled from '@/components/inputs/inputStyled'
import { nutrientsStep1Fields } from '@/lib/formik/validators/validate-food'
import { FormikProps } from 'formik'

interface StepBasicInfoProps {
  formik: FormikProps<RecipeFormValues>
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
        label="Descrição da receita"
        type="text"
        value={formik.values.description}
        onChange={(e) => formik.setFieldValue('sku', e.target.value)}
      />
    </div>
  )
}

export default StepBasicInfo
