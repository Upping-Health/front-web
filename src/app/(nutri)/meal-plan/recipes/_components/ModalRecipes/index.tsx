import ButtonStyled from '@/components/buttons/button'
import CustomizedSteppers from '@/components/layout/stepBar'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import api from '@/services/api'
import InfoIcon from '@mui/icons-material/Info'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useMemo, useState } from 'react'
import StepBasicInfo from './Steps/StepBasicInfo'
import AssignmentIcon from '@mui/icons-material/Assignment'
import {
  foodSchema,
  nutrientsStep1Fields,
} from '@/lib/formik/validators/validate-food'
import StepMeasures from '../../../food/_components/ModalFood/Steps/StepMeasures'
import StepIngredients from './Steps/StepIngredients'
import StepInstructions from './Steps/StepInstructions'
import useLoadFoods from '@/hooks/foods/useLoadFoods'
import useLoadUnits from '@/hooks/foods/useLoadUnits'
import useLoadHouseHoldsUnits from '@/hooks/foods/useLoadHouseHoldUnits'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  dataSelected?: any | null
  loadNewData: () => Promise<void>
}

const ModalRecipes = ({
  open,
  setIsClose,
  dataSelected,
  loadNewData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const { data, loadData, loading: loadingFoods } = useLoadFoods(open)
  const {
    data: dataUnits,
    loadData: loadUnits,
    loading: loadingUnits,
  } = useLoadUnits(open)
  const {
    data: dataHouseHoldsUnits,
    loadData: loadHouseHoldsUnits,
    loading: loadingHouseHoldsUnits,
  } = useLoadHouseHoldsUnits(open)

  const formik = useFormik<RecipeFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      sku: '',
      ingredients: [
        { food_id: '', household_unit_id: '', quantity: '', unit_id: '' },
      ],
      instructions: [
        { step_number: '', description: '', time_minutes: '', image_url: '' },
      ],
    },

    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values) => {
      setLoading(true)

      const data = {
        ...values,
        category: '',
        source: '',
      }

      try {
        if (dataSelected) {
          await api.put(`/foods/update/${dataSelected.id}`, data)
          onShowFeedBack(
            PreFeedBack.success('Alimento atualizado com sucesso!'),
          )
        } else {
          await api.post('/foods/store', data)
          onShowFeedBack(
            PreFeedBack.success('Alimento cadastrado com sucesso!'),
          )
        }

        await loadNewData()
        setIsClose()
      } catch {
        onShowFeedBack(PreFeedBack.error('Erro ao salvar alimento.'))
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (!open) {
      formik.resetForm()
      setActiveStep(0)
    }
  }, [open])

  useEffect(() => {
    if (open && dataSelected) {
      formik.setValues({
        name: dataSelected.name || '',
        description: dataSelected.description || '',
        sku: dataSelected.sku || '',
        ingredients: dataSelected?.ingredients ?? [
          { food_id: '', household_unit_id: '', quantity: '', unit_id: '' },
        ],
        instructions: dataSelected?.instructions ?? [
          { step_number: '', description: '', time_minutes: '', image_url: '' },
        ],
      })
    }
  }, [dataSelected, open])

  const steps = useMemo(
    () => [
      { label: 'Informações básicas', icon: <InfoIcon /> },
      { label: 'Ingredientes', icon: <RestaurantIcon /> },
      { label: 'Instruções', icon: <AssignmentIcon /> },
    ],
    [],
  )

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((p) => p + 1)
    } else {
      formik.handleSubmit()
    }
  }

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1)
  }

  const renderStepContent = useMemo(() => {
    switch (activeStep) {
      case 0:
        return <StepBasicInfo formik={formik} />
      case 1:
        return (
          <StepIngredients
            formik={formik}
            foods={data}
            units={dataUnits}
            houseHoldUnits={dataHouseHoldsUnits}
          />
        )
      case 2:
        return <StepInstructions formik={formik} />
      default:
        return null
    }
  }, [activeStep, formik])

  return (
    <ModalBase open={open} size="xl">
      <ModalHeader
        title={dataSelected ? 'Editar Receita' : 'Cadastrar Receita'}
        onClose={loading ? undefined : setIsClose}
      />

      <ModalContent>
        <div className="mb-6">
          <CustomizedSteppers steps={steps} activeTab={activeStep} />
        </div>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          {renderStepContent}
        </form>
      </ModalContent>

      <ModalFooter>
        <div className="flex gap-3 w-full">
          {activeStep > 0 ? (
            <ButtonStyled
              type="button"
              onClick={handleBack}
              styles="w-full dark:bg-gray-600 bg-stone-500"
              title="Voltar"
            />
          ) : (
            <ButtonStyled
              type="button"
              onClick={loading ? undefined : setIsClose}
              styles="w-full bg-red-600"
              title="Cancelar"
            />
          )}

          {loading ? (
            <ButtonStyled
              bgColor="bg-darkGray"
              textColor="text-white"
              type="button"
              styles="w-full"
              title="Salvando..."
              icon={
                <CircularProgress
                  style={{ width: 20, height: 20, color: '#FFF' }}
                />
              }
            />
          ) : (
            <ButtonStyled
              type="button"
              onClick={handleNext}
              styles="w-full bg-green-600"
              disabled={!formik.isValid}
              title={
                activeStep === steps.length - 1
                  ? dataSelected
                    ? 'Atualizar'
                    : 'Cadastrar'
                  : 'Próximo'
              }
            />
          )}
        </div>
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalRecipes
