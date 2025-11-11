'use client'
import TopDash from '@/components/layout/topDash'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CardsGroup from './_components/CardsGroup'

import dynamic from 'next/dynamic'
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
  return (
    <div className="w-full">
      <TopDash
        title="Financeiro"
        description="Analise os principais indicadores financeiros."
        icon={AccountBalanceOutlinedIcon}
      />

      <CardsGroup />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <RevenueDistribuition />
        </div>

        <div className="w-full md:w-1/2">
          <MonthlyTrend />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <RevenueGrowth />
        </div>

        <div className="w-full md:w-1/2">
          <TransactionsType />
        </div>
      </div>

      <div className="">
        <RecentActivities />
      </div>

      <div className="h-14" />
    </div>
  )
}

export default FinancialContent
