'use client'
import CustomForms from '@/components/formsComponents/customForms'
import { useRouter } from 'next/navigation'
const FormsCreate = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  return (
    <div className="w-full relative">
      <CustomForms />
    </div>
  )
}

export default FormsCreate
