import * as Yup from 'yup'

export const validateSettingsSchedule = Yup.object().shape({
  start_time: Yup.string().required('O horário de início é obrigatório'),

  end_time: Yup.string().required('O horário de término é obrigatório'),

  appointment_duration: Yup.number()
    .min(5, 'A duração mínima é de 5 minutos')
    .required('A duração do atendimento é obrigatória'),

  max_daily_appointments: Yup.number()
    .min(1, 'Deve ter pelo menos 1 atendimento por dia')
    .required('O número máximo de atendimentos é obrigatório'),

  break_between_appointments: Yup.number()
    .min(0, 'Não pode ser negativo')
    .optional(),

  lunch_start: Yup.string().nullable(),
  lunch_end: Yup.string().nullable(),

  working_days: Yup.object().shape({
    monday: Yup.boolean(),
    tuesday: Yup.boolean(),
    wednesday: Yup.boolean(),
    thursday: Yup.boolean(),
    friday: Yup.boolean(),
    saturday: Yup.boolean(),
    sunday: Yup.boolean(),
  }),
})
