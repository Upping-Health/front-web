'use client'

import { useMemo } from 'react'
import { AnthropometryFormValues } from '@/interfaces/anthroprometryFormValues.interface'
import { METHOD_PT_BR } from '@/lib/types/body-method'
import CalculateBodyFatPercentag from '@/lib/calculates/calculate-body'
import Patient from '@/interfaces/patient.interface'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import { EnergyCalculationService } from '@/lib/calculates/energy-calculation'

type Results = {
  title: string
  value?: string | number
  note?: string
}

type Gender = 'male' | 'female'

const useLoadEnergyCalculationResults = (
  values: Partial<EnergyCalculation>,
  patient: Patient | null,
) => {
  const results: Results[] = useMemo(() => {
    const energyCalculatonService = new EnergyCalculationService()

    const result = energyCalculatonService.calculate({
      ...values,
      age: patient?.age ?? 0,
    })

    return [
      {
        title: 'Taxa metabólica basal',
        value: Number.isFinite(result?.bmr)
          ? `${result.bmr} Kcal/dia`
          : '0 Kcal/dia',
      },
      {
        title: 'Gasto Energético Total',
        value: Number.isFinite(result?.tdee)
          ? `${result.tdee} Kcal/dia`
          : '0 Kcal/dia',
      },
    ]
  }, [values, patient])

  return { results }
}

export default useLoadEnergyCalculationResults
