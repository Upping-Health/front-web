'use client'

import TopDash from '@/components/layout/topDash'
import { ArrowBack, Straighten } from '@mui/icons-material'
import { useFormik } from 'formik'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

import Loading from '@/components/layout/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useTimer from '@/hooks/others/useTimer'
import PreFeedBack from '@/lib/feedbackStatus'
import { validateCreateAnthropometry } from '@/lib/formik/validators/validator-anthroprometry'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'

interface PageProps {
  patientId: string
  mealPlanId: string
}

const MealPlanCreatePage = () => {
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const { countdown, resetTimer } = useTimer({
    duration: 60,
    onExpire: () => ({}),
  })
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const formik = useFormik({
    initialValues: {},
    validationSchema: validateCreateAnthropometry,
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
      } catch (error: any) {
        const message =
          error?.response?.message || 'Erro ao criar antroprometria.'
        return onShowFeedBack(PreFeedBack.error(message))
      } finally {
        setApiLoading(false)
        resetTimer()
      }
    },
  })

  if (false || patientLoading) {
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <div className="w-full flex flex-col transition-opacity duration-300">
      <TopDash
        title="Plano Alimentar"
        description="Gerencie o plano alimentar personalizado do paciente."
        icon={RestaurantMenuIcon}
        btnIcon={ArrowBack}
        href={`/patients/${params.patientId}/meal-plan`}
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

export default MealPlanCreatePage
