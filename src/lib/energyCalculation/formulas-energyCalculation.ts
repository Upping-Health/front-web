export const energyCalculationFormulas = [
  { text: 'Harris-Benedict 1919', value: 'harris_benedict_1919' },
  { text: 'Harris-Benedict 1984', value: 'harris_benedict_1984' },
  { text: 'Katch-McArdle', value: 'katch_mcardle' },
  { text: 'Cunningham', value: 'cunningham' },
  { text: 'FAO/WHO (2004)', value: 'fao_who' },
  { text: 'Mifflin', value: 'mifflin' },
  { text: 'Mifflin Obesidade', value: 'mifflin_obesity' },
  { text: 'Mifflin Sobrepeso', value: 'mifflin_overweight' },
  { text: 'Henry-Rees', value: 'henry_rees' },
  { text: 'Tinsley Peso', value: 'tinsley_weight' },
  { text: 'Tinsley LBM', value: 'tinsley_lbm' },
  { text: 'EER/IOM 2005', value: 'eer_2005' },
  { text: 'EER 2023 Adulto', value: 'eer_2023_adult' },
  { text: 'EER 2023 Criança', value: 'eer_2023_child' },
  { text: 'EER 2023 Gestante', value: 'eer_2023_pregnant' },
  { text: 'EER 2023 Lactante', value: 'eer_2023_lactating' },
  { text: 'EER/IOM Criança', value: 'eer_iom_child' },
  { text: 'FAO/WHO Criança', value: 'fao_who_child' },
  { text: 'Ministério da Saúde Gestante', value: 'ministry_health_pregnant' },
  { text: 'Manual BMR', value: 'manual_bmr' },
  { text: 'Manual GET', value: 'manual_get' },
]

const harris_benedict_1919 = [
  { text: '1 - Sedentário', value: 1 },
  { text: '1.2 - Leve', value: 1.2 },
  { text: '1.375 - Moderado', value: 1.375 },
  { text: '1.55 - Ativo', value: 1.55 },
  { text: '1.725 - Muito ativo', value: 1.725 },
  { text: '1.9 - Extremamente ativo', value: 1.9 },
]

const harris_benedict_1984 = [
  { text: '1 - Neutro', value: 1 },
  { text: '1.2 - Sedentário', value: 1.2 },
  { text: '1.375 - Pouco Ativo', value: 1.375 },
  { text: '1.55 - Moderadamente Ativo', value: 1.55 },
  { text: '1.725 - Muito ativo', value: 1.725 },
  { text: '1.9 - Extremamente ativo', value: 1.9 },
]

const fao_who = [
  { text: '1.55 - Leve', value: 1.55 },
  { text: '1.85 - Moderada', value: 1.85 },
  { text: '2.2 - Intensa', value: 2.2 },
]

const katchMcArdleActivity = [
  { text: '1 - Sedentário', value: 1 },
  { text: '1.11 - Leve', value: 1.11 },
  { text: '1.25 - Moderada', value: 1.25 },
  { text: '1.48 - Intensa', value: 1.48 },
]

export const activityFactorsByFormula: Record<
  string,
  { text: string; value: number }[]
> = {
  harris_benedict_1919: harris_benedict_1919,
  harris_benedict_1984: harris_benedict_1984,
  fao_who: fao_who,
  mifflin: [],
  mifflin_obesity: [],
  mifflin_overweight: [],
  katch_mcardle: katchMcArdleActivity,
  cunningham: [],
  henry_rees: [],
  tinsley_weight: [],
  tinsley_lbm: [],
  eer_2005: [],
  eer_2023_adult: [],
  eer_2023_child: [],
  eer_2023_pregnant: [],
  eer_2023_lactating: [],
  eer_iom_child: [],
  fao_who_child: [],
  ministry_health_pregnant: [],
  manual_bmr: harris_benedict_1919,
  manual_get: harris_benedict_1919,
}

export const injuryFactors = [
  { text: 'Nenhum (1.0)', value: 1.0 },
  { text: 'Cirurgia leve (1.1)', value: 1.1 },
  { text: 'Cirurgia maior (1.2–1.3)', value: 1.25 },
  { text: 'Infecção/sepse (1.2–1.5)', value: 1.35 },
  { text: 'Trauma grave (1.35–1.5)', value: 1.45 },
  { text: 'Queimado (até 2.0)', value: 2.0 },
]
