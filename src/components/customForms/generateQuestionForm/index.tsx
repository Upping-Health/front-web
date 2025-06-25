import React, { ElementType } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import InputStyled from '@/components/inputStyled'
import TextAreaStyled from '@/components/textAreaStyled'
import CloseIcon from '@mui/icons-material/Close'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
interface IQuestions {
  label: string
  type: string
  typeLabel: string
  icon: ElementType
  description: string
  descriptionLabel: string
  options?: string[]
  required: boolean
}
interface ICustomForm {
  question: IQuestions
  onRemoveQuestion: () => void
  onDuplicateQuestion: () => void
  onEditLabel: (field: string, newLabel: any) => void
}

const InputQuestionForm = ({
  label,
  placeholder,
  onChange,
  id,
  value,
  type,
}: any) => {
  return (
    <div className={` flex flex-col w-full`}>
      {label && <label className="mb-1 text-darkGray">{label}</label>}
      <input
        id={id}
        value={value}
        onChange={onChange}
        type=""
        className={`text-black bg-white border border-solid outline-none border-gray  rounded-xl p-2 flex items-center justify-between`}
        placeholder={placeholder}
      />
    </div>
  )
}

const GenerateQuestionForm = ({
  question,
  onRemoveQuestion,
  onEditLabel,
  onDuplicateQuestion,
}: ICustomForm) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow mb-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-newGreen h-14 w-14 rounded-xl flex justify-center items-center">
            <question.icon className="text-white" />
          </div>
          <div>
            <p className="font-bold text-black">{question.typeLabel}</p>
            <p className="font-extralight text-black max-w-[400px]">
              {question.descriptionLabel}
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className="p-2 rounded-full hover:bg-red-100 transition-all"
            title="Excluir"
            onClick={onRemoveQuestion}
          >
            <DeleteIcon className="text-red-700" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-all"
            title="Copiar"
            onClick={onDuplicateQuestion}
          >
            <ContentCopyIcon className="text-gray-500" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-all cursor-move"
            title="Copiar"
          >
            <DragIndicatorIcon className="text-blue-500" />
          </button>
        </div>
      </div>
      <div className="mt-3 justify-center items-center flex w-full flex-col gap-4">
        <InputQuestionForm
          id={question.type}
          value={question.label}
          onChange={(e: any) => onEditLabel('label', e.target.value)}
          label="Insira a pergunta"
          type="text"
          placeholder=""
        />
      </div>

      <div className="mt-2 flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={() => onEditLabel('required', !question.required)}
          className="flex items-center gap-2 focus:outline-none"
        >
          {question.required ? (
            <CheckBoxIcon className="text-terciary" />
          ) : (
            <CheckBoxOutlineBlankIcon className="text-gray-400" />
          )}
          <span className="text-sm text-gray-700">Campo obrigatório</span>
        </button>
      </div>

      {['checkbox', 'radio', 'select'].includes(question.type) && (
        <div className="flex flex-col w-full gap-2">
          <label className="text-darkGray mt-3">Opções</label>
          {question.options?.map((option, i) => (
            <div key={i} className="flex items-center gap-2">
              <InputQuestionForm
                id="id"
                value={option}
                onChange={(e: any) =>
                  onEditLabel(`options.${i}`, e.target.value)
                }
                placeholder={`Opção ${i + 1}`}
              />
              <button
                className="p-2 rounded-full hover:bg-red-100 transition-all"
                title="Excluir"
                onClick={() => onEditLabel(`removeOption.${i}`, '')}
              >
                <CloseIcon className="text-red-700" />
              </button>
            </div>
          ))}
          <button
            className="bg-blue-50 border-blue-200 border h-[35px] px-4 flex items-center justify-center rounded-md text-blue-700 text-sm font-medium"
            onClick={() => onEditLabel('addOption', '')}
          >
            + Adicionar opção
          </button>
        </div>
      )}
    </div>
  )
}

export default GenerateQuestionForm
