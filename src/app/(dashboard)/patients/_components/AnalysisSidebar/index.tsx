'use client'

import useLoadConsultResults from '@/hooks/consult/useLoadConsultResults'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'
import Patient from '@/interfaces/patient.interface'
import AnalysesResults from '../AnalysisResults'

type AnalysisSidebarProps = {
  values: AnthropometryFormValues
  patient: Patient | null
}

export default function AnalysisSidebar({
  values,
  patient,
}: AnalysisSidebarProps) {
  const { analysisResults, bodyComposition } = useLoadConsultResults(
    values,
    patient,
  )
  return (
    <aside className="w-2/4 flex flex-col gap-4">
      <AnalysesResults data={analysisResults} title="Análises e resultados" />

      <AnalysesResults data={bodyComposition} title="Composição corporal" />
    </aside>
  )
}
