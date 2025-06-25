'use client'
import CustomForms from '@/components/customForms'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'
const FormsCreate = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)

  return (
    <div className="w-full relative">
      {loading ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.primary }}
            />
          </div>
        </>
      ) : (
        <CustomForms />
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

export default FormsCreate
