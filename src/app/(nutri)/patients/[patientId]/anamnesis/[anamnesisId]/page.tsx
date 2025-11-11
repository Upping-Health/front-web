'use client'

import TopDash from '@/components/layout/topDash'
import { ArrowBack } from '@mui/icons-material'
import { useFormik } from 'formik'
import { useContext, useMemo, useState } from 'react'

import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useTimer from '@/hooks/others/useTimer'

import { Answer } from '@/interfaces/form-response.interface'
import PreFeedBack from '@/lib/feedbackStatus'

import Loading from '@/components/layout/loading'
import { CollapsibleSection } from '../../../_components/CollapsibleSection'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import { FieldRender } from '../_components/FieldRender'
import useLoadSubmissionByUUID from '@/hooks/forms/useLoadSubmissionByUUID'
import { createValidationSchemaFromAnswers } from '@/lib/formik/validators/validator-dinamic-form'
import AssignmentIcon from '@mui/icons-material/Assignment'
import api from '@/services/api'
import { useParams } from 'next/navigation'

interface PageProps {
  patientId: string
  anamnesisId: string
}

const AnamneseCreatePage = () => {
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const saveData = async (values: any, isAutomatic: boolean = false) => {
    const answers = Object.entries(values).map(([key, value]) => ({
      field_id: key,
      value,
    }))
    try {
      setApiLoading(true)
      await api.put(`/forms/submissions/update/${params.anamnesisId}`, {
        status: isAutomatic ? 'draft' : 'submitted',
        answers,
        reason: '',
      })
    } finally {
      setApiLoading(false)
    }
  }

  const { countdown, resetTimer } = useTimer({
    duration: 60,
    onExpire: () => saveData(formik.values, true),
  })

  const { data: dataAnamnesis, loading } = useLoadSubmissionByUUID(
    params.anamnesisId,
    false,
  )
  const { data: patientData, loading: patientLoading } = useLoadPatientByUUID(
    params.patientId,
  )
  const initialValues = useMemo(() => {
    const vals: { [key: string]: any } = {} as any

    ;(dataAnamnesis?.answers ?? []).forEach((answer: Answer) => {
      switch (answer.field.type) {
        case 'text':
        case 'textarea':
          vals[answer.field.uuid] = answer?.text_answer || ''
          break
        case 'number':
        case 'range':
          vals[answer.field.uuid] = answer?.number_answer ?? 0
          break
        case 'date':
          vals[answer.field.uuid] = answer?.date_answer || ''
          break
        case 'select':
        case 'radio':
          vals[answer.field.uuid] = answer?.option_answer || ''
          break
        case 'checkbox':
          vals[answer.field.uuid] = answer?.option_answer
            ? [answer?.option_answer]
            : []
          break
        default:
          vals[answer.field.uuid] = ''
      }
    })
    return vals
  }, [dataAnamnesis])

  const validationSchema = useMemo(
    () => createValidationSchemaFromAnswers(dataAnamnesis?.answers ?? []),
    [dataAnamnesis?.answers],
  )

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
        await saveData(values)
        onShowFeedBack(PreFeedBack.success('Anamnese salva com sucesso!'))
      } catch (error: any) {
        const message = error?.response?.message || 'Erro ao criar anamnese.'
        onShowFeedBack(PreFeedBack.error(message))
      } finally {
        setApiLoading(false)
        resetTimer()
      }
    },
  })

  if (loading || patientLoading) {
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
        title={dataAnamnesis?.form?.title ?? 'Anamnese'}
        description={
          dataAnamnesis?.form?.description ??
          'Questionário completo para avaliação do estado de saúde, hábitos alimentares e estilo de vida.'
        }
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

          <CollapsibleSection title={dataAnamnesis?.form?.title ?? ''}>
            <div className="flex flex-col gap-4">
              {[...(dataAnamnesis?.answers ?? [])]
                .sort((a, b) => (a.field.order ?? 0) - (b.field.order ?? 0))
                .map((data) => (
                  <FieldRender
                    key={data.field.uuid}
                    field={data.field}
                    answer={data}
                    formik={formik}
                  />
                ))}
            </div>
          </CollapsibleSection>
        </form>
      </main>
    </div>
  )
}

export default AnamneseCreatePage
