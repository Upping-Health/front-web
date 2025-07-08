// components/FullCalendarComponent.tsx
import Schedule from '@/interfaces/schedule.interface'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useRef, useState } from 'react'
import Wrapper from '../layoutComponents/wrapper'
import ModalAgenda from '../modals/ModalAgenda'
import './calendar-custom.css'
import ButtonStyled from '../buttonsComponents/button'
import AddIcon from '@mui/icons-material/Add'
import { colors } from '@/utils/colors/colors'
const Calendar = ({
  schedule,
  loadNewData,
}: {
  schedule: Schedule[]
  loadNewData: () => Promise<void>
}) => {
  const [scheduleSelected, setScheduleSelected] = useState<Schedule | null>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const calendarRef = useRef<FullCalendar | null>(null)

  const handleEventClick = (arg: EventClickArg) => {
    setOpenModal(true)
    setScheduleSelected(arg?.event?.extendedProps as Schedule)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setScheduleSelected(null)
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
              onClick={() => {}}
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
    </>
  )
}

export default Calendar
