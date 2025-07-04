import masks from '@/utils/masks/masks'

export const validateClient = (values: any) => {
  const unmask = values.document.replace(/\D/g, '')
  const errors: any = {}

  if (!values.document) {
    errors.document = 'Este campo é necessário'
  } else {
    if (values.typePerson === 'common') {
      if (values.document.length < 14) {
        errors.document = 'Informe o CPF completo'
      } else if (!masks.validaCpf(unmask)) {
        errors.document = 'CPF inválido'
      }
    } else if (values.typePerson === 'company') {
      if (values.document.length < 18) {
        errors.document = 'Informe o CNPJ completo'
      } else if (!masks.validaCnpj(unmask)) {
        errors.document = 'CNPJ inválido'
      }
    }
  }

  if (!values.name) {
    errors.name = 'Este campo é necessário'
  }

  if (!values.phone) {
    errors.phone = 'Este campo é necessário'
  }

  if (!values.birthDate) {
    errors.birthDate = 'Este campo é necessário'
  }

  if (!values.email) {
    errors.email = 'Este campo é necessário'
  } else if (!masks.validateEmail(values.email)) {
    errors.email = 'Email inválido'
  }

  if (!values.password) {
    errors.password = 'Este campo é necessário'
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve ter no mínimo 6 caracteres'
  }

  return errors
}
