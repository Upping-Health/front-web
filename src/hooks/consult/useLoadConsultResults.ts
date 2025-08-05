'use client'

import { useMemo } from 'react'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'
import { METHOD_PT_BR } from '@/utils/types/body-method'
import CalculateBodyFatPercentag from '@/utils/calculate-body'
import Patient from '@/interfaces/patient.interface'

type Results = {
  title: string
  value?: string | number
  note?: string
}

type Gender = 'male' | 'female'

const useLoadConsultResults = (
  values: AnthropometryFormValues,
  patient: Patient | null,
) => {
  const fatCalculator = useMemo(() => new CalculateBodyFatPercentag(), [])

  const analysisResults = useMemo<Results[]>(() => {
    const alturaM = values?.height ? values.height / 100 : 0
    const peso = values?.weight ?? 0

    const imc = alturaM > 0 ? (peso / alturaM ** 2).toFixed(1) : 'N/A'
    const pesoIdealMin = alturaM > 0 ? (18.5 * alturaM ** 2).toFixed(1) : 'N/A'
    const pesoIdealMax = alturaM > 0 ? (24.9 * alturaM ** 2).toFixed(1) : 'N/A'
    const pesoIdeal =
      alturaM > 0 ? `${pesoIdealMin} a ${pesoIdealMax} kg` : 'N/A'

    const cintura = values?.body_circumference?.waist ?? 0
    const quadril = values?.body_circumference?.hip ?? 1
    const relCinturaQuadrilValue = (cintura / quadril).toFixed(2)

    let rcqInterpretation = ''
    if (patient?.gender === 'male') {
      rcqInterpretation =
        parseFloat(relCinturaQuadrilValue) < 0.9 ? 'Normal' : 'Alto risco'
    } else {
      rcqInterpretation =
        parseFloat(relCinturaQuadrilValue) < 0.85 ? 'Normal' : 'Alto risco'
    }

    const bracoRel = values?.body_circumference?.relaxed_right_arm ?? 0
    const triceps = values?.skin_fold?.triceps ?? 0
    const cmb = (bracoRel - (3.14 * triceps) / 10).toFixed(1)

    return [
      { title: 'Altura', value: alturaM ? `${alturaM.toFixed(2)} m` : 'N/A' },
      { title: 'Peso', value: peso ? `${peso.toFixed(1)} kg` : 'N/A' },
      { title: 'Peso ideal', value: pesoIdeal },
      { title: 'IMC', value: imc },
      {
        title: 'Relação cintura-quadril',
        value: relCinturaQuadrilValue,
        note: rcqInterpretation,
      },
      {
        title: 'Gordura Corporal',
        value:
          values?.body_fat_percentage !== undefined
            ? `${values.body_fat_percentage}%`
            : 'N/A',
      },
      { title: 'CMB (circunferência muscular do braço)', value: `${cmb} cm` },
    ]
  }, [
    values.height,
    values.weight,
    values.body_circumference?.waist,
    values.body_circumference?.hip,
    values.body_circumference?.relaxed_right_arm,
    values.skin_fold?.triceps,
    values.body_fat_percentage,
    patient?.gender,
  ])

  const bodyComposition = useMemo<Results[]>(() => {
    const peso = values?.weight ?? 0
    const dobras = values?.skin_fold || {}
    const idade = patient?.age ?? 25
    const metodo = values?.body_fat_method || 'nenhuma'

    let gorduraPercent = values?.body_fat_percentage ?? 0

    if (metodo !== 'nenhuma' && patient?.gender !== 'other') {
      const percentualCalculado = fatCalculator.calculateBodyFatPercentage(
        metodo,
        patient?.gender as Gender,
        idade,
        dobras,
      )
      if (percentualCalculado !== null && !isNaN(percentualCalculado)) {
        gorduraPercent = parseFloat(percentualCalculado.toFixed(1))
      }
    }

    const musculoPercent = values?.muscle_mass_percentage ?? 0

    const pesoGordura = ((gorduraPercent / 100) * peso).toFixed(1)
    const pesoMusculo = ((musculoPercent / 100) * peso).toFixed(1)
    const massaLivreGordura = (peso - parseFloat(pesoGordura)).toFixed(1)

    const somaDobras = (
      (dobras?.triceps ?? 0) +
      (dobras?.biceps ?? 0) +
      (dobras?.subscapular ?? 0) +
      (dobras?.midaxillary ?? 0) +
      (dobras?.suprailiac ?? 0) +
      (dobras?.abdominal ?? 0) +
      (dobras?.thigh ?? 0) +
      (dobras?.chest ?? 0)
    ).toFixed(1)

    const methodReference = METHOD_PT_BR[metodo] || 'Não informado'

    let gorduraInterpretation = ''
    if (patient?.gender === 'male') {
      if (gorduraPercent < 6) gorduraInterpretation = 'Muito baixo'
      else if (gorduraPercent <= 13) gorduraInterpretation = 'Baixo'
      else if (gorduraPercent <= 17) gorduraInterpretation = 'Normal'
      else if (gorduraPercent <= 24) gorduraInterpretation = 'Alto'
      else gorduraInterpretation = 'Muito alto'
    } else {
      if (gorduraPercent < 14) gorduraInterpretation = 'Muito baixo'
      else if (gorduraPercent <= 20) gorduraInterpretation = 'Baixo'
      else if (gorduraPercent <= 24) gorduraInterpretation = 'Normal'
      else if (gorduraPercent <= 31) gorduraInterpretation = 'Alto'
      else gorduraInterpretation = 'Muito alto'
    }

    return [
      { title: 'Referência escolhida', value: methodReference },
      {
        title: 'Percentual de gordura',
        value: `${gorduraPercent}%`,
        note: gorduraInterpretation,
      },
      { title: 'Peso de gordura', value: `${pesoGordura} kg` },
      { title: 'Peso ósseo', value: 'N/A' },
      { title: 'Massa magra', value: `${pesoMusculo} kg` },
      { title: 'Massa Livre de Gordura', value: `${massaLivreGordura} kg` },
      { title: 'Densidade Corporal', value: 'N/A' },
      { title: 'Somatório de dobras', value: `${somaDobras} mm` },
    ]
  }, [
    values.weight,
    values.body_fat_percentage,
    values.muscle_mass_percentage,
    values.skin_fold?.triceps,
    values.skin_fold?.biceps,
    values.skin_fold?.subscapular,
    values.skin_fold?.midaxillary,
    values.skin_fold?.suprailiac,
    values.skin_fold?.abdominal,
    values.skin_fold?.thigh,
    values.skin_fold?.chest,
    values.body_fat_method,
    patient?.age,
    patient?.gender,
    fatCalculator,
  ])

  return { analysisResults, bodyComposition }
}

export default useLoadConsultResults
