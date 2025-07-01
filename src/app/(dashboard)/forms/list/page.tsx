'use client'
import CardForms from '@/components/cardForms'
import CardForm from '@/components/customForms/cardForms'
import TopDash from '@/components/topDash'
import useLoadForms from '@/hooks/nutritionists/useLoadForms'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { dashboardTabs } from '@/routes'
import { colors } from '@/utils/colors/colors'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { CircularProgress } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

const FormsList = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadForms(false)
  const router = useRouter()
  return (
    <div className="w-full relative">
      <TopDash
        title="Formulário"
        description="Crie e organize formulários personalizados para seus atendimentos."
        icon={QuestionAnswerOutlinedIcon}
        textBtn={'Novo Formulário'}
        onClick={() => router.push(`/forms/create`) }
      />

      {loading ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.primary }}
            />
          </div>
        </>
      ) : (
        <CardForms data={data}/>
      )}

      {/* <ModalSelectPatient
        open={openSelectPatient}
        setIsClose={() => setOpenSelectPatient(false)}
        patientId={patientId}
        setPatientId={setPatientId}
      /> */}
    </div>
  )
}

export default FormsList
