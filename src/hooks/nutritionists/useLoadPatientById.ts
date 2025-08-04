import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadPatientByUUID = (uuid: string) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<Patient | null>(null)
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/patients/show/${uuid}`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user, uuid])

  useEffect(() => {
    if (uuid) loadData()
  }, [loadData, uuid])

  return { loading, data, loadData }
}

export default useLoadPatientByUUID
