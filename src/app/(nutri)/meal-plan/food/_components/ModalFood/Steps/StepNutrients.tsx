import InputStyled from '@/components/inputs/inputStyled'
import { nutrientsFields } from '@/lib/formik/validators/validate-food'
import { FormikProps, useFormik } from 'formik'

interface StepNutrientsProps {
  formik: FormikProps<FoodFormValues>
}

const StepNutrients = ({ formik }: StepNutrientsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      {nutrientsFields.map(({ key, label }) => (
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
          stylesLabel="text-xs"
        />
      ))}
    </div>
  )
}

export default StepNutrients
