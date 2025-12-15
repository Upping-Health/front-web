import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import InputStyled from '@/components/inputs/inputStyled'
import { AnthropometryFormValues } from '@/interfaces/forms/anthroprometryFormValues.interface'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import { formatDateToBR } from '@/lib/format/date'
import masks from '@/lib/masks/masks'
import { FormikErrors, FormikTouched } from 'formik'
import { MealSection } from '../MealSection'

interface Props {
  values: Partial<MealPlanFormValues>
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<MealPlanFormValues>
  touched: FormikTouched<MealPlanFormValues>
  setFieldValue: any
}

export const FirstSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}: Props) => {
  return (
    <div className="shadow-sm rounded-xl p-4 bg-white dark:bg-gray-800">
      <h2 className="font-semibold text-primary dark:text-white mb-4">
        Informações básicas
      </h2>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 w-full">
          <InputStyled
            id="start_date"
            label="Data de início"
            type="text"
            placeholder="dd/mm/yyyy"
            value={values?.start_date ?? ''}
            onChange={(e) => {
              setFieldValue('start_date', masks.dateMask(e.target.value))
            }}
            onBlur={handleBlur}
            error={errors.start_date}
            isTouched={touched.start_date}
            maxLength={10}
            styles="w-full"
          />

          <InputStyled
            id="end_date"
            label="Data da Fim"
            type="text"
            placeholder="dd/mm/yyyy"
            value={values?.end_date ?? ''}
            onChange={(e) => {
              setFieldValue('end_date', masks.dateMask(e.target.value))
            }}
            onBlur={handleBlur}
            error={errors.end_date}
            isTouched={touched.end_date}
            maxLength={10}
          />
        </div>

        <div className="flex flex-col w-full">
          <InputStyled
            id="notes"
            label="Observações"
            type="text"
            placeholder="Observações"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.notes}
            isTouched={touched.notes}
          />
        </div>
      </div>

      <h2 className="font-semibold text-primary dark:text-white mb-4 mt-4">
        Refeições
      </h2>
      <MealSection
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        touched={touched}
        values={values}
        key={'meal-section'}
      />
    </div>
  )
}
