import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

const useLoadSubmissionByPatient = (
  uuid: string,
  submissionType: string,
  hidden: boolean,
) => {
  const [data, setdata] = useState<any[]>([])
  const [loading, setloading] = useState<boolean>(true)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(
        `forms/submissions/list/${uuid}/${submissionType}`,
      )
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error(
        '[ERROR API] forms/submissions/list/',
        error?.response?.data,
      )
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden && uuid) loadData()
  }, [loadData, hidden, uuid, submissionType])

  return { loading, data, loadData }
}

export default useLoadSubmissionByPatient
