'use client'
import MenuSettings from '../_components/menu'
import TopDash from '@/components/layout/topDash'
import { Settings } from '@mui/icons-material'
import { useFormik } from 'formik'
import InputStyled from '@/components/inputs/inputStyled'
import { validateSettingsSchedule } from '@/lib/formik/validators/validator-settings'
import ButtonStyled from '@/components/buttons/button'
import api from '@/services/api'
import { useContext, useEffect, useState } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/lib/feedbackStatus'
import { CircularProgress } from '@mui/material'
import SingleCheckbox from '@/components/inputs/checkboxStyled'
import useLoadClientSettings from '@/hooks/clients/useLoadClientSettings'

const diasSemana = {
  monday: 'Segunda',
  tuesday: 'Terça',
  wednesday: 'Quarta',
  thursday: 'Quinta',
  friday: 'Sexta',
  saturday: 'Sábado',
  sunday: 'Domingo',
}

const SettingsContent = () => {
  const {
    data,
    loading: loadingSettings,
    loadData,
  } = useLoadClientSettings(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { onShowFeedBack } = useContext(DefaultContext)

  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Configuração cadastrada com sucesso!'))
  }

  const onError = (e: any) => {
    const errorMessage =
      e?.response?.message || 'Falhou ao cadastrar configurações.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
    console.log('[ERROR API /clients/setting/store]', errorMessage)
  }

  const formik = useFormik({
    initialValues: {
      working_days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      start_time: '09:00',
      end_time: '18:00',
      appointment_duration: 45,
      allow_overbooking: false,
      max_daily_appointments: 15,
      break_between_appointments: 15,
      lunch_start: '12:30',
      lunch_end: '13:30',
    },
    validationSchema: validateSettingsSchedule,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await api.post('/clients/setting/store', values)
        onSuccess()
      } catch (error) {
        onError(error)
      } finally {
        setLoading(false)
        loadData()
      }
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues({
        working_days: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        start_time: data.start_time ?? '09:00',
        end_time: data.end_time ?? '18:00',
        appointment_duration: data.appointment_duration ?? 45,
        allow_overbooking: data.allow_overbooking ?? false,
        max_daily_appointments: data.max_daily_appointments ?? 15,
        break_between_appointments: data.break_between_appointments ?? 15,
        lunch_start: data.lunch_start ?? '12:30',
        lunch_end: data.lunch_end ?? '13:30',
      })
    }
  }, [data])

  return (
    <div className="w-full flex flex-col flex-1 min-h-0">
      <TopDash
        title="Configurações de Agenda"
        description="Gerencie seus horários e preferências de agendamento."
        icon={Settings}
      />

      <div className="flex flex-1 min-h-0 w-full justify-between gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-1 min-h-0 rounded-xl bg-white shadow-sm dark:!bg-gray-800"
        >
          {loadingSettings ? (
            <div className="flex items-center justify-center flex-1 flex-col gap-4">
              <CircularProgress className="dark:text-white text-primary text-2xl" />
              <p className="text-primary font-semibold dark:text-white">
                Carregando configurações...
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col flex-1 min-h-0 gap-2 overflow-y-auto scroll-mini p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Dias de funcionamento
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-between">
                    {Object.entries(diasSemana).map(([key, label]) => (
                      <SingleCheckbox
                        key={key}
                        label={label}
                        checked={
                          formik.values.working_days[
                            key as keyof typeof diasSemana
                          ]
                        }
                        onChange={(val) =>
                          formik.setFieldValue(`working_days.${key}`, val)
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Horário de expediente
                  </h3>
                  <div className="flex flex-row gap-4">
                    <InputStyled
                      id="start_time"
                      label="Início"
                      type="time"
                      value={formik.values.start_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.start_time as string}
                      isTouched={formik.touched.start_time}
                      stylesInput="w-full dark:!bg-gray-800"
                      stylesContainer="flex-1"
                    />
                    <InputStyled
                      id="end_time"
                      label="Fim"
                      type="time"
                      value={formik.values.end_time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.end_time as string}
                      isTouched={formik.touched.end_time}
                      stylesInput="w-full dark:!bg-gray-800"
                      stylesContainer="flex-1"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Configurações de atendimento
                  </h3>
                  <div className="grid grid-cols-2  gap-4">
                    <InputStyled
                      id="appointment_duration"
                      label="Duração (min)"
                      type="number"
                      value={formik.values.appointment_duration}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.appointment_duration as string}
                      isTouched={formik.touched.appointment_duration}
                      stylesInput="w-full dark:!bg-gray-800"
                    />
                    <InputStyled
                      id="max_daily_appointments"
                      label="Máx. atendimentos/dia"
                      type="number"
                      value={formik.values.max_daily_appointments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors.max_daily_appointments as string}
                      isTouched={formik.touched.max_daily_appointments}
                      stylesInput="w-full dark:!bg-gray-800"
                    />
                  </div>
                  <div className="grid grid-cols-2  gap-4 items-center">
                    <InputStyled
                      id="break_between_appointments"
                      label="Intervalo (min)"
                      type="number"
                      value={formik.values.break_between_appointments}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      stylesInput="w-full dark:!bg-gray-800"
                    />
                    <SingleCheckbox
                      label="Permitir overbooking"
                      checked={formik.values.allow_overbooking}
                      onChange={(val) =>
                        formik.setFieldValue('allow_overbooking', val)
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Pausa para almoço
                  </h3>
                  <div className="flex flex-row gap-4">
                    <InputStyled
                      id="lunch_start"
                      label="Início"
                      type="time"
                      value={formik.values.lunch_start}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      stylesInput="w-full dark:!bg-gray-800"
                      stylesContainer="flex-1"
                    />
                    <InputStyled
                      id="lunch_end"
                      label="Fim"
                      type="time"
                      value={formik.values.lunch_end}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      stylesInput="w-full dark:!bg-gray-800"
                      stylesContainer="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-2 py-2 px-2 flex justify-end">
                {loading ? (
                  <ButtonStyled
                    bgColor="bg-darkGray"
                    textColor="text-white"
                    type="submit"
                    styles="w-[150px]"
                    title="Salvando..."
                    icon={
                      <CircularProgress
                        style={{ width: 20, height: 20, color: '#FFFFFF' }}
                      />
                    }
                  />
                ) : (
                  <ButtonStyled
                    type="submit"
                    styles="w-[150px] bg-green-600"
                    title={'Salvar'}
                    disabled={!formik.isValid}
                  />
                )}
              </div>
            </>
          )}
        </form>

        <MenuSettings />
      </div>
    </div>
  )
}

export default SettingsContent
