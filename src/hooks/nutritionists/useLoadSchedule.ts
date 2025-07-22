import { DefaultContext } from '@/contexts/defaultContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import Schedule from '@/interfaces/schedule.interface'
import api from '@/services/api'

interface ClientSettings {
  working_days?: number[] // [1,2,3,4,5] para dias úteis
  start_time?: string // '08:00:00'
  end_time?: string // '17:00:00'
  appointment_duration?: number // 30 (minutos)
  allow_overbooking?: boolean
  max_daily_appointments?: number | null
  break_between_appointments?: number // 10 (minutos)
  lunch_start?: string | null // '12:00:00'
  lunch_end?: string | null // '13:00:00'
}

const useLoadSchedule = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setData] = useState<Schedule[]>([])
  const [clientSettings, setClientSettings] = useState<ClientSettings>({})
  const [loading, setLoading] = useState<boolean>(false)

  const loadClientSettings = useCallback(async () => {
    try {
      const res = await api.get('/clients/setting/show')
      return {
        working_days: res.data.data.working_days || [1, 2, 3, 4, 5],
        start_time: res.data.data.start_time || '08:00:00',
        end_time: res.data.data.end_time || '17:00:00',
        appointment_duration: res.data.data.appointment_duration || 30,
        break_between_appointments:
          res.data.data.break_between_appointments || 10,
        lunch_start: res.data.data.lunch_start,
        lunch_end: res.data.data.lunch_end,
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
      return {
        working_days: [1, 2, 3, 4, 5],
        start_time: '08:00:00',
        end_time: '17:00:00',
        appointment_duration: 30,
        break_between_appointments: 10,
      }
    }
  }, [])

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [schedules, settings] = await Promise.all([
        api.get('/calendars'),
        loadClientSettings(),
      ])

      setData(schedules?.data?.data || [])
      setClientSettings(settings)
    } catch (error: any) {
      console.error('[ERROR] Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }, [user, loadClientSettings])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, clientSettings, loadData }
}

export default useLoadSchedule
