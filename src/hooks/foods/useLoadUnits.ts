import { ApiResponse } from '@/interfaces/api-response.interface'
import { Food } from '@/interfaces/food.interface'
import { Units } from '@/interfaces/units.interface'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

type UnitsApiResponse = ApiResponse<Units[]>

const useLoadUnits = (hidden: boolean) => {
  const [data, setdata] = useState<Units[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get<UnitsApiResponse>(`/units`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /units/', error?.response)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadUnits
