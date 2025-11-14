import { DefaultContext } from '@/contexts/defaultContext'
import Documents from '@/interfaces/documents.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadTransactionsByUUID = (uuid: string, hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<Documents[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    console.log('chamou a função')
    try {
      setloading(true)
      const res = await api.get(`finance/transactions/list/${uuid}`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error('[ERROR API] /patients/', error?.response?.data)
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden && uuid) loadData()
  }, [loadData, hidden, uuid])

  return { loading, data, loadData }
}

export default useLoadTransactionsByUUID
