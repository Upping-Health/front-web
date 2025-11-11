'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadEnergyCalculationByPatient from '@/hooks/nutritionists/energyCalculation/useLoadEnergyByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import api from '@/services/api'
import { Person } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import { CircularProgress } from '@mui/material'
import dateFormat from 'dateformat'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import DeleteIcon from '@mui/icons-material/Delete'
import Loading from '@/components/layout/loading'
import { LinkButton } from '@/components/buttons/linkButton'

interface PageProps {
  patientId: string
}

const EnergyCalculationPage = () => {
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps

  const [openConfirm, setOpenConfirm] = useState(false)
  const [documentToDelete, setDocumentToDelete] =
    useState<EnergyCalculation | null>(null)

  const { data, loadData, loading } = useLoadEnergyCalculationByPatient(
    params.patientId,
    false,
  )
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const router = useRouter()

  const handleNewEnergyCalculation = async () => {
    setIsNavigating(true)

    console.log(patientData)
    // router.push(`/patients/${params.patientId}/energyCalculation/uuid`)

    try {
      const response = await api.post('/energycalculations/store', {
        formula: 'harris_benedict_1984',
        weight: 1,
        height: 50,
        age: 30,
        gender: 'male',
        activity_factor: 1.9,
        injury_factor: 1.3,
        met_adjustment: 189,
        met_time: 30,
        met_factor: 2.0,
        patient_id: params.patientId,
      })

      const uuid = response?.data?.data?.calculation?.uuid

      console.log(response?.data)
      if (uuid) {
        router.push(`/patients/${params.patientId}/energyCalculation/${uuid}`)
      } else {
        return onShowFeedBack(
          PreFeedBack.error('Erro ao criar cálculo energético.'),
        )
      }
    } catch (error: any) {
      const message =
        error?.response?.message || 'Erro ao criar cálculo energético.'
      return onShowFeedBack(PreFeedBack.error(message))
    } finally {
      setIsNavigating(false)
    }
  }

  const handleDeleteClick = (doc: EnergyCalculation) => {
    setDocumentToDelete(doc)
    setOpenConfirm(true)
  }

  const onDeleteEnergyCalculation = useCallback(
    async (document: EnergyCalculation) => {
      try {
        await api.delete(`energycalculations/destroy/${document.uuid}`)
        loadData()
        onShowFeedBack(
          PreFeedBack.success('Cálculo energético excluído com sucesso!'),
        )
      } catch (error: any) {
        const message =
          error?.response?.message || 'Erro ao excluir Cálculo energético.'
        onShowFeedBack(PreFeedBack.error(message))
      }
    },
    [patientData, loadData, onShowFeedBack],
  )

  const columns = useMemo(
    () => [
      {
        header: '#',
        field: 'photo',
        render: (_: any, row: any) => <ProfileRounded user={patientData} />,
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
            <div className="flex gap-2">
              <LinkButton
                href={`/patients/${params.patientId}/energyCalculation/${row.uuid}`}
              >
                <CreateIcon className="text-gray-600 text-lg dark:text-white" />
              </LinkButton>

              <HeaderButton onClick={() => handleDeleteClick(row)}>
                <DeleteIcon className="text-red text-xl" />
              </HeaderButton>
            </div>
          )
        },
      },
    ],
    [patientData, handleDeleteClick],
  )

  if (patientLoading) {
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <>
      <div
        className={
          'w-full h-full flex flex-col transition-opacity duration-300'
        }
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
            <Loading
              text="Carregando histórico de cálculos energéticos..."
              className="!h-full w-full"
            />
          ) : (
            <TableDash
              search={false}
              rowKey="id"
              data={data}
              columns={columns}
            />
          )}

          <div className="h-full flex justify-end">
            <MenuConsult patientId={params.patientId} />
          </div>
        </div>

        <LoadingFullScreen
          open={isNavigating}
          labelLoading="Criando cálculo energético..."
        />
      </div>

      <ModalConfirmation
        open={openConfirm}
        setIsClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!documentToDelete) return
          await onDeleteEnergyCalculation(documentToDelete)
        }}
      />
    </>
  )
}

export default EnergyCalculationPage
