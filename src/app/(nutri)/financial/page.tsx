'use client'
import TopDash from '@/components/layout/topDash'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CardsGroup from './_components/CardsGroup'

import dynamic from 'next/dynamic'
import useLoadReportsDash from '@/hooks/financial/useLoadReportsDash'
import Loading from '@/components/layout/loading'
const MonthlyTrend = dynamic(() => import('./_components/MonthlyTrend'), {
  ssr: false,
})
const RecentActivities = dynamic(
  () => import('./_components/RecentActivities'),
  { ssr: false },
)
const RevenueDistribuition = dynamic(
  () => import('./_components/RevenueDistribuition'),
  { ssr: false },
)
const RevenueGrowth = dynamic(() => import('./_components/RevenueGrowth'), {
  ssr: false,
})
const TransactionsType = dynamic(
  () => import('./_components/TransactionsType'),
  { ssr: false },
)

const FinancialContent = () => {
  const { data, loadData, loading } = useLoadReportsDash(false)
  return (
    <div className="w-full flex flex-col">
      <TopDash
        title="Financeiro"
        description="Analise os principais indicadores financeiros."
        icon={AccountBalanceOutlinedIcon}
      />

      {loading && <Loading />}

      {!loading && (
        <>
          <CardsGroup data={data} />
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="w-full md:w-1/2">
              <RevenueDistribuition data={data} />
            </div>

            <div className="w-full md:w-1/2">
              <MonthlyTrend data={data} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="w-full md:w-1/2">
              <RevenueGrowth data={data} />
            </div>

            <div className="w-full md:w-1/2">
              <TransactionsType />
            </div>
          </div>
          <div className="mt-6">
            <RecentActivities data={data} />
          </div>
        </>
      )}
    </div>
  )
}

export default FinancialContent
