'use client'
import CustomForms from '@/components/formsComponents/customForms'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'
const FormsEdit = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)

  console.log(params)

  return (
    <div className="w-full relative">
      <CustomForms id={params.id} />
    </div>
  )
}

export default FormsEdit
