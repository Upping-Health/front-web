export interface Nutrient {
  energy_kcal?: number
  energy_kj?: number
  protein?: number
  total_lipids?: number
  cholesterol?: number
  carbohydrate?: number
  fiber?: number
  ash?: number
  calcium?: number
  magnesium?: number
  manganese?: number
  phosphorus?: number
  iron?: number
  sodium?: number
  potassium?: number
  copper?: number
  zinc?: number
  retinol?: number
  vitamin_a_re?: number
  vitamin_a_rae?: number
  thiamin?: number
  riboflavin?: number
  pyridoxine?: number
  niacin?: number
  vitamin_c?: number
  vitamin_d?: number
  vitamin_e?: number
  vitamin_b9?: number
  vitamin_b12?: number
  saturated?: number
  monounsaturated?: number
  polyunsaturated?: number
  trans_fats?: number
  selenium?: number
}

export interface Ingredient {
  food_id: string
  unit_id?: string
  household_unit_id?: string
  quantity: number
}

export interface Instruction {
  step_number: number
  description: string
  time_minutes?: number
  image_url?: string
}

export interface Food {
  uuid: string
  name: string
  description?: string
  normalized_name?: string
  category: string
  source: {
    name: string
  }
  created_by?: string
  is_public?: boolean
  alcohol?: number
  highlighted?: boolean
  displayed?: boolean
  image_url?: string
  sku?: string

  nutrient?: Nutrient

  ingredients?: Ingredient[]
  instructions?: Instruction[]
}
