'use client'

import { useEffect, useState } from 'react'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'
import PreviewForms from '@/components/formsComponents/previewForms'

interface IQuestion {
  label: string
  type: string
  typeLabel: string
  icon: any
  description: string
  descriptionLabel: string
  options?: string[]
  required: boolean
}

interface IFormPreview {
  title: string
  description: string
  field: IQuestion[]
}

const FormsPreview = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useLoadPatients(false)
  const [formData, setFormData] = useState<IFormPreview | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('customFormData')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed)
      } catch (error) {
        console.error('Erro ao parsear dados do formulário:', error)
      }
    }
  }, [])

  return (
    <div className="w-full relative">
      {loading ? (
        <div className="flex h-3/4 justify-center w-full items-center">
          <CircularProgress
            style={{ width: 80, height: 80, color: colors.primary }}
          />
        </div>
      ) : formData ? (
        <div className="max-w-5xl mx-auto flex flex-col gap-6 mt-5 px-4">
          <PreviewForms formData={formData} />
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-500 dark:text-gray-400">
          Nenhum formulário encontrado.
        </p>
      )}
    </div>
  )
}

export default FormsPreview
