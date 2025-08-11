'use client'

import TopDash from '@/components/layout/topDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useTimer from '@/hooks/others/useTimer'
import PreFeedBack from '@/lib/feedbackStatus'
import api from '@/services/api'
import { ArrowBack } from '@mui/icons-material'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import { CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import AnalysisSidebar from '../_components/AnalysisSidebar '

interface PageProps {
  params: {
    patientId: string
    energyCalculationId: string
  }
}

const EnergyCalculationCreatePage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)

  const loading = false
  const { countdown } = useTimer({
    duration: 60,
    onExpire: () => saveData(formik.values),
  })

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
    //validationSchema: ,
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

  const saveData = async (values: any) => {
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
        btnIcon={ArrowBack}
        href={`/patients/${params.patientId}/energyCalculation`}
        textBtn="Voltar"
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
