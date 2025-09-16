'use client'
import { useCallback, useState } from 'react'

import TopDash from '@/components/layout/topDash'

import CalendarComponent from '@/app/(nutri)/schedule/_components/Calendar'
import ModalAgenda from '@/app/(nutri)/schedule/_components/ModalAgenda'
import useLoadClientSettings from '@/hooks/clients/useLoadClientSettings'
import useLoadSchedule from '@/hooks/nutritionists/useLoadSchedule'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

const AgendaContent = () => {
  const [openModal, setOpenModal] = useState(false)
  const { loadData, data, loading } = useLoadSchedule(false)
  const { data: settings, loading: loadingSettings } =
    useLoadClientSettings(false)

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
  }, [openModal])

  return (
    <>
      <div className="w-full flex flex-col ">
        <TopDash
          title="Agenda"
          description="Acompanhe e organize seus compromissos com agilidade e precisão."
          icon={CalendarMonthOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Agendamento"
        />

        <CalendarComponent
          loadingCalendar={loading || loadingSettings}
          schedule={data}
          loadNewData={loadData}
          clientSettings={settings}
        />
      </div>

      <ModalAgenda
        open={openModal}
        setIsClose={toggleModalOpen}
        scheduleSelected={null}
        loadNewData={loadData}
      />
    </>
  )
}

export default AgendaContent
