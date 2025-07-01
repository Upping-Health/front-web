export const validateAgenda = (values: any) => {
  const errors: any = {}

  if (!values.patient) {
    errors.patient = 'Paciente é obrigatório'
  }

  if (!values.startDate) {
    errors.startDate = 'Data de início é obrigatória'
  }

  if (!values.endDate) {
    errors.endDate = 'Data de fim é obrigatória'
  }

  if (values.startDate && values.endDate) {
    const start = new Date(values.startDate)
    const end = new Date(values.endDate)

    if (start > end) {
      errors.startDate = 'A data de início não pode ser maior que a de fim'
      errors.endDate = 'A data de fim deve ser maior que a de início'
    }
  }

  return errors
}
