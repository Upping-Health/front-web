'use client'

import ButtonStyled from '@/components/buttons/button'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import { CircularProgress, MenuItem, Select } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import api from '@/services/api'
import Patient from '@/interfaces/patient.interface'
import InputStyled from '@/components/inputs/inputStyled'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaymentIcon from '@mui/icons-material/Payment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { colors } from '@/lib/colors/colors'
import masks from '@/lib/masks/masks'
import SelectStyled from '@/components/inputs/select'
import PaymentsIcon from '@mui/icons-material/Payments'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { validateManualFinance } from '@/lib/formik/validators/validator-manual-finance'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  patient: Patient | null
  loadData?: () => Promise<void>
}

const ModalAddTransaction = ({
  open,
  setIsClose,
  patient,
  loadData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Transação criada com sucesso!'))
    setIsClose()
    loadData && loadData()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.message || 'Falha ao criar a transação.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.error('[ERROR API /transactions]', errorMessage)
  }

  useEffect(() => {
    if (!open)
      formik.resetForm({
        values: {
          amount: '',
          payment_method: 'cash',
          status: 'pending',
        },
      })
  }, [open])

  const formik = useFormik({
    initialValues: {
      amount: '',
      payment_method: '',
      status: '',
    },
    validationSchema: validateManualFinance,
    onSubmit: async (values) => {
      try {
        setLoading(true)

        await api.post(`/finance/transactions/create`, {
          client_id: '',
          professional_id: '',
          patient_id: patient?.uuid,
          appointment_id: '',
          amount: Number(values.amount),
          payment_method: values.payment_method,
          status: values.status,
        })

        onSuccess()
      } catch (error) {
        onError(error)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <ModalBase open={open}>
      <ModalHeader
        title="Nova Transação"
        onClose={loading ? undefined : setIsClose}
      />

      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <InputStyled
            id="amount"
            label="Valor"
            placeholder="Digite o valor da transação"
            type="text"
            icon={<AttachMoneyIcon className="text-black dark:text-white" />}
            value={masks.maskMoney(formik.values.amount)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.amount}
            isTouched={formik.touched.amount}
          />

          <SelectStyled
            id="payment_method"
            label="Forma de pagamento"
            placeholder="Selecione a forma de pagamento"
            value={formik.values.payment_method}
            onChange={formik.handleChange}
            icon={<PaymentsIcon className="text-black dark:text-white" />}
            options={[
              {
                text: 'Dinheiro',
                value: 'cash',
              },
              {
                text: 'PIX',
                value: 'pix',
              },
              {
                text: 'Cartão de Crédito',
                value: 'credit_card',
              },
              {
                text: 'Boleto Bancário',
                value: 'bank_slip',
              },
            ]}
          />

          <SelectStyled
            id="status"
            label="Status"
            placeholder="Selecione a forma de pagamento"
            value={formik.values.status}
            onChange={formik.handleChange}
            icon={<ReceiptIcon className="text-black dark:text-white" />}
            options={[
              {
                text: 'Concluída',
                value: 'completed',
              },
              {
                text: 'Pendente',
                value: 'pending',
              },
              {
                text: 'Cancelada',
                value: 'canceled',
              },
              {
                text: 'Reembolsada',
                value: 'refunded',
              },
            ]}
          />
        </form>
      </ModalContent>

      <ModalFooter>
        <ButtonStyled
          type="button"
          onClick={loading ? undefined : setIsClose}
          styles="w-full"
          bgColor="bg-red-600"
          title="Cancelar"
        />

        <ButtonStyled
          type="submit"
          onClick={formik.handleSubmit}
          styles="w-full bg-green-600"
          disabled={!formik.isValid || loading}
          title={loading ? 'Salvando...' : 'Adicionar'}
          icon={
            loading && (
              <CircularProgress
                style={{ width: 20, height: 20, color: '#FFFFFF' }}
              />
            )
          }
        />
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalAddTransaction
