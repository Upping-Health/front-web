'use client'
import MenuConsult from '@/components/consult-components/menu'
import TopDash from '@/components/layoutComponents/topDash'
import TableConsult from '@/components/tablesComponents/tableConsult'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometry'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { Person } from '@mui/icons-material'
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

    try {
      const response = await api.post('/anthropometrics/store', {
        patient_id: patientData?.id,
        evaluation_date: new Date().toISOString().substring(0, 10),
        weight: 75.5,
        height: 178,
        waist_circumference: 84.5,
        hip_circumference: 98.2,
        neck_circumference: 38.2,
        body_fat_percentage: null,
        muscle_mass_percentage: null,
        observations:
          'Paciente apresentou boa evolução desde a última avaliação',
        body_fat_method: 'pollock_7',
        skin_fold: {
          triceps: 12.5,
          biceps: 8.2,
          subscapular: 15.3,
          suprailiac: 10.7,
          abdominal: 18.1,
          thigh: 20.5,
          chest: 9.8,
          midaxillary: 11.2,
        },
        body_circumference: {
          waist: 84.5,
          hip: 98.2,
          neck: 38.2,
          shoulder: 46.5,
          chest: 102.0,
          abdominal: 86.7,
          relaxed_right_arm: 30.2,
          contracted_right_arm: 32.0,
          right_forearm: 27.1,
          right_proximal_thigh: 58.3,
          right_mid_thigh: 54.0,
          right_distal_thigh: 48.5,
          right_calf: 36.8,
          relaxed_left_arm: 29.9,
          contracted_left_arm: 31.5,
          left_proximal_thigh: 58.0,
          left_mid_thigh: 53.6,
          left_distal_thigh: 48.2,
          left_calf: 36.5,
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
        description={''}
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
