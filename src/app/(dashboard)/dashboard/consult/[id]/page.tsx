'use client'
import TopDash from '@/components/topDash'
import useLoadPatientById from '@/hooks/nutritionists/useLoadPatientById'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import AddIcon from '@mui/icons-material/Add'
import AutocompleteStyled from '@/components/autoCompleteStyled'
import Person from '@mui/icons-material/Person'
import { colors } from '@/utils/colors/colors'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import { useContext, useEffect, useMemo, useState } from 'react'
import ModalAgenda from '@/components/modals/ModalAgenda'
import ModalSelectPatient from '@/components/modals/ModalSelectPatient'
import api from '@/services/api'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/utils/feedbackStatus'
import Patient from '@/interfaces/patient.interface'
import CardProfile from '@/components/cardProfile'
import ProfileRounded from '@/components/profileRounded'
import { CircularProgress } from '@mui/material'
import ButtonActive from '@/components/buttonActive'
import TooltipStyled from '@/components/tooltipStyled'
import CardPatients from '@/components/cardPatients'

const ConsultPageId = ({ params }: { params: { id: string } }) => {
  const mock = [
    {
      name: 'Diana',
      year: '32',
      totalConsults: 3,
      last_consult: '15/11/2024',
      peso: '68kg',
      IMC: 'ff',
    },


  ]
  const [loading, setloading] = useState<boolean>(false)


  return (
    <div className="w-full relative">
      <TopDash
        title="Iniciar consulta"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={AddIcon}
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
        <div className="flex items-center justify-center mt-4">
            <CardPatients data={mock}/>
        </div>
      )}

      {/* <ModalSelectPatient
        open={openSelectPatient}
        setIsClose={() => setOpenSelectPatient(false)}
        patientId={patientId}
        setPatientId={setPatientId}
      /> */}
    </div>
  )
}

export default ConsultPageId
