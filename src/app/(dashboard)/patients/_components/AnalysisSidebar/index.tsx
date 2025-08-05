'use client'

import React, { useMemo } from 'react'
import { CollapsibleSection } from '../CollapsibleSection'
import AnalysesResults from '../AnalysisResults'
import useLoadConsultResults from '@/hooks/consult/useLoadConsultResults'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'

type AnalysisSidebarProps = {
  values: AnthropometryFormValues
}

export default function AnalysisSidebar({ values }: AnalysisSidebarProps) {
  const { analysisResults, bodyComposition } = useLoadConsultResults(values)
  return (
    <aside className="w-2/4 flex flex-col gap-4">
      <AnalysesResults data={analysisResults} title="Análises e resultados" />

      <AnalysesResults data={bodyComposition} title="Composição corporal" />
    </aside>
  )
}
