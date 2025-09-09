'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useLoadSubmissionByPatient from '@/hooks/nutritionists/useLoadSubmissionByPatient'
import { SEX_PT_BR } from '@/lib/types/sex'
import { Person } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import { CircularProgress } from '@mui/material'
import dateFormat from 'dateformat'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import api from '@/services/api'
import ModalAddDocument from './_components/ModalAddDocument'
interface PageProps {
  params: {
    patientId: string
  }
}

const DocumentsPage = ({ params }: PageProps) => {
  const [isNavigating, setIsNavigating] = useState(false)
  const [openAddDocument, setOpenAddDocument] = useState(false)

  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const { data, loading, loadData } = useLoadSubmissionByPatient(
    params.patientId,
    '',
    false,
  )

  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  const columns = useMemo(
    () => [
      {
        header: 'Data do upload',
        field: 'evaluation_date',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy')
        },
      },
    ],
    [],
  )

  if (patientLoading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  const onCreateDocument = () => {
    setOpenAddDocument(true)
  }

  return (
    <>
      <div
        className={
          'w-full h-full flex flex-col transition-opacity duration-300'
        }
      >
        <TopDash
          title={patientData?.name ?? 'Paciente'}
          description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
          icon={Person}
          onClick={onCreateDocument}
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
      />
    </>
  )
}

export default DocumentsPage
