export interface SkinFold {
  triceps: number | null
  biceps: number | null
  subscapular: number | null
  midaxillary: number | null
  suprailiac: number | null
  abdominal: number | null
  thigh: number | null
  chest: number | null
  calf: number | null
}

export interface BodyCircumference {
  waist: number | null
  hip: number | null
  neck: number | null
  shoulder: number | null
  chest: number | null
  abdominal: number | null
  relaxed_right_arm: number | null
  contracted_right_arm: number | null
  right_forearm: number | null
  right_proximal_thigh: number | null
  right_mid_thigh: number | null
  right_distal_thigh: number | null
  right_calf: number | null
  relaxed_left_arm: number | null
  contracted_left_arm: number | null
  left_forearm: number | null
  left_proximal_thigh: number | null
  left_mid_thigh: number | null
  left_distal_thigh: number | null
  left_calf: number | null
}

export interface AnthropometryFormValues {
  evaluation_date: string
  weight: number
  height: number
  body_fat_percentage: number
  muscle_mass_percentage: number
  observations: string
  body_fat_method: string
  skin_fold: SkinFold
  body_circumference: BodyCircumference
}
