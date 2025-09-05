import DefaultEntityType from './default'

export default interface User extends DefaultEntityType {
  email: string
  name: string
  status: number
}
