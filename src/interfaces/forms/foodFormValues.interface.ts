interface Nutrient {
  energy_kcal: string
  energy_kj: string
  protein: string
  total_lipids: string
  cholesterol: string
  carbohydrate: string
  fiber: string
  ash: string
  calcium: string
  magnesium: string
  manganese: string
  phosphorus: string
  iron: string
  sodium: string
  potassium: string
  copper: string
  zinc: string
  retinol: string
  vitamin_a_re: string
  vitamin_a_rae: string
  thiamin: string
  riboflavin: string
  pyridoxine: string
  niacin: string
  vitamin_c: string
  vitamin_d: string
  vitamin_e: string
  vitamin_b9: string
  vitamin_b12: string
  saturated: string
  monounsaturated: string
  polyunsaturated: string
  trans_fats: string
  selenium: string
}

interface FoodFormValues {
  name: string
  description: string
  sku: string
  nutrient: Nutrient
}
