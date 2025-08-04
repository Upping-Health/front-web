'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'
import DashboardPatients from '@/interfaces/dashPatients.interface'
import { useCallback, useContext, useEffect, useState } from 'react'
type Results = {
  id: string
  title: string
  value?: string | number
}

const useLoadConsultResults = (values: AnthropometryFormValues) => {
  const [analysisResults, setanalysisResults] = useState<Results[]>([
    { id: '1', title: 'Altura', value: values.height },
    { id: '2', title: 'Peso', value: values.weight },
    { id: '3', title: 'Peso ideal', value: '23,5' },
    { id: '4', title: 'IMC', value: '23,5' },
    { id: '5', title: 'Relação cintura-quadril', value: '18%' },
    { id: '6', title: 'Gordura Corporal', value: '18%' },
    {
      id: '7',
      title: 'CMB (circunferência muscular do braço):',
      value: '18%',
    },
  ])

  const [bodyComposition, setbodyComposition] = useState<Results[]>([
    { id: '1', title: 'Referência escolhida', value: '1,75 m' },
    { id: '2', title: 'Percentual de gordura', value: '72 kg' },
    { id: '3', title: 'Peso de gordura', value: '23,5' },
    { id: '4', title: 'Peso ósseo', value: '23,5' },
    { id: '5', title: 'Massa magra', value: '18%' },
    { id: '6', title: 'Massa Livre de Gordura', value: '18%' },
    {
      id: '7',
      title: 'Densidade Corporal',
      value: '18%',
    },
    {
      id: '7',
      title: 'Somatório de dobras',
      value: '18%',
    },
  ])

  return { analysisResults, bodyComposition }
}

export default useLoadConsultResults
