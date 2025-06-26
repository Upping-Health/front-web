'use client'

import { useEffect, useState } from 'react'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'

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
        <div className="max-w-5xl mx-auto flex flex-col gap-6 mt-10 px-4">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">{formData.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{formData.description}</p>
          </div>

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
