import AutocompleteStyled from '@/components/inputs/autoCompleteStyled'
import ButtonStyled from '@/components/buttons/button'
import CardProfile from '@/components/tablesComponents/cardProfile'
import DatePickerStyled from '@/components/inputs/selectDateStyled'
import TextAreaStyled from '@/components/inputs/textAreaStyled'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'
import { colors } from '@/lib/colors/colors'
import PreFeedBack from '@/lib/feedbackStatus'
import AddIcon from '@mui/icons-material/Add'
import DescriptionIcon from '@mui/icons-material/Description'
import Person from '@mui/icons-material/Person'
import { CircularProgress, Modal, Tooltip } from '@mui/material'
import { useFormik } from 'formik'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { validateAgenda } from '@/lib/formik/validators/validate-agenda'
import CustomizedSteppers from '../../../../../components/layout/stepBar'
import ModalPatient from '../../../patients/_components/ModalPatient'
import ModalBase, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/modals/ModalBase'

interface ModalParams {
  open: boolean
  setIsClose: () => void
  scheduleSelected?: Schedule | null
  loadNewData: () => Promise<void>
}

const ModalAgenda = ({
  open,
  setIsClose,
  scheduleSelected,
  loadNewData,
}: ModalParams) => {
  const { onShowFeedBack, user } = useContext(DefaultContext)
  const [viewTwo, setViewTwo] = useState(false)
  const [loading, setloading] = useState(false)
  const { data, loadData, loading: loadingData } = useLoadPatients(!open)
  const [openModal, setOpenModal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
    onShowFeedBack(PreFeedBack.success('Agenda cadastrada com sucesso!'))
    setIsClose()
  }

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Agenda atualizada com sucesso!'))
    setIsClose()
  }

  const onError = (e: any) => {
    const errorMessage = e?.response?.message || 'Falhou ao cadastrar paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /patient]', errorMessage)
  }

  const onErrorUpdate = (e: any) => {
    const errorMessage = e?.response?.message || 'Falhou ao atualizar paciente.'
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
    setViewTwo(false)
    if (!open) return formik.resetForm()
    if (!scheduleSelected) {
      formik.setValues({
        patient: '',
        observation: '',
        start_time: '',
        end_time: '',
      })
    }
    if (scheduleSelected) {
      const { patient, observation, start_time, end_time } = scheduleSelected
      formik.setValues({
        patient: patient?.uuid?.toString() ?? '',
        observation: observation ?? '',
        start_time: convertUTCtoLocalISO(start_time),
        end_time: convertUTCtoLocalISO(end_time),
      })
    }
  }, [scheduleSelected, open])

  const formik = useFormik({
    initialValues: {
      patient: '',
      observation: '',
      start_time: '',
      end_time: '',
    },
    validate: validateAgenda,
    onSubmit: async (values) => {
      setloading(true)

      const data = {
        label_id: 1,
        patient_id: values.patient,
        observation: values.observation,
        start_time: formatDateTime(values.start_time),
        end_time: formatDateTime(values.end_time),
      }

      console.log(data)
      if (scheduleSelected) {
        await api
          .put(`/calendars/update/${scheduleSelected.uuid}`, data)
          .then(onSuccessUpdate)
          .catch(onErrorUpdate)
          .finally(() => setloading(false))
      } else {
        await api
          .post('/calendars/store', data)
          .then(onSuccess)
          .catch(onError)
          .finally(() => setloading(false))
      }

      loadNewData()
    },
  })

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  const steps = ['Selecione o paciente', 'Dados da Consulta']

  const patientSearch = useMemo(() => {
    return (
      data.find(
        (option) =>
          option?.uuid?.toString() === formik.values?.patient?.toString(),
      ) || null
    )
  }, [data, formik.values.patient])
  useEffect(() => {
    console.log(patientSearch)
  }, [formik.values])
  return (
    <>
      <ModalBase open={open} onClose={setIsClose}>
        <ModalHeader
          onClose={setIsClose}
          title={scheduleSelected ? 'Atualizar Agenda' : 'Cadastro de Agenda'}
        />

        <ModalContent>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            {loadingData ? (
              <div className="flex items-center flex-col justify-center py-6 gap-4">
                <CircularProgress className="text-3xl dark:text-white text-black" />
                <p className="text-black dark:text-white font-semibold">
                  Buscando dados...
                </p>
              </div>
            ) : (
              <>
                <CustomizedSteppers
                  steps={steps}
                  activeTab={viewTwo ? 1 : 0}
                  iconStep1={<Person />}
                  iconStep2={<DescriptionIcon />}
                />
                {!viewTwo && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center w-full gap-4">
                      <AutocompleteStyled
                        id="patient"
                        label="Paciente"
                        icon={<Person className="dark:text-white text-black" />}
                        placeholder="Selecione o paciente"
                        value={patientSearch}
                        options={data.map((d: any) => ({
                          id: d.uuid,
                          name: d.name,
                          label: d.name,
                        }))}
                        getOptionLabel={(option) => option.name}
                        onChange={(event: any, newValue: any) => {
                          console.log(newValue)
                          formik.setFieldValue('patient', newValue?.id || '')
                        }}
                        stylesLabel="dark:text-white"
                      />

                      <Tooltip
                        componentsProps={{
                          tooltip: {
                            sx: {
                              backgroundColor: colors.white,
                              color: colors.black,
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              padding: '8px 16px',
                              borderRadius: '8px',
                            },
                          },

                          arrow: {
                            sx: {
                              color: colors.black,
                            },
                          },
                        }}
                        title="Adicionar novo paciente"
                      >
                        <button
                          type="button"
                          onClick={toggleModalOpen}
                          className="bg-primary rounded-xl mt-6 w-14 h-14 flex items-center justify-center"
                        >
                          <AddIcon
                            style={{ color: colors.white, fontSize: 32 }}
                          />
                        </button>
                      </Tooltip>
                    </div>
                    {formik.errors.patient && formik.touched.patient && (
                      <p className="font-light text-red text-sm pt-1 text-center">
                        {formik.errors.patient}
                      </p>
                    )}
                  </div>
                )}

                {viewTwo && (
                  <div className="flex flex-col gap-2 pt-4">
                    <CardProfile user={patientSearch} />

                    <DatePickerStyled
                      id="start_time"
                      label="Ínicio da consulta"
                      value={formik.values.start_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.start_time}
                      isTouched={formik.touched.start_time}
                    />

                    <DatePickerStyled
                      id="end_time"
                      label="Fim da Consulta"
                      value={formik.values.end_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.end_time}
                      isTouched={formik.touched.end_time}
                    />

                    <TextAreaStyled
                      id="observation"
                      value={formik.values.observation}
                      onChange={formik.handleChange}
                      label="Digite uma observação"
                      placeholder="Digite uma observação (Opcional)"
                      maxLength={250}
                    />
                  </div>
                )}
              </>
            )}
          </form>
        </ModalContent>

        <ModalFooter>
          {!viewTwo && (
            <>
              <ButtonStyled
                type="button"
                onClick={setIsClose}
                styles="w-full"
                bgColor="bg-red-600"
                title="Cancelar"
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
                  styles="w-full bg-green-600"
                  title={'Próximo'}
                  disabled={!formik.values.patient}
                  onClick={() => {
                    if (!formik.values.patient) {
                      formik.setErrors({
                        patient: 'Selecione o paciente',
                      })
                    } else {
                      setViewTwo(true)
                    }
                  }}
                />
              )}
            </>
          )}

          {viewTwo && (
            <>
              <ButtonStyled
                type="button"
                onClick={() => setViewTwo(false)}
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
                  title={scheduleSelected ? 'Atualizar' : 'Cadastrar'}
                />
              )}
            </>
          )}
        </ModalFooter>
      </ModalBase>
      <ModalPatient
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
      />
    </>
  )
}

export default ModalAgenda
