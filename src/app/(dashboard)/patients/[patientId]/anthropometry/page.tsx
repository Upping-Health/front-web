'use client'
import MenuConsult from '@/components/consult-components/menu'
import TopDash from '@/components/layoutComponents/topDash'
import TableConsult from '@/components/tablesComponents/tableConsult'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometry'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { Person, Straighten } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { notFound } from 'next/navigation'
import PatientNotFound from '../../_components/PatientNotFound'
import { useCallback, useContext, useState } from 'react'
import api from '@/services/api'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import LoadingFullScreen from '@/components/layoutComponents/loadingGlobal'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/utils/feedbackStatus'
import { SEX_PT_BR } from '@/utils/types/sex'

interface PageProps {
  params: {
    patientId: string
  }
}

const AnthropometryPage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)

  const { data, loadData, loading } = useLoadAnthropometry(
    params.patientId,
    false,
  )
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const router = useRouter()

  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  const handleNewAnthropometry = async () => {
    setIsNavigating(true)

    console.log(patientData)
    try {
      const response = await api.post('/anthropometrics/store', {
        patient_id: 3, // VER A QUESTÃO DO ID
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
    } catch (error) {
      return onShowFeedBack(PreFeedBack.error('Erro ao criar antroprometria.'))
    } finally {
      setIsNavigating(false)
    }
  }

  if (patientLoading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  console.log(data)
  return (
    <div
      className={'w-full h-full flex flex-col transition-opacity duration-300'}
    >
      <TopDash
        title={patientData?.name ?? 'Paciente'}
        description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
        icon={Person}
        onClick={handleNewAnthropometry}
        textBtn="Nova antropmetria"
      />

      <div className="h-full w-full flex gap-4">
        {loading ? (
          <LoadingData label="Carregando histórico de antropometria..." />
        ) : (
          <TableConsult rowKey="id" data={[]} columns={[]} />
        )}

        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>

      <LoadingFullScreen open={isNavigating} labelLoading="Navegando..." />
    </div>
  )
}

export default AnthropometryPage
