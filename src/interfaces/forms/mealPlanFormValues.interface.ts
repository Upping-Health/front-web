export interface MealItem {
  food_id: string
  quantity: string
  unit: string
  notes: string
}

export interface Meal {
  category: string
  time: string
  items: MealItem[]
}

export interface MealPlanFormValues {
  patient_id: string
  start_date: string
  end_date: string
  notes: string
  meals: Meal[]
}
