import DefaultEntityType from './default'

export default interface Patient extends DefaultEntityType {
  name: string
  phone: string
  email: string
  cpf: string
  years?: number
  birthDate: string
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
