import * as Yup from 'yup'
import masks from '@/lib/masks/masks'

const isValidCpf = (cpf: string): boolean => {
  const unmasked = cpf.replace(/\D/g, '')
  return masks.validaCpf(unmasked)
}

export const validatePatientSchema = Yup.object().shape({
  document: Yup.string()
    .required('Este campo é necessário')
    .test('cpf-length', 'Informe o CPF completo', (value) => {
      if (!value) return false
      return masks.cpfMask(value).length === 14
    })
    .test('cpf-valid', 'CPF inválido', (value) => {
      if (!value) return false
      return isValidCpf(value)
    }),
  phone: Yup.string()
    .required('Este campo é necessário')
    .test(
      'phone-length',
      'Número inválido. Use o formato (11) 12345-6789',
      (value) => {
        if (!value) return false
        const digits = value.replace(/\D/g, '')
        return digits.length === 11
      },
    ),
  name: Yup.string()
    .required('Este campo é necessário')
    .min(4, 'Mínimo 4 caracteres'),
  birth_date: Yup.string().required('Este campo é necessário'),
  gender: Yup.string()
    .required('Este campo é necessário')
    .oneOf(['male', 'female', 'other'], 'Opção inválida'),
})
