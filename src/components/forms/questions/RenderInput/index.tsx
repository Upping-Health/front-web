import InputByType from '../InputByType'
import InputCheckbox from '../InputCheckbox'
import InputRadio from '../InputRadio'
import InputSelect from '../InputSelect'
import InputTextArea from '../InputTextArea'

interface IQuestion {
  label: string
  type:
    | 'number'
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'range'
    | 'file'
    | 'date'
  options?: string[]
  required: boolean
}

interface PreviewQuestionProps {
  question: IQuestion
  mode?: 'preview' | 'answer'
  onChange?: (value: any) => void
  value?: any
}

const RenderInput = ({
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
        <InputByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Escreva sua resposta"
          type="text"
        />
      )}

      {question.type === 'number' && (
        <InputByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Digite um número"
          type="number"
        />
      )}

      {question.type === 'date' && (
        <InputByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          type="date"
        />
      )}

      {question.type === 'file' && (
        <InputByType
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.files?.[0])}
          type="file"
        />
      )}

      {question.type === 'checkbox' && (
        <InputCheckbox
          question={question}
          value={value}
          onChange={!readOnly ? onChange : undefined}
        />
      )}

      {question.type === 'radio' && (
        <InputRadio
          question={question}
          value={value}
          onChange={!readOnly ? onChange : undefined}
        />
      )}

      {question.type === 'textarea' && (
        <InputTextArea
          id={question.label}
          value={value ?? ''}
          onChange={(e) => !readOnly && onChange?.(e.target.value)}
          placeholder="Escreva sua resposta"
        />
      )}

      {question.type === 'select' && (
        <InputSelect
          question={question}
          value={value ?? ''}
          onChange={!readOnly ? (val) => onChange?.(val) : undefined}
        />
      )}
    </div>
  )
}

export default RenderInput
