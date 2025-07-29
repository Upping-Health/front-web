import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadUsers = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<any[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/users`)
      setdata(res?.data?.data)
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
