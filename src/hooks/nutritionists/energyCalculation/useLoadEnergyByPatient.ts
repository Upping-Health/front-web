import { DefaultContext } from '@/contexts/defaultContext'
import { EnergyCalculation } from '@/interfaces/energyCalculation.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadEnergyCalculationByPatient = (uuid: string, hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<EnergyCalculation[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/energycalculations/list/${uuid}`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden && uuid) loadData()
  }, [loadData, hidden, uuid])

  return { loading, data, loadData }
}

export default useLoadEnergyCalculationByPatient
