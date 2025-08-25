export type Gender = 'male' | 'female'
export type NutritionalStatus =
  | 'underweight'
  | 'normal'
  | 'overweight'
  | 'obese'
export type Formula =
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

export interface EnergyInput {
  age: number // em anos (salvo quando age_months for passado)
  gender: Gender
  weight: number // kg
  height: number // cm
  activity_factor: number // ex.: 1.2 ... 1.9
  formula: Formula

  // opcionais usados pelas fórmulas
  activity_level?: 1 | 2 | 3 | 4 // usado nas EER 2023
  injury_factor?: number // multiplicador
  body_fat?: number // %
  lbm?: number // massa magra em kg
  pregnant?: boolean
  pregnancy_weeks?: number
  nutritional_status?: NutritionalStatus
  delivery_date?: string // formato 'dd/mm/yyyy'

  venta_adjustment?: number
  met_adjustment?: number

  manual_bmr?: number
  manual_get?: number

  target_weight?: number // kg
  target_days?: number // dias
}

export interface AdjustmentDetails {
  venta?: string
  met?: string
  pregnant?: string
  energy_disposition?: string
}

export interface AdditionalAdjustmentsResult {
  total: number
  details: AdjustmentDetails
}

export interface EnergyResult {
  bmr: number // atenção: em fórmulas EER pode não ser BMR fisiológico, é o retorno cru da fórmula
  tdee: number
  details: {
    formula: Formula
    activity_factor: number
    additional_adjustments: AdjustmentDetails
    weight_adjustment?: string
  }
}

export class EnergyCalculationService {
  calculate(data: EnergyInput): EnergyResult {
    const bmr = this.calculateBMR(data)

    let tdee = bmr * data.activity_factor

    if (
      typeof data.injury_factor === 'number' &&
      !Number.isNaN(data.injury_factor)
    ) {
      tdee *= data.injury_factor
    }

    const additionalAdjustments = this.calculateAdditionalAdjustments(data)
    tdee += additionalAdjustments.total

    const details: EnergyResult['details'] = {
      formula: data.formula,
      activity_factor: data.activity_factor,
      additional_adjustments: additionalAdjustments.details,
    }

    if (this.hasTarget(data)) {
      const calorieDiff = (data.target_weight! - data.weight) * 7700 // 1 kg ≈ 7700 kcal
      const dailyAdj = calorieDiff / data.target_days!
      tdee += dailyAdj
      details.weight_adjustment = `${this.round2(dailyAdj)} kcal/dia`
    }

    return {
      bmr: this.round2(bmr),
      tdee: this.round2(tdee),
      details,
    }
  }

  // ====================
  // Núcleo
  // ====================

  private calculateBMR(data: EnergyInput): number {
    switch (data.formula) {
      // Adultos - BMR
      case 'harris_benedict_1919':
        return this.harrisBenedict1919(data)
      case 'harris_benedict_1984':
        return this.harrisBenedict1984(data)
      case 'fao_who':
        return this.faoWho(data)
      case 'mifflin':
        return this.mifflin(data)
      case 'katch_mcardle':
        return this.katchMcArdle(data)
      case 'cunningham':
        return this.cunningham(data)
      case 'mifflin_obesity':
        return this.mifflinObesity(data)
      case 'mifflin_overweight':
        return this.mifflinOverweight(data)
      case 'henry_rees':
        return this.henryRees(data)
      case 'tinsley_weight':
        return this.tinsleyWeight(data)
      case 'tinsley_lbm':
        return this.tinsleyLBM(data)

      // EER / GET (já incluem atividade nas fórmulas específicas)
      case 'eer_2005':
        return this.eer2005(data)
      case 'eer_2023_adult':
        return this.eer2023Adult(data)
      case 'eer_2023_child':
        return this.eer2023Child(data)
      case 'eer_2023_pregnant':
        return this.eer2023Pregnant(data)
      case 'eer_2023_lactating':
        return this.eer2023Lactating(data)

      // Crianças
      case 'eer_iom_child':
        return this.eerIomChild(data)
      case 'fao_who_child':
        return this.faoWhoChild(data)
      case 'schofield_child':
        return this.schofieldChild(data)

      // Gestantes
      case 'ministry_health_pregnant':
        return this.ministryHealthPregnant(data)

      // Manuais
      case 'manual_bmr':
        return data.manual_bmr ?? 0
      case 'manual_get':
        return data.manual_get ?? 0

      default:
        return 0
    }
  }

  private calculateAdditionalAdjustments(
    data: EnergyInput,
  ): AdditionalAdjustmentsResult {
    const adjustments = {
      venta: data.venta_adjustment ?? 0,
      met: data.met_adjustment ?? 0,
      pregnant: this.calculatePregnantAdjustment(data),
      energy_disposition: this.calculateEnergyDisposition(data),
    } as const

    const total =
      adjustments.venta +
      adjustments.met +
      adjustments.pregnant +
      adjustments.energy_disposition

    const details: AdjustmentDetails = {}
    if (adjustments.venta !== 0)
      details.venta = `${this.round2(adjustments.venta)} kcal/dia`
    if (adjustments.met !== 0)
      details.met = `${this.round2(adjustments.met)} kcal/dia`
    if (adjustments.pregnant !== 0)
      details.pregnant = `${this.round2(adjustments.pregnant)} kcal/dia`
    if (adjustments.energy_disposition !== 0)
      details.energy_disposition = `${this.round2(adjustments.energy_disposition)} kcal/dia`

    return { total, details }
  }

  private calculatePregnantAdjustment(data: EnergyInput): number {
    if (!data.pregnant || !data.pregnancy_weeks) return 0
    if (data.pregnancy_weeks <= 13) return 0 // 1º trimestre sem ajuste
    return 300 // exemplo conforme PHP
  }

  private calculateEnergyDisposition(data: EnergyInput): number {
    if (!data.nutritional_status) return 0
    switch (data.nutritional_status) {
      case 'underweight':
        return 200
      case 'normal':
        return 0
      case 'overweight':
        return -200
      case 'obese':
        return -400
      default:
        return 0
    }
  }

  // ====================
  // Adultos - BMR
  // ====================

  private harrisBenedict1919(d: EnergyInput): number {
    return d.gender === 'male'
      ? 66.5 + 13.75 * d.weight + 5.003 * d.height - 6.75 * d.age
      : 655.1 + 9.563 * d.weight + 1.85 * d.height - 4.676 * d.age
  }

  private harrisBenedict1984(d: EnergyInput): number {
    return d.gender === 'male'
      ? 88.362 + 13.397 * d.weight + 4.799 * d.height - 5.677 * d.age
      : 447.593 + 9.247 * d.weight + 3.098 * d.height - 4.33 * d.age
  }

  private faoWho(d: EnergyInput): number {
    return 15.057 * d.weight + 692.2
  }

  private mifflin(d: EnergyInput): number {
    return d.gender === 'male'
      ? 10 * d.weight + 6.25 * d.height - 5 * d.age + 5
      : 10 * d.weight + 6.25 * d.height - 5 * d.age - 161
  }

  private mifflinObesity(d: EnergyInput): number {
    const bmr = this.mifflin(d)
    return bmr * 0.9 // ajuste de exemplo
  }

  private mifflinOverweight(d: EnergyInput): number {
    const bmr = this.mifflin(d)
    return bmr * 0.95 // ajuste de exemplo
  }

  private katchMcArdle(d: EnergyInput): number {
    const lbm =
      typeof d.lbm === 'number' && !Number.isNaN(d.lbm)
        ? d.lbm
        : d.weight * (1 - (d.body_fat ?? 20) / 100)
    return 370 + 21.6 * lbm
  }

  private cunningham(d: EnergyInput): number {
    const lbm =
      typeof d.lbm === 'number' && !Number.isNaN(d.lbm)
        ? d.lbm
        : d.weight * (1 - (d.body_fat ?? 20) / 100)
    return 500 + 22 * lbm
  }

  private henryRees(d: EnergyInput): number {
    return d.gender === 'male'
      ? (0.048 * d.weight + 2.562) * 239
      : (0.041 * d.weight + 2.102) * 239
  }

  private tinsleyWeight(d: EnergyInput): number {
    return d.gender === 'male' ? 26.5 * d.weight : 25.1 * d.weight
  }

  private tinsleyLBM(d: EnergyInput): number {
    const lbm =
      typeof d.lbm === 'number' && !Number.isNaN(d.lbm)
        ? d.lbm
        : d.weight * (1 - (d.body_fat ?? 20) / 100)
    return 28.5 * lbm
  }

  // ====================
  // EER (Total Energy Expenditure nas fórmulas)
  // ====================

  private eer2005(d: EnergyInput): number {
    const hM = d.height / 100
    if (d.gender === 'male') {
      return (
        662 - 9.53 * d.age + d.activity_factor * (15.91 * d.weight + 539.6 * hM)
      )
    }
    return 354 - 6.91 * d.age + d.activity_factor * (9.36 * d.weight + 726 * hM)
  }

  private eer2023Adult(d: EnergyInput): number {
    const hM = d.height / 100
    const L = d.activity_level ?? 1
    if (d.gender === 'male') {
      switch (L) {
        case 1:
          return 753.07 - 10.83 * d.age + 6.5 * hM + 14.1 * d.weight
        case 2:
          return 581.47 - 10.83 * d.age + 8.3 * hM + 14.94 * d.weight
        case 3:
          return 1004.82 - 10.83 * d.age + 6.52 * hM + 15.91 * d.weight
        case 4:
          return -517.88 - 10.83 * d.age + 15.61 * hM + 19.11 * d.weight
        default:
          return 0
      }
    }
    // female
    switch (L) {
      case 1:
        return 584.9 - 7.01 * d.age + 5.72 * hM + 11.71 * d.weight
      case 2:
        return 575.77 - 7.01 * d.age + 6.6 * hM + 12.14 * d.weight
      case 3:
        return 710.25 - 7.01 * d.age + 6.54 * hM + 12.34 * d.weight
      case 4:
        return 511.83 - 7.01 * d.age + 9.07 * hM + 12.56 * d.weight
      default:
        return 0
    }
  }

  private eer2023Child(d: EnergyInput): number {
    const ageMonths = (d.age ?? 0) * 12
    const hM = d.height / 100
    const L = d.activity_level ?? 1

    if (ageMonths >= 0 && ageMonths <= 2.99) {
      if (d.gender === 'male') {
        return -716.45 - 1.0 * d.age + 17.82 * hM + 15.06 * d.weight + 200
      }
      return -69.15 + 80.0 * d.age + 2.65 * hM + 54.15 * d.weight + 180
    }

    if (ageMonths >= 3 && ageMonths <= 5.99) {
      if (d.gender === 'male') {
        return -716.45 - 1.0 * d.age + 17.82 * hM + 15.06 * d.weight + 50
      }
      return -69.15 + 80.0 * d.age + 2.65 * hM + 54.15 * d.weight + 60
    }

    if (ageMonths >= 6 && ageMonths <= 35.99) {
      if (d.gender === 'male') {
        return -716.45 - 1.0 * d.age + 17.82 * hM + 15.06 * d.weight + 20
      }
      return (
        -69.15 +
        80.0 * d.age +
        2.65 * hM +
        54.15 * d.weight +
        this.defineEnergyCost(d.age, d.gender, ageMonths)
      )
    }

    if (d.age >= 3 && d.age <= 13.99) {
      if (d.gender === 'male') {
        switch (L) {
          case 1:
            return (
              -447.51 +
              3.68 * d.age +
              13.01 * hM +
              13.15 * d.weight +
              this.defineEnergyCost(d.age, d.gender, ageMonths)
            )
          case 2:
            return (
              19.12 +
              3.68 * d.age +
              8.62 * hM +
              20.28 * d.weight +
              this.defineEnergyCost(d.age, d.gender, ageMonths)
            )
          case 3:
            return (
              -388.19 +
              3.68 * d.age +
              12.66 * hM +
              20.46 * d.weight +
              this.defineEnergyCost(d.age, d.gender, ageMonths)
            )
          case 4:
            return (
              -671.75 +
              3.68 * d.age +
              15.38 * hM +
              23.25 * d.weight +
              this.defineEnergyCost(d.age, d.gender, ageMonths)
            )
          default:
            return 0
        }
      }
      // female
      switch (L) {
        case 1:
          return (
            55.59 -
            22.25 * d.age +
            8.43 * hM +
            17.07 * d.weight +
            this.defineEnergyCost(d.age, d.gender, ageMonths)
          )
        case 2:
          return (
            -297.54 -
            22.25 * d.age +
            12.77 * hM +
            14.73 * d.weight +
            this.defineEnergyCost(d.age, d.gender, ageMonths)
          )
        case 3:
          return (
            -189.55 -
            22.25 * d.age +
            11.74 * hM +
            18.34 * d.weight +
            this.defineEnergyCost(d.age, d.gender, ageMonths)
          )
        case 4:
          return (
            -709.59 -
            22.25 * d.age +
            18.22 * hM +
            14.25 * d.weight +
            this.defineEnergyCost(d.age, d.gender, ageMonths)
          )
        default:
          return 0
      }
    }

    if (d.age >= 14 && d.age <= 18.99) {
      const adjustment = 20
      if (d.gender === 'male') {
        switch (L) {
          case 1:
            return (
              -447.51 +
              3.68 * d.age +
              13.01 * hM +
              13.15 * d.weight +
              adjustment
            )
          case 2:
            return (
              19.12 + 3.68 * d.age + 8.62 * hM + 20.28 * d.weight + adjustment
            )
          case 3:
            return (
              -388.19 +
              3.68 * d.age +
              12.66 * hM +
              20.46 * d.weight +
              adjustment
            )
          case 4:
            return (
              -671.75 +
              3.68 * d.age +
              15.38 * hM +
              23.25 * d.weight +
              adjustment
            )
          default:
            return 0
        }
      }
      // female
      switch (L) {
        case 1:
          return (
            55.59 - 22.25 * d.age + 8.43 * hM + 17.07 * d.weight + adjustment
          )
        case 2:
          return (
            -297.54 - 22.25 * d.age + 12.77 * hM + 14.73 * d.weight + adjustment
          )
        case 3:
          return (
            -189.55 - 22.25 * d.age + 11.74 * hM + 18.34 * d.weight + adjustment
          )
        case 4:
          return (
            -709.59 - 22.25 * d.age + 18.22 * hM + 14.25 * d.weight + adjustment
          )
        default:
          return 0
      }
    }

    return 0
  }

  private eer2023Pregnant(d: EnergyInput): number {
    if (!d.pregnancy_weeks || d.pregnancy_weeks <= 13) return 0 // sem ajuste no 1º trimestre
    const hM = d.height / 100
    const L = d.activity_level ?? 1
    const energyDisposition = this.defineEnergyDisposition(
      d.nutritional_status ?? 'normal',
    )

    switch (L) {
      case 1:
        return (
          1131.2 -
          2.04 * d.age +
          0.34 * hM +
          12.15 * d.weight +
          9.16 * d.pregnancy_weeks +
          energyDisposition
        )
      case 2:
        return (
          693.35 -
          2.04 * d.age +
          5.73 * hM +
          10.2 * d.weight +
          9.16 * d.pregnancy_weeks +
          energyDisposition
        )
      case 3:
        return (
          -223.84 -
          2.04 * d.age +
          13.23 * hM +
          8.15 * d.weight +
          9.16 * d.pregnancy_weeks +
          energyDisposition
        )
      case 4:
        return (
          -779.72 -
          2.04 * d.age +
          18.45 * hM +
          8.73 * d.weight +
          9.16 * d.pregnancy_weeks +
          energyDisposition
        )
      default:
        return 0
    }
  }

  private eer2023Lactating(d: EnergyInput): number {
    if (!d.delivery_date) return 0
    const delivery = this.parseDMY(d.delivery_date)
    if (!delivery) return 0

    const months = this.monthsSince(delivery)
    if (months > 12) return 0

    const hM = d.height / 100
    const L = d.activity_level ?? 1

    if (months >= 0 && months <= 6) {
      const adjustment = 540 - 140 * (d.injury_factor ?? 1)
      if (d.age >= 19) {
        switch (L) {
          case 1:
            return (
              584.9 - 7.01 * d.age + 5.72 * hM + 11.71 * d.weight + adjustment
            )
          case 2:
            return (
              575.77 - 7.01 * d.age + 6.6 * hM + 12.14 * d.weight + adjustment
            )
          case 3:
            return (
              710.25 - 7.01 * d.age + 6.54 * hM + 12.34 * d.weight + adjustment
            )
          case 4:
            return (
              511.83 - 7.01 * d.age + 9.07 * hM + 12.56 * d.weight + adjustment
            )
          default:
            return 0
        }
      }
      // < 19 anos
      switch (L) {
        case 1:
          return (
            55.59 - 22.25 * d.age + 8.43 * hM + 17.07 * d.weight + adjustment
          )
        case 2:
          return (
            -297.54 - 22.25 * d.age + 12.77 * hM + 14.73 * d.weight + adjustment
          )
        case 3:
          return (
            -189.55 - 22.25 * d.age + 11.74 * hM + 18.34 * d.weight + adjustment
          )
        case 4:
          return (
            -709.59 - 22.25 * d.age + 18.22 * hM + 14.25 * d.weight + adjustment
          )
        default:
          return 0
      }
    }

    if (months >= 7 && months <= 12) {
      const adjustment = 380 * (d.injury_factor ?? 1)
      if (d.age >= 19) {
        switch (L) {
          case 1:
            return (
              584.9 - 7.01 * d.age + 5.72 * hM + 11.71 * d.weight + adjustment
            )
          case 2:
            return (
              575.77 - 7.01 * d.age + 6.6 * hM + 12.14 * d.weight + adjustment
            )
          case 3:
            return (
              710.25 - 7.01 * d.age + 6.54 * hM + 12.34 * d.weight + adjustment
            )
          case 4:
            return (
              511.83 - 7.01 * d.age + 9.07 * hM + 12.56 * d.weight + adjustment
            )
          default:
            return 0
        }
      }
      // < 19 anos
      switch (L) {
        case 1:
          return (
            55.59 - 22.25 * d.age + 8.43 * hM + 17.07 * d.weight + adjustment
          )
        case 2:
          return (
            -297.54 - 22.25 * d.age + 12.77 * hM + 14.73 * d.weight + adjustment
          )
        case 3:
          return (
            -189.55 - 22.25 * d.age + 11.74 * hM + 18.34 * d.weight + adjustment
          )
        case 4:
          return (
            -709.59 - 22.25 * d.age + 18.22 * hM + 14.25 * d.weight + adjustment
          )
        default:
          return 0
      }
    }

    return 0
  }

  // ====================
  // Crianças
  // ====================

  private eerIomChild(d: EnergyInput): number {
    const ageMonths = d.age * 12
    const hM = d.height / 100

    if (ageMonths < 36) {
      // No PHP havia recursão chamando calculateBMR() aqui. Assumimos BMR = Schofield e aplicamos fatores.
      const bmr = this.schofieldChild(d)
      return bmr * d.activity_factor * (d.injury_factor ?? 1)
    }

    if (ageMonths > 36 && ageMonths <= 96) {
      const adjustment = 20
      if (d.gender === 'female') {
        return (
          135.3 -
          30.8 * d.age +
          d.activity_factor *
            (d.injury_factor ?? 1) *
            (10 * d.weight + 934 * hM) +
          adjustment
        )
      }
      return (
        88.5 -
        61.9 * d.age +
        d.activity_factor *
          (d.injury_factor ?? 1) *
          (26.7 * d.weight + 903 * hM) +
        adjustment
      )
    }

    if (ageMonths > 96) {
      const adjustment = 25
      if (d.gender === 'female') {
        return (
          135.3 -
          30.8 * d.age +
          d.activity_factor *
            (d.injury_factor ?? 1) *
            (10 * d.weight + 934 * hM) +
          adjustment
        )
      }
      return (
        88.5 -
        61.9 * d.age +
        d.activity_factor *
          (d.injury_factor ?? 1) *
          (26.7 * d.weight + 903 * hM) +
        adjustment
      )
    }

    return 0
  }

  private faoWhoChild(d: EnergyInput): number {
    // No PHP, esta função chamava calculateBMR(d) * fatores, o que gerava recursão conforme a fórmula atual.
    // Aqui adotamos BMR infantil padrão Schofield como base para compatibilidade.
    const bmr = this.schofieldChild(d)
    return bmr * d.activity_factor * (d.injury_factor ?? 1)
  }

  private schofieldChild(d: EnergyInput): number {
    const ageMonths = d.age * 12

    if (ageMonths < 36) {
      if (d.gender === 'male') {
        return (0.167 * d.weight + 15.174) * 239
      }
      return (0.175 * d.weight + 12.33) * 239
    }

    if (ageMonths >= 36 && ageMonths < 144) {
      if (d.gender === 'male') {
        return (0.074 * d.weight + 17.308) * 239
      }
      return (0.056 * d.weight + 15.174) * 239
    }

    if (ageMonths >= 144 && ageMonths < 180) {
      if (d.gender === 'male') {
        return (0.066 * d.weight + 15.174) * 239
      }
      return (0.04 * d.weight + 14.818) * 239
    }

    return 0
  }

  // ====================
  // Gestantes (Ministério da Saúde - como no PHP)
  // ====================

  private ministryHealthPregnant(d: EnergyInput): number {
    const bmr = this.calculateBMR({ ...d, formula: 'mifflin' }) // BMR base qualquer compatível; no PHP chamava calculateBMR(d)
    return bmr * d.activity_factor * (d.injury_factor ?? 1) + 0.1 * bmr
  }

  // ====================
  // Helpers
  // ====================

  private defineEnergyCost(
    age: number,
    gender: Gender,
    ageMonths?: number | null,
  ): number {
    if (gender === 'male') {
      if (age === 3) return 20
      if (age >= 4 && age <= 8) return 15
      if (age >= 9 && age <= 13) return 25
    } else {
      if (ageMonths != null && ageMonths >= 6 && ageMonths <= 11.99) return 20
      if (ageMonths != null && ageMonths >= 12 && ageMonths <= 35.99) return 15
      if (age === 3) return 15
      if (age >= 4 && age <= 8) return 15
      if (age >= 9 && age <= 13) return 30
    }
    return 0
  }

  private defineEnergyDisposition(
    nutritionalStatus: NutritionalStatus | string,
  ): number {
    switch (nutritionalStatus) {
      case 'underweight':
        return 200
      case 'normal':
        return 0
      case 'overweight':
        return -200
      case 'obese':
        return -400
      default:
        return 0
    }
  }

  private parseDMY(s: string): Date | null {
    const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    if (!m) return null
    const [_, dd, mm, yyyy] = m
    const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
    return Number.isNaN(date.getTime()) ? null : date
  }

  private monthsSince(from: Date, to: Date = new Date()): number {
    const years = to.getFullYear() - from.getFullYear()
    const months = to.getMonth() - from.getMonth()
    return years * 12 + months // compatível com PHP (ignora dia do mês)
  }

  private hasTarget(
    d: EnergyInput,
  ): d is EnergyInput & { target_weight: number; target_days: number } {
    return (
      typeof d.target_weight === 'number' && typeof d.target_days === 'number'
    )
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100
  }
}
