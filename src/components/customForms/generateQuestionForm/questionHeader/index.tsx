import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { ElementType } from 'react'
import { QuestionAnswerOutlined } from '@mui/icons-material'

interface Props {
  icon: ElementType
  typeLabel: string
  descriptionLabel: string
  onRemove: () => void
  onDuplicate: () => void
}

const QuestionHeader = ({ icon: Icon, typeLabel, descriptionLabel, onRemove, onDuplicate }: Props) => (
  <div className="flex items-center justify-between">
    <div className="flex gap-2 items-center">
      <div className="bg-newGreen h-14 w-14 rounded-xl flex justify-center items-center">
        <QuestionAnswerOutlined className="text-white" />
      </div>
      <div>
        <p className="font-bold text-black dark:text-white">{typeLabel}</p>
        <p className="font-extralight text-black dark:text-white max-w-[400px]">
          {descriptionLabel}
        </p>
      </div>
    </div>
    <div className="flex gap-2 items-center">
      <button className="p-2 rounded-full hover:bg-red-100" title="Excluir" onClick={onRemove}>
        <DeleteIcon className="text-red-700" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100" title="Copiar" onClick={onDuplicate}>
        <ContentCopyIcon className="text-gray-500" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 cursor-move" title="Mover">
        <DragIndicatorIcon className="text-blue-500" />
      </button>
    </div>
  </div>
)

export default QuestionHeader
