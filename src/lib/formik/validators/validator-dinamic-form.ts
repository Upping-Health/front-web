import * as Yup from 'yup'
import { Answer } from '@/interfaces/form-response.interface'

export const createValidationSchemaFromAnswers = (answers: Answer[]) => {
  const shape: Record<string, any> = {}

  answers.forEach((answer) => {
    const field = answer.field
    if (!field.required) return

    switch (field.type) {
      case 'text':
      case 'textarea':
        shape[field.uuid] = Yup.string().trim().required('Campo obrigatório')
        break

      case 'number':
      case 'range':
        shape[field.uuid] = Yup.number()
          .typeError('Deve ser um número')
          .moreThan(0, 'Valor inválido')
          .required('Campo obrigatório')
        break

      case 'date':
        shape[field.uuid] = Yup.date()
          .typeError('Data inválida')
          .required('Campo obrigatório')
        break

      case 'select':
      case 'radio':
        shape[field.uuid] = Yup.string().required('Seleção obrigatória')
        break

      case 'checkbox':
        shape[field.uuid] = Yup.array()
          .min(1, 'Selecione pelo menos uma opção')
          .required('Campo obrigatório')
        break

      default:
        shape[field.uuid] = Yup.mixed().required('Campo obrigatório')
    }
  })

  return Yup.object().shape(shape)
}
