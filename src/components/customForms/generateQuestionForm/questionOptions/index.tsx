import CloseIcon from '@mui/icons-material/Close'
import QuestionInput from '../questionInput'

interface Props {
  options: string[]
  onEditOption: (index: number, value: string) => void
  onRemoveOption: (index: number) => void
  onAddOption: () => void
}

const QuestionOptions = ({ options, onEditOption, onRemoveOption, onAddOption }: Props) => (
  <div className="flex flex-col w-full gap-2 mt-3">
    <label className="text-darkGray dark:text-white">Opções</label>
    {options.map((option, i) => (
      <div key={i} className="flex items-center gap-2">
        <QuestionInput
          id={`option-${i}`}
          value={option}
          onChange={(e) => onEditOption(i, e.target.value)}
          placeholder={`Opção ${i + 1}`}
        />
        <button className="p-2 rounded-full hover:bg-red-100" onClick={() => onRemoveOption(i)}>
          <CloseIcon className="text-red-700" />
        </button>
      </div>
    ))}
    <button
      className="bg-blue-50 border-blue-200 border h-[35px] px-4 rounded-md text-blue-700 text-sm font-medium"
      onClick={onAddOption}
    >
      + Adicionar opção
    </button>
  </div>
)

export default QuestionOptions
