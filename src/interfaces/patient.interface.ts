import DefaultEntityType from './default'

export default interface Patient extends DefaultEntityType {
  name: string
  uuid: string
  phone: string
  email: string
  document: string
  years?: number
  birth_date: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  status: 'ACTIVE' | 'INACTIVE'
  objective?: string
  address: {
    street: string
    number: string
    complement: string | null
    neighborhood: string
    city: string
    state: string
    zipCode: string
    //country:string
  }
}
