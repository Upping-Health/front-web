'use client'
import { useCallback, useContext, useMemo, useState } from 'react'

import ModalUser from '@/app/(dashboard)/users/_components/ModalUser'
import ButtonActive from '@/components/buttonsComponents/buttonActive'
import TopDash from '@/components/layoutComponents/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tablesComponents/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadUsers from '@/hooks/users/useLoadUsers'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import PreFeedBack from '@/utils/feedbackStatus'
import masks from '@/utils/masks/masks'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ROLE_PTBR } from '@/utils/types/roles'

const UsersContent = () => {
  const { user, onShowFeedBack } = useContext(DefaultContext)
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<Patient | null>(null)
  const { loadData, data, loading } = useLoadUsers(false)
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

  console.log(data)

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
        header: 'Função',
        field: 'role',
        render: (value: any, row: any) => ROLE_PTBR[row?.role?.name],
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
    ],
    [toogleModalOpenWithData, changeStatus, ROLE_PTBR],
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
