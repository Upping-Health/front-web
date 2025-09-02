'use client'

import useLoadAnthropometryResults from '@/hooks/nutritionists/anthropometry/useLoadAnthropometryResults'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import Patient from '@/interfaces/patient.interface'
import AnalysesResults from '../../../../_components/AnalysisResults'
import { memo } from 'react'

type AnalysisSidebarProps = {
  values: AnthropometryFormValues
  patient: Patient | null
}

const AnalysisSidebar = ({ values, patient }: AnalysisSidebarProps) => {
  const { analysisResults, bodyComposition } = useLoadAnthropometryResults(
    values,
    patient,
  )

  return (
    <aside className="flex flex-col gap-4">
      <AnalysesResults data={analysisResults} title="Análises e resultados" />

      <AnalysesResults data={bodyComposition} title="Composição corporal" />
    </aside>
  )
}

export default memo(AnalysisSidebar)
