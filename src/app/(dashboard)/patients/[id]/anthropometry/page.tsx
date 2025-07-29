'use client'
import MenuConsult from '@/components/consult-components/menu'
import TopDash from '@/components/layoutComponents/topDash'
import TableConsult from '@/components/tablesComponents/tableConsult'
import useLoadAnthropometry from '@/hooks/nutritionists/useLoadAnthropometry'
import useLoadPatientByUUID from '@/hooks/nutritionists/useLoadPatientById'
import { Person } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { notFound } from 'next/navigation'
import PatientNotFound from '../../_components/PatientNotFound'
import { useCallback } from 'react'

interface PageProps {
  params: {
    id: string
  }
}

const AnthropometryPage = ({ params }: PageProps) => {
  const { data, loadData, loading } = useLoadAnthropometry(params.id, false)
  const {
    data: patientData,
    loadData: patientLoadData,
    loading: patientLoading,
  } = useLoadPatientByUUID(params.id)

  const LoadingData = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center flex-col justify-center py-6 gap-4 w-full">
        <CircularProgress className="dark:text-white text-primary text-2xl" />
        <p className="text-primary font-semibold dark:text-white">{label}</p>
      </div>
    )
  }

  if (patientLoading) {
    return <LoadingData label="Carregando dados do paciente..." />
  }

  if (!patientLoading && !patientData) {
    return <PatientNotFound />
  }

  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title={patientData?.name ?? 'Paciente'}
        description={''}
        icon={Person}
        href="/"
        textBtn="Nova antropometria"
      />
      <div className="h-full w-full flex gap-4">
        {loading ? (
          <LoadingData label="Carregando histórico de antropometria..." />
        ) : (
          <TableConsult rowKey="id" data={data} columns={[]} />
        )}

        <div className="h-full flex justify-end">
          <MenuConsult />
        </div>
      </div>
    </div>
  )
}

export default AnthropometryPage
