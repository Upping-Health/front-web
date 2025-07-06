'use client'
import { useCallback, useContext, useMemo, useState } from 'react'

import ButtonActive from '@/components/buttonsComponents/buttonActive'
import ButtonIconStyled from '@/components/buttonsComponents/buttonIcon'
import TopDash from '@/components/layoutComponents/topDash'
import ModalPatient from '@/components/modals/ModalPatient'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tablesComponents/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import masks from '@/utils/masks/masks'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import ModalUser from '@/components/modals/ModalUser'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
const UsersContent = () => {
  const { user, onShowFeedBack, roles } = useContext(DefaultContext)
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Patient | null>(null)
  const { loadData, data, loading } = useLoadPatients(false)
  const router = useRouter()

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

  const onSuccessUpdate = () => {
    onShowFeedBack(
      PreFeedBack.success('Status do paciente atualizado com sucesso!'),
    )
  }

  const onErrorUpdate = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao atualizar status do paciente.'))
  }

  const changeStatus = useCallback(
    (row: Patient) => {
      if (!user) return
      const newStatus = row.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      api
        .put(`/patient/status/${user.id}/${row.id}?status=${newStatus}`)
        .then(() => {
          row.status = newStatus
          data.slice()
          onSuccessUpdate()
        })
        .catch((e: any) => onErrorUpdate(e))
    },
    [user],
  )

  const columns = useMemo(
    () => [
      {
        header: 'Foto',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={row?.patient} />,
      },
      {
        header: 'Nome',
        field: 'name',
      },
      {
        header: 'Email',
        field: 'email',
      },
      {
        header: 'CPF',
        field: 'document',
        render: (value: any, row: any) =>
          masks.cpfMask(value ?? '000000000000'),
      },
      {
        header: 'Telefone',
        field: 'phone',
        render: (value: any) => masks.phoneMask(value ?? '00000000000'),
      },
      {
        header: 'Gênero',
        field: 'gender',
        render: (value: any) =>
          value === 'male'
            ? 'Masculino'
            : value === 'female'
              ? 'Feminino'
              : 'Outros',
      },
      {
        header: 'Status',
        field: 'status',
        render: (value: any, row: any) => (
          <ButtonActive
            active={row.status === 1}
            onClick={() => changeStatus(row)}
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
            icon={
              <AssignmentIndIcon
                style={{
                  color: colors.white,
                  fontSize: 20,
                }}
              />
            }
            styles="h-8 w-8 bg-terciary"
          />
        ),
      },
    ],
    [toogleModalOpenWithData, changeStatus],
  )

  return (
    <>
      <div className="w-full relative">
        <TopDash
          title="Usuários"
          description="Cadastre colaboradores para facilitar o controle do sistema."
          icon={SupervisorAccountOutlinedIcon}
          onClick={toggleModalOpen}
          textBtn="Novo Usuário"
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

      <ModalUser
        open={openModal}
        setIsClose={toggleModalOpen}
        loadData={loadData}
        userSelected={dataSelected}
      />
    </>
  )
}

export default UsersContent
