import { useState } from 'react'
import { IQuestions } from './useCustomForm'

export const useDragAndDrop = (
  questions: IQuestions[],
  setQuestions: (q: IQuestions[]) => void,
) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (index: number) => setDraggedIndex(index)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault()

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return
    const updated = [...questions]
    const [removed] = updated.splice(draggedIndex, 1)
    updated.splice(index, 0, removed)
    setQuestions(updated)
    setDraggedIndex(null)
  }

  return { handleDragStart, handleDragOver, handleDrop }
}
