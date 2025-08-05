import { SkinFold } from '@/interfaces/anthroprometry.interface'

type Gender = 'male' | 'female'

class CalculateBodyFatPercentag {
  calculateBodyFatPercentage(
    method: string,
    gender: Gender,
    age: number,
    skinFolds: SkinFold,
  ): number | null {
    switch (method) {
      case 'pollock_3':
        return this.calculatePollock3(gender, age, skinFolds)
      case 'pollock_7':
        return this.calculatePollock7(gender, age, skinFolds)
      case 'petroski':
        return this.calculatePetroski(gender, age, skinFolds)
      case 'guedes':
        return this.calculateGuedes(gender, skinFolds)
      case 'durnin':
        return this.calculateDurnin(gender, age, skinFolds)
      case 'faulkner':
        return this.calculateFaulkner(gender, skinFolds)
      default:
        return null
    }
  }

  private calculatePollock3(
    gender: Gender,
    age: number,
    folds: SkinFold,
  ): number {
    const sum =
      gender === 'male'
        ? (folds.chest ?? 0) + (folds.abdominal ?? 0) + (folds.thigh ?? 0)
        : (folds.triceps ?? 0) + (folds.suprailiac ?? 0) + (folds.thigh ?? 0)

    const bodyDensity =
      gender === 'male'
        ? 1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * age
        : 1.0994921 - 0.0009929 * sum + 0.0000023 * sum * sum - 0.0001392 * age

    return 495 / bodyDensity - 450
  }

  private calculatePollock7(
    gender: Gender,
    age: number,
    folds: SkinFold,
  ): number {
    const sum =
      (folds.chest ?? 0) +
      (folds.abdominal ?? 0) +
      (folds.thigh ?? 0) +
      (folds.triceps ?? 0) +
      (folds.subscapular ?? 0) +
      (folds.suprailiac ?? 0) +
      (folds.midaxillary ?? 0)

    const bodyDensity =
      gender === 'male'
        ? 1.112 - 0.00043499 * sum + 0.00000055 * sum * sum - 0.00028826 * age
        : 1.097 - 0.00046971 * sum + 0.00000056 * sum * sum - 0.00012828 * age

    return 495 / bodyDensity - 450
  }

  private calculatePetroski(
    gender: Gender,
    age: number,
    folds: SkinFold,
  ): number {
    const sum =
      gender === 'male'
        ? (folds.triceps ?? 0) +
          (folds.subscapular ?? 0) +
          (folds.suprailiac ?? 0) +
          (folds.calf ?? 0)
        : (folds.midaxillary ?? 0) +
          (folds.suprailiac ?? 0) +
          (folds.calf ?? 0) +
          (folds.thigh ?? 0)

    const bodyDensity =
      gender === 'male'
        ? 1.10726863 -
          0.00081201 * sum +
          0.00000212 * sum * sum -
          0.00041761 * age
        : 1.1954713 - 0.07513507 * Math.log10(sum) - 0.00041072 * age

    return 495 / bodyDensity - 450
  }

  private calculateGuedes(gender: Gender, folds: SkinFold): number {
    const sum =
      gender === 'male'
        ? (folds.triceps ?? 0) +
          (folds.abdominal ?? 0) +
          (folds.suprailiac ?? 0)
        : (folds.subscapular ?? 0) +
          (folds.suprailiac ?? 0) +
          (folds.thigh ?? 0)

    const bodyDensity =
      gender === 'male'
        ? 1.17136 - 0.06706 * Math.log10(sum)
        : 1.1665 - 0.07063 * Math.log10(sum)

    return 495 / bodyDensity - 450
  }

  private calculateDurnin(
    gender: Gender,
    age: number,
    folds: SkinFold,
  ): number {
    const sum =
      (folds.biceps ?? 0) +
      (folds.triceps ?? 0) +
      (folds.subscapular ?? 0) +
      (folds.suprailiac ?? 0)

    let bodyDensity: number

    if (gender === 'male') {
      if (age >= 17 && age <= 19) {
        bodyDensity = 1.162 - 0.063 * Math.log10(sum)
      } else if (age >= 20 && age <= 29) {
        bodyDensity = 1.1631 - 0.0632 * Math.log10(sum)
      } else if (age >= 30 && age <= 39) {
        bodyDensity = 1.1422 - 0.0544 * Math.log10(sum)
      } else if (age >= 40 && age <= 49) {
        bodyDensity = 1.162 - 0.07 * Math.log10(sum)
      } else {
        bodyDensity = 1.1715 - 0.0779 * Math.log10(sum)
      }
    } else {
      if (age >= 17 && age <= 19) {
        bodyDensity = 1.1549 - 0.0678 * Math.log10(sum)
      } else if (age >= 20 && age <= 29) {
        bodyDensity = 1.1599 - 0.0717 * Math.log10(sum)
      } else if (age >= 30 && age <= 39) {
        bodyDensity = 1.1423 - 0.0632 * Math.log10(sum)
      } else if (age >= 40 && age <= 49) {
        bodyDensity = 1.1333 - 0.0612 * Math.log10(sum)
      } else {
        bodyDensity = 1.1339 - 0.0645 * Math.log10(sum)
      }
    }

    return 495 / bodyDensity - 450
  }

  private calculateFaulkner(gender: Gender, folds: SkinFold): number {
    const sum =
      (folds.triceps ?? 0) +
      (folds.subscapular ?? 0) +
      (folds.abdominal ?? 0) +
      (folds.suprailiac ?? 0)

    if (gender === 'male') {
      return 0.153 * sum + 5.783
    }

    return 0.221 * sum - 2.814
  }
}

export default CalculateBodyFatPercentag
