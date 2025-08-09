import { useState, useCallback, useEffect, useContext } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import PreFeedBack from '@/lib/feedbackStatus'
import { useRouter } from 'next/navigation'

export interface IQuestions {
  label: string
  type: string
  options?: string[]
  required: boolean
  uuid?: string
}

export const useCustomForm = (id?: string) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const router = useRouter()

  const [questions, setQuestions] = useState<IQuestions[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [labelLoading, setLabelLoading] = useState<string>('Buscando dados...')
  const [typeForm, setTypeForm] = useState<string>('Carregando...')

  const updateLocalStorage = useCallback((field: string, value: any) => {
    const saved = localStorage.getItem('customFormData')
    let parsed = {}
    if (saved) {
      try {
        parsed = JSON.parse(saved)
      } catch (e) {
        console.error('Erro ao parsear localStorage:', e)
      }
    }
    const updated = { ...parsed, [field]: value }
    localStorage.setItem('customFormData', JSON.stringify(updated))
  }, [])

  const getFormData = useCallback(
    async (id: string) => {
      try {
        setLabelLoading('Buscando dados do formulário...')
        setLoading(true)

        const { data } = await api.get(`/forms/${id}`)
        const form = data?.data

        setTitle(form?.title || '')
        setDescription(form?.description || '')

        const questionsMap =
          form?.fields?.map((quest: any) => ({
            label: quest.label,
            type: quest.type,
            options: quest?.options ?? [],
            required: quest?.required === 1,
            uuid: quest.uuid,
          })) || []

        setQuestions(questionsMap)
        updateLocalStorage('title', form?.title || '')
        updateLocalStorage('description', form?.description || '')
        updateLocalStorage(
          'field',
          questionsMap.map((q: any, index: number) => ({
            ...q,
            order: index + 1,
          })),
        )
      } catch (error) {
        console.error('[ERROR getFormData]', error)
      } finally {
        setLoading(false)
      }
    },
    [updateLocalStorage],
  )

  const getLocalStorageData = useCallback(() => {
    setLabelLoading('Buscando dados armazenados...')
    setLoading(true)

    const saved = localStorage.getItem('customFormData')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTitle(parsed.title || '')
        setDescription(parsed.description || '')
        setQuestions(parsed.field || [])
      } catch (error) {
        console.error('Erro ao carregar dados do formulário:', error)
      }
    }

    setLoading(false)
  }, [])

  const onChangeTitle = useCallback(
    (newTitle: string) => {
      setTitle(newTitle)
      updateLocalStorage('title', newTitle)
    },
    [updateLocalStorage],
  )

  const onChangeDescription = useCallback(
    (newDescription: string) => {
      setDescription(newDescription)
      updateLocalStorage('description', newDescription)
    },
    [updateLocalStorage],
  )

  const updateLocalStorageQuestions = useCallback(
    (newQuestions: IQuestions[]) => {
      updateLocalStorage(
        'field',
        newQuestions.map((q, index) => ({ ...q, order: index + 1 })),
      )
    },
    [updateLocalStorage],
  )

  useEffect(() => {
    if (id) getFormData(id)
    else getLocalStorageData()
  }, [id, getFormData, getLocalStorageData])

  const onPushQuestions = useCallback(
    (question: { type: string }) => {
      setQuestions((prev) => {
        const updated = [
          ...prev,
          { label: '', type: question.type, options: [], required: true },
        ]
        updateLocalStorageQuestions(updated)
        return updated
      })
    },
    [updateLocalStorageQuestions],
  )

  const onEditQuestionLabel = useCallback(
    (index: number, field: string, value: string) => {
      setQuestions((prev) => {
        const updated = prev.map((q, i) => {
          if (i !== index) return q

          if (field === 'addOption') {
            return { ...q, options: [...(q.options || []), ''] }
          }

          if (field.startsWith('removeOption.')) {
            const idx = Number(field.split('.')[1])
            return { ...q, options: q.options?.filter((_, i) => i !== idx) }
          }

          if (field.startsWith('options.')) {
            const idx = Number(field.split('.')[1])
            const newOptions = [...(q.options || [])]
            newOptions[idx] = value
            return { ...q, options: newOptions }
          }

          return { ...q, [field]: value }
        })

        updateLocalStorageQuestions(updated)
        return updated
      })
    },
    [updateLocalStorageQuestions],
  )

  const onDuplicateQuestion = useCallback(
    (index: number) => {
      setQuestions((prev) => {
        const duplicated = { ...prev[index] }
        const updated = [...prev]
        updated.splice(index + 1, 0, duplicated)
        updateLocalStorageQuestions(updated)
        return updated
      })
    },
    [updateLocalStorageQuestions],
  )

  const onRemoveQuestion = useCallback(
    (index: number) => {
      setQuestions((prev) => {
        const updated = prev.filter((_, i) => i !== index)
        updateLocalStorageQuestions(updated)
        return updated
      })
    },
    [updateLocalStorageQuestions],
  )

  const validForms = useCallback(() => {
    if (!title.trim()) {
      onShowFeedBack(PreFeedBack.error('Defina o título antes de prosseguir.'))
      return false
    }

    if (questions.length === 0) {
      onShowFeedBack(PreFeedBack.error('Crie perguntas antes de prosseguir.'))
      return false
    }

    for (const question of questions) {
      if (!question.label?.trim()) {
        onShowFeedBack(
          PreFeedBack.error('Todas as perguntas precisam de título.'),
        )
        return false
      }

      const needsOptions = ['select', 'checkbox', 'radio'].includes(
        question.type,
      )
      if (
        needsOptions &&
        (!question.options || question.options.length === 0)
      ) {
        onShowFeedBack(
          PreFeedBack.error(
            `A pergunta "${question.label}" precisa de opções.`,
          ),
        )
        return false
      }
    }

    return true
  }, [title, questions, onShowFeedBack])

  const onVisibleForms = useCallback(() => {
    if (!validForms()) return
    router.push('/forms/preview')
  }, [validForms, router])

  const onSaveForms = useCallback(async () => {
    if (!validForms()) return

    try {
      setLabelLoading('Enviando formulário...')
      setLoading(true)

      const data = {
        type_id: 1,
        title,
        description,
        is_active: true,
        fields: questions.map((q, index) => ({ ...q, order: index + 1 })),
      }

      await api.post('/forms/store', data)

      localStorage.removeItem('customFormData')
      onShowFeedBack(PreFeedBack.success('Formulário cadastrado com sucesso!'))
      router.push('/forms/list')
    } catch (e: any) {
      const errorMessage =
        e?.response?.data?.error || 'Falhou ao cadastrar formulário.'
      onShowFeedBack(PreFeedBack.error(errorMessage))
      console.error('[ERROR API /forms/store]', errorMessage)
    } finally {
      setLoading(false)
    }
  }, [validForms, title, description, questions, router, onShowFeedBack])

  const onUpdateForm = useCallback(async () => {
    if (!validForms() || !id) return

    try {
      setLabelLoading('Atualizando formulário...')
      setLoading(true)

      const data = {
        type_id: 1,
        title,
        description,
        is_active: true,
        fields: questions.map((q, index) => ({
          ...q,
          order: index + 1,
          required: q.required ? 1 : 0,
        })),
      }

      await api.put(`/forms/update/${id}`, data)

      localStorage.removeItem('customFormData')
      onShowFeedBack(PreFeedBack.success('Formulário atualizado com sucesso!'))
      router.push('/forms/list')
    } catch (e: any) {
      const errorMessage =
        e?.response?.data?.error || 'Falhou ao atualizar formulário.'
      onShowFeedBack(PreFeedBack.error(errorMessage))
      console.error('[ERROR API /forms/update]', errorMessage)
    } finally {
      setLoading(false)
    }
  }, [validForms, title, description, questions, id, router, onShowFeedBack])

  const onClearForm = useCallback(() => {
    setTitle('')
    setDescription('')
    setQuestions([])
    localStorage.removeItem('customFormData')
  }, [])

  return {
    questions,
    setQuestions,
    title,
    onChangeTitle,
    description,
    onChangeDescription,
    loading,
    onPushQuestions,
    onDuplicateQuestion,
    onEditQuestionLabel,
    onRemoveQuestion,
    onVisibleForms,
    onSaveForms,
    onClearForm,
    typeForm,
    setTypeForm,
    labelLoading,
    onUpdateForm,
  }
}
