'use client'
import { useCallback, useContext, useMemo, useState } from 'react'

import ModalUser from '@/app/(nutri)/users/_components/ModalUser'
import ButtonActive from '@/components/buttons/buttonActive'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadUsers from '@/hooks/users/useLoadUsers'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { colors } from '@/lib/colors/colors'
import PreFeedBack from '@/lib/feedbackStatus'
import masks from '@/lib/masks/masks'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ROLE_PTBR } from '@/lib/types/roles'
import { User } from '@/interfaces/user.interface'
import Loading from '@/components/layout/loading'

const UsersContent = () => {
  const { user, onShowFeedBack } = useContext(DefaultContext)
  const [openModal, setOpenModal] = useState(false)
  const [dataSelected, setDataSelected] = useState<User | null>(null)
  const { loadData, data, loading } = useLoadUsers(false)

  const toggleModalOpen = useCallback(() => {
    setOpenModal(!openModal)
    setDataSelected(null)
  }, [openModal])

  const toogleModalOpenWithData = useCallback(
    (row: User) => {
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
    const errorMessage =
      e?.response?.message || 'Falhou ao atualizar status do paciente.'
    onShowFeedBack(PreFeedBack.error(errorMessage))
  }

  const changeStatus = useCallback(
    (row: Patient) => {
      if (!user) return
      const newStatus = row.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      // api
      //   .put(`/patient/status/${user.uuid}/${row.uuid}?status=${newStatus}`)
      //   .then(() => {
      //     row.status = newStatus
      //     data.slice()
      //     onSuccessUpdate()
      //   })
      //   .catch((e: any) => onErrorUpdate(e))
    },
    [user],
  )

  const columns = useMemo(
    () => [
      {
        header: 'Foto',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={row} />,
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
          value ? masks.cpfMask(value) : 'N/A',
      },
      {
        header: 'Telefone',
        field: 'phone',
        render: (value: any) => (value ? masks.phoneMask(value) : 'N/A'),
      },
      {
        header: 'Gênero',
        field: 'gender',
        render: (value: any) =>
          value === 'male'
            ? 'Masculino'
            : value === 'female'
              ? 'Feminino'
              : 'N/A',
      },
      {
        header: 'Função',
        field: 'role',
        render: (value: any, row: any) => ROLE_PTBR[row?.role],
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
            <Loading text="Carregando usuários..." className="!h-3/4" />
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
