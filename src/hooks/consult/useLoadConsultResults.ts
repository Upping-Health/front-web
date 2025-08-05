'use client'
import { useMemo } from 'react'
import { AnthropometryFormValues } from '@/interfaces/anthroprometry.interface'
import { METHOD_PT_BR } from '@/utils/types/body-method'

type Results = {
  title: string
  value?: string | number
}

const useLoadConsultResults = (values: AnthropometryFormValues) => {
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
    const relCinturaQuadril = (cintura / quadril).toFixed(2)

    const bracoRel = values?.body_circumference?.relaxed_right_arm ?? 0
    const triceps = values?.skin_fold?.triceps ?? 0
    const cmb = (bracoRel - (3.14 * triceps) / 10).toFixed(1)

    return [
      { title: 'Altura', value: alturaM ? `${alturaM.toFixed(2)} m` : 'N/A' },
      { title: 'Peso', value: peso ? `${peso.toFixed(1)} kg` : 'N/A' },
      { title: 'Peso ideal', value: pesoIdeal },
      { title: 'IMC', value: imc },
      { title: 'Relação cintura-quadril', value: relCinturaQuadril },
      {
        title: 'Gordura Corporal',
        value:
          values?.body_fat_percentage !== undefined
            ? `${values.body_fat_percentage}%`
            : 'N/A',
      },
      { title: 'Circunferência muscular do braço', value: `${cmb} cm` },
    ]
  }, [values])

  const bodyComposition = useMemo<Results[]>(() => {
    const peso = values?.weight ?? 0

    const gorduraPercent = values?.body_fat_percentage ?? 0
    const musculoPercent = values?.muscle_mass_percentage ?? 0

    const pesoGordura = ((gorduraPercent / 100) * peso).toFixed(1)
    const pesoMusculo = ((musculoPercent / 100) * peso).toFixed(1)
    const massaLivreGordura = (peso - parseFloat(pesoGordura)).toFixed(1)

    const dobras = values?.skin_fold
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

    const methodReference =
      METHOD_PT_BR[values?.body_fat_method || 'nenhuma'] || 'Não informado'

    return [
      { title: 'Referência escolhida', value: methodReference },
      { title: 'Percentual de gordura', value: `${gorduraPercent}%` },
      { title: 'Peso de gordura', value: `${pesoGordura} kg` },
      { title: 'Peso ósseo', value: 'N/A' },
      { title: 'Massa magra', value: `${pesoMusculo} kg` },
      { title: 'Massa Livre de Gordura', value: `${massaLivreGordura} kg` },
      { title: 'Densidade Corporal', value: 'N/A' },
      { title: 'Somatório de dobras', value: `${somaDobras} mm` },
    ]
  }, [values])

  return { analysisResults, bodyComposition }
}

export default useLoadConsultResults
