'use client'
import ButtonStyled from '@/components/buttonsComponents/button'
import InputStyled from '@/components/inputsComponents/inputStyled'
import TopDash from '@/components/layoutComponents/topDash'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometry'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { Straighten } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import PatientNotFound from '../../../_components/PatientNotFound'
import { CollapsibleSection } from './_components/CollapsibleSection'

import { useFormik } from 'formik'
import * as Yup from 'yup'

interface PageProps {
  params: {
    patientId: string
    anthropometryId: string
  }
}

interface SkinFold {
  triceps: number | null
  biceps: number | null
  subscapular: number | null
  midaxillary: number | null
  suprailiac: number | null
  abdominal: number | null
  thigh: number | null
  chest: number | null
}

interface BodyCircumference {
  waist: number | null
  hip: number | null
  neck: number | null
  shoulder: number | null
  chest: number | null
  abdominal: number | null
  relaxed_right_arm: number | null
  contracted_right_arm: number | null
  right_forearm: number | null
  right_proximal_thigh: number | null
  right_mid_thigh: number | null
  right_distal_thigh: number | null
  right_calf: number | null
  relaxed_left_arm: number | null
  contracted_left_arm: number | null
  left_forearm: number | null
  left_proximal_thigh: number | null
  left_mid_thigh: number | null
  left_distal_thigh: number | null
  left_calf: number | null
}

interface FormValues {
  weight: number | ''
  height: number | ''
  body_fat_percentage: number | ''
  muscle_mass_percentage: number | ''
  observations: string
  body_fat_method: string
  skin_fold: SkinFold
  body_circumference: BodyCircumference
}

const validationSchema = Yup.object({
  weight: Yup.number().min(0).required('Peso obrigatório'),
  height: Yup.number().min(0).required('Altura obrigatória'),
  body_fat_percentage: Yup.number().min(0).max(100).nullable(),
  muscle_mass_percentage: Yup.number().min(0).max(100).nullable(),
  observations: Yup.string(),
  body_fat_method: Yup.string().required('Método obrigatório'),
})

const AnthropometryCreatePage = ({ params }: PageProps) => {
  const {
    data: dataAnthropometry,
    loadData,
    loading,
  } = useLoadAnthropometry(params.anthropometryId, false)

  const router = useRouter()
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

  const initialValues: FormValues = {
    // evaluation_date: '2024-01-23',
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
  }

  const bodyFatMethods = [
    { label: 'Nenhuma', value: 'nenhuma' },
    { label: 'Pollock 3', value: 'pollock_3' },
    { label: 'Pollock 7', value: 'pollock_7' },
    { label: 'Faulkner', value: 'faulkner' },
    { label: 'Guedes', value: 'guedes' },
    { label: 'Petroski', value: 'petroski' },
    { label: 'Durnin', value: 'durnin' },
  ]

  const skinFoldLabels = [
    { label: 'Tricipital', key: 'triceps' },
    { label: 'Bicipital', key: 'biceps' },
    { label: 'Subescapular', key: 'subscapular' },
    { label: 'Axilar Média', key: 'midaxillary' },
    { label: 'Supraespinhal', key: 'suprailiac' },
    { label: 'Abdominal', key: 'abdominal' },
    { label: 'Coxa', key: 'thigh' },
    { label: 'Toráxica', key: 'chest' },
  ]

  const bodyCircumferenceLabels = [
    { label: 'Cintura', key: 'waist' },
    { label: 'Quadril', key: 'hip' },
    { label: 'Pescoço', key: 'neck' },
    { label: 'Ombro', key: 'shoulder' },
    { label: 'Peito', key: 'chest' },
    { label: 'Abdômen', key: 'abdominal' },
    { label: 'Braço Relaxado Direito', key: 'relaxed_right_arm' },
    { label: 'Braço Contraído Direito', key: 'contracted_right_arm' },
    { label: 'Antebraço Direito', key: 'right_forearm' },
    { label: 'Coxa Proximal Direita', key: 'right_proximal_thigh' },
    { label: 'Coxa Média Direita', key: 'right_mid_thigh' },
    { label: 'Coxa Distal Direita', key: 'right_distal_thigh' },
    { label: 'Panturrilha Direita', key: 'right_calf' },
    { label: 'Braço Relaxado Esquerdo', key: 'relaxed_left_arm' },
    { label: 'Braço Contraído Esquerdo', key: 'contracted_left_arm' },
    { label: 'Antebraço Esquerdo', key: 'left_forearm' },
    { label: 'Coxa Proximal Esquerda', key: 'left_proximal_thigh' },
    { label: 'Coxa Média Esquerda', key: 'left_mid_thigh' },
    { label: 'Coxa Distal Esquerda', key: 'left_distal_thigh' },
    { label: 'Panturrilha Esquerda', key: 'left_calf' },
  ]

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
      } catch (error) {}
    },
  })

  if (patientLoading || loading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <div
      className={'w-full h-full flex flex-col transition-opacity duration-300'}
    >
      <TopDash
        title={'Avaliação antropométrica'}
        description={''}
        icon={Straighten}
      />

      <form
        onSubmit={formik.handleSubmit}
        className="h-full w-full flex flex-col gap-4"
      >
        <CollapsibleSection title="Informações Físicas">
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <InputStyled
                id="weight"
                label="Peso (KG)"
                type="number"
                placeholder="Peso em kg"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col w-full">
              <InputStyled
                id="height"
                label="Altura (CM)"
                type="number"
                placeholder="Altura em cm"
                value={formik.values.height}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.height}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="flex flex-col w-full">
              <InputStyled
                id="body_fat_percentage"
                label="Percentual de Gordura (%)"
                type="number"
                placeholder="Percentual de gordura"
                value={formik.values.body_fat_percentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col w-full">
              <InputStyled
                id="muscle_mass_percentage"
                label="Percentual de Massa Muscular (%)"
                type="number"
                placeholder="Percentual de massa muscular"
                value={formik.values.muscle_mass_percentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="flex flex-col w-full mt-4">
            <InputStyled
              id="observations"
              label="Observações"
              type="text"
              placeholder="Observações"
              value={formik.values.observations}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Dobras cutâneas">
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-2">
              {bodyFatMethods.map((method) => (
                <ButtonStyled
                  key={method.value}
                  type="button"
                  onClick={() =>
                    formik.setFieldValue('body_fat_method', method.value)
                  }
                  styles={`!py-2 border border-primary ${
                    formik.values.body_fat_method === method.value
                      ? 'bg-transparent text-primary'
                      : 'bg-primary'
                  }`}
                  textColor={`${
                    formik.values.body_fat_method === method.value
                      ? 'text-primary'
                      : 'text-white'
                  }`}
                  title={method.label}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {skinFoldLabels.map(({ label, key }) => (
              <div key={key} className="flex flex-col">
                <InputStyled
                  id={`skin_fold.${key}`}
                  label={label}
                  placeholder="0"
                  type="number"
                  value={formik.values.skin_fold[key as keyof SkinFold] ?? ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Circunferências Corporais">
          <div className="grid grid-cols-3 gap-4">
            {bodyCircumferenceLabels.map(({ label, key }) => (
              <div key={key} className="flex flex-col">
                <InputStyled
                  id={`body_circumference.${key}`}
                  label={label}
                  placeholder="0"
                  type="number"
                  value={
                    formik.values.body_circumference[
                      key as keyof BodyCircumference
                    ] ?? ''
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </form>
    </div>
  )
}

export default AnthropometryCreatePage
