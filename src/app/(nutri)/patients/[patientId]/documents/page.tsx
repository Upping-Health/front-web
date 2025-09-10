'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import TableDash from '@/components/tables/tableDash'
import useLoadDocumentsByPatient from '@/hooks/nutritionists/useLoadDocumentsByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { SEX_PT_BR } from '@/lib/types/sex'
import { Person } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import { CircularProgress } from '@mui/material'
import dateFormat from 'dateformat'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import ModalAddDocument from './_components/ModalAddDocument'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import api from '@/services/api'
import Documents from '@/interfaces/documents.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import { DefaultContext } from '@/contexts/defaultContext'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import Loading from '@/components/layout/loading'
interface PageProps {
  params: {
    patientId: string
  }
}

const DocumentsPage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)
  const [openAddDocument, setOpenAddDocument] = useState(false)

  const [openConfirm, setOpenConfirm] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Documents | null>(
    null,
  )
  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const { data, loading, loadData } = useLoadDocumentsByPatient(
    params.patientId,
    false,
  )

  const onDeleteDocument = useCallback(
    async (document: Documents) => {
      try {
        await api.delete(
          `users/${patientData?.uuid}/attachments/${document.id}`,
        )
        loadData()
        onShowFeedBack(PreFeedBack.success('Documento excluído com sucesso!'))
      } catch (error: any) {
        const message = error?.response?.message || 'Erro ao excluir documento.'
        onShowFeedBack(PreFeedBack.error(message))
      }
    },
    [patientData, loadData, onShowFeedBack],
  )

  const handleDeleteClick = (doc: Documents) => {
    setDocumentToDelete(doc)
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
    return <LoadingData label="Carregando dados do paciente..." />
  if (!patientLoading && !patientData) return <PatientNotFound />

  return (
    <>
      <div className="w-full h-full flex flex-col transition-opacity duration-300">
        <TopDash
          title={patientData?.name ?? 'Paciente'}
          description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
          icon={Person}
          onClick={() => setOpenAddDocument(true)}
          textBtn="Novo Documento"
        />

        <div className="h-full w-full flex gap-4">
          {loading ? (
            <LoadingData label="Carregando histórico de antropometria..." />
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

        <LoadingFullScreen open={isNavigating} labelLoading="Navegando..." />
      </div>

      <ModalAddDocument
        open={openAddDocument}
        setIsClose={() => setOpenAddDocument(false)}
        patient={patientData}
        loadData={loadData}
      />

      <ModalConfirmation
        open={openConfirm}
        setIsClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!documentToDelete) return
          await onDeleteDocument(documentToDelete)
        }}
      />
    </>
  )
}

export default DocumentsPage
