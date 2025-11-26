interface RecipeFormValues {
  name: string
  description: string
  sku: string
  ingredients: {
    food_id: string
    unit_id: string
    household_unit_id: string
    quantity: string
  }[]
  instructions: {
    step_number: string
    description: string
    time_minutes: string
    image_url: string
  }[]
}
