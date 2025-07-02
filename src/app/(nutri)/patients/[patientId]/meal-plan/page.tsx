'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import Loading from '@/components/layout/loading'
import TopDash from '@/components/layout/topDash'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadTransactionsByUUID from '@/hooks/nutritionists/transactions/useLoadTransactionsByUUID'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import { Person } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import dateFormat from 'dateformat'
import { useParams } from 'next/navigation'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import ModalAddTransaction from './_components/ModalAddTransaction'
import Money from '@/lib/masks/money'
import {
  TRANSACTION_PAY_TYPE_PT_BR,
  TRANSACTION_STATUS_PT_BR,
} from '@/lib/types/transactions-type'
interface PageProps {
  patientId: string
}

const MealPlanPage = () => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps
  const [openAddFinance, setOpenAddFinance] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [dataToDelete, setDataToDelete] = useState<any | null>(null)

  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const { data, loading, loadData } = useLoadTransactionsByUUID(
    params.patientId,
    false,
  )

  const onDelete = useCallback(
    async (data: any) => {
      try {
        // await api.delete(
        //   `users/${patientData?.uuid}/attachments/${document.id}`,
        // )
        loadData()
        onShowFeedBack(PreFeedBack.success('Documento excluído com sucesso!'))
      } catch (error: any) {
        const message = error?.response?.message || 'Erro ao excluir documento.'
        onShowFeedBack(PreFeedBack.error(message))
      }
    },
    [patientData, loadData, onShowFeedBack],
  )

  const handleDeleteClick = (data: any) => {
    setDataToDelete(data)
    setOpenConfirm(true)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Data do pagamento',
        field: 'created_at',
        render: (value: any) => dateFormat(new Date(value), 'dd/mm/yyyy HH:mm'),
      },
      {
        header: 'Forma de pagamento',
        field: 'payment_method',
        render: (_: any, row: any) =>
          (TRANSACTION_PAY_TYPE_PT_BR as any)[row.payment_method],
      },
      {
        header: 'Status',
        field: 'status',
        render: (_: any, row: any) =>
          (TRANSACTION_STATUS_PT_BR as any)[row.status],
      },
      {
        header: 'Valor',
        field: 'amount_cents',
        render: (_: any, row: any) => {
          console.log(row)
          return Money.centsToMaskMoney(row.amount_cents)
        },
      },
      {
        header: 'Tipo',
        field: 'type',
        render(_: any, row: any) {
          return (
            <div
              className={`
              text-black
              h-[35px]
              px-3
              w-14
              rounded-6
              shadow-md
              font-semibold
              flex
              justify-center
              items-center
              transition
              duration-300
              text-xs
              ${row.type === 'in' ? 'bg-paid text-white' : 'bg-yellow-100 text-black'}
            `}
            >
              <p
                className={`${row.type === 'in' ? 'text-paidFont' : 'text-yellow-400'} font-semibold`}
              >
                {row.type === 'in' ? 'Entrada' : 'Saída'}
              </p>
            </div>
          )
        },
      },
      // {
      //   header: '#',
      //   field: '{row}',
      //   render: (_: any, row: any) => (
      //     <div className="flex gap-2">
      //       <HeaderButton onClick={() => handleDeleteClick(row)}>
      //         <DeleteIcon className="text-red text-xl" />
      //       </HeaderButton>
      //     </div>
      //   ),
      // },
    ],
    [handleDeleteClick],
  )

  if (patientLoading)
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  if (!patientLoading && !patientData) return <PatientNotFound />

  return (
    <>
      <div className="w-full h-full flex flex-col transition-opacity duration-300">
        <TopDash
          title={patientData?.name ?? 'Paciente'}
          description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
          icon={Person}
          href={`/patients/${params.patientId}/meal-plan/create`}
          textBtn="Novo Plano Alimentar"
        />

        <div className="h-full w-full flex gap-4">
          {loading ? (
            <Loading
              text="Carregando histórico de transações..."
              className="!h-full w-full"
            />
          ) : (
            <TableDash
              search={false}
              rowKey="id"
              data={data}
              columns={columns}
            />
          )}

          <div className="h-full flex justify-end">
            <MenuConsult patientId={params.patientId} />
          </div>
        </div>
      </div>

      <ModalAddTransaction
        open={openAddFinance}
        setIsClose={() => setOpenAddFinance(false)}
        patient={patientData}
        loadData={loadData}
      />

      <ModalConfirmation
        open={openConfirm}
        setIsClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!dataToDelete) return
          await onDelete(dataToDelete)
        }}
      />
    </>
  )
}

export default MealPlanPage
