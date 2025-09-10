import DefaultEntityType from './default'

export default interface Schedule extends DefaultEntityType {
  patient_id: number
  nutritionistName: string
  patientName: string
  observation: string | null
  start_time: string
  end_time: string
  status: number
  professional_id: number

  patient?: {
    name: string
    uuid: string
  }
}
