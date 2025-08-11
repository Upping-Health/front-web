import * as Yup from 'yup'
import masks from '@/lib/masks/masks'

export const validateCreateUser = Yup.object().shape({
  document: Yup.string()
    .required('Este campo é necessário')
    .test(
      'cpf-length',
      'Informe o documento completo',
      (val) => masks.cpfMask(val || '').length >= 14,
    )
    .test('cpf-valid', 'CPF inválido', (val) =>
      masks.validaCpf(masks.unmask(val || '')),
    ),
  phone: Yup.string()
    .required('Este campo é necessário')
    .test(
      'phone-length',
      'Número inválido. Use o formato (11) 12345-6789',
      (val) => masks.unmask(val || '').length === 11,
    ),
  name: Yup.string()
    .required('Este campo é necessário')
    .min(4, 'Mínimo 4 caracteres'),
  email: Yup.string()
    .required('Este campo é necessário')
    .email('E-mail inválido'),
  birth_date: Yup.string().required('Este campo é necessário'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other'])
    .required('Selecione um gênero'),
  role: Yup.string().required('Selecione uma função'),
})
