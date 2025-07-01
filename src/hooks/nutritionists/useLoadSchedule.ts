import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadSchedule = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<Schedule[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/calendars`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /calendars/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadSchedule
