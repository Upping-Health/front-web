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
interface PageProps {
  params: {
    patientId: string
  }
}

const AnamnesisPage = ({ params }: PageProps) => {
  const [isNavigating, setIsNavigating] = useState(false)

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

  const router = useRouter()

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
        header: '#',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={row?.patient} />,
      },
      {
        header: 'Data da avaliação',
        field: 'evaluation_date',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy')
        },
      },
      {
        header: 'Data da atualização',
        field: 'updated_at',
        render: (value: any) => {
          if (!value) return ''

          const date = new Date(value)
          return dateFormat(date, 'dd/MM/yyyy')
        },
      },
      {
        header: 'Observação',
        field: 'observations',
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => {
          return (
            <HeaderButton
              onClick={() =>
                router.push(
                  `/patients/${params.patientId}/anthropometry/${row.uuid}`,
                )
              }
            >
              <CreateIcon className="text-gray-600 text-lg dark:text-white" />
            </HeaderButton>
          )
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

  const onSaveAnamnese = async () => {
    const get_form_response = await api.get('forms/type/anamnese')
    const form = get_form_response?.data?.data

    const defaultValues: Record<string, any> = {
      text: '',
      number: 0,
      checkbox: [],
      radio: '',
      textarea: '',
      range: 0,
      select: '',
      date: '',
    }

    const forms = form.fields.map((field: any) => ({
      field_id: field.uuid,
      value: null,
    }))

    const create_form_response = await api.post(
      `forms/submission/store/${form.uuid}`,
      {
        client_id: 1,
        patient_id: 1,
        answers: forms,
        submit: false,
      },
    )

    console.log(create_form_response)
  }

  return (
    <div
      className={'w-full h-full flex flex-col transition-opacity duration-300'}
    >
      <TopDash
        title={patientData?.name ?? 'Paciente'}
        description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
        icon={Person}
        onClick={onSaveAnamnese}
        textBtn="Nova Anamnese"
      />

      <div className="h-full w-full flex gap-4">
        {loading ? (
          <LoadingData label="Carregando histórico de antropometria..." />
        ) : (
          <TableDash search={false} rowKey="id" data={data} columns={columns} />
        )}

        <div className="h-full flex justify-end">
          <MenuConsult patientId={params.patientId} />
        </div>
      </div>

      <LoadingFullScreen open={isNavigating} labelLoading="Navegando..." />
    </div>
  )
}

export default AnamnesisPage
