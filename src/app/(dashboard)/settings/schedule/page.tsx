'use client'
import MenuSettings from '../_components/menu'
import TopDash from '@/components/layoutComponents/topDash'
import { Settings } from '@mui/icons-material'
import { useFormik } from 'formik'
import InputStyled from '@/components/inputsComponents/inputStyled'
import { validateSettingsSchedule } from '@/formik/validators/validator-settings'
import ButtonStyled from '@/components/buttonsComponents/button'

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
  const formik = useFormik({
    initialValues: {
      working_days: {
        monday: true,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: true,
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
    onSubmit: (values) => {
      console.log('Configurações salvas:', values)
    },
  })

  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title="Configurações de Agenda"
        description="Gerencie seus horários e preferências de agendamento."
        icon={Settings}
      />

      <div className="h-full w-full flex gap-4">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-1 rounded-xl bg-white shadow-sm dark:bg-gray-800"
        >
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
            <div className="flex flex-row w-full gap-4">
              <InputStyled
                id="start_time"
                label="Início do expediente"
                type="time"
                value={formik.values.start_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.start_time as string}
                isTouched={formik.touched.start_time}
                stylesInput="w-full"
                stylesContainer="flex-1"
              />

              <InputStyled
                id="end_time"
                label="Fim do expediente"
                type="time"
                value={formik.values.end_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.end_time as string}
                isTouched={formik.touched.end_time}
                stylesInput="w-full"
                stylesContainer="flex-1"
              />
            </div>

            <div className="flex flex-row w-full gap-4">
              <InputStyled
                id="appointment_duration"
                label="Duração do Atendimento (min)"
                type="number"
                value={formik.values.appointment_duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.appointment_duration as string}
                isTouched={formik.touched.appointment_duration}
                stylesContainer="flex-1"
              />

              <InputStyled
                id="max_daily_appointments"
                label="Máx. Atendimentos por dia"
                type="number"
                value={formik.values.max_daily_appointments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.max_daily_appointments as string}
                isTouched={formik.touched.max_daily_appointments}
                stylesContainer="flex-1"
              />

              <InputStyled
                id="break_between_appointments"
                label="Intervalo entre atendimentos (min)"
                type="number"
                value={formik.values.break_between_appointments}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                stylesContainer="flex-1"
              />
            </div>

            <div className="flex flex-row w-full gap-4">
              <InputStyled
                id="lunch_start"
                label="Início do Almoço"
                type="time"
                value={formik.values.lunch_start}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                stylesInput="w-full"
                stylesContainer="flex-1"
              />

              <InputStyled
                id="lunch_end"
                label="Fim do Almoço"
                type="time"
                value={formik.values.lunch_end}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                stylesInput="w-full"
                stylesContainer="flex-1"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end bg-white dark:bg-gray-800">
            <ButtonStyled
              type="submit"
              styles="w-[150px]"
              bgColor="bg-green"
              title="Salvar"
            />
          </div>
        </form>

        <div className="h-full flex justify-end">
          <MenuSettings />
        </div>
      </div>
    </div>
  )
}

export default SettingsContent
