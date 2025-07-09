import AutocompleteStyled from '@/components/inputsComponents/autoCompleteStyled'
import ButtonStyled from '@/components/buttonsComponents/button'
import CardProfile from '@/components/tablesComponents/cardProfile'
import DatePickerStyled from '@/components/inputsComponents/selectDateStyled'
import TextAreaStyled from '@/components/inputsComponents/textAreaStyled'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import AddIcon from '@mui/icons-material/Add'
import DescriptionIcon from '@mui/icons-material/Description'
import Person from '@mui/icons-material/Person'
import { CircularProgress, Modal, Tooltip } from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { validateAgenda } from '../../../../formik/validators/validate-agenda'
import CustomizedSteppers from '../../layoutComponents/stepBar'
import ModalPatient from '../ModalPatient'
import InputStyled from '@/components/inputsComponents/inputStyled'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  legendSelected?: Schedule | null
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

  const [openModal, setOpenModal] = useState(false)

  function convertUTCtoLocalISO(dateString: string): string {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Paciente cadastrado com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Paciente atualizado com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao cadastrar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage =
      e?.response?.data?.error || 'Falhou ao atualizar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const formatDateTime = (dateTime: string) => {
    if (dateTime.includes('T')) {
      return dateTime.replace('T', ' ') + ':00'
    }
    return dateTime
  }

  useEffect(() => {
    if (!open) return formik.resetForm()
    if (!legendSelected) {
      formik.setValues({
        name: '',
        color: '',
      })
    }
    if (legendSelected) {
      // const { patient, observation, start_time, end_time } = legendSelected
      // formik.setValues({
      //   patient: patient?.uuid?.toString() ?? '',
      //   observation: observation ?? '',
      //   start_time: convertUTCtoLocalISO(start_time),
      //   end_time: convertUTCtoLocalISO(end_time),
      // })
    }
  }, [legendSelected, open])

  const formik = useFormik({
    initialValues: {
      name: '',
      color: '#00000000',
    },
    validate: validateAgenda,
    onSubmit: async (values) => {
      setloading(true)

      loadNewData()
    },
  })

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <>
      <Modal
        open={open}
        onClose={setIsClose}
        className="flex justify-center items-center"
      >
        <div className="bg-white rounded-20 px-5 py-4 w-[85%] max-w-[500px] dark:bg-slate-800">
          <p className="font-semibold text-xl text-center uppercase pb-5 dark:text-white">
            {legendSelected ? 'Atualizar Legenda' : 'Cadastro de Legenda'}
          </p>

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
                  stylesInput="dark:bg-slate-800 dark:text-white"
                  stylesLabel="dark:text-white"
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
                  stylesInput="dark:bg-slate-800 dark:text-white"
                  stylesLabel="dark:text-white"
                  styles="h-[50px]"
                />
              </div>
            </div>

            <div className="flex gap-5 pt-5">
              <ButtonStyled
                type="button"
                onClick={setIsClose}
                styles="w-full"
                bgColor="bg-newRed"
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
                  type="submit"
                  styles="w-full dark:bg-white dark:text-black"
                  title={legendSelected ? 'Atualizar' : 'Cadastrar'}
                />
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default ModalLegends
