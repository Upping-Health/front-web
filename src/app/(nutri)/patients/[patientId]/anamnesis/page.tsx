'use client'
import MenuConsult from '@/components/consult/menu'
import { HeaderButton } from '@/components/layout/headerDash'
import Loading from '@/components/layout/loading'
import LoadingFullScreen from '@/components/layout/loadingGlobal'
import TopDash from '@/components/layout/topDash'
import ProfileRounded from '@/components/profileRounded'
import TableDash from '@/components/tables/tableDash'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadSubmissionByPatient from '@/hooks/forms/useLoadSubmissionByPatient'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import PreFeedBack from '@/lib/feedbackStatus'
import { SEX_PT_BR } from '@/lib/types/sex'
import api from '@/services/api'
import { Delete, Person } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import dateFormat from 'dateformat'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useContext, useMemo, useState } from 'react'
import PatientNotFound from '../../_components/PatientNotFound'
import ButtonActive from '@/components/buttons/buttonActive'
import ModalConfirmation from '@/components/modals/ModalConfirmation'
import { LinkButton } from '@/components/buttons/linkButton'
interface PageProps {
  patientId: string
}

const AnamnesisPage = () => {
  const router = useRouter()
  const paramsRaw = useParams()
  const params = paramsRaw as unknown as PageProps
  const { onShowFeedBack } = useContext(DefaultContext)
  const [isNavigating, setIsNavigating] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<any | null>(null)

  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.patientId)

  const { data, loading, loadData } = useLoadSubmissionByPatient(
    params.patientId,
    'anamnesis',
    false,
  )

  const handleDeleteClick = (doc: any) => {
    setDocumentToDelete(doc)
    setOpenConfirm(true)
  }

  const onDeleteDoc = useCallback(
    async (document: any) => {
      try {
        await api.delete(`forms/submissions/delete/${document.uuid}`)
        loadData()
        onShowFeedBack(PreFeedBack.success('Anamnese excluída com sucesso!'))
      } catch (error: any) {
        const message = error?.response?.message || 'Erro ao excluir anamnese.'
        onShowFeedBack(PreFeedBack.error(message))
      }
    },
    [patientData, loadData, onShowFeedBack],
  )

  const columns = useMemo(
    () => [
      {
        header: 'Status',
        field: 'status',
        render(_: any, row: any) {
          return (
            <div
              className={`
              text-black
              h-[35px]
              px-3
              w-20
              rounded-6
              shadow-md
              font-semibold
              flex
              justify-center
              items-center
              transition
              duration-300
              text-xs
              ${row.status === 'submitted' ? 'bg-paid text-white' : 'bg-yellow-100 text-black'}
            `}
            >
              <p
                className={`${row.status === 'submitted' ? 'text-paidFont' : 'text-yellow-400'} font-semibold`}
              >
                {row.status === 'submitted' ? 'Submetido' : 'Rascunho'}
              </p>
            </div>
          )
        },
      },
      {
        header: 'Data da avaliação',
        field: 'created_at',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy hh:mm:ss')
        },
      },
      {
        header: 'Data da atualização',
        field: 'updated_at',
        render: (value: any) => {
          const date = new Date(value)
          return dateFormat(date, 'dd/mm/yyyy hh:mm:ss')
        },
      },
      {
        header: '#',
        field: '{row}',
        render: (_: any, row: any) => {
          return (
            <div className="flex gap-2">
              <LinkButton
                href={`/patients/${params.patientId}/anamnesis/${row.uuid}`}
              >
                <CreateIcon className="text-gray-600 text-lg dark:text-white" />
              </LinkButton>

              <HeaderButton onClick={() => handleDeleteClick(row)}>
                <Delete className="text-red text-xl" />
              </HeaderButton>
            </div>
          )
        },
      },
    ],
    [],
  )

  if (patientLoading) {
    return (
      <Loading text="Carregando dados do paciente..." className="!h-full" />
    )
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  const onSaveAnamnese = async () => {
    setIsNavigating(true)
    try {
      const get_form_response = await api.get('forms/type/anamnesis')
      const form = get_form_response?.data?.data
      console.log(form)
      const forms = form.fields.map((field: any) => ({
        field_id: field.uuid,
        value: null,
      }))

      const create_form_response = await api.post(
        `forms/submissions/store/${form.uuid}`,
        {
          client_id: '0ffa25d5-d557-4ea0-b1eb-a55817e76853',
          patient_id: params.patientId,
          answers: forms,
          submit: false,
        },
      )
      const uuid = create_form_response?.data?.data?.uuid
      if (uuid) {
        router.push(`/patients/${params.patientId}/anamnesis/${uuid}`)
      } else {
        return onShowFeedBack(PreFeedBack.error('Erro ao criar anamnese.'))
      }
    } catch (error) {
      return onShowFeedBack(PreFeedBack.error('Erro ao criar anamnese.'))
    } finally {
      setIsNavigating(false)
    }
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
          onClick={onSaveAnamnese}
          textBtn="Nova Anamnese"
        />

        <div className="h-full w-full flex gap-4">
          {loading ? (
            <Loading
              text="Carregando histórico de antropometria..."
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
          labelLoading="Criando anamnese..."
        />
      </div>

      <ModalConfirmation
        open={openConfirm}
        setIsClose={() => setOpenConfirm(false)}
        onConfirm={async () => {
          if (!documentToDelete) return
          await onDeleteDoc(documentToDelete)
        }}
      />
    </>
  )
}

export default AnamnesisPage
