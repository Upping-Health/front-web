import * as Yup from 'yup'

export const nutrientsStep1Fields = [
  { key: 'ash', label: 'Peso (g)' },
  { key: 'protein', label: 'Proteína (g)' },
  { key: 'carbohydrate', label: 'Carboidrato (g)' },
  { key: 'total_lipids', label: 'Lipídios (g)' },
  { key: 'energy_kcal', label: 'Kcal total (Kcal)' },
] as const

const nutrientStep1Shape = nutrientsStep1Fields.reduce(
  (acc, item) => {
    acc[item.key] = Yup.number()
      .typeError(`${item.label} deve ser um número`)
      .required(`${item.label} é obrigatório`)
    return acc
  },
  {} as Record<string, any>,
)

export const nutrientsFields = [
  // { key: "alcool", label: "Álcool (g)" },
  { key: 'monounsaturated', label: 'A.G Monoinsaturado (g)' },
  { key: 'polyunsaturated', label: 'A.G Poliinsaturado (g)' },
  { key: 'saturated', label: 'A.G Saturadas (g)' },
  { key: 'cholesterol', label: 'Colesterol (mg)' },
  { key: 'fiber', label: 'Fibra (g)' },
  { key: 'calcium', label: 'Cálcio (mg)' },
  { key: 'magnesium', label: 'Magnésio (mg)' },
  { key: 'phosphorus', label: 'Fósforo (mg)' },
  { key: 'iron', label: 'Ferro (mg)' },
  { key: 'sodium', label: 'Sódio (mg)' },
  { key: 'potassium', label: 'Potássio (mg)' },
  { key: 'copper', label: 'Cobre (mg)' },
  { key: 'zinc', label: 'Zinco (mg)' },
  { key: 'selenium', label: 'Selênio (mcg)' },
  { key: 'vitamin_a_re', label: 'Vitamina A (RE) (mcg)' },
  { key: 'vitamin_a_rae', label: 'Vitamina A (REA) (mcg)' },
  { key: 'vitamin_b9', label: 'Vitamina B9 (mcg)' },
  { key: 'vitamin_b12', label: 'Vitamina B12 (mcg)' },
  { key: 'thiamin', label: 'Tiamina (mg)' },
  { key: 'riboflavin', label: 'Riboflavina (mg)' },
  { key: 'pyridoxine', label: 'Piridoxina (mg)' },
  { key: 'niacin', label: 'Niacina (mg)' },
  { key: 'vitamin_c', label: 'Vitamina C (mg)' },
  { key: 'vitamin_d', label: 'Vitamina D (mcg)' },
  { key: 'vitamin_e', label: 'Vitamina E (mg)' },
] as const

const nutrientStep2Shape = nutrientsFields.reduce(
  (acc, item) => {
    acc[item.key] = Yup.number()
      .typeError(`${item.label} deve ser um número`)
      .nullable()
    return acc
  },
  {} as Record<string, any>,
)

export const foodSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  sku: Yup.string().nullable(),
  description: Yup.string().nullable(),

  nutrient: Yup.object().shape({
    ...nutrientStep1Shape,
    ...nutrientStep2Shape,
  }),
})
