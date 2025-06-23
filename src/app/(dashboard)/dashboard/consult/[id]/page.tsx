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

const ConsultPageId = ({ params }: { params: { id: string } }) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [openSelectPatient, setOpenSelectPatient] = useState<boolean>(false)
  const [patientSelected, setpatientSelected] = useState<Patient | null>(null)
  const [patientId, setPatientId] = useState<number | null>(null)
  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    if (isNaN(Number(params.id))) {
      setOpenSelectPatient(true)
    } else {
      setPatientId(Number(params.id))
    }
  }, [params.id])

  useEffect(() => {
    setloading(true)
    if (!isNaN(Number(patientId)) && patientId !== null) {
      api
        .get(`/patient/${patientId}`)
        .then((response) => {
          console.log(response)
          setpatientSelected(response?.data?.data ?? null)
          if (!response?.data?.data) {
            setOpenSelectPatient(true)
          }
        })
        .catch(() =>
          onShowFeedBack(
            PreFeedBack.error('Falhou ao buscar dados do paciente.'),
          ),
        )
        .finally(() => setloading(false))
    }
  }, [patientId])

  return (
    <div className="w-full relative">
      <TopDash
        title="Iniciar consulta"
        description="Acompanhe e gerencie seus pacientes com facilidade."
        icon={AddIcon}
      />

      {loading && !patientSelected ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.primary }}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center mt-4">
          <TooltipStyled
            title='Trocar paciente'
          >
            <button className="bg-white flex items-center p-5 rounded-xl shadow w-[400px]"
              onClick={() => setOpenSelectPatient(true)}
            >
              <ProfileRounded height={100} width={100} styles={'w-20 h-20'} />

              <div className='flex items-center justify-between w-[80%]'>
                <div className="mx-4 flex flex-col">
                  <p className="text-black text-start font-semibold">
                    {patientSelected?.name ?? ''}
                  </p>
                  <p className="text-black  text-start font-extralight">
                    {'Paciente'}
                  </p>
                </div>

                <ButtonActive active={patientSelected?.status === 'ACTIVE'} />

              </div>
            </button>
          </TooltipStyled>
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
