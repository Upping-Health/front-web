import { useState } from 'react'
import PreviewTypeText from './RenderInput'
import RenderInput from './RenderInput'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}
interface IFormPreview {
  title: string
  description: string
  field: IQuestion[]
}

const Questions = ({ formData }: { formData: IFormPreview }) => {
  const [answers, setAnswers] = useState<Record<number, any>>({})

  const handleAnswerChange = (index: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [index]: value }))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          {formData.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {formData.description}
        </p>
      </div>
      {formData?.field?.map((field, index) => (
        <RenderInput
          key={index}
          question={field}
          value={answers[index] ?? ''}
          onChange={(val: any) => handleAnswerChange(index, val)}
        />
      ))}
    </div>
  )
}

export default Questions
