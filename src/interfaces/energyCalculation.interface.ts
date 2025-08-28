export interface EnergyCalculation {
  formula:
    | 'harris_benedict_1919'
    | 'harris_benedict_1984'
    | 'fao_who'
    | 'mifflin'
    | 'katch_mcardle'
    | 'cunningham'
    | 'mifflin_obesity'
    | 'mifflin_overweight'
    | 'henry_rees'
    | 'tinsley_weight'
    | 'tinsley_lbm'
    | 'eer_2005'
    | 'eer_2023_adult'
    | 'eer_2023_child'
    | 'eer_2023_pregnant'
    | 'eer_2023_lactating'
    | 'eer_iom_child'
    | 'fao_who_child'
    | 'schofield_child'
    | 'ministry_health_pregnant'
    | 'manual_bmr'
    | 'manual_get'

  lbm?: number
  weight: number
  height: number
  age: number
  gender: 'male' | 'female'
  activity_factor: number
  injury_factor?: number
  met_adjustment?: number
  met_time?: number
  met_factor?: number
  body_fat?: number
  pregnant?: boolean
  pregnancy_weeks?: number
  target_weight?: number
  target_days?: number
  additionalMet?: { met_factor: string; met_time: string }[]
}
