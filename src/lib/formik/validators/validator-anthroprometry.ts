import * as Yup from 'yup'

export const validateCreateAnthropometry = Yup.object().shape({
  evaluation_date: Yup.string().required('Informe a data da avaliação'),
  weight: Yup.number().required('Informe o peso').moreThan(0, 'Peso inválido'),
  height: Yup.number()
    .required('Informe a altura')
    .moreThan(0, 'Altura inválida'),

  body_fat_percentage: Yup.number()
    .required('Informe o percentual de gordura')
    .min(0, 'Valor inválido'),
  muscle_mass_percentage: Yup.number()
    .required('Informe o percentual de massa muscular')
    .min(0, 'Valor inválido'),

  body_fat_method: Yup.string()
    .oneOf(
      [
        'nenhuma',
        'pollock_3',
        'pollock_7',
        'faulkner',
        'guedes',
        'petroski',
        'durin',
      ],
      'Método inválido',
    )
    .required('Selecione um método'),

  skin_fold: Yup.object().shape({
    triceps: Yup.number().nullable().min(0, 'Valor inválido'),
    subscapular: Yup.number().nullable().min(0, 'Valor inválido'),
    suprailiac: Yup.number().nullable().min(0, 'Valor inválido'),
    abdominal: Yup.number().nullable().min(0, 'Valor inválido'),
    thigh: Yup.number().nullable().min(0, 'Valor inválido'),
    chest: Yup.number().nullable().min(0, 'Valor inválido'),
    axillary: Yup.number().nullable().min(0, 'Valor inválido'),
    calf: Yup.number().nullable().min(0, 'Valor inválido'),
    biceps: Yup.number().nullable().min(0, 'Valor inválido'),
  }),

  body_circumference: Yup.object().shape({
    waist: Yup.number().required().min(0, 'Valor inválido'),
    hip: Yup.number().nullable().min(0, 'Valor inválido'),
    abdomen: Yup.number().nullable().min(0, 'Valor inválido'),
    right_thigh: Yup.number().nullable().min(0, 'Valor inválido'),
    left_thigh: Yup.number().nullable().min(0, 'Valor inválido'),
    right_arm: Yup.number().nullable().min(0, 'Valor inválido'),
    left_arm: Yup.number().nullable().min(0, 'Valor inválido'),
    chest: Yup.number().nullable().min(0, 'Valor inválido'),
    calf: Yup.number().nullable().min(0, 'Valor inválido'),
  }),

  observations: Yup.string().nullable(),
})
