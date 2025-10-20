import { DefaultContext } from '@/contexts/defaultContext'
import Documents from '@/interfaces/documents.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadFoods = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<Documents[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/foods`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /foods/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadFoods
