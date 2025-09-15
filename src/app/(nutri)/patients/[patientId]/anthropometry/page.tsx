'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadAnthropometryByPatient from '@/hooks/nutritionists/anthropometry/useLoadAnthropometryByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import api from '@/services/api'
import { Person } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import { CircularProgress } from '@mui/material'
import dateFormat from 'dateformat'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import Loading from '@/components/layout/loading'

interface PageProps {
  params: {
    patientId: string
  }
}

const AnthropometryPage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [documentToDelete, setDocumentToDelete] =
    useState<AnthropometryFormValues | null>(null)

  const { data, loadData, loading } = useLoadAnthropometryByPatient(
    params.patientId,
    false,
  )
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const router = useRouter()

  const onDeleteAnthropometry = useCallback(
    async (document: AnthropometryFormValues) => {
      try {
        await api.delete(`anthropometrics/delete/${document.uuid}`)
        loadData()
        onShowFeedBack(
          PreFeedBack.success('Antropometria excluída com sucesso!'),
        )
      } catch (error: any) {
        const message =
          error?.response?.message || 'Erro ao excluir antropometria.'
        onShowFeedBack(PreFeedBack.error(message))
      }
    },
    [patientData, loadData, onShowFeedBack],
  )

  const handleDeleteClick = (doc: AnthropometryFormValues) => {
    setDocumentToDelete(doc)
    setOpenConfirm(true)
  }

  const columns = useMemo(
    () => [
      {
        header: '#',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={patientData} />,
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
            <div className="flex gap-2">
              <HeaderButton
                onClick={() =>
                  router.push(
                    `/patients/${params.patientId}/anthropometry/${row.uuid}`,
                  )
                }
              >
                <CreateIcon className="text-gray-600 text-lg dark:text-white" />
              </HeaderButton>

              <HeaderButton onClick={() => handleDeleteClick(row)}>
                <DeleteIcon className="text-red text-xl" />
              </HeaderButton>
            </div>
          )
        },
      },
    ],
    [patientData],
  )

  const handleNewAnthropometry = async () => {
    setIsNavigating(true)

    const today = new Date()
    const year = String(today.getFullYear())
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    try {
      const response = await api.post('/anthropometrics/store', {
        patient_id: params.patientId,
        evaluation_date: formattedDate,
        weight: 0,
        height: 0,
        body_fat_percentage: null,
        muscle_mass_percentage: null,
        observations: '',
        body_fat_method: 'pollock_7',
        skin_fold: {
          triceps: null,
          biceps: null,
          subscapular: null,
          suprailiac: null,
          abdominal: null,
          thigh: null,
          chest: null,
          midaxillary: null,
        },
        body_circumference: {
          waist: null,
          hip: null,
          neck: null,
          shoulder: null,
          chest: null,
          abdominal: null,
          relaxed_right_arm: null,
          contracted_right_arm: null,
          right_forearm: null,
          right_proximal_thigh: null,
          right_mid_thigh: null,
          right_distal_thigh: null,
          right_calf: null,
          relaxed_left_arm: null,
          contracted_left_arm: null,
          left_forearm: null,
          left_proximal_thigh: null,
          left_mid_thigh: null,
          left_distal_thigh: null,
          left_calf: null,
        },
      })

      const uuid = response?.data?.message?.uuid

      if (uuid) {
        router.push(`/patients/${params.patientId}/anthropometry/${uuid}`)
      } else {
        return onShowFeedBack(
          PreFeedBack.error('Erro ao criar antroprometria.'),
        )
      }
    } catch (error: any) {
      const message =
        error?.response?.message || 'Erro ao criar antroprometria.'
      return onShowFeedBack(PreFeedBack.error(message))
    } finally {
      setIsNavigating(false)
    }
  }

  if (patientLoading) {
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
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
          onClick={handleNewAnthropometry}
          textBtn="Nova antropometria"
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

        <LoadingFullScreen
          open={isNavigating}
          labelLoading="Criando antropometria..."
        />
      </div>

      <ModalConfirmation
        open={openConfirm}
        setIsClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!documentToDelete) return
          await onDeleteAnthropometry(documentToDelete)
        }}
      />
    </>
  )
}

export default AnthropometryPage
