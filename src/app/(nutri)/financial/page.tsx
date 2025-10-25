'use client'
import TopDash from '@/components/layout/topDash'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CardsGroup from './_components/CardsGroup'
import { PieChart } from '@mui/x-charts/PieChart'
import MovingIcon from '@mui/icons-material/Moving'
import DateRangeIcon from '@mui/icons-material/DateRange'
import RevenueDistribuition from './_components/RevenueDistribuition'
import MonthlyTrend from './_components/MonthlyTrend'
import RevenueGrowth from './_components/RevenueGrowth'
import TransactionsType from './_components/TransactionsType'

const FinancialContent = () => {
  const data = [
    { id: 0, value: 10, label: 'Receita Total', color: '#3b82f6' },
    { id: 1, value: 15, label: 'Despesas', color: '#f87171' },
    { id: 2, value: 20, label: 'Valor Líquido', color: '#86efac' },
  ]

  return (
    <div className="w-full">
      <TopDash
        title="Financeiro"
        description="Analise os principais indicadores financeiros."
        icon={AccountBalanceOutlinedIcon}
      />

      <CardsGroup />

      <div className="flex gap-8">
        <div className="w-1/2">
          <RevenueDistribuition />
        </div>

        <div className="w-1/2">
          <MonthlyTrend />
        </div>
      </div>

      <div className="flex gap-8">
        <div className="w-1/2">
          <RevenueGrowth />
        </div>

        <div className="w-1/2">
          <TransactionsType />
        </div>
      </div>
    </div>
  )
}

export default FinancialContent
