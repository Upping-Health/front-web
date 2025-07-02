'use client'
import CustomForms from '@/components/formsComponents/customForms'
const FormsCreate = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full relative">
      <CustomForms />
    </div>
  )
}

export default FormsCreate
