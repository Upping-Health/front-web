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

  return (
    <>
      <Wrapper>
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
            title: e.patientName,
            start: e.start_time,
            end: e.end_time,
            extendedProps: {
              ...e,
            },
          }))}
          eventClick={handleEventClick}
          height="auto"
        />
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
