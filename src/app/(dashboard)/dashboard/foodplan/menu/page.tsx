'use client'
import CardPatients from '@/components/cardPatients'
import TopDash from '@/components/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
const FoodPlanMenu = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)

  return (
    <div className="w-full relative">
      <TopDash
        title="Cardápio"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={MenuBookOutlinedIcon}
        textBtn={'Novo Cardápio'}
        onClick={() => {}}
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

export default FoodPlanMenu
