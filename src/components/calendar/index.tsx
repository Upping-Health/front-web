// components/FullCalendarComponent.tsx
import Schedule from '@/interfaces/schedule.interface'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useRef, useState, useMemo } from 'react'
import Wrapper from '../layoutComponents/wrapper'
import ModalAgenda from '../modals/ModalAgenda'
import './calendar-custom.css'
import ButtonStyled from '../buttonsComponents/button'
import AddIcon from '@mui/icons-material/Add'
import { colors } from '@/utils/colors/colors'
import ModalLegends from '../modals/ModalLegends'

const Calendar = ({
  schedule,
  loadNewData,
  clientSettings,
}: {
  schedule: Schedule[]
  loadNewData: () => Promise<void>
  clientSettings?: {
    working_days?: number[]
    start_time?: string
    end_time?: string
    appointment_duration?: number
    allow_overbooking?: boolean
    max_daily_appointments?: number | null
    break_between_appointments?: number
    lunch_start?: string | null
    lunch_end?: string | null
  }
}) => {
  const [scheduleSelected, setScheduleSelected] = useState<Schedule | null>()
  const [legendSelected, setLegendSelected] = useState<any>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLegendModal, setOpenLegendModal] = useState<boolean>(false)
  const calendarRef = useRef<FullCalendar | null>(null)

  const businessHours = useMemo(() => {
    const baseHours = {
      daysOfWeek: clientSettings?.working_days || [1, 2, 3, 4, 5],
      startTime: clientSettings?.start_time?.substring(0, 5) || '08:00',
      endTime: clientSettings?.end_time?.substring(0, 5) || '17:00',
    }

    if (clientSettings?.lunch_start && clientSettings?.lunch_end) {
      return [
        {
          ...baseHours,
          endTime: clientSettings.lunch_start.substring(0, 5),
        },
        {
          ...baseHours,
          startTime: clientSettings.lunch_end.substring(0, 5),
        },
      ]
    }
    return baseHours
  }, [clientSettings])

  const formatTimeFromMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:00`
  }

  const appointmentDuration = clientSettings?.appointment_duration || 30
  const breakDuration = clientSettings?.break_between_appointments || 0

  const totalSlotDuration = appointmentDuration + breakDuration
  const slotDuration = formatTimeFromMinutes(totalSlotDuration)

  const slotLabelInterval = formatTimeFromMinutes(totalSlotDuration)

  const handleEventClick = (arg: EventClickArg) => {
    setOpenModal(true)
    setScheduleSelected(arg?.event?.extendedProps as Schedule)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setScheduleSelected(null)
  }

  const handleCloseLegendModal = () => {
    setOpenLegendModal(false)
    setLegendSelected(null)
  }

  const renderEventContent = (eventInfo: EventContentArg) => {
    const start = eventInfo.event.start

    const formatTime = (date: Date | null) => {
      if (!date) return ''
      return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    return (
      <div className="cursor-pointer flex items-center overflow-hidden text-sm bg-terciary px-2 rounded-xl">
        <b className="text-white mr-1">{formatTime(start)} -</b>
        <span className="text-white truncate">{eventInfo.event.title}</span>
      </div>
    )
  }

  const legends = [
    { name: 'Consulta', color: '#2196F3' },
    { name: 'Retorno', color: '#4CAF50' },
    { name: 'Previsão de retorno', color: '#E91E63' },
    { name: 'Outros', color: '#9E9E9E' },
    { name: 'Google Agenda', color: '#FF9800' },
  ]

  return (
    <>
      <Wrapper>
        <div className="w-full">
          <FullCalendar
            ref={calendarRef}
            themeSystem="bootstrap5"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            slotMinTime={clientSettings?.start_time || '08:00:00'}
            slotMaxTime={clientSettings?.end_time || '17:00:00'}
            businessHours={businessHours}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              omitZeroMinute: false,
            }}
            slotDuration={slotDuration}
            slotLabelInterval={slotLabelInterval}
            headerToolbar={{
              left: 'myPrev,myNext today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              myPrev: {
                text: '<',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi()
                  calendarApi?.prev()
                },
              },
              myNext: {
                text: '>',
                click: () => {
                  const calendarApi = calendarRef.current?.getApi()
                  calendarApi?.next()
                },
              },
            }}
            locale={ptBrLocale}
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
            }}
            dayHeaderFormat={{ weekday: 'short' }}
            eventContent={renderEventContent}
            events={schedule?.map((e) => ({
              title: e?.patient?.name,
              start: e.start_time,
              end: e.end_time,
              extendedProps: {
                ...e,
              },
            }))}
            eventClick={handleEventClick}
            height="auto"
            dateClick={() => {
              setOpenModal(true)
            }}
          />
        </div>

        <div className="pt-4 bg-light dark:bg-slate-800 rounded-xl w-60 flex flex-col items-center justify-between p-5">
          <div>
            <p className="text-center text-xl dark:text-white">Legendas</p>
            <div className="flex flex-col mt-6 gap-2">
              {legends.map((leg, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded "
                    style={{ backgroundColor: leg.color }}
                  />
                  <p className="m-0 text-sm font-light dark:text-white">
                    {leg.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <ButtonStyled
              title={'Nova legenda'}
              onClick={() => setOpenLegendModal(true)}
              icon={<AddIcon style={{ color: colors.white, fontSize: 24 }} />}
              type="button"
              styles="px-4 text-sm h-12 shadow-lg dark:bg-gray-700 w-full"
            />
          </div>
        </div>
      </Wrapper>

      <ModalAgenda
        open={openModal}
        setIsClose={handleCloseModal}
        scheduleSelected={scheduleSelected}
        loadNewData={loadNewData}
      />

      <ModalLegends
        open={openLegendModal}
        setIsClose={handleCloseLegendModal}
        legendSelected={legendSelected}
        loadNewData={loadNewData}
      />
    </>
  )
}

export default Calendar
