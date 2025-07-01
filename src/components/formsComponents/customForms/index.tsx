import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import PreFeedBack from '@/utils/feedbackStatus'
import { useRouter } from 'next/navigation'
import { useCallback, useContext, useEffect, useState } from 'react'
import CardForm from './cardForms'
import GenerateQuestionForm from './generateQuestionForm'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'
interface IQuestions {
  label: string
  type: string
  options?: string[]
  required: boolean
}

const CustomForms = () => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [questions, setQuestions] = useState<IQuestions[]>([])
  const [title, setTitle] = useState<string>('')
  const [typeForm, setTypeForm] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    const saved = localStorage.getItem('customFormData')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log(parsed)
        setTitle(parsed.title || '')
        setDescription(parsed.description || '')
        setQuestions(parsed.field || [])
      } catch (error) {
        console.error('Erro ao carregar dados do formulário:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [])

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
          type: question.type,
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

  const onRemoveQuestion = useCallback((index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const validForms = useCallback(() => {
    if (!title) {
      onShowFeedBack(PreFeedBack.error('Defina o título antes de prosseguir.'))
      return false
    }

    if (questions.length === 0) {
      onShowFeedBack(
        PreFeedBack.error('É preciso criar perguntas antes de prosseguir.'),
      )
      return false
    }

    for (const question of questions) {
      if (!question.label?.trim()) {
        onShowFeedBack(
          PreFeedBack.error('Todas as perguntas precisam de um título.'),
        )
        return false
      }

      const needsOptions = ['select', 'checkbox', 'radio'].includes(
        question.type,
      )
      if (needsOptions) {
        if (!Array.isArray(question.options) || question.options.length === 0) {
          onShowFeedBack(
            PreFeedBack.error(
              `A pergunta "${question.label}" precisa de pelo menos 1 opção.`,
            ),
          )
          return false
        }
      }
    }

    return true
  }, [title, questions])

  const onVisibleForms = useCallback(() => {
    console.log(questions)
    if (!validForms()) return
    const data = {
      title,
      description,
      field: questions.map((q, index) => ({
        ...q,
        order: index + 1,
      })),
    }
    localStorage.setItem('customFormData', JSON.stringify(data))

    router.push('/forms/preview')
  }, [questions, title, description])

  const onSaveForms = useCallback(() => {
    if (!validForms()) return

    const data = {
      type_id: 1,
      title,
      description,
      is_active: true,
      fields: questions.map((q, index) => ({
        ...q,
        order: index + 1,
      })),
    }

    api.post('/forms/store', data).catch((e) => console.log(e))
  }, [questions, title, description])

  const onClearForm = useCallback(() => {
    setTitle('')
    setDescription('')
    setQuestions([])
    localStorage.removeItem('customFormData')
  }, [questions])

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return

    const updatedQuestions = [...questions]
    const [removed] = updatedQuestions.splice(draggedIndex, 1)
    updatedQuestions.splice(index, 0, removed)

    setQuestions(updatedQuestions)
    setDraggedIndex(null)
  }

  return (
    <div className="flex flex-col h-full items-center mt-4">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <HeaderFormMenu
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          typeForm={typeForm}
          setTypeForm={setTypeForm}
          onVisibleForms={onVisibleForms}
          onSaveForms={onSaveForms}
          onClearForm={onClearForm}
        />

        <CustomFormMenu onPushQuestions={onPushQuestions} />

        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              <GenerateQuestionForm
                question={question}
                onRemoveQuestion={() => onRemoveQuestion(index)}
                onEditLabel={(label: string, newLabel: string) =>
                  onEditQuestionLabel(index, label, newLabel)
                }
                onDuplicateQuestion={() => onDuplicateQuestion(index)}
              />
            </div>
          ))
        ) : (
          <CardForm />
        )}
      </div>
    </div>
  )
}

export default CustomForms
