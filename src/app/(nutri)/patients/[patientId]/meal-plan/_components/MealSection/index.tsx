import { CollapsibleSection } from '@/app/(nutri)/patients/_components/CollapsibleSection'
import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import { Add, DeleteOutline } from '@mui/icons-material'
import { FormikErrors, FormikTouched } from 'formik'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props {
  values: Partial<MealPlanFormValues>
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  errors: FormikErrors<MealPlanFormValues>
  touched: FormikTouched<MealPlanFormValues>
  setFieldValue: any
}

export const MealSection = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  setFieldValue,
}: Props) => {
  const meals = values.meals || []

  const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
    meals,
    (newMeals) => setFieldValue('meals', newMeals),
  )

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  return (
    <CollapsibleSection title="Refeições">
      <div className="flex flex-col gap-3 mt-4">
        {meals.map((meal, index) => (
          <motion.div
            key={index}
            layout
            layoutId={`meal-${index}`}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
            draggable
            className={`rounded-xl border cursor-grab active:cursor-grabbing select-none ${
              draggingIndex === index
                ? 'z-50 scale-105 shadow-2xl border-red-500 bg-white'
                : dragOverIndex === index
                  ? 'border-2 border-green-500 bg-green-50 shadow-lg'
                  : 'border bg-white shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700'
            }`}
            style={{
              transformOrigin: 'center',
            }}
            onDragStart={() => {
              handleDragStart(index)
              setDraggingIndex(index)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              handleDragOver(e)
              setDragOverIndex(index)
            }}
            onDrop={() => {
              handleDrop(index)
              setDraggingIndex(null)
              setDragOverIndex(null)
            }}
            onDragEnd={() => {
              setDraggingIndex(null)
              setDragOverIndex(null)
            }}
          >
            <div className="flex items-center rounded-xl justify-between bg-white p-4 dark:bg-gray-900">
              <div className="flex gap-4">
                <InputStyled
                  type="text"
                  id={`meals[${index}].time`}
                  value={meal.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  styles="dark:bg-gray-800 w-[80px]"
                  placeholder="HH:MM"
                  maxLength={5}
                />

                <div className="min-w-[200px]">
                  <SelectStyled
                    id={`meals[${index}].category`}
                    value={meal.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    styles="dark:bg-gray-800 w-[200px]"
                  />
                </div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center text-white bg-red w-10 h-10 rounded-lg"
                onClick={() => {
                  const clone = [...meals]
                  clone.splice(index, 1)
                  setFieldValue('meals', clone)
                }}
              >
                <DeleteOutline fontSize="small" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ButtonStyled
          type="button"
          icon={<Add />}
          styles="px-4 bg-primary"
          title="Adicionar Refeição"
          onClick={() => {
            setFieldValue('meals', [
              ...meals,
              {
                category: '',
                time: '',
                items: [{ food_id: '', quantity: '', unit: '', notes: '' }],
              },
            ])
          }}
        />
      </div>
    </CollapsibleSection>
  )
}
