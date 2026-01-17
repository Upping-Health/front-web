import { useMemo } from 'react'
import { MealItem } from '@/interfaces/forms/mealPlanFormValues.interface'

export const nutrientMap = {
  energy_kcal: 'Energia',
  protein: 'Proteínas',
  total_lipids: 'Lipídios',
  carbohydrate: 'Carboidratos',
  fiber: 'Fibras',
  saturated_fatty_acids: 'Ácidos graxos saturados',
  monounsaturated_fatty_acids: 'Ácidos graxos monoinsaturados',
  polyunsaturated_fatty_acids: 'Ácidos graxos poliinsaturados',
  trans_fatty_acids: 'Ácidos graxos trans',
  cholesterol: 'Colesterol',
  calcium: 'Cálcio',
  iron: 'Ferro',
  magnesium: 'Magnésio',
  phosphorus: 'Fósforo',
  potassium: 'Potássio',
  sodium: 'Sódio',
  zinc: 'Zinco',
  copper: 'Cobre',
  manganese: 'Manganês',
  selenium: 'Selênio',
  vitamin_a: 'Vitamina A (RAE)',
  vitamin_b1: 'Tiamina (Vit. B1)',
  vitamin_b2: 'Riboflavina (Vit. B2)',
  vitamin_b3: 'Niacina (Vit. B3)',
  vitamin_b6: 'Piridoxina (Vit. B6)',
  vitamin_e: 'Alfa-tocoferol (Vit. E)',
  vitamin_d: 'Vitamina D (D2 + D3)',
  alcohol: 'Álcool',
} as const

const calculateNutrientValue = (
  food: MealItem,
  nutrientKey: keyof NonNullable<MealItem['nutrient']>,
): number => {
  if (!food?.nutrient) return 0

  const selectedUnit = Number(food.selected_unit ?? 0)
  const quantity = Number(food.quantity ?? 0)
  const baseQuantity = Number(food.nutrient.base_quantity ?? 0)
  const nutrientValue = Number(food.nutrient[nutrientKey] ?? 0)

  if (baseQuantity === 0) return 0

  const realQuantity = selectedUnit * quantity
  return (realQuantity / baseQuantity) * nutrientValue
}

const calculateAllForFood = (food: MealItem) => {
  const result: Record<string, number> = {}

  Object.keys(nutrientMap).forEach((key) => {
    result[key] = calculateNutrientValue(
      food,
      key as keyof NonNullable<MealItem['nutrient']>,
    )
  })

  return result
}

export const useCalculateNutrients = (items: MealItem[]) => {
  const totals = useMemo(() => {
    const totalValues: Record<string, number> = {}

    items.forEach((food) => {
      const nutrients = calculateAllForFood(food)

      Object.keys(nutrients).forEach((key) => {
        totalValues[key] = (totalValues[key] ?? 0) + nutrients[key]
      })
    })

    return totalValues
  }, [items])

  const formatted = useMemo(() => {
    return Object.entries(nutrientMap).map(([key, label]) => {
      const value = totals[key] ?? 0

      // Decide unidade automaticamente
      const isKcal = key.includes('energy') || key.includes('kcal')
      const isMg = [
        'calcium',
        'iron',
        'magnesium',
        'phosphorus',
        'potassium',
        'sodium',
        'zinc',
        'copper',
        'manganese',
        'selenium',
      ].includes(key)

      let unit = 'g'
      if (isKcal) unit = 'kcal'
      if (isMg) unit = 'mg'

      return {
        label,
        value: `${value.toFixed(2)} ${unit}`,
      }
    })
  }, [totals])

  return formatted
}
