import * as Yup from 'yup'
import masks from '@/lib/masks/masks'

export const validateManualFinance = Yup.object().shape({
  amount: Yup.string()
    .typeError('O valor deve ser numérico')
    .required('O valor é obrigatório')
    .min(1, 'O valor deve ser maior que zero'),
  payment_method: Yup.string().required('Selecione a forma de pagamento'),
  status: Yup.string().required('Selecione o status'),
})
