'use client'

import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import SelectStyled from '@/components/inputs/select'
import TooltipStyled from '@/components/inputs/tooltipStyled'
import { useDragAndDrop } from '@/hooks/forms/useDragAndDrop'
import { MealPlanFormValues } from '@/interfaces/forms/mealPlanFormValues.interface'
import { Add, Calculate, DeleteOutline } from '@mui/icons-material'
import { FormikErrors, FormikTouched } from 'formik'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import ModalSearchProduct from '../SearchProduct'
import AutocompleteStyled from '@/components/inputs/autoCompleteStyled'
import useLoadCategories from '@/hooks/others/useLoadCategories'
import { Categories } from '@/interfaces/categories.interface'
import ModalViewNutrients from '../ViewNutrients'

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

  const [viewNutrients, setViewNutrients] = useState(false)

  const paramsCat = useMemo(
    () => ({
      type: 'meal',
    }),
    [],
  )

  const { data: dataCategories, loading: categoriesLoading } =
    useLoadCategories(false, paramsCat)

  const categoriesOptions = useMemo(
    () =>
      dataCategories.map((f) => ({
        value: f.slug,
        text: f.title,
      })),
    [dataCategories],
  )

  const handleSelectFood = (food: any) => {
    if (mealIndexSelected === null) return

    const clone = [...meals]

    clone[mealIndexSelected].items?.push({
      food_id: food.id,
      name: food.name,
      quantity: '1',
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

                <div className="min-w-[200px]">
                  <SelectStyled
                    id={`meals[${index}].category`}
                    value={meal.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    styles="dark:bg-gray-800 w-[200px]"
                    options={categoriesOptions}
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

                <TooltipStyled title="Ver nutrientes">
                  <button
                    type="button"
                    className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
                    onClick={() => setViewNutrients(true)}
                  >
                    <Calculate fontSize="small" />
                  </button>
                </TooltipStyled>

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
                      <div className="col-span-2">Medida</div>
                      <div className="col-span-1">Prot</div>
                      <div className="col-span-1">Carb</div>
                      <div className="col-span-1">Lip</div>
                      <div className="col-span-1">Kcal</div>
                      <div className="col-span-2"></div>
                    </div>
                  )}

                  {meal.items?.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-2 items-center rounded-lg"
                    >
                      <InputStyled
                        id={`meals[${index}].items[${i}].name`}
                        type="text"
                        value={item.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        stylesContainer="col-span-3"
                        styles="dark:bg-gray-800"
                      />

                      <InputStyled
                        id={`meals[${index}].items[${i}].quantity`}
                        type="text"
                        value={item.quantity}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        stylesContainer="col-span-1"
                        styles="dark:bg-gray-800"
                      />

                      <AutocompleteStyled
                        id={`meals[${index}].items[${i}].unit`}
                        options={[
                          { id: 'g', name: 'Gramas' },
                          { id: 'ml', name: 'Mililitros' },
                          { id: 'un', name: 'Unidade' },
                        ]}
                        getOptionLabel={(option) => option.name}
                        styles="dark:bg-gray-800"
                        stylesGlobal="col-span-2"
                        value={item.unit}
                        onChange={(e, value) =>
                          setFieldValue(
                            `meals[${index}].items[${i}].unit`,
                            value?.id || '',
                          )
                        }
                      />

                      <InputStyled
                        id={`meals[${index}].items[${i}].protein`}
                        value={''}
                        type="text"
                        onChange={handleChange}
                        stylesContainer="col-span-1"
                        styles="text-center dark:bg-gray-800"
                        placeholder="g"
                      />

                      <InputStyled
                        id={`meals[${index}].items[${i}].carbs`}
                        type="text"
                        value={''}
                        onChange={handleChange}
                        stylesContainer="col-span-1"
                        styles="text-center dark:bg-gray-800"
                        placeholder="g"
                      />

                      <InputStyled
                        id={`meals[${index}].items[${i}].fat`}
                        value={''}
                        type="text"
                        onChange={handleChange}
                        stylesContainer="col-span-1"
                        styles="text-center dark:bg-gray-800"
                        placeholder="g"
                      />

                      <InputStyled
                        id={`meals[${index}].items[${i}].kcal`}
                        value={''}
                        type="text"
                        onChange={handleChange}
                        stylesContainer="col-span-1"
                        styles="dark:bg-gray-800"
                        placeholder="kcal"
                      />

                      <div className="col-span-2 flex items-center justify-end">
                        <TooltipStyled title="Ver nutrientes do alimento">
                          <button
                            type="button"
                            className="flex items-center justify-center text-black dark:text-white w-10 h-10 rounded-lg"
                            onClick={() => setViewNutrients(true)}
                          >
                            <Calculate fontSize="small" />
                          </button>
                        </TooltipStyled>

                        <TooltipStyled title="Excluir alimento">
                          <button
                            type="button"
                            className="flex items-center justify-center text-red-600 w-8 h-8 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                            onClick={() => {
                              const clone = [...meals]
                              clone[index].items!.splice(i, 1)
                              setFieldValue('meals', clone)
                            }}
                          >
                            <DeleteOutline fontSize="small" />
                          </button>
                        </TooltipStyled>
                      </div>
                    </div>
                  ))}
                </div>
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

      <ModalViewNutrients
        open={viewNutrients}
        setIsClose={() => setViewNutrients(false)}
      />
    </>
  )
}
