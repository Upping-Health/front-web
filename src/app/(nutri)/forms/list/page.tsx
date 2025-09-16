'use client'
import CardForms from '@/components/tables/tableForms'
import TopDash from '@/components/layout/topDash'
import useLoadForms from '@/hooks/nutritionists/useLoadForms'
import { colors } from '@/lib/colors/colors'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { CircularProgress } from '@mui/material'
import Loading from '@/components/layout/loading'

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
          <Loading text="Carregando formulários..." className="!h-3/4" />
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
