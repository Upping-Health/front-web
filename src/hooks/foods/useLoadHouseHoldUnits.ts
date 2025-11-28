import {
  HouseHoldUnits,
  HouseHoldUnitsResponse,
} from '@/interfaces/units.interface copy'
import api from '@/services/api'
import { useCallback, useEffect, useState } from 'react'

const useLoadHouseHoldsUnits = (hidden: boolean) => {
  const [data, setdata] = useState<HouseHoldUnits[]>([])
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get<HouseHoldUnitsResponse>(`/household-units`)
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

export default useLoadHouseHoldsUnits
