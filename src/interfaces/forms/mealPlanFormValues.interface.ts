import { Food } from '../food.interface'

export interface MealItem extends Food {
  quantity: number
  selected_unit: string
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
