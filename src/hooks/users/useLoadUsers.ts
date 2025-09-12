import { DefaultContext } from '@/contexts/defaultContext'
import User from '@/interfaces/user.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadUsers = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<User[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/users`)
      console.log(res?.data?.data)
      const users: User[] = res?.data?.data?.map((item: any) => {
        const u = item.user

        return {
          uuid: u.status,
          email: u.email,
          name: u.name,
          status: u.status,
          role: u.role?.name,
        }
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
