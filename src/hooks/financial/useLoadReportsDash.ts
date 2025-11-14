import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { useCallback, useContext, useEffect, useState } from 'react'

interface ReportsDash {
  overview: {
    net_amount: number
    total_income: number
    total_expenses: number
    transaction_count: number
  }
}

const useLoadReportsDash = (hidden: boolean) => {
  const { user } = useContext(DefaultContext)
  const [data, setdata] = useState<ReportsDash>({
    overview: {
      net_amount: 0,
      total_income: 0,
      total_expenses: 0,
      transaction_count: 0,
    },
  })
  const [loading, setloading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    try {
      setloading(true)
      const res = await api.get(`/finance/reports/dashboard`)
      setdata(res?.data?.data)
    } catch (error: any) {
      console.error(
        '[ERROR API] /finance/reports/dashboard',
        error?.response?.data,
      )
    } finally {
      setloading(false)
    }
  }, [])

  useEffect(() => {
    if (!hidden) loadData()
  }, [loadData, hidden])

  return { loading, data, loadData }
}

export default useLoadReportsDash
