import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

const useLoadForms = (hidden: boolean) => {
  const [data, setdata] = useState<Schedule[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/forms`)
      setdata(res?.data?.data ?? [])
      console.log(res)
    } catch (error: any) {
      console.error('[ERROR API] /forms/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadForms
