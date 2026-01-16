import {
  MealItem,
  MealPlanFormValues,
} from '@/interfaces/forms/mealPlanFormValues.interface'
import InputStyled from '@/components/inputs/inputStyled'
import AutocompleteStyled from '@/components/inputs/autoCompleteStyled'
import TooltipStyled from '@/components/inputs/tooltipStyled'

import { DeleteOutline, Calculate } from '@mui/icons-material'

interface MealItemRowProps {
  item: MealItem
  index: number
  i: number
  meals: MealPlanFormValues['meals']
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  setFieldValue: (field: string, value: any) => void
  setViewNutrients: (open: boolean) => void
}

const formatNutrient = (value: number | undefined): string => {
  const num = Number(value)
  if (isNaN(num)) return '0.00 g'
  return `${num.toFixed(2)} g`
}

export const calculateProtein = (food: MealItem): string => {
  return formatNutrient(food.nutrient?.protein)
}

export const calculateCarbohydrate = (food: MealItem): string => {
  return formatNutrient(food.nutrient?.carbohydrate)
}

export const calculateLip = (food: MealItem): string => {
  return formatNutrient(food.nutrient?.total_lipids)
}

export const calculateKcal = (food: MealItem): string => {
  return formatNutrient(food.nutrient?.energy_kcal)
}

export default function MealItemRow({
  item,
  index,
  i,
  meals,
  handleChange,
  handleBlur,
  setFieldValue,
  setViewNutrients,
}: MealItemRowProps) {
  const units =
    meals[index].items[i].food_household_units?.map((hous) => ({
      id: hous.conversion_factor,
      name: hous.household_unit.name,
    })) || []

  return (
    <div className="grid grid-cols-12 gap-2 items-center rounded-lg">
      <InputStyled
        id={`meals[${index}].items[${i}].name`}
        value={item.name}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        stylesContainer="col-span-3"
        styles="dark:bg-gray-800"
      />

      <InputStyled
        id={`meals[${index}].items[${i}].quantity`}
        value={item.quantity}
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        stylesContainer="col-span-1"
        styles="dark:bg-gray-800"
      />

      <AutocompleteStyled
        id={`meals[${index}].items[${i}].selected_unit`}
        options={units}
        getOptionLabel={(option) => option.name}
        value={item.selected_unit}
        onChange={(e, value) =>
          setFieldValue(
            `meals[${index}].items[${i}].selected_unit`,
            value?.id || null,
          )
        }
        styles="dark:bg-gray-800"
        stylesGlobal="col-span-3"
      />

      <InputStyled
        type="text"
        value={calculateProtein(meals[index].items[i])}
        id={`meals[${index}].items[${i}].protein`}
        onChange={handleChange}
        stylesContainer="col-span-1"
        styles="text-center dark:bg-gray-800"
      />

      <InputStyled
        type="text"
        value={calculateCarbohydrate(meals[index].items[i])}
        id={`meals[${index}].items[${i}].carbs`}
        onChange={handleChange}
        stylesContainer="col-span-1"
        styles="text-center dark:bg-gray-800"
      />

      <InputStyled
        type="text"
        value={calculateLip(meals[index].items[i])}
        id={`meals[${index}].items[${i}].fat`}
        onChange={handleChange}
        stylesContainer="col-span-1"
        styles="text-center dark:bg-gray-800"
      />

      <InputStyled
        type="text"
        value={calculateKcal(meals[index].items[i])}
        id={`meals[${index}].items[${i}].kcal`}
        onChange={handleChange}
        stylesContainer="col-span-1"
        styles="text-center dark:bg-gray-800"
      />

      <div className="col-span-1 flex items-center justify-end">
        <TooltipStyled title="Excluir alimento">
          <button
            type="button"
            className="flex items-center justify-center text-red-500"
            onClick={() => {
              const clone = [...meals]
              clone[index].items.splice(i, 1)
              setFieldValue('meals', clone)
            }}
          >
            <DeleteOutline fontSize="small" />
          </button>
        </TooltipStyled>
      </div>
    </div>
  )
}
