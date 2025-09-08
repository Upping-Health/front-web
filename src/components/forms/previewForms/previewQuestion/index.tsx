import PreviewByType from '../previewByType'
import PreviewCheckbox from '../previewCheckbox'
import PreviewRadio from '../previewRadio'
import PreviewSelect from '../previewSelect'
import PreviewTextArea from '../previewTextArea'

interface IQuestion {
  label: string
  type: string
  description: string
  options?: string[]
  required: boolean
}

interface PreviewQuestionProps {
  question: IQuestion
  mode?: 'preview' | 'answer'
  onChange?: (value: any) => void
  value?: any
}

const PreviewQuestion = ({
  question,
  value,
  mode = 'preview',
  onChange,
}: PreviewQuestionProps) => {
  const readOnly = mode === 'preview'

  return (
    <div className="rounded-xl bg-white p-4 shadow mb-3 dark:bg-slate-700 dark:border-slate-600">
      <p className="font-bold text-black dark:text-white text-lg mb-3">
        {question.label}
        <span className="text-red">{question.required ? ' *' : ''}</span>
      </p>

      {question.type === 'text' && (
        <PreviewByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Escreva sua resposta"
          type="text"
        />
      )}

      {question.type === 'number' && (
        <PreviewByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Digite um número"
          type="number"
        />
      )}

      {question.type === 'date' && (
        <PreviewByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          type="date"
        />
      )}

      {question.type === 'file' && (
        <PreviewByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.files?.[0])}
          type="file"
        />
      )}

      {question.type === 'checkbox' && (
        <PreviewCheckbox
          question={question}
          value={value}
          onChange={!readOnly ? onChange : undefined}
        />
      )}

      {question.type === 'radio' && (
        <PreviewRadio
          question={question}
          value={value}
          onChange={!readOnly ? onChange : undefined}
        />
      )}

      {question.type === 'textarea' && (
        <PreviewTextArea
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Escreva sua resposta"
        />
      )}

      {question.type === 'select' && (
        <PreviewSelect
          question={question}
          value={value ?? ''}
          onChange={!readOnly ? (val) => onChange?.(val) : undefined}
        />
      )}
    </div>
  )
}

export default PreviewQuestion
