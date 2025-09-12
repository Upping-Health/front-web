'use client'

import TopDash from '@/components/layout/topDash'
import { ArrowBack } from '@mui/icons-material'
import { useFormik } from 'formik'

import { DefaultContext } from '@/contexts/defaultContext'
import useLoadAnthropometry from '@/hooks/nutritionists/anthropometry/useLoadAnthropometryByUUID'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useTimer from '@/hooks/others/useTimer'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import { formatDateToBR } from '@/lib/format/date'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { CircularProgress } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import useLoadAnamnesisByUUID from '@/hooks/nutritionists/anamnesis/useLoadAnamnesisByUUID'

interface PageProps {
  params: {
    patientId: string
    anamnesisId: string
  }
}

const AnamneseCreatePage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const { countdown, resetTimer } = useTimer({
    duration: 60,
    onExpire: () => saveData(formik.values),
  })

  const {
    data: dataAnamnesis,
    loadData,
    loading,
  } = useLoadAnamnesisByUUID(params.anamnesisId, false)
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

  const formik = useFormik<any>({
    initialValues: {},
    //validationSchema: validateCreateAnthropometry,
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
      } catch (error: any) {
        const message = error?.response?.message || 'Erro ao criar anamnese.'
        return onShowFeedBack(PreFeedBack.error(message))
      } finally {
        setApiLoading(false)
        resetTimer()
      }
    },
  })

  const saveData = async (values: AnthropometryFormValues) => {
    try {
      setApiLoading(true)
      const [day, month, year] = values.evaluation_date.split('/').map(Number)
      const date = new Date(year, month - 1, day)
      const isoDate = date.toISOString()
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
        title="Anamnese"
        description="Registro e análise das medidas corporais do paciente."
        icon={AssignmentIcon}
        btnIcon={ArrowBack}
        href={`/patients/${params.patientId}/anamnesis`}
        textBtn="Voltar"
      />
      <main className="flex gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="h-full w-full flex flex-col gap-4 mb-14"
        >
          <PatientHeader
            formik={formik}
            loading={apiLoading}
            patient={patientData}
            countdown={countdown}
          />
        </form>
      </main>
    </div>
  )
}

export default AnamneseCreatePage
