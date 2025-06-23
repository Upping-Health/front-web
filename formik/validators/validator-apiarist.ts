import masks from '@/utils/masks/masks'

export const validateApiarist = (values: any) => {
  const unmaskCpf = values.cpf.replace(/\D/g, '')
  const unmaskPhone = values.phone.replace(/\D/g, '')
  let errors: any = {}

  if (!values.latitude) {
    errors.latitude = 'Este campo é necessário'
  } else if (Number(values.latitude) < -90 || Number(values.latitude) > 90) {
    errors.latitude = 'Latitude deve estar entre -90 e 90'
  }

  if (!values.longitude) {
    errors.longitude = 'Este campo é necessário'
  } else if (
    Number(values.longitude) < -180 ||
    Number(values.longitude) > 180
  ) {
    errors.longitude = 'Longitude deve estar entre -180 e 180'
  }

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

  if (!values.email) {
    errors.email = 'Este campo é necessário'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email inválido'
  }

  if (!values.id && !values.password) {
    errors.password = 'Este campo é necessário'
  } else if (values.password && values.password.length < 6) {
    errors.password = 'Mínimo 6 caracteres'
  }

  return errors
}
