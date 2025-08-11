'use client'

import useLoadConsultResults from '@/hooks/consult/useLoadConsultResults'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import Patient from '@/interfaces/patient.interface'
import AnalysesResults from '../../../../_components/AnalysisResults'
import { memo } from 'react'

type AnalysisSidebarProps = {
  values: AnthropometryFormValues
  patient: Patient | null
}

const AnalysisEnergyCalculatonSidebar = ({
  values,
  patient,
}: AnalysisSidebarProps) => {
  const { analysisResults, bodyComposition } = useLoadConsultResults(
    values,
    patient,
  )

  return (
    <aside className="flex flex-col gap-4">
      {/* <AnalysesResults data={analysisResults} title="Análises e resultados" />

      <AnalysesResults data={bodyComposition} title="Composição corporal" /> */}
    </aside>
  )
}

export default memo(AnalysisEnergyCalculatonSidebar)
