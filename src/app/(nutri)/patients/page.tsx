'use client'
import { useCallback, useContext, useMemo, useState } from 'react'

import ModalPatient from '@/app/(nutri)/patients/_components/ModalPatient'
import ButtonActive from '@/components/buttons/buttonActive'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadPatients from '@/hooks/nutritionists/useLoadPatients'
import Patient from '@/interfaces/patient.interface'
import { colors } from '@/lib/colors/colors'
import PreFeedBack from '@/lib/feedbackStatus'
import masks from '@/lib/masks/masks'
import api from '@/services/api'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Loading from '@/components/layout/loading'

const PacientesContent = () => {
  const { user, onShowFeedBack } = useContext(DefaultContext)
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
    const message =
      e?.response?.message || 'Falhou ao atualizar status do paciente.'
    onShowFeedBack(PreFeedBack.error(message))
  }

  const changeStatusPatient = useCallback(
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
        noExport: true,
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
        render: (value: any) =>
          value ? masks.phoneMask(value ?? '00000000000') : 'N/A',
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
        header: 'Status',
        field: 'status',
        render: (value: any, row: any) => (
          <ButtonActive
            active={row.status}
            onClick={() => changeStatusPatient(row)}
          />
        ),
        noExport: true,
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => (
          <Link
            href={`/patients/${row.uuid}/anthropometry`}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-6 shadow-md transition-all duration-300 h-[35px] max-w-[120px]"
          >
            <AssignmentIndIcon style={{ fontSize: 20 }} />
            <span>Consulta</span>
          </Link>
        ),
        noExport: true,
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
            <Loading text="Carregando pacientes..." className="!h-3/4" />
          </>
        ) : (
          <TableDash
            columns={columns}
            data={data}
            rowKey="id"
            defaultSort={{
              field: 'name',
              direction: 'asc',
            }}
          />
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
