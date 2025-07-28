// components/FullCalendarComponent.tsx
import Schedule from '@/interfaces/schedule.interface'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useRef, useState, useMemo } from 'react'
import Wrapper from '../../../../../components/layoutComponents/wrapper'
import ModalAgenda from '../ModalAgenda'
import './calendar-custom.css'
import ButtonStyled from '../../../../../components/buttonsComponents/button'
import AddIcon from '@mui/icons-material/Add'
import { colors } from '@/utils/colors/colors'
import ModalLegends from '../ModalLegends'
import useLoadScheduleLabels from '@/hooks/nutritionists/useLoadScheduleLabels'
import { CircularProgress } from '@mui/material'

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
  const { data, loadData, loading } = useLoadScheduleLabels(false)
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

  const handleOpenLegendModal = (legend: any) => {
    setOpenLegendModal(true)
    setLegendSelected(legend)
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
            height="100%"
            dateClick={() => {
              setOpenModal(true)
            }}
          />
        </div>

        <div className="bg-light dark:bg-slate-800 rounded-xl w-60 flex flex-col items-start justify-between p-4">
          <div className="w-full h-full">
            <div className="flex justify-center w-full items-center ">
              <p className="text-center text-xl dark:text-white">Legendas</p>
            </div>
            {loading && (
              <div className="flex justify-center w-full h-full items-center">
                <CircularProgress
                  style={{ width: 30, height: 30, color: colors.primary }}
                />
              </div>
            )}

            {!loading && (
              <>
                <div className="flex flex-1 flex-col mt-6 gap-2 ">
                  {data?.map((leg, index) => (
                    <button
                      key={index}
                      className="flex items-center justify-start gap-2 transition-all duration-200 hover:bg-gray-200 hover:dark:bg-gray-600   rounded-md p-1"
                      onClick={() => {
                        handleOpenLegendModal(leg)
                      }}
                    >
                      <div
                        className="min-w-6 min-h-6 rounded shadow-sm"
                        style={{ backgroundColor: leg.color }}
                      />
                      <p className="m-0 text-sm font-light dark:text-white">
                        {leg.name}
                      </p>
                    </button>
                  ))}
                </div>
              </>
            )}
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
        loadNewData={loadData}
      />
    </>
  )
}

export default Calendar
