'use client'

import TopDash from '@/components/layoutComponents/topDash'
import { Straighten } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { CollapsibleSection } from '../../../_components/CollapsibleSection'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometryByUUID'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PatientNotFound from '../../../_components/PatientNotFound'
import { CircularProgress } from '@mui/material'
import { PhysicalInfoSection } from '../../../_components/PhysicalInfoSection'
import { SkinFoldSection } from '../../../_components/SkinFoldSection'
import { BodyCircumferenceSection } from '../../../_components/BodyCircumferenceSection'
import { validateCreateAnthropometry } from '@/formik/validators/validator-anthroprometry'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import MenuConsult from '@/components/consult-components/menu'
import AnalysisSidebar from '../../../_components/AnalysisSidebar'
import { SEX_PT_BR } from '@/utils/types/sex'
import { useContext, useEffect, useState, useRef } from 'react'
import api from '@/services/api'
import ButtonStyled from '@/components/buttonsComponents/button'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/utils/feedbackStatus'

interface PageProps {
  params: {
    patientId: string
    anthropometryId: string
  }
}

const AnthropometryCreatePage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const countdownRef = useRef(60)

  const {
    data: dataAnthropometry,
    loadData,
    loading,
  } = useLoadAnthropometry(params.anthropometryId, false)
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
          `/anthropometrics/update/${params.anthropometryId}`,
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

  useEffect(() => {
    countdownRef.current = countdown
  }, [countdown])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          saveData(formik.values, true)
          return 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [formik.values])

  const saveData = async (
    values: AnthropometryFormValues,
    ignoreFeedback?: boolean,
  ) => {
    try {
      setApiLoading(true)
      await api.put(`/anthropometrics/update/${params.anthropometryId}`, values)
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
        title="Avaliação antropométrica"
        description="Registro e análise das medidas corporais do paciente."
        icon={Straighten}
      />
      <main className="flex gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="h-full w-3/4 flex flex-col gap-4 mb-14"
        >
          <div className="flex items-center justify-between shadow-sm rounded-xl p-4 bg-white dark:bg-gray-800">
            <div className="flex flex-col">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Nome:
                </span>{' '}
                <span className="text-gray-900 dark:text-white font-light">
                  {patientData?.name}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Idade:
                </span>{' '}
                <span className="text-gray-900 dark:text-white font-light">
                  {patientData?.age ?? 1} anos
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Gênero:
                </span>{' '}
                <span className="text-gray-900 dark:text-white font-light">
                  {SEX_PT_BR[patientData?.gender ?? 'male']}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <ButtonStyled
                type="submit"
                disabled={apiLoading || !formik.isValid}
                styles={`w-[160px] py-2 ${
                  apiLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
                title={apiLoading ? 'Salvando...' : 'Salvar'}
                icon={
                  apiLoading && (
                    <CircularProgress size={20} style={{ color: '#fff' }} />
                  )
                }
              />
              {!apiLoading && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Salvando automaticamente em{' '}
                  <span className="font-semibold">{countdown}s</span>...
                </p>
              )}
            </div>
          </div>

          <PhysicalInfoSection
            values={formik.values}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />

          <SkinFoldSection
            values={formik.values.skin_fold}
            selectedMethod={formik.values.body_fat_method}
            setMethod={(value: any) =>
              formik.setFieldValue('body_fat_method', value)
            }
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />

          <BodyCircumferenceSection
            values={formik.values.body_circumference}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />
        </form>

        <div className="w-2/4 h-fit sticky top-6">
          <AnalysisSidebar values={formik.values} patient={patientData} />
        </div>
      </main>
    </div>
  )
}

export default AnthropometryCreatePage
