'use client'

import TopDash from '@/components/layout/topDash'
import { Straighten } from '@mui/icons-material'
import { useFormik } from 'formik'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometryByUUID'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import { validateCreateAnthropometry } from '@/lib/formik/validators/validator-anthroprometry'
import api from '@/services/api'
import { CircularProgress } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import AnalysisSidebar from '../../anthropometry/_components/AnalysisSidebar'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import useTimer from '@/hooks/others/useTimer'

interface PageProps {
  params: {
    patientId: string
    energyCalculationId: string
  }
}

const EnergyCalculationCreatePage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const { countdown } = useTimer({
    duration: 60,
    onExpire: () => saveData(formik.values),
  })

  const {
    data: dataAnthropometry,
    loadData,
    loading,
  } = useLoadAnthropometry(params.energyCalculationId, false)
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  const formik = useFormik<AnthropometryFormValues>({
    initialValues: {
      evaluation_date: '',
      weight: 0,
      height: 0,
      body_fat_percentage: 0,
      muscle_mass_percentage: 0,
      observations: '',
      body_fat_method: 'pollock_7',
      skin_fold: {
        triceps: 0,
        biceps: 0,
        subscapular: 0,
        suprailiac: 0,
        abdominal: 0,
        thigh: 0,
        chest: 0,
        midaxillary: 0,
        calf: 0,
      },
      body_circumference: {
        waist: 0,
        hip: 0,
        neck: null,
        shoulder: null,
        chest: 0,
        abdominal: 0,
        relaxed_right_arm: 0,
        contracted_right_arm: 0,
        right_forearm: null,
        right_proximal_thigh: null,
        right_mid_thigh: 0,
        right_distal_thigh: null,
        right_calf: 0,
        relaxed_left_arm: 0,
        contracted_left_arm: 0,
        left_forearm: null,
        left_proximal_thigh: null,
        left_mid_thigh: 0,
        left_distal_thigh: null,
        left_calf: 0,
      },
    },
    validationSchema: validateCreateAnthropometry,
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
        await api.put(
          `/anthropometrics/update/${params.energyCalculationId}`,
          values,
        )
        onShowFeedBack(
          PreFeedBack.success('Antropometria realizada com sucesso'),
        )
      } catch (error) {
        onShowFeedBack(PreFeedBack.error('Erro ao realizar antropometria'))
      } finally {
        setApiLoading(false)
      }
    },
  })

  useEffect(() => {
    if (dataAnthropometry) {
      formik.setValues({
        evaluation_date:
          dataAnthropometry.evaluation_date ||
          new Date().toISOString().split('T')[0],
        weight: dataAnthropometry.weight,
        height: dataAnthropometry.height,
        body_fat_percentage: dataAnthropometry.body_fat_percentage,
        muscle_mass_percentage: dataAnthropometry.muscle_mass_percentage,
        observations: dataAnthropometry.observations,
        body_fat_method: dataAnthropometry.body_fat_method,
        skin_fold: {
          triceps: dataAnthropometry.skin_fold?.triceps || 0,
          biceps: dataAnthropometry.skin_fold?.biceps || 0,
          subscapular: dataAnthropometry.skin_fold?.subscapular || 0,
          suprailiac: dataAnthropometry.skin_fold?.suprailiac || 0,
          abdominal: dataAnthropometry.skin_fold?.abdominal || 0,
          thigh: dataAnthropometry.skin_fold?.thigh || 0,
          chest: dataAnthropometry.skin_fold?.chest || 0,
          midaxillary: dataAnthropometry.skin_fold?.midaxillary || 0,
          calf: dataAnthropometry.skin_fold?.calf || 0,
        },
        body_circumference: {
          waist: dataAnthropometry.body_circumference?.waist || 0,
          hip: dataAnthropometry.body_circumference?.hip || 0,
          neck: dataAnthropometry.body_circumference?.neck ?? null,
          shoulder: dataAnthropometry.body_circumference?.shoulder ?? null,
          chest: dataAnthropometry.body_circumference?.chest || 0,
          abdominal: dataAnthropometry.body_circumference?.abdominal || 0,
          relaxed_right_arm:
            dataAnthropometry.body_circumference?.relaxed_right_arm || 0,
          contracted_right_arm:
            dataAnthropometry.body_circumference?.contracted_right_arm || 0,
          right_forearm:
            dataAnthropometry.body_circumference?.right_forearm ?? null,
          right_proximal_thigh:
            dataAnthropometry.body_circumference?.right_proximal_thigh ?? null,
          right_mid_thigh:
            dataAnthropometry.body_circumference?.right_mid_thigh || 0,
          right_distal_thigh:
            dataAnthropometry.body_circumference?.right_distal_thigh ?? null,
          right_calf: dataAnthropometry.body_circumference?.right_calf || 0,
          relaxed_left_arm:
            dataAnthropometry.body_circumference?.relaxed_left_arm || 0,
          contracted_left_arm:
            dataAnthropometry.body_circumference?.contracted_left_arm || 0,
          left_forearm:
            dataAnthropometry.body_circumference?.left_forearm ?? null,
          left_proximal_thigh:
            dataAnthropometry.body_circumference?.left_proximal_thigh ?? null,
          left_mid_thigh:
            dataAnthropometry.body_circumference?.left_mid_thigh || 0,
          left_distal_thigh:
            dataAnthropometry.body_circumference?.left_distal_thigh ?? null,
          left_calf: dataAnthropometry.body_circumference?.left_calf || 0,
        },
      })
    }
  }, [dataAnthropometry])

  const saveData = async (values: AnthropometryFormValues) => {
    try {
      setApiLoading(true)
      await api.put(
        `/anthropometrics/update/${params.energyCalculationId}`,
        values,
      )
    } catch (error) {
    } finally {
      setApiLoading(false)
    }
  }

  if (loading || patientLoading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <div className="w-full flex flex-col transition-opacity duration-300">
      <TopDash
        title="Cálculo Energético"
        description="Registro das necessidades calóricas diárias do paciente."
        icon={FlashOnIcon}
      />
      <main className="flex gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="h-full w-3/4 flex flex-col gap-4 mb-14"
        >
          <PatientHeader
            formik={formik}
            loading={apiLoading}
            patient={patientData}
            countdown={countdown}
          />
        </form>

        <div className="w-2/4 h-fit sticky top-6">
          <AnalysisSidebar values={formik.values} patient={patientData} />
        </div>
      </main>
    </div>
  )
}

export default EnergyCalculationCreatePage
