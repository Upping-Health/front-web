'use client'

import InputStyled from '@/components/inputs/inputStyled'
import Loading from '@/components/layout/loading'
import TopDash from '@/components/layout/topDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useLoadCategories from '@/hooks/others/useLoadCategories'
import useTimer from '@/hooks/others/useTimer'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import masks from '@/lib/masks/masks'
import { ArrowBack } from '@mui/icons-material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useFormik } from 'formik'
import { useParams } from 'next/navigation'
import { useContext, useMemo, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import { MealSection } from '../_components/MealSection'

type Tab = 'first' | 'meal'

const MealPlanCreatePage = () => {
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as {
    patientId: string
    mealPlanId?: string
  }
  const { onShowFeedBack } = useContext(DefaultContext)
  const [apiLoading, setApiLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('first')

  const { data: patientData, loading: patientLoading } = useLoadPatientByUUID(
    params.patientId,
  )

  const formik = useFormik<MealPlanFormValues>({
    initialValues: {
      patient_id: '',
      start_date: '',
      end_date: '',
      notes: '',
      meals: [
        {
          category: '',
          time: '',
          items: [],
        },
      ],
    },
    onSubmit: async (values) => {
      try {
        setApiLoading(true)
      } catch (error: any) {
        const message =
          error?.response?.message || 'Erro ao criar antropometria.'
        return onShowFeedBack(PreFeedBack.error(message))
      } finally {
        setApiLoading(false)
        //resetTimer()
      }
    },
  })

  if (patientLoading) {
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <>
      <div className="w-full flex flex-col transition-opacity duration-300">
        <TopDash
          title="Plano Alimentar"
          description="Gerencie o plano alimentar personalizado do paciente."
          icon={RestaurantMenuIcon}
          btnIcon={ArrowBack}
          href={`/patients/${params.patientId}/meal-plan`}
          textBtn="Voltar"
        />

        <main className="flex flex-col gap-4">
          <form
            onSubmit={formik.handleSubmit}
            className="h-full w-full flex flex-col gap-4 mb-14"
          >
            <PatientHeader
              formik={formik}
              loading={apiLoading}
              patient={patientData}
            />

            <div className="shadow-sm rounded-xl p-4 bg-white dark:bg-gray-800">
              <h2 className="font-semibold text-primary dark:text-white mb-4">
                Informações básicas
              </h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <InputStyled
                    id="start_date"
                    label="Data de início"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formik.values?.start_date ?? ''}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'start_date',
                        masks.dateMask(e.target.value),
                      )
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.errors.start_date}
                    isTouched={formik.touched.start_date}
                    maxLength={10}
                    styles="w-full"
                  />

                  <InputStyled
                    id="end_date"
                    label="Data da Fim"
                    type="text"
                    placeholder="dd/mm/yyyy"
                    value={formik.values?.end_date ?? ''}
                    onChange={(e) => {
                      formik.setFieldValue(
                        'end_date',
                        masks.dateMask(e.target.value),
                      )
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.errors.end_date}
                    isTouched={formik.touched.end_date}
                    maxLength={10}
                  />
                </div>

                <div className="flex flex-col w-full">
                  <InputStyled
                    id="notes"
                    label="Observações"
                    type="text"
                    placeholder="Observações"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.notes}
                    isTouched={formik.touched.notes}
                  />
                </div>
              </div>

              <h2 className="font-semibold text-primary dark:text-white mb-4 mt-4">
                Refeições
              </h2>
              <MealSection
                errors={formik.errors}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                setFieldValue={formik.setFieldValue}
                touched={formik.touched}
                values={formik.values}
                key={'meal-section'}
              />
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default MealPlanCreatePage

interface TabItem {
  label: string
  value: string
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (value: string) => void
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex gap-2 mb-2 border-b-2 border-gray-200 w-full">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 font-bold  transition-colors  dark:text-white text-primary ${
            activeTab === tab.value
              ? 'border-b-4 border-primary dark:border-white'
              : ' '
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
