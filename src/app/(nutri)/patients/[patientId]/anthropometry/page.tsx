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

    console.log(patientData)
    try {
      const response = await api.post('/anthropometrics/store', {
        patient_id: params.patientId,
        evaluation_date: '2024-01-23',
        weight: 60.7,
        height: 169,
        body_fat_percentage: 6.15,
        muscle_mass_percentage: 93.85,
        observations: '1ª Avaliação Física',
        body_fat_method: 'pollock_7',
        skin_fold: {
          triceps: 4.0,
          biceps: null,
          subscapular: 7.0,
          suprailiac: 8.0,
          abdominal: 9.0,
          thigh: 7.0,
          chest: 4.0,
          midaxillary: 6.0,
        },
        body_circumference: {
          waist: 70.0,
          hip: 88.0,
          neck: null,
          shoulder: null,
          chest: 86.0,
          abdominal: 73.0,
          relaxed_right_arm: 27.5,
          contracted_right_arm: 32.0,
          right_forearm: null,
          right_proximal_thigh: null,
          right_mid_thigh: 51.0,
          right_distal_thigh: null,
          right_calf: 34.0,
          relaxed_left_arm: 27.5,
          contracted_left_arm: 32.0,
          left_forearm: null,
          left_proximal_thigh: null,
          left_mid_thigh: 52.5,
          left_distal_thigh: null,
          left_calf: 33.0,
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
