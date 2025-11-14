import InputStyled from '@/components/inputs/inputStyled'
import { FormikProps, useFormik } from 'formik'

interface StepNutrientsProps {
  formik: FormikProps<FoodFormValues>
}

const nutrientsFields: { key: keyof Nutrient; label: string }[] = [
  { key: 'energy_kcal', label: 'Energia (KCAL)' },
  { key: 'energy_kj', label: 'Energia (KJ)' },
  { key: 'protein', label: 'Proteína' },
  { key: 'total_lipids', label: 'Lipídios totais' },
  { key: 'cholesterol', label: 'Colesterol' },
  { key: 'carbohydrate', label: 'Carboidratos' },
  { key: 'fiber', label: 'Fibra' },
  { key: 'ash', label: 'Cinzas' },
  { key: 'calcium', label: 'Cálcio' },
  { key: 'magnesium', label: 'Magnésio' },
  { key: 'manganese', label: 'Manganês' },
  { key: 'phosphorus', label: 'Fósforo' },
  { key: 'iron', label: 'Ferro' },
  { key: 'sodium', label: 'Sódio' },
  { key: 'potassium', label: 'Potássio' },
  { key: 'copper', label: 'Cobre' },
  { key: 'zinc', label: 'Zinco' },
  { key: 'retinol', label: 'Retinol' },
  { key: 'vitamin_a_re', label: 'Vitamina A (RE)' },
  { key: 'vitamin_a_rae', label: 'Vitamina A (RAE)' },
  { key: 'thiamin', label: 'Tiamina' },
  { key: 'riboflavin', label: 'Riboflavina' },
  { key: 'pyridoxine', label: 'Piridoxina' },
  { key: 'niacin', label: 'Niacina' },
  { key: 'vitamin_c', label: 'Vitamina C' },
  { key: 'vitamin_d', label: 'Vitamina D' },
  { key: 'vitamin_e', label: 'Vitamina E' },
  { key: 'vitamin_b9', label: 'Vitamina B9' },
  { key: 'vitamin_b12', label: 'Vitamina B12' },
  { key: 'saturated', label: 'Gorduras Saturadas' },
  { key: 'monounsaturated', label: 'Gorduras Monoinsaturadas' },
  { key: 'polyunsaturated', label: 'Gorduras Poliinsaturadas' },
  { key: 'trans_fats', label: 'Gorduras Trans' },
  { key: 'selenium', label: 'Selênio' },
]

const StepNutrients = ({ formik }: StepNutrientsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
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
        />
      ))}
    </div>
  )
}

export default StepNutrients
