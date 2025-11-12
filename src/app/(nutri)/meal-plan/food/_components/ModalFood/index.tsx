import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import { CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState, useMemo } from 'react'
import api from '@/services/api'
import CustomizedSteppers from '@/components/layout/stepBar'
import InfoIcon from '@mui/icons-material/Info'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AssignmentIcon from '@mui/icons-material/Assignment'
import InputImageStyled from '@/components/inputs/inputImageStyled'
import StepBasicInfo from './Steps/StepBasicInfo'
import StepNutrients from './Steps/StepNutrients'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  dataSelected?: any | null
  loadNewData: () => Promise<void>
}

const ModalFood = ({
  open,
  setIsClose,
  dataSelected,
  loadNewData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const formik = useFormik<FoodFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      sku: '',
      nutrient: {
        energy_kcal: '',
        energy_kj: '',
        protein: '',
        total_lipids: '',
        cholesterol: '',
        carbohydrate: '',
        fiber: '',
        ash: '',
        calcium: '',
        magnesium: '',
        manganese: '',
        phosphorus: '',
        iron: '',
        sodium: '',
        potassium: '',
        copper: '',
        zinc: '',
        retinol: '',
        vitamin_a_re: '',
        vitamin_a_rae: '',
        thiamin: '',
        riboflavin: '',
        pyridoxine: '',
        niacin: '',
        vitamin_c: '',
        vitamin_d: '',
        vitamin_e: '',
        vitamin_b9: '',
        vitamin_b12: '',
        saturated: '',
        monounsaturated: '',
        polyunsaturated: '',
        trans_fats: '',
        selenium: '',
      },
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        if (dataSelected) {
          await api.put(`/foods/${dataSelected.id}`, values)
          onShowFeedBack(
            PreFeedBack.success('Alimento atualizado com sucesso!'),
          )
        } else {
          await api.post('/foods', values)
          onShowFeedBack(
            PreFeedBack.success('Alimento cadastrado com sucesso!'),
          )
        }
        await loadNewData()
        setIsClose()
      } catch (err) {
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

        nutrient: dataSelected.nutrient || {},
      })
    }
  }, [dataSelected, open])

  const steps = useMemo(
    () => [
      { label: 'Informações básicas', icon: <InfoIcon /> },
      { label: 'Nutrientes', icon: <RestaurantIcon /> },
    ],
    [],
  )

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1)
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
        return <StepNutrients formik={formik} />
      default:
        return null
    }
  }, [activeStep, formik])

  return (
    <ModalBase open={open} size="xl">
      <ModalHeader
        title={dataSelected ? 'Editar alimento' : 'Cadastrar alimento'}
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
                  style={{
                    width: 20,
                    height: 20,
                    color: '#FFFFFF',
                  }}
                />
              }
            />
          ) : (
            <ButtonStyled
              type="button"
              onClick={handleNext}
              styles="w-full bg-green-600"
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

export default ModalFood
