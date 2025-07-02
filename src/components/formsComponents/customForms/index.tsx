'use client'

import { useCustomForm } from '@/hooks/forms/useCustomForm'
import CardForm from './cardForms'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'
import Loading from '@/components/layoutComponents/loading'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import { QuestionList } from './questionList'

const CustomForms = ({ id }: { id?: string }) => {
  const {
    questions,
    setQuestions,
    title,
    setTitle,
    description,
    setDescription,
    loading,
    onPushQuestions,
    onDuplicateQuestion,
    onEditQuestionLabel,
    onRemoveQuestion,
    onVisibleForms,
    onSaveForms,
    onClearForm,
    setTypeForm,
    typeForm,
    labelLoading,
    onUpdateForm,
  } = useCustomForm(id)

  const dragHandlers = useDragAndDrop(questions, setQuestions)

  if (loading) return <Loading text={labelLoading} />

  return (
    <div className="flex flex-col h-full items-center mt-4">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <HeaderFormMenu
          id={id}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onVisibleForms={onVisibleForms}
          onSaveForms={onSaveForms}
          onUpdateForm={onUpdateForm}
          onClearForm={onClearForm}
          setTypeForm={setTypeForm}
          typeForm={typeForm}
        />

        <CustomFormMenu onPushQuestions={onPushQuestions} />

        {questions.length > 0 ? (
          <QuestionList
            questions={questions}
            onEditQuestionLabel={onEditQuestionLabel}
            onRemoveQuestion={onRemoveQuestion}
            onDuplicateQuestion={onDuplicateQuestion}
            dragHandlers={dragHandlers}
          />
        ) : (
          <CardForm />
        )}
      </div>
    </div>
  )
}

export default CustomForms
