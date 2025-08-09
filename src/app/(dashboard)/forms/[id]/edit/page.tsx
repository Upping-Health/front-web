'use client'
import CustomForms from '@/components/forms/customForms'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/lib/colors/colors'
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
