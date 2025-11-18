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

import {
  foodSchema,
  nutrientsStep1Fields,
} from '@/lib/formik/validators/validate-food'

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

  const formik = useFormik<FoodFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      sku: '',
      nutrient: {
        energy_kcal: '0',
        energy_kj: '0',
        protein: '0',
        total_lipids: '0',
        cholesterol: '0',
        carbohydrate: '0',
        fiber: '0',
        ash: '0',
        calcium: '0',
        magnesium: '0',
        manganese: '0',
        phosphorus: '0',
        iron: '0',
        sodium: '0',
        potassium: '0',
        copper: '0',
        zinc: '0',
        retinol: '0',
        vitamin_a_re: '0',
        vitamin_a_rae: '0',
        thiamin: '0',
        riboflavin: '0',
        pyridoxine: '0',
        niacin: '0',
        vitamin_c: '0',
        vitamin_d: '0',
        vitamin_e: '0',
        vitamin_b9: '0',
        vitamin_b12: '0',
        saturated: '0',
        monounsaturated: '0',
        polyunsaturated: '0',
        trans_fats: '0',
        selenium: '0',
        //alcool: '0',
      },
    },
    validationSchema: foodSchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values) => {
      setLoading(true)

      const data = {
        ...values,
        category: '',
        source: '',
        nutrient: Object.fromEntries(
          Object.entries(values.nutrient).map(([k, v]) => [k, Number(v) || 0]),
        ),
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
        nutrient: dataSelected.nutrient || {},
      })
    }
  }, [dataSelected, open])

  const steps = useMemo(
    () => [
      { label: 'Informações básicas', icon: <InfoIcon /> },
      { label: 'Micronutrientes (Opcional)', icon: <RestaurantIcon /> },
    ],
    [],
  )

  const handleNext = async () => {
    if (activeStep === 0) {
      const errors = await formik.validateForm()

      const hasErrors = Object.keys(errors.nutrient || {}).some((key) =>
        nutrientsStep1Fields.some((f) => f.key === key),
      )

      if (errors.name || hasErrors) {
        formik.setTouched(
          {
            name: true,
            nutrient: nutrientsStep1Fields.reduce((acc, item) => {
              acc[item.key] = true
              return acc
            }, {} as any),
          },
          true,
        )
        return
      }
    }

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
