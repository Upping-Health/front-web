'use client'
import CardForms from '@/components/tablesComponents/tableForms'
import TopDash from '@/components/layout/topDash'
import useLoadForms from '@/hooks/nutritionists/useLoadForms'
import { colors } from '@/lib/colors/colors'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { CircularProgress } from '@mui/material'

const FormsList = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadForms(false)

  return (
    <div className="w-full relative">
      <TopDash
        title="Formulários"
        description="Crie e organize formulários personalizados para seus atendimentos."
        icon={QuestionAnswerOutlinedIcon}
        textBtn={'Novo Formulário'}
        href="/forms/create"
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
        <CardForms data={data} />
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
