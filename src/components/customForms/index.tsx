import { useCallback, useContext, useEffect, useState } from 'react'
import CardForm from './cardForms'
import GenerateQuestionForm from './generateQuestionForm'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/utils/feedbackStatus'
import { useRouter } from 'next/navigation'
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
  const { onShowFeedBack } = useContext(DefaultContext)
  const [questions, setQuestions] = useState<IQuestions[]>([])
  const [title, setTitle] = useState<string>('')
  const [typeForm, setTypeForm] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

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

  const onRemoveQuestion = useCallback((index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const validForms = useCallback(() => {
    if (questions.length === 0) {
      onShowFeedBack(
        PreFeedBack.error('É preciso criar perguntas antes de prosseguir.'),
      )
      return false
    }
    if (!title) {
      onShowFeedBack(PreFeedBack.error('Defina o título antes de prosseguir.'))
      return false
    }
    return true
  }, [title, questions])

  const onVisibleForms = useCallback(() => {
    console.log(questions);
    if (!validForms()) return
    const data = {
      title,
      description,
      field: questions,
    }
    localStorage.setItem('customFormData', JSON.stringify(data))

    router.push('/forms/preview')
  }, [questions, title, description])

  const onSaveForms = useCallback(() => {
    if (!validForms()) return
  }, [questions, title, description])

  const onClearForm = useCallback(() => {
    setTitle('')
    setDescription('')
    setQuestions([])
    localStorage.removeItem('customFormData')
  }, [questions])

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
