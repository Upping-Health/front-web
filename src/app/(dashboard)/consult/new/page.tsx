'use client'
import CardPatients from '@/components/tablesComponents/tablePatients'
import TopDash from '@/components/layoutComponents/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'

const ConsultPageId = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)

  return (
    <div className="w-full relative">
      <TopDash
        title="Iniciar consulta"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={AddIcon}
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
        <CardPatients data={data} itemsPerPage={6} />
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

export default ConsultPageId
