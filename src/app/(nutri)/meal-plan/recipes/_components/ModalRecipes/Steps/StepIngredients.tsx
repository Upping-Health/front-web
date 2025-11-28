import InputStyled from '@/components/inputs/inputStyled'
import { FormikProps } from 'formik'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ButtonStyled from '@/components/buttons/button'
import AddIcon from '@mui/icons-material/Add'
import { Food } from '@/interfaces/food.interface'
import SelectStyled from '@/components/inputs/select'
import AutocompleteStyled from '@/components/inputs/autoCompleteStyled'
import { Units } from '@/interfaces/units.interface'
import { HouseHoldUnits } from '@/interfaces/units.interface copy'

interface StepProps {
  formik: FormikProps<RecipeFormValues>
  foods: Food[]
  units: Units[]
  houseHoldUnits: HouseHoldUnits[]
}

const StepIngredients = ({
  formik,
  foods,
  units,
  houseHoldUnits,
}: StepProps) => {
  const handleRemove = (index: number) => {
    const newList = [...formik.values.ingredients]
    newList.splice(index, 1)
    formik.setFieldValue('ingredients', newList)
  }

  const foodOptions = foods.map((f) => ({
    id: f.uuid,
    name: f.name,
    label: f.name,
  }))

  const unitsptions = units.map((f) => ({
    id: f.slug,
    name: f.name,
    label: f.name,
  }))

  const houseHoldUnitsptions = houseHoldUnits.map((f) => ({
    id: f.abbreviation,
    name: f.name,
    label: f.name,
  }))

  return (
    <div className="space-y-2">
      {formik.values.ingredients?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-end"
        >
          <AutocompleteStyled
            label="Alimentos"
            placeholder="Selecionar"
            value={item.food_id}
            options={foodOptions}
            getOptionLabel={(option) => option.name}
            id={`ingredients.${index}.food_id`}
            onChange={(event: any, newValue: any) => {
              formik.setFieldValue(
                `ingredients.${index}.food_id`,
                newValue?.id || '',
              )
            }}
          />

          <AutocompleteStyled
            label="Unidade"
            placeholder="Selecionar"
            value={item.unit_id}
            options={unitsptions}
            getOptionLabel={(option) => option.name}
            id={`ingredients.${index}.unit_id`}
            onChange={(event: any, newValue: any) => {
              formik.setFieldValue(
                `ingredients.${index}.unit_id`,
                newValue?.id || '',
              )
            }}
          />

          <AutocompleteStyled
            label="Unidade Caseira"
            placeholder="Selecionar"
            value={item.household_unit_id}
            options={houseHoldUnitsptions}
            getOptionLabel={(option) => option.name}
            id={`ingredients.${index}.household_unit_id`}
            onChange={(event: any, newValue: any) => {
              formik.setFieldValue(
                `ingredients.${index}.household_unit_id`,
                newValue?.id || '',
              )
            }}
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

      <div className="flex justify-center pt-2">
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
