'use client'
import { useCallback, useContext, useMemo, useState } from 'react'

import ButtonActive from '@/components/buttonActive'
import ModalPatient from '@/components/modals/ModalPatient'
import TableDash from '@/components/tableDash'
import TopDash from '@/components/topDash'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import Patient from '@/interfaces/patient.interface'
import { colors } from '@/utils/colors/colors'
import masks from '@/utils/masks/masks'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ButtonStyled from '@/components/button'
import ButtonIconStyled from '@/components/buttonIcon'
import ProfileRounded from '@/components/profileRounded'
import api from '@/services/api'
import { DefaultContext } from '@/contexts/defaultContext'
import PreFeedBack from '@/utils/feedbackStatus'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const PacientesContent = () => {
  const {user, onShowFeedBack} = useContext(DefaultContext)
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Patient | null>(null)
  const { loadData, data, loading } = useLoadPatients(false)
  const router = useRouter()

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

  const onSuccessUpdate = () => {
    onShowFeedBack(PreFeedBack.success('Status do paciente atualizado com sucesso!'))
  }

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao atualizar status do paciente.'))

  }

  const changeStatusPatient = useCallback((row: Patient) => {
    if(!user) return;
    const newStatus = row.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    api
      .put(`/patient/status/${user.id}/${row.id}?status=${newStatus}`)
      .then(() => {
        row.status = newStatus;
        data.slice()
        onSuccessUpdate();
      })
      .catch((e: any) => onErrorUpdate(e))
  },[user])

  const columns = useMemo(
    () => [
      {
        header: 'Foto',
        field: 'photo',
        render: (_: any, row: any)  => <ProfileRounded user={row} />
      },
      {
        header: 'Nome',
        field: 'name',
      },
      {
        header: 'Email',
        field: 'email'
      },
      {
        header: 'CPF',
        field: 'cpf',
        render: (value: any) => masks.cpfMask(value),
      },
      {
        header: 'Telefone',
        field: 'phone',
        render: (value: any) => masks.phoneMask(value ?? '00000000000'),
      },
      {
        header: 'Gênero',
        field: 'gender',
        render: (value: any,) => value === 'MALE' ? 'Masculino' : value === 'FEMALE' ? 'Feminino' : 'Outros',
      },
      {
        header: 'Status',
        field: 'status',
        render: (value: any, row: any) => (
          <ButtonActive 
            active={value === 'ACTIVE'} 
            onClick={() => changeStatusPatient(row)}

          />
      
        ),
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => (
          <ButtonIconStyled
            onClick={() => toogleModalOpenWithData(row)}
            type="button"
            icon={<AssignmentIndIcon  style={{
              color: colors.white,
              fontSize: 20}} />}
            styles="h-8 w-8 bg-terciary"
  
          />
        ),
      },
    ],
    [toogleModalOpenWithData, changeStatusPatient],
  )

  return (
    <>
      <div className="w-full relative">
        <TopDash
          title="Pacientes"
          description="Acompanhe e gerencie seus pacientes com facilidade."
          icon={GroupsOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Paciente"
          btnIcon={PersonAddAlt1Icon}
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
            <TableDash columns={columns} data={data} rowKey="id" />
        
        )}
      </div>

      <ModalPatient
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
        patientSelected={dataSelected}
        
      />
    </>
  )
}

export default PacientesContent
