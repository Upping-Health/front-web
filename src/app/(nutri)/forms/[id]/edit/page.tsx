'use client'
import CustomForms from '@/components/forms/mount'
import { useParams } from 'next/navigation'

interface PageProps {
  id: string
}

const FormsEdit = () => {
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps
  return (
    <div className="w-full relative">
      <CustomForms id={params.id} />
    </div>
  )
}

export default FormsEdit
