import { DefaultContext } from '@/contexts/defaultContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'

export interface ScheduleLabel {
  name: string
  color: string
  uuid: string
  is_active: number
}

const useLoadScheduleLabels = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setData] = useState<ScheduleLabel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get('calendars/labels')
      setData(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR] Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadScheduleLabels
