'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import Loading from '@/components/layout/loading'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadDocumentsByPatient from '@/hooks/nutritionists/useLoadDocumentsByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import Documents from '@/interfaces/documents.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import api from '@/services/api'
import { Person } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import dateFormat from 'dateformat'
import { useParams } from 'next/navigation'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import ModalAddDocument from './_components/ModalAddTransaction'
import ModalAddTransaction from './_components/ModalAddTransaction'
interface PageProps {
  patientId: string
}

const FinancialPage = () => {
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

  const { data, loading, loadData } = useLoadDocumentsByPatient(
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
        header: 'Data do upload',
        field: 'created_at',
        render: (value: any) => dateFormat(new Date(value), 'dd/mm/yyyy HH:mm'),
      },
      { header: 'Arquivo', field: 'original_name' },
      { header: 'Tipo', field: 'mime_type' },
      {
        header: 'Tamanho',
        field: 'size',
        render: (_: any, row: any) =>
          `${(row.size / (1024 * 1024)).toFixed(2)} MB`,
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => (
          <div className="flex gap-2">
            <HeaderButton onClick={() => {}}>
              <VisibilityIcon className="text-primary dark:text-white text-xl" />
            </HeaderButton>

            <HeaderButton onClick={() => handleDeleteClick(row)}>
              <DeleteIcon className="text-red text-xl" />
            </HeaderButton>
          </div>
        ),
      },
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
          onClick={() => setOpenAddFinance(true)}
          textBtn="Nova Transação"
        />

        <div className="h-full w-full flex gap-4">
          {loading ? (
            <Loading
              text="Carregando histórico de antropometria..."
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

export default FinancialPage
