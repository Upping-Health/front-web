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

// Interfaces auxiliares
interface Ingredient {
  food_id: string
  unit_id?: string
  household_unit_id?: string
  quantity: number
}

interface Instruction {
  step_number: number
  description: string
  time_minutes?: number
  image_url?: string
}

interface ModalParams {
  open: boolean
  setIsClose: () => void
  dataSelected?: any | null
  loadNewData: () => Promise<void>
}

// ========== COMPONENTES DE STEP (fora do modal) ==========

const StepBasicInfo = ({ formik }: any) => (
  <div className="flex flex-col gap-3">
    <InputStyled
      id="name"
      label="Nome"
      type="text"
      placeholder="Nome"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.errors.name}
      onBlur={formik.handleBlur}
      isTouched={formik.touched.name}
      required
    />
    <InputStyled
      id="normalized_name"
      label="Nome normalizado"
      type="text"
      value={formik.values.normalized_name}
      onChange={(e) => formik.setFieldValue('normalized_name', e.target.value)}
    />
    <InputStyled
      id="description"
      label="Descrição"
      type="text"
      value={formik.values.description}
      onChange={(e) => formik.setFieldValue('description', e.target.value)}
    />
    <InputStyled
      id="category"
      label="Categoria (slug)"
      type="text"
      value={formik.values.category}
      onChange={(e) => formik.setFieldValue('category', e.target.value)}
    />
    <InputStyled
      id="source"
      label="Origem (slug)"
      type="text"
      value={formik.values.source}
      onChange={(e) => formik.setFieldValue('source', e.target.value)}
    />
    <InputStyled
      id="sku"
      label="SKU"
      type="text"
      value={formik.values.sku}
      onChange={(e) => formik.setFieldValue('sku', e.target.value)}
    />
  </div>
)

const StepNutrients = ({ formik }: any) => (
  <div className="grid grid-cols-2 gap-3 mt-2">
    {Object.keys(formik.values.nutrient || {}).map((key) => (
      <InputStyled
        key={key}
        id={key}
        label={key.replaceAll('_', ' ')}
        type="number"
        value={(formik.values.nutrient as any)[key]}
        onChange={(e) =>
          formik.setFieldValue(`nutrient.${key}`, e.target.value)
        }
      />
    ))}
  </div>
)

const StepIngredients = () => (
  <div className="flex flex-col gap-3">{/* Conteúdo futuro */}</div>
)

const StepInstructions = () => (
  <div className="flex flex-col gap-3">{/* Conteúdo futuro */}</div>
)

// ===========================================================

const ModalFood = ({
  open,
  setIsClose,
  dataSelected,
  loadNewData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      normalized_name: '',
      description: '',
      category: '',
      source: '',
      sku: '',
      is_public: true,
      highlighted: false,
      displayed: true,
      nutrient: {
        energy_kcal: '',
        energy_kj: '',
        protein: '',
        total_lipids: '',
        carbohydrate: '',
      },
      ingredients: [] as Ingredient[],
      instructions: [] as Instruction[],
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
        normalized_name: dataSelected.normalized_name || '',
        description: dataSelected.description || '',
        category: dataSelected.category || '',
        source: dataSelected.source || '',
        sku: dataSelected.sku || '',
        is_public: dataSelected.is_public ?? true,
        highlighted: dataSelected.highlighted ?? false,
        displayed: dataSelected.displayed ?? true,
        nutrient: dataSelected.nutrient || {},
        ingredients: dataSelected.ingredients || [],
        instructions: dataSelected.instructions || [],
      })
    }
  }, [dataSelected, open])

  const steps = useMemo(
    () => [
      { label: 'Informações básicas', icon: <InfoIcon /> },
      { label: 'Nutrientes', icon: <RestaurantIcon /> },
      { label: 'Ingredientes', icon: <ListAltIcon /> },
      { label: 'Instruções', icon: <AssignmentIcon /> },
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
      case 2:
        return <StepIngredients />
      case 3:
        return <StepInstructions />
      default:
        return null
    }
  }, [activeStep, formik])

  return (
    <ModalBase open={open} onClose={loading ? undefined : setIsClose}>
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
