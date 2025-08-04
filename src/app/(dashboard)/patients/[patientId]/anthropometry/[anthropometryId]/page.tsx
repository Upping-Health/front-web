'use client'

import TopDash from '@/components/layoutComponents/topDash'
import { Straighten } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { CollapsibleSection } from '../../../_components/CollapsibleSection'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometry'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PatientNotFound from '../../../_components/PatientNotFound'
import { CircularProgress } from '@mui/material'
import { PhysicalInfoSection } from '../../../_components/PhysicalInfoSection'
import { SkinFoldSection } from '../../../_components/SkinFoldSection'
import { BodyCircumferenceSection } from '../../../_components/BodyCircumferenceSection'
import { validateCreateAnthropometry } from '@/formik/validators/validator-anthroprometry'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'
import MenuConsult from '@/components/consult-components/menu'

interface PageProps {
  params: {
    patientId: string
    anthropometryId: string
  }
}

const AnthropometryCreatePage = ({ params }: PageProps) => {
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
    },
    validationSchema: validateCreateAnthropometry,
    onSubmit: async (values) => {
      try {
        // TODO: Submissão
      } catch (error) {
        console.error(error)
      }
    },
  })

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
        description=""
        icon={Straighten}
      />

      <form
        onSubmit={formik.handleSubmit}
        className="h-full w-full flex flex-col gap-4 mb-14"
      >
        <PhysicalInfoSection
          values={formik.values}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />

        <SkinFoldSection
          values={formik.values.skin_fold}
          selectedMethod={formik.values.body_fat_method}
          setMethod={(value: any) =>
            formik.setFieldValue('body_fat_method', value)
          }
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
        />

        <div className="">
          <BodyCircumferenceSection
            values={formik.values.body_circumference}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
          />
        </div>
      </form>
    </div>
  )
}

export default AnthropometryCreatePage
