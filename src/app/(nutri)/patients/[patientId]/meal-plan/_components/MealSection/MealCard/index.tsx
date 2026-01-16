import {
  MealItem,
  MealPlanFormValues,
} from '@/interfaces/forms/mealPlanFormValues.interface'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import TooltipStyled from '@/components/inputs/tooltipStyled'
import MealItemRow from '../MealItemRow'

import { IconButton } from '@mui/material'
import {
  Add,
  Calculate,
  DeleteOutline,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

interface CategoryOption {
  value: string
  text: string
}

interface MealCardProps {
  index: number
  meal: MealPlanFormValues['meals'][0]
  meals: MealPlanFormValues['meals']
  openMeals: Record<number, boolean>
  draggingIndex: number | null
  dragOverIndex: number | null
  categoriesOptions: CategoryOption[]

  setOpenMeals: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  setOpenSearch: (open: boolean) => void
  setMealIndexSelected: (index: number) => void
  setViewNutrients: (open: boolean) => void
  setFieldValue: (field: string, value: any) => void
  setDraggingIndex: (n: number | null) => void
  setDragOverIndex: (n: number | null) => void

  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: React.FocusEvent<any>) => void

  handleDragStart: (index: number) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDrop: (index: number) => void
}

export default function MealCard({
  index,
  meal,
  meals,
  openMeals,
  draggingIndex,
  dragOverIndex,
  categoriesOptions,
  setOpenMeals,
  setOpenSearch,
  setMealIndexSelected,
  setViewNutrients,
  setFieldValue,
  setDraggingIndex,
  setDragOverIndex,
  handleChange,
  handleBlur,
  handleDragStart,
  handleDragOver,
  handleDrop,
}: MealCardProps) {
  return (
    <motion.div
      layout
      layoutId={`meal-${index}`}
      draggable
      className={`rounded-xl border cursor-grab select-none ${
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
      {/* Header */}
      <div className="flex items-center justify-between p-3 rounded-xl">
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

          <SelectStyled
            id={`meals[${index}].category`}
            value={meal.category}
            onChange={handleChange}
            onBlur={handleBlur}
            styles="dark:bg-gray-800 w-[200px]"
            options={categoriesOptions}
          />
        </div>

        <div className="flex gap-2 items-center">
          {/* Adicionar alimento */}
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

          {/* Ver nutrientes */}
          <TooltipStyled title="Ver nutrientes">
            <button
              type="button"
              className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
              onClick={() => setViewNutrients(true)}
            >
              <Calculate fontSize="small" />
            </button>
          </TooltipStyled>

          {/* Excluir refeição */}
          <TooltipStyled title="Excluir refeição">
            <button
              type="button"
              className="flex items-center justify-center text-red-600 w-10 h-10 rounded-lg"
              onClick={() => {
                const clone = [...meals]
                clone.splice(index, 1)
                setFieldValue('meals', clone)
              }}
            >
              <DeleteOutline fontSize="small" />
            </button>
          </TooltipStyled>

          {/* Expandir */}
          <IconButton
            size="small"
            onClick={() =>
              setOpenMeals((prev) => ({ ...prev, [index]: !prev[index] }))
            }
          >
            {openMeals[index] ? (
              <ExpandLess className="text-black dark:text-white" />
            ) : (
              <ExpandMore className="text-black dark:text-white" />
            )}
          </IconButton>
        </div>
      </div>

      {/* Items */}
      {openMeals[index] && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          {(!meal.items || meal.items.length === 0) && (
            <div className="py-4 text-center text-gray-500 text-sm">
              Nenhum alimento adicionado a esta refeição.
            </div>
          )}

          <div className="space-y-2">
            {meal.items?.length > 0 && (
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase">
                <div className="col-span-3">Alimento</div>
                <div className="col-span-1">Qtd</div>
                <div className="col-span-3">Medida</div>
                <div className="col-span-1">Prot</div>
                <div className="col-span-1">Carb</div>
                <div className="col-span-1">Lip</div>
                <div className="col-span-1">Kcal</div>
                <div className="col-span-1"></div>
              </div>
            )}

            {meal.items?.map((item, i) => (
              <MealItemRow
                key={i}
                item={item}
                index={index}
                i={i}
                meals={meals}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                setViewNutrients={setViewNutrients}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
