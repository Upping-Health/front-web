import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
}: Props) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  return (
    <AnimatePresence>
      {questions.map((question, index) => (
        <motion.div
          key={index}
          layout
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          draggable
          className={`rounded-xl border cursor-grab active:cursor-grabbing select-none ${
            draggingIndex === index
              ? 'z-50 scale-105 shadow-2xl border-red-500 bg-white'
              : dragOverIndex === index
                ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                : 'border  bg-white shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700'
          }`}
          style={{
            transformOrigin: 'center',
          }}
          onDragStart={() => {
            dragHandlers.handleDragStart(index)
            setDraggingIndex(index)
          }}
          onDragOver={(e) => {
            dragHandlers.handleDragOver(e)
            setDragOverIndex(index)
          }}
          onDrop={() => {
            dragHandlers.handleDrop(index)
            setDraggingIndex(null)
            setDragOverIndex(null)
          }}
          onDragEnd={() => {
            setDraggingIndex(null)
            setDragOverIndex(null)
          }}
        >
          <GenerateQuestionForm
            question={question}
            onRemoveQuestion={() => onRemoveQuestion(index)}
            onEditLabel={(label, newLabel) =>
              onEditQuestionLabel(index, label, newLabel)
            }
            onDuplicateQuestion={() => onDuplicateQuestion(index)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
