'use client'
import { useCallback, useState } from 'react'

import TopDash from '@/components/topDash'
import Patient from '@/interfaces/patient.interface'
import { colors } from '@/utils/colors/colors'
import { CircularProgress } from '@mui/material'

import CalendarComponent from '@/components/calendar'
import ModalAgenda from '@/components/modals/ModalAgenda'
import useLoadSchedule from '@/hooks/nutritionists/useLoadSchedule'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

const AgendaContent = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Patient | null>(null)
  const { loadData, data, loading } = useLoadSchedule(false)

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
    setDataSelected(null);
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
      <div className="w-full relative">
        <TopDash
          title="Agenda"
          description="Acompanhe e organize seus compromissos com agilidade e precisão."
          icon={CalendarMonthOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Agendamento"
        />

        {loading ? (
          <>
            <div className="flex h-3/4 justify-center w-full items-center">
              <CircularProgress
                style={{ width: 80, height: 80, color: colors.primary }}
              />
            </div>
          </>
        ) : (
          <>
            <CalendarComponent schedule={data} loadNewData={loadData} />
          </>
        )}
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
