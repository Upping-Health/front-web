'use client'
import CustomForms from '@/components/forms/mount'
const FormsEdit = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full relative">
      <CustomForms id={params.id} />
    </div>
  )
}

export default FormsEdit
