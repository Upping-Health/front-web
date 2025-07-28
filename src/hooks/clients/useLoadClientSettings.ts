import { DefaultContext } from '@/contexts/defaultContext'
import { useCallback, useContext, useEffect, useState } from 'react'
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

const DEFAULT_SETTINGS: ClientSettings = {
  working_days: [1, 2, 3, 4, 5],
  start_time: '08:00:00',
  end_time: '17:00:00',
  appointment_duration: 30,
  break_between_appointments: 10,
  lunch_start: null,
  lunch_end: null,
}

const useLoadClientSettings = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setData] = useState<ClientSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState<boolean>(false)

  const loadClientSettings = useCallback(async (): Promise<ClientSettings> => {
    try {
      const res = await api.get('/clients/setting/show')
      const settings = res.data?.data || {}
      return { ...DEFAULT_SETTINGS, ...settings }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error)
      return DEFAULT_SETTINGS
    }
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const settings = await loadClientSettings()
      setData(settings)
    } catch (error) {
      console.error('[ERROR] /clients/setting/show', error)
    } finally {
      setLoading(false)
    }
  }, [loadClientSettings])

  useEffect(() => {
    if (!hidden) loadData()
  }, [hidden, loadData])

  return { loading, data, loadData }
}

export default useLoadClientSettings
