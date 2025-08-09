'use client'
import { useCallback, useState } from 'react'

import TopDash from '@/components/layout/topDash'
import Patient from '@/interfaces/patient.interface'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'

import CalendarComponent from '@/app/(dashboard)/schedule/_components/Calendar'
import ModalAgenda from '@/app/(dashboard)/schedule/_components/ModalAgenda'
import useLoadSchedule from '@/hooks/nutritionists/useLoadSchedule'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import useLoadClientSettings from '@/hooks/clients/useLoadClientSettings'

const AgendaContent = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Patient | null>(null)
  const { loadData, data, loading } = useLoadSchedule(false)
  const { data: settings, loading: loadingSettings } =
    useLoadClientSettings(false)

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
    setDataSelected(null)
  }, [openModal])

  const toogleModalOpenWithData = useCallback(
    (row: Patient) => {
      setDataSelected(row)
      setOpenModal(true)
    },
    [toggleModalOpen],
  )

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
