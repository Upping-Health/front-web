export const validateAgenda = (values: any) => {
  const errors: any = {}

  if (!values.patient) {
    errors.patient = 'Paciente é obrigatório'
  }

  if (!values.start_time) {
    errors.start_time = 'Data de início é obrigatória'
  }

  if (!values.end_time) {
    errors.end_time = 'Data de fim é obrigatória'
  }

  if (values.start_time && values.end_time) {
    const start = new Date(values.start_time)
    const end = new Date(values.end_time)

    if (start > end) {
      errors.start_time = 'A data de início não pode ser maior que a de fim'
      errors.end_time = 'A data de fim deve ser maior que a de início'
    }
  }

  console.log(errors, 'eerors')

  return errors
}
