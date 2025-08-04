'use client'

import React, { useMemo } from 'react'
import { CollapsibleSection } from '../CollapsibleSection'
import AnalysesResults from '../AnalysisResults'

type AnalysisSidebarProps = {}
type AnalysisResult = {
  id: string
  title: string
  value?: string | number
}

export default function AnalysisSidebar({}: AnalysisSidebarProps) {
  const data: AnalysisResult[] = useMemo(
    () => [
      { id: '1', title: 'Altura', value: '1,75 m' },
      { id: '2', title: 'Peso', value: '72 kg' },
      { id: '3', title: 'Peso ideal', value: '23,5' },
      { id: '4', title: 'IMC', value: '23,5' },
      { id: '5', title: 'Relação cintura-quadril', value: '18%' },
      { id: '6', title: 'Gordura Corporal', value: '18%' },
      {
        id: '7',
        title: 'CMB (circunferência muscular do braço):',
        value: '18%',
      },
    ],
    [],
  )
  return (
    <aside className="w-2/4">
      <AnalysesResults data={data} title="Análises e resultados" />
    </aside>
  )
}
