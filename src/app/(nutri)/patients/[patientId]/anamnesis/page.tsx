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
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import api from '@/services/api'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import Loading from '@/components/layout/loading'
interface PageProps {
  params: {
    patientId: string
  }
}

const AnamnesisPage = ({ params }: PageProps) => {
  const router = useRouter()
  const { onShowFeedBack } = useContext(DefaultContext)
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
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  const onSaveAnamnese = async () => {
    setIsNavigating(true)
    try {
      const get_form_response = await api.get('forms/type/anamnese')
      const form = get_form_response?.data?.data

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
      const uuid = create_form_response?.data?.data?.uuid
      if (uuid) {
        router.push(`/patients/${params.patientId}/anamnesis/${uuid}`)
      } else {
        return onShowFeedBack(PreFeedBack.error('Erro ao criar anamnese.'))
      }
    } catch (error) {
      return onShowFeedBack(PreFeedBack.error('Erro ao criar anamnese.'))
    } finally {
      setIsNavigating(false)
    }
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
          <Loading
            text="Carregando histórico de antropometria..."
            className="!h-full w-full"
          />
        ) : (
          <TableDash search={false} rowKey="id" data={data} columns={columns} />
        )}

        <div className="h-full flex justify-end">
          <MenuConsult patientId={params.patientId} />
        </div>
      </div>

      <LoadingFullScreen
        open={isNavigating}
        labelLoading="Criando anamnese..."
      />
    </div>
  )
}

export default AnamnesisPage
