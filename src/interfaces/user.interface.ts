import DefaultEntityType from './default'

export default interface User extends DefaultEntityType {
  cpf: string
  name: string
  phone: string
  email: string
  role: {
    id: number
    name: string
  }
  password: string
  active: boolean
}
