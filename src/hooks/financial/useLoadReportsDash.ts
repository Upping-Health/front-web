import { DefaultContext } from '@/contexts/defaultContext'
import { ApiResponse } from '@/interfaces/api-response.interface'
import { ReportsDash } from '@/interfaces/reports-dash.interface'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

type ReportsDashApiResponse = ApiResponse<ReportsDash>

const useLoadReportsDash = (hidden: boolean) => {
  const [data, setData] = useState<ReportsDash>()
  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await api.get<ReportsDashApiResponse>(
        `/finance/reports/dashboard`,
      )

      setData(res.data.data)
    } catch (error: any) {
      console.error(
        '[ERROR API] /finance/reports/dashboard',
        error?.response?.data,
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadReportsDash
