import DefaultEntityType from './default'

export default interface User extends DefaultEntityType {
  document: string
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
