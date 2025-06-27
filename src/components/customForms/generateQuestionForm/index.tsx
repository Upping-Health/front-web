import React, { ElementType } from 'react'
import QuestionHeader from './questionHeader'
import QuestionInput from './questionInput'
import RequiredToggle from './requiredToggle'
import QuestionOptions from './questionOptions'

interface IQuestions {
  label: string
  type: string
  typeLabel: string
  description: string
  descriptionLabel: string
  options?: string[]
  required: boolean
}
interface Props {
  question: IQuestions
  onRemoveQuestion: () => void
  onDuplicateQuestion: () => void
  onEditLabel: (field: string, newLabel: any) => void
}

const GenerateQuestionForm = ({
  question,
  onRemoveQuestion,
  onDuplicateQuestion,
  onEditLabel,
}: Props) => (
  <div className="rounded-xl bg-white p-4 shadow mb-3 dark:bg-slate-700 dark:border-slate-600">
    <QuestionHeader
      type={question.type}
      typeLabel={question.typeLabel}
      descriptionLabel={question.descriptionLabel}
      onRemove={onRemoveQuestion}
      onDuplicate={onDuplicateQuestion}
    />

    <div className="mt-3 flex w-full flex-col gap-4">
      <QuestionInput
        id={question.type}
        value={question.label}
        onChange={(e) => onEditLabel('label', e.target.value)}
        label="Insira a pergunta"
        placeholder=""
      />
    </div>

    <RequiredToggle
      required={question.required}
      toggleRequired={() => onEditLabel('required', !question.required)}
    />

    {['checkbox', 'radio', 'select'].includes(question.type) && (
      <QuestionOptions
        options={question.options || []}
        onEditOption={(i, val) => onEditLabel(`options.${i}`, val)}
        onRemoveOption={(i) => onEditLabel(`removeOption.${i}`, '')}
        onAddOption={() => onEditLabel('addOption', '')}
      />
    )}
  </div>
)

export default GenerateQuestionForm
