'use client'
import TopDash from '@/components/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { dashboardTabs } from '@/routes'
import { colors } from '@/utils/colors/colors'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { CircularProgress } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

const FormsList = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)
  const router = useRouter()
  return (
    <div className="w-full relative">
      <TopDash
        title="Alimentos"
        description="Acompanhe e gerencie seus pacientes com facilidade."
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
        <></>
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
