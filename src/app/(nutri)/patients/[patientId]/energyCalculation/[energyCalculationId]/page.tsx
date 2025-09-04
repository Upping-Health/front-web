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
import AdditionalMet from '../_components/AdditionalMet'
import { BasicInfoSection } from '../_components/BasicInfoSection'
import Formula from '../_components/Formula'
import { ProgramarVentaSection } from '../_components/ProgramarVenta'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import AnalysisSidebar from '../_components/AnalysisSidebar'

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

  const formik = useFormik<Partial<EnergyCalculation>>({
    initialValues: {
      formula: 'harris_benedict_1919',
      lbm: 0,
      weight: 0,
      height: 0,
      gender: 'male',
      activity_factor: 0,
      injury_factor: 0,
      body_fat: 0,
      pregnant: false,
      pregnancy_weeks: 0,
      target_weight: 0,
      target_days: 0,
      additionalMet: [
        {
          met_factor: 0,
          met_time: 0,
        },
      ],
    },
    //validationSchema: ,
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
        await api.put(
          `/energycalculations/update/${params.energyCalculationId}`,
          {
            formula: values.formula,
            weight: values.weight,
            height: values.height,
            age: values.age,
            gender: values.gender,
            activity_factor: values.activity_factor,
            //activity_level: values.activity_level,
            injury_factor: values.injury_factor,
            lbm: values.lbm,
            body_fat: values.body_fat,
            //met: values.met,
            //venta_adjustment: values.venta_adjustment,
            pregnant: values.pregnant,
            pregnancy_weeks: values.pregnancy_weeks,
            //delivery_date: values.delivery_date,
            //nutritional_status: values.nutritional_status,
            //age_months: values.age_months,
            target_weight: values.target_weight,
            target_days: values.target_days,
            //manual_bmr: values.manual_bmr,
            //manual_get: values.manual_get,
          },
        )
        onShowFeedBack(
          PreFeedBack.success('Antropometria realizada com sucesso'),
        )
      } catch (error: any) {
        const message =
          error?.response?.message || 'Erro ao criar cálculo energético.'
        onShowFeedBack(PreFeedBack.error(message))
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
          className="h-full w-full flex flex-col gap-4 mb-14"
        >
          <PatientHeader
            formik={formik}
            loading={apiLoading}
            patient={patientData}
            countdown={countdown}
          />

          <BasicInfoSection
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            touched={formik.touched}
          />

          <Formula
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            touched={formik.touched}
          />

          <AdditionalMet
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            setFieldValue={formik.setFieldValue}
            touched={formik.touched}
          />

          <ProgramarVentaSection
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            touched={formik.touched}
          />
          <AnalysisSidebar values={formik.values} patient={patientData} />
        </form>
        {/* 
        <div className="w-2/4 h-fit sticky top-6">
        </div> */}
      </main>
    </div>
  )
}

export default EnergyCalculationCreatePage
