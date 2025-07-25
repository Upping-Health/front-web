'use client'

import { useCustomForm } from '@/hooks/forms/useCustomForm'
import CardForm from './cardForms'
import HeaderFormMenu from './header'
import CustomFormMenu from './menu'
import Loading from '@/components/layoutComponents/loading'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import { QuestionList } from './questionList'
import TopDash from '@/components/layoutComponents/topDash'
import { useRouter } from 'next/navigation'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswerOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CustomForms = ({ id }: { id?: string }) => {
  const {
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
    setTypeForm,
    typeForm,
    labelLoading,
    onUpdateForm,
  } = useCustomForm(id)

  const dragHandlers = useDragAndDrop(questions, setQuestions)

  if (loading) return <Loading text={labelLoading} />

  const router = useRouter()

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <TopDash
          title="Criar formulário"
          onClick={() => router.back()}
          description="Crie formulários personalizados para coletar informações específicas."
          icon={QuestionAnswerIcon}
          btnIcon={ArrowBackIcon}
          textBtn="Voltar"
        />
        <HeaderFormMenu
          id={id}
          title={title}
          setTitle={onChangeTitle}
          description={description}
          setDescription={onChangeDescription}
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
