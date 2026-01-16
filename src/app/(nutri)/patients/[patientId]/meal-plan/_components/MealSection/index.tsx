'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

import ButtonStyled from '@/components/buttons/button'
import useLoadCategories from '@/hooks/others/useLoadCategories'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import ModalSearchProduct from '../SearchProduct'
import ModalViewNutrients from '../ViewNutrients'
import MealCard from './MealCard'

import {
  MealPlanFormValues,
  MealItem,
} from '@/interfaces/forms/mealPlanFormValues.interface'
import { Add } from '@mui/icons-material'

interface MealSectionProps {
  values: Partial<MealPlanFormValues>
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void
  setFieldValue: (field: string, value: any) => void
  errors: any
  touched: any
}

interface CategoryOption {
  value: string
  text: string
}

export default function MealSection({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: MealSectionProps) {
  const meals = values.meals || []

  const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
    meals,
    (newMeals) => setFieldValue('meals', newMeals),
  )

  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const [openSearch, setOpenSearch] = useState(false)
  const [mealIndexSelected, setMealIndexSelected] = useState<number | null>(
    null,
  )

  const [openMeals, setOpenMeals] = useState<Record<number, boolean>>({})
  const [viewNutrients, setViewNutrients] = useState(false)

  const paramsCat = useMemo(() => ({ type: 'meal' }), [])
  const { data: dataCategories } = useLoadCategories(false, paramsCat)

  const categoriesOptions: CategoryOption[] = useMemo(
    () => dataCategories.map((f) => ({ value: f.slug, text: f.title })),
    [dataCategories],
  )

  const handleSelectFood = (food: MealItem) => {
    if (mealIndexSelected === null) return

    const clone = [...meals]
    const items = clone[mealIndexSelected].items ?? []
    clone[mealIndexSelected].items = [...items, food]

    setFieldValue('meals', clone)
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            index={index}
            meal={meal}
            meals={meals}
            openMeals={openMeals}
            draggingIndex={draggingIndex}
            dragOverIndex={dragOverIndex}
            setOpenMeals={setOpenMeals}
            setOpenSearch={setOpenSearch}
            setMealIndexSelected={setMealIndexSelected}
            setViewNutrients={setViewNutrients}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            setDraggingIndex={setDraggingIndex}
            setDragOverIndex={setDragOverIndex}
            categoriesOptions={categoriesOptions}
          />
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <ButtonStyled
          type="button"
          icon={<Add />}
          styles="px-4 bg-secondary dark:bg-gray dark:text-black !font-light"
          title="Adicionar Refeição"
          onClick={() =>
            setFieldValue('meals', [
              ...meals,
              { category: '', time: '', items: [] },
            ])
          }
        />
      </div>

      {openSearch && (
        <ModalSearchProduct
          open={openSearch}
          setIsClose={() => setOpenSearch(false)}
          onSelect={handleSelectFood}
        />
      )}

      {viewNutrients && (
        <ModalViewNutrients
          open={viewNutrients}
          setIsClose={() => setViewNutrients(false)}
        />
      )}
    </>
  )
}
