'use client'

import AnalysesResults from '@/app/(nutri)/patients/_components/AnalysisResults'
import useLoadEnergyCalculationResults from '@/hooks/nutritionists/energyCalculation/useLoadEnergyResults'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import Patient from '@/interfaces/patient.interface'
import { memo } from 'react'

type AnalysisSidebarProps = {
  values: Partial<EnergyCalculation>
  patient: Patient | null
}

const AnalysisEnergyCalculatonSidebar = ({
  values,
  patient,
}: AnalysisSidebarProps) => {
  const { results } = useLoadEnergyCalculationResults(values, patient)
  console.log(results)

  return (
    <aside className="flex flex-col gap-4">
      <AnalysesResults data={results} title="Análises e Resultados" />
      {/* <AnalysesResults data={analysisResults} title="Análises e resultados" />

      <AnalysesResults data={bodyComposition} title="Composição corporal" /> */}
    </aside>
  )
}

export default memo(AnalysisEnergyCalculatonSidebar)
