'use client'

import TopDash from '@/components/layout/topDash'
import { ArrowBack } from '@mui/icons-material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useFormik } from 'formik'
import Loading from '@/components/layout/loading'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import useTimer from '@/hooks/others/useTimer'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import PreFeedBack from '@/lib/feedbackStatus'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'
import PatientHeader from '../../../_components/PatientHeader'
import PatientNotFound from '../../../_components/PatientNotFound'
import { FirstSection } from '../_components/FirstSection'
import { MealSection } from '../_components/MealSection'
import { RestaurantMenu } from '@mui/icons-material'
import ModalSearchProduct from '../_components/SearchProduct'

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
  const { countdown, resetTimer } = useTimer({
    duration: 60,
    onExpire: () => ({}),
  })

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
        resetTimer()
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
              countdown={countdown}
            />

            {/* <Tabs tabs={tabs} activeTab={activeTab} onChange={(value) => setActiveTab(value as Tab)} /> */}

            <FirstSection
              values={formik.values}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
              setFieldValue={formik.setFieldValue}
            />

            {/* {activeTab === 'meal' && (
              <>

              </>
            )} */}
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
