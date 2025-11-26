import InputStyled from '@/components/inputs/inputStyled'
import { FormikProps } from 'formik'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ButtonStyled from '@/components/buttons/button'
import AddIcon from '@mui/icons-material/Add'

interface StepProps {
  formik: FormikProps<RecipeFormValues>
}

const StepIngredients = ({ formik }: StepProps) => {
  const handleRemove = (index: number) => {
    const newList = [...formik.values.ingredients]
    newList.splice(index, 1)
    formik.setFieldValue('ingredients', newList)
  }

  return (
    <div className="space-y-2">
      {formik.values.ingredients?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-end"
        >
          <InputStyled
            id={`ingredients.${index}.measure`}
            label="Medida"
            type="text"
            value={item.food_id}
            onChange={(e) =>
              formik.setFieldValue(
                `ingredients.${index}.measure`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
          />

          <InputStyled
            id={`ingredients.${index}.quantity`}
            label="Quantidade"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              formik.setFieldValue(
                `ingredients.${index}.quantity`,
                e.target.value,
              )
            }
            onBlur={formik.handleBlur}
          />

          <button
            type="button"
            className="h-[40px] flex items-center justify-center text-red-600 hover:text-red-800"
            onClick={() => handleRemove(index)}
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>
      ))}

      <div className="flex justify-center">
        <ButtonStyled
          type="button"
          icon={<AddIcon className="text-lg" />}
          styles="px-4 bg-primary h-[40px] text-sm"
          title="Adicionar"
          onClick={() =>
            formik.setFieldValue('ingredients', [
              ...formik.values.ingredients,
              { food_id: '', household_unit_id: '', quantity: '', unit_id: '' },
            ])
          }
        />
      </div>
    </div>
  )
}

export default StepIngredients
