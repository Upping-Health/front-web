import { DefaultContext } from '@/contexts/defaultContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'

const useLoadSchedule = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setData] = useState<Schedule[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get(`/calendars`)
      setData(res?.data?.data || [])
    } catch (error: any) {
      console.error('[ERROR] /calendars', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadSchedule
