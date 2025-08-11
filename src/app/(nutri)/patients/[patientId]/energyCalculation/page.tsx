'use client'
import MenuConsult from '@/components/consult/menu'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tablesComponents/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadAnthropometryByPatient from '@/hooks/nutritionists/useLoadAnthropometryByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import api from '@/services/api'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import { Person, PersonPinCircle } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import dateFormat from 'dateformat'
import { useRouter } from 'next/navigation'
import { useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import ButtonStyled from '@/components/buttons/button'
import CreateIcon from '@mui/icons-material/Create'
import loading from '@/components/layout/loading'
interface PageProps {
  params: {
    patientId: string
  }
}

const EnergyCalculationPage = ({ params }: PageProps) => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)

  const { data, loadData, loading } = useLoadAnthropometryByPatient(
    params.patientId,
    false,
  )
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const router = useRouter()

  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  const columns = useMemo(
    () => [
      {
        header: '#',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={row?.patient} />,
      },
      {
        header: 'Data da avaliação',
        field: 'evaluation_date',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy')
        },
      },
      {
        header: 'Data da atualização',
        field: 'updated_at',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy')
        },
      },
      {
        header: 'Observação',
        field: 'observations',
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => {
          return (
            <ButtonStyled
              icon={<CreateIcon />}
              onClick={() =>
                router.push(
                  `/patients/${params.patientId}/energyCalculation/${row.uuid}`,
                )
              }
              title={'Editar'}
              type="button"
              styles="bg-black h-[35px] px-3 text-sm shadow-md dark:bg-white dark:text-black"
            />
          )
        },
      },
    ],
    [],
  )

  console.log(data)
  const handleNewEnergyCalculation = async () => {
    setIsNavigating(true)

    console.log(patientData)
    try {
      const uuid = 'teste'

      if (uuid) {
        router.push(`/patients/${params.patientId}/energyCalculation/${uuid}`)
      } else {
        return onShowFeedBack(
          PreFeedBack.error('Erro ao criar antroprometria.'),
        )
      }
    } catch (error) {
      return onShowFeedBack(PreFeedBack.error('Erro ao criar antroprometria.'))
    } finally {
      setIsNavigating(false)
    }
  }

  if (patientLoading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <div
      className={'w-full h-full flex flex-col transition-opacity duration-300'}
    >
      <TopDash
        title={patientData?.name ?? 'Paciente'}
        description={`${Math.abs(Number(patientData?.age) || 0).toFixed(0)} anos, ${SEX_PT_BR[patientData?.gender ?? 'male']}`}
        icon={Person}
        onClick={handleNewEnergyCalculation}
        textBtn="Novo Cálculo Energético"
      />

      <div className="h-full w-full flex gap-4">
        {loading ? (
          <LoadingData label="Carregando histórico de cálculos energéticos..." />
        ) : (
          <TableDash search={false} rowKey="id" data={data} columns={columns} />
        )}

        <div className="h-full flex justify-end">
          <MenuConsult patientId={params.patientId} />
        </div>
      </div>

      <LoadingFullScreen open={isNavigating} labelLoading="Navegando..." />
    </div>
  )
}

export default EnergyCalculationPage
