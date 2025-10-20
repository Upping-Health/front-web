import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import { CircularProgress, Switch, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'
import api from '@/services/api'

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
  const [loading, setloading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      normalized_name: '',
      description: '',
      category: '',
      source: '',
      is_public: true,
      highlighted: false,
      displayed: true,
      sku: '',
      nutrient: {
        energy_kcal: '',
        protein: '',
        total_lipids: '',
        carbohydrate: '',
      },
    },
    onSubmit: async (values) => {
      setloading(true)
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
      } catch (err: any) {
        onShowFeedBack(PreFeedBack.error('Erro ao salvar alimento.'))
      } finally {
        setloading(false)
      }
    },
  })

  useEffect(() => {
    if (!open) return formik.resetForm()

    if (dataSelected) {
      formik.setValues({
        name: dataSelected.name || '',
        normalized_name: dataSelected.normalized_name || '',
        description: dataSelected.description || '',
        category: dataSelected.category || '',
        source: dataSelected.source || '',
        is_public: dataSelected.is_public ?? true,
        highlighted: dataSelected.highlighted ?? false,
        displayed: dataSelected.displayed ?? true,
        sku: dataSelected.sku || '',
        nutrient: {
          energy_kcal: dataSelected.nutrient?.energy_kcal || '',
          protein: dataSelected.nutrient?.protein || '',
          total_lipids: dataSelected.nutrient?.total_lipids || '',
          carbohydrate: dataSelected.nutrient?.carbohydrate || '',
        },
      })
    } else {
      formik.resetForm()
    }
  }, [dataSelected, open])

  return (
    <ModalBase open={open} onClose={loading ? undefined : setIsClose}>
      <ModalHeader
        title={dataSelected ? 'Atualizar alimento' : 'Cadastro de alimento'}
        onClose={loading ? undefined : setIsClose}
      />

      <ModalContent>
        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-3">
            <InputStyled
              id="name"
              label="Nome"
              type="text"
              value={formik.values.name}
              onChange={(e) => formik.setFieldValue('name', e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.errors.name as string}
              isTouched={formik.touched.name}
              required
            />

            <InputStyled
              id="normalized_name"
              label="Nome normalizado"
              type="text"
              value={formik.values.normalized_name}
              onChange={(e) =>
                formik.setFieldValue('normalized_name', e.target.value)
              }
              onBlur={formik.handleBlur}
              error={formik.errors.normalized_name as string}
              isTouched={formik.touched.normalized_name}
            />

            <InputStyled
              id="description"
              label="Descrição"
              type="text"
              value={formik.values.description}
              onChange={(e) =>
                formik.setFieldValue('description', e.target.value)
              }
              onBlur={formik.handleBlur}
              error={formik.errors.description as string}
              isTouched={formik.touched.description}
            />

            <InputStyled
              id="category"
              label="Categoria"
              type="text"
              value={formik.values.category}
              onChange={(e) => formik.setFieldValue('category', e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.errors.category as string}
              isTouched={formik.touched.category}
            />

            <InputStyled
              id="source"
              label="Origem"
              type="text"
              value={formik.values.source}
              onChange={(e) => formik.setFieldValue('source', e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.errors.source as string}
              isTouched={formik.touched.source}
            />

            <InputStyled
              id="sku"
              label="SKU"
              type="text"
              value={formik.values.sku}
              onChange={(e) => formik.setFieldValue('sku', e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.errors.sku as string}
              isTouched={formik.touched.sku}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <InputStyled
              id="energy_kcal"
              label="Energia (kcal)"
              type="number"
              value={formik.values.nutrient.energy_kcal}
              onChange={(e) =>
                formik.setFieldValue('nutrient.energy_kcal', e.target.value)
              }
            />
            <InputStyled
              id="protein"
              label="Proteína (g)"
              type="number"
              value={formik.values.nutrient.protein}
              onChange={(e) =>
                formik.setFieldValue('nutrient.protein', e.target.value)
              }
            />
            <InputStyled
              id="total_lipids"
              label="Lipídios totais (g)"
              type="number"
              value={formik.values.nutrient.total_lipids}
              onChange={(e) =>
                formik.setFieldValue('nutrient.total_lipids', e.target.value)
              }
            />
            <InputStyled
              id="carbohydrate"
              label="Carboidratos (g)"
              type="number"
              value={formik.values.nutrient.carbohydrate}
              onChange={(e) =>
                formik.setFieldValue('nutrient.carbohydrate', e.target.value)
              }
            />
          </div>
        </form>
      </ModalContent>

      <ModalFooter>
        <ButtonStyled
          type="button"
          onClick={loading ? undefined : setIsClose}
          styles="w-full"
          bgColor="bg-red-600"
          title="Voltar"
        />

        {loading ? (
          <ButtonStyled
            bgColor="bg-darkGray"
            textColor="text-white"
            type="submit"
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
            onClick={formik.handleSubmit}
            styles="w-full bg-green-600"
            title={dataSelected ? 'Atualizar' : 'Cadastrar'}
          />
        )}
      </ModalFooter>
    </ModalBase>
  )
}

export default ModalFood
