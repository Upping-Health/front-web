import GenerateQuestionForm from '../generateQuestionForm'
import { IQuestions } from '@/hooks/forms/useCustomForm'

interface Props {
  questions: IQuestions[]
  onEditQuestionLabel: (index: number, field: string, value: string) => void
  onRemoveQuestion: (index: number) => void
  onDuplicateQuestion: (index: number) => void
  dragHandlers: {
    handleDragStart: (index: number) => void
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    handleDrop: (index: number) => void
  }
}

export const QuestionList = ({
  questions,
  onEditQuestionLabel,
  onRemoveQuestion,
  onDuplicateQuestion,
  dragHandlers,
}: Props) => (
  <>
    {questions.map((question, index) => (
      <div
        key={index}
        draggable
        onDragStart={() => dragHandlers.handleDragStart(index)}
        onDragOver={dragHandlers.handleDragOver}
        onDrop={() => dragHandlers.handleDrop(index)}
      >
        <GenerateQuestionForm
          question={question}
          onRemoveQuestion={() => onRemoveQuestion(index)}
          onEditLabel={(label, newLabel) =>
            onEditQuestionLabel(index, label, newLabel)
          }
          onDuplicateQuestion={() => onDuplicateQuestion(index)}
        />
      </div>
    ))}
  </>
)
