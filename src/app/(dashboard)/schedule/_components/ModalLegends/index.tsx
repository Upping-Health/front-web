import ButtonStyled from '@/components/buttons/button'
import InputStyled from '@/components/inputs/inputStyled'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import api from '@/services/api'
import Person from '@mui/icons-material/Person'
import { CircularProgress, Modal } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useEffect, useState } from 'react'

interface ScheduleLegend {
  id: number
  uuid: string
  name: string
  color: string
}

interface ModalParams {
  open: boolean
  setIsClose: () => void
  legendSelected?: ScheduleLegend | null
  loadNewData: () => Promise<void>
}

const ModalLegends = ({
  open,
  setIsClose,
  legendSelected,
  loadNewData,
}: ModalParams) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [loading, setloading] = useState(false)
  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Legenda cadastrada com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Legenda atualizada com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao cadastrar legenda.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /calendars/label]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao atualizar legenda.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /calendars/label]', errorMessage)
  }

  useEffect(() => {
    if (!open) return formik.resetForm()
    if (!legendSelected) {
      formik.setValues({
        name: '',
        color: '#000000',
      })
    }
    if (legendSelected) {
      const { name, color } = legendSelected
      formik.setValues({
        name,
        color,
      })
    }
  }, [legendSelected, open])

  const formik = useFormik({
    initialValues: {
      name: '',
      color: '#00000000',
    },
    onSubmit: async (values) => {
      setloading(true)

      const data = {
        name: values.name,
        color: values.color,
      }

      if (legendSelected) {
        await api
          .put(`calendars/labels/update/${legendSelected.uuid}`, data)
          .then(onSuccessUpdate)
          .catch(onErrorUpdate)
          .finally(() => setloading(false))
      } else {
        await api
          .post('calendars/labels/store', data)
          .then(onSuccess)
          .catch(onError)
          .finally(() => setloading(false))
      }

      loadNewData()
    },
  })

  return (
    <>
      <ModalBase open={open} onClose={setIsClose}>
        <ModalHeader
          title={legendSelected ? 'Atualizar Legenda' : 'Cadastro de Legenda'}
          onClose={setIsClose}
        />

        <ModalContent>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <div className="flex items-center w-full gap-4">
              <div className="flex-1">
                <InputStyled
                  id="name"
                  label="Nome"
                  type="text"
                  placeholder="Nome da legenda"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.errors.name}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.name}
                  icon={<Person className="text-black dark:text-white" />}
                  styles="h-[50px]"
                />
              </div>

              <div className="w-20">
                <InputStyled
                  id="color"
                  label="Cor"
                  type="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  error={formik.errors.color}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.color}
                  styles="h-[50px]"
                />
              </div>
            </div>
          </form>
        </ModalContent>

        <ModalFooter>
          <ButtonStyled
            type="button"
            onClick={setIsClose}
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
              title="Cadastrando..."
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
              title={legendSelected ? 'Atualizar' : 'Cadastrar'}
            />
          )}
        </ModalFooter>
      </ModalBase>
    </>
  )
}

export default ModalLegends
