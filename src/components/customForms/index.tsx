import { useCallback, useEffect, useState } from 'react'
import CardForm from './cardForms'
import GenerateQuestionForm from './generateQuestionForm'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'

interface IQuestions {
  label: string
  type: string
  typeLabel: string
  icon: any
  description: string
  descriptionLabel: string
  options?: string[]
  required: boolean
}

const CustomForms = () => {
  const [questions, setQuestions] = useState<IQuestions[]>([])

  const onPushQuestions = useCallback(
    (question: {
      label: string
      type: string
      icon: any
      description: string
    }) => {
      setQuestions((prev) => [
        ...prev,
        {
          label: '',
          typeLabel: question.label,
          type: question.type,
          icon: question.icon,
          description: '',
          descriptionLabel: question.description,
          options: [],
          required: true,
        },
      ])
    },
    [],
  )

  const onDuplicateQuestion = useCallback((index: number) => {
    setQuestions((prev) => {
      const questionToDuplicate = prev[index]
      const duplicated = { ...questionToDuplicate }
      const updated = [...prev]
      updated.splice(index + 1, 0, duplicated)
      return updated
    })
  }, [])

  const onEditQuestionLabel = useCallback(
    (index: number, field: string, value: string) => {
      setQuestions((prev) => {
        return prev.map((q, i) => {
          if (i !== index) return q
          if (field === 'addOption') {
            return {
              ...q,
              options: [...(q.options || []), ''],
            }
          }
          if (field.startsWith('removeOption.')) {
            const idx = Number(field.split('.')[1])
            return {
              ...q,
              options: q.options?.filter((_, i) => i !== idx),
            }
          }
          if (field.startsWith('options.')) {
            const idx = Number(field.split('.')[1])
            const newOptions = [...(q.options || [])]
            newOptions[idx] = value
            return {
              ...q,
              options: newOptions,
            }
          }
          return {
            ...q,
            [field]: value,
          }
        })
      })
    },
    [],
  )

  const onChangeTitle = useCallback(() => {}, [])

  const onChangeDescription = useCallback(() => {}, [])

  const onRemoveQuestion = useCallback((index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="flex flex-col h-full items-center mt-4">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <HeaderFormMenu />

        <CustomFormMenu onPushQuestions={onPushQuestions} />

        {questions.length > 0 ? (
          questions.map((question, index) => (
            <GenerateQuestionForm
              key={index}
              question={question}
              onRemoveQuestion={() => onRemoveQuestion(index)}
              onEditLabel={(label: string, newLabel: string) =>
                onEditQuestionLabel(index, label, newLabel)
              }
              onDuplicateQuestion={() => onDuplicateQuestion(index)}
            />
          ))
        ) : (
          <CardForm />
        )}
      </div>
    </div>
  )
}

export default CustomForms
