import QuestionInput from "@/components/customForms/generateQuestionForm/questionInput"
import PreviewCheckbox from "../previewCheckbox"
import PreviewRadio from "../previewRadio"
import PreviewTextArea from "../previewTextArea"
import PreviewSelect from "../previewSelect"

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


const PreviewQuestion = ({ question }: { question: IQuestion }) => {
  const optionsSex = [{ value: 'ANAMNESE', label: 'Anamnese' }]
  return (
    <div className="rounded-xl bg-white p-4 shadow mb-3 dark:bg-slate-700 dark:border-slate-600">
      <p className="font-bold text-black dark:text-white text-lg mb-3">
        {question.label}
        <span className="text-red">{question.required ? ' *' : ''}</span>
      </p>

      {question.type === 'text' &&
        <QuestionInput
          id={question.type}
          value=""
          onChange={(e) => {}}
          placeholder="Escreva sua resposta"        
        />
      }

      {question.type === 'checkbox' &&
        <PreviewCheckbox question={question} />
      }

      {question.type === 'radio' &&
        <PreviewRadio question={question} />
      }

      {question.type === 'textarea' &&
        <PreviewTextArea
          id={question.type}
          value=""
          onChange={(e) => {}}
          placeholder="Escreva sua respsota"
        />
      }

      {question.type === 'select' &&
        <PreviewSelect 
          id={question.type}
          value=""
          onChange={() => {}}
          options={question.options ?? []}
        />
      }
    </div>
  )
}

export default PreviewQuestion
