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
import { useRouter, useParams } from 'next/navigation'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import { AnthropometryFormValues } from '@/interfaces/forms/anthroprometryFormValues.interface'
import Loading from '@/components/layout/loading'
import { LinkButton } from '@/components/buttons/linkButton'

interface Params {
  patientId: string
}

const AnthropometryPage = () => {
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as Params
  const { patientId } = params

  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [documentToDelete, setDocumentToDelete] =
    useState<AnthropometryFormValues | null>(null)

  const { data, loadData, loading } = useLoadAnthropometryByPatient(
    patientId,
    false,
  )
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(patientId)

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
    [loadData, onShowFeedBack],
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
        render: (_: any, row: any) => (
          <div className="flex gap-2">
            <LinkButton
              href={`/patients/${patientId}/anthropometry/${row.uuid}`}
            >
              <CreateIcon className="text-gray-600 text-lg dark:text-white" />
            </LinkButton>
            <HeaderButton onClick={() => handleDeleteClick(row)}>
              <DeleteIcon className="text-red text-xl" />
            </HeaderButton>
          </div>
        ),
      },
    ],
    [patientData, patientId],
  )

  const handleNewAnthropometry = async () => {
    setIsNavigating(true)

    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    try {
      const response = await api.post('/anthropometrics/store', {
        patient_id: patientId,
        evaluation_date: formattedDate,
        weight: 60,
        height: 169,
        body_fat_percentage: 3,
        muscle_mass_percentage: 10,
        observations: '',
        body_fat_method: 'pollock_7',
        skin_fold: {
          triceps: 10,
          biceps: 10,
          subscapular: 10,
          suprailiac: 10,
          abdominal: 10,
          thigh: 10,
          chest: 10,
          midaxillary: 10,
        },
        body_circumference: {
          waist: 10,
          hip: 10,
          neck: 10,
          shoulder: 10,
          chest: 10,
          abdominal: 10,
          relaxed_right_arm: 10,
          contracted_right_arm: 10,
          right_forearm: 10,
          right_proximal_thigh: 10,
          right_mid_thigh: 10,
          right_distal_thigh: 10,
          right_calf: 10,
          relaxed_left_arm: 10,
          contracted_left_arm: 10,
          left_forearm: 10,
          left_proximal_thigh: 10,
          left_mid_thigh: 10,
          left_distal_thigh: 10,
          left_calf: 10,
        },
      })

      const uuid = response?.data?.message?.uuid
      if (uuid) {
        router.push(`/patients/${patientId}/anthropometry/${uuid}`)
      } else {
        onShowFeedBack(PreFeedBack.error('Erro ao criar antroprometria.'))
      }
    } catch (error: any) {
      const message =
        error?.response?.message || 'Erro ao criar antroprometria.'
      onShowFeedBack(PreFeedBack.error(message))
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
      <div className="w-full h-full flex flex-col transition-opacity duration-300">
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
            <MenuConsult patientId={patientId} />
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
