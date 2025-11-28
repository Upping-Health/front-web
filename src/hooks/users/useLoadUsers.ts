import { DefaultContext } from '@/contexts/defaultContext'
import { User, UsersApiResponse } from '@/interfaces/user.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadUsers = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<User[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get<UsersApiResponse>(`/users`)
      const users = res?.data?.data?.map((item) => {
        const u = item.user
        return {
          uuid: u.uuid,
          email: u.email,
          name: u.name,
          status: u.status,
          role: u.role?.name,
          profile: u.profile || null,
        } as User
      })
      setdata(users)
    } catch (error: any) {
      console.error('[ERROR API] /users/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadUsers
