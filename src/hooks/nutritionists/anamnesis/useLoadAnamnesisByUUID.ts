import { DefaultContext } from '@/contexts/defaultContext'
import { FormResponse } from '@/interfaces/form-response.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadAnamnesisByUUID = (
  uuid: string,
  form_type: string,
  hidden: boolean,
) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<FormResponse | null>(null)
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.post(`forms/submission`, {
        patient_id: uuid,
        form_type,
      })
      setdata(res?.data?.data)
      console.log(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] forms/submission/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [user, form_type, uuid])

  useEffect(() => {
    if (!hidden && uuid) loadData()
  }, [loadData, hidden, uuid, form_type])

  return { loading, data, loadData }
}

export default useLoadAnamnesisByUUID
