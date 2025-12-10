'use client'

import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import TooltipStyled from '@/components/inputs/tooltipStyled'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import { Add, DeleteOutline } from '@mui/icons-material'
import { FormikErrors, FormikTouched } from 'formik'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import ModalSearchProduct from '../SearchProduct'

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

  const [openMeals, setOpenMeals] = useState<{ [key: number]: boolean }>({})

  const [openSearch, setOpenSearch] = useState(false)
  const [mealIndexSelected, setMealIndexSelected] = useState<number | null>(
    null,
  )

  const handleSelectFood = (food: any) => {
    if (mealIndexSelected === null) return

    const clone = [...meals]

    clone[mealIndexSelected].items?.push({
      food_id: food.id,
      name: food.name,
      quantity: '',
      unit: food.unit || '',
      notes: '',
    })

    setFieldValue('meals', clone)
  }

  return (
    <>
      <div className="flex flex-col gap-3  ">
        {meals.map((meal, index) => (
          <motion.div
            key={index}
            layout
            layoutId={`meal-${index}`}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            draggable
            className={`rounded-xl border cursor-grab active:cursor-grabbing select-none ${
              draggingIndex === index
                ? 'z-50 scale-105 shadow-2xl border-red-500 bg-white dark:bg-gray-800'
                : dragOverIndex === index
                  ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900 shadow-lg'
                  : 'border bg-white shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-gray-700'
            }`}
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
            <div className="flex items-center justify-between p-4 rounded-xl dark:bg-gray-900">
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

              <div className="flex gap-2 items-center">
                <TooltipStyled title="Adicionar alimento">
                  <button
                    type="button"
                    className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
                    onClick={() => {
                      setMealIndexSelected(index)
                      setOpenSearch(true)
                    }}
                  >
                    <Add fontSize="small" />
                  </button>
                </TooltipStyled>

                <TooltipStyled title="Excluir refeição">
                  <button
                    type="button"
                    className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
                    onClick={() => {
                      const clone = [...meals]
                      clone.splice(index, 1)
                      setFieldValue('meals', clone)
                    }}
                  >
                    <DeleteOutline fontSize="small" />
                  </button>
                </TooltipStyled>

                <TooltipStyled
                  title={openMeals[index] ? 'Recolher' : 'Expandir'}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      setOpenMeals((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                  >
                    {openMeals[index] ? (
                      <ExpandLess className="text-black dark:text-white" />
                    ) : (
                      <ExpandMore className="text-black dark:text-white" />
                    )}
                  </IconButton>
                </TooltipStyled>
              </div>
            </div>

            {openMeals[index] && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {(!meal.items || meal.items.length === 0) && (
                  <div className="py-4 text-center text-gray-500 text-sm dark:bg-gray-800">
                    Nenhum alimento adicionado a esta refeição.
                  </div>
                )}
                {meal.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-2 mb-2 items-center justify-between"
                  >
                    <div className="flex gap-2">
                      <InputStyled
                        type="text"
                        id={`meals[${index}].items[${i}].food_id`}
                        value={item.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Alimento"
                        disabled
                        styles="dark:bg-gray-800 flex-1"
                      />
                      <InputStyled
                        type="text"
                        id={`meals[${index}].items[${i}].quantity`}
                        value={item.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Qtd"
                        styles="dark:bg-gray-800 w-[80px]"
                      />
                    </div>

                    <button
                      type="button"
                      className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
                      onClick={() => {
                        const clone = [...meals]
                        clone[index].items!.splice(i, 1)
                        setFieldValue('meals', clone)
                      }}
                    >
                      <DeleteOutline fontSize="small" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ButtonStyled
          type="button"
          icon={<Add />}
          styles="px-4 bg-secondary dark:bg-gray dark:text-black !font-light"
          title="Adicionar Refeição"
          onClick={() => {
            setFieldValue('meals', [
              ...meals,
              {
                category: '',
                time: '',
                items: [],
              },
            ])
          }}
        />
      </div>

      <ModalSearchProduct
        open={openSearch}
        setIsClose={() => setOpenSearch(false)}
        onSelect={handleSelectFood}
      />
    </>
  )
}
