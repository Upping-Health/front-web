import masks from '@/utils/masks/masks'

export const validatPatient = (values: any) => {
  const unmaskCpf = values.cpf.replace(/\D/g, '')
  const unmaskPhone = values.phone.replace(/\D/g, '')
  let errors: any = {}

  if (!values.cpf) {
    errors.cpf = 'Este campo é necessário'
  } else if (masks.cpfMask(values.cpf).length < 14) {
    errors.cpf = 'Informe o cpf completo'
  } else if (!masks.validaCpf(unmaskCpf)) {
    errors.cpf = 'CPF inválido'
  }

  if (!unmaskPhone) {
    errors.phone = 'Este campo é necessário'
  } else if (unmaskPhone < 11) {
    errors.phone = 'Número inválido. Use o formato (11) 12345-6789'
  }

  if (!values.name) {
    errors.name = 'Este campo é necessário'
  } else if (values.name.length < 4) {
    errors.name = 'Minimo 4 caracteres'
  }

  if(!values.birthDate){
    errors.birthDate = 'Este campo é necessário'
  }

  if (!values.zipCode) {
    errors.zipCode = 'Este campo é necessário'
  }
  if (!values.street) {
    errors.street = 'Este campo é necessário'
  }
  if (!values.number) {
    errors.number = 'Este campo é necessário'
  }
  if (!values.neighborhood) {
    errors.neighborhood = 'Este campo é necessário'
  }
  if (!values.city) {
    errors.city = 'Este campo é necessário'
  }
  if (!values.state) {
    errors.state = 'Este campo é necessário'
  }
  return errors
}
