import { ApiResponse } from './api-response.interface'

export interface UserDTO {
  user: {
    uuid: string
    email: string
    name: string
    status: number
    role: {
      name: string
    }
    profile: {
      document: string | null
      birth_date: string | null
      phone: string | null
      photo: string | null
      gender: string | null
      neighborhood: string | null
      number: string | null
      complement: string | null
      city: string | null
      state: string | null
      zip_code: string | null
      country: string | null
      age: number
    } | null
  }
}
export interface User {
  uuid: string
  email: string
  name: string
  status: number
  role: string
  profile: null
}

export type UsersApiResponse = ApiResponse<UserDTO[]>
