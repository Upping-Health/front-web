import { DefaultContext } from '@/contexts/defaultContext'
import Patient from '@/interfaces/patient.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadPatientById = (id: string) => {
  const {user} = useContext(DefaultContext);
  const [data, setdata] = useState<Patient | null>(null)
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/patients/${id}`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user, id])

  useEffect(() => {
    if (!isNaN(Number(id))) loadData()
  }, [loadData, id])

  return { loading, data, loadData }
}

export default useLoadPatientById
