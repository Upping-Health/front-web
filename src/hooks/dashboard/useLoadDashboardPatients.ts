'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import DashboardPatients from '@/interfaces/dashPatients.interface'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadDashboardPatients = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<DashboardPatients>({
    totalPatients: 0,
    totalPatientsActive: 0,
    totalPatientsInactive: 0,
  })
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      if (isNaN(Number(user?.id))) return
      // const res = await api.get(`/dashboard/patients/${user?.id}`)
      // setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadDashboardPatients
