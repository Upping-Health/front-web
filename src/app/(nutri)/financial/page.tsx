'use client'
import TopDash from '@/components/layout/topDash'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CardsGroup from './_components/CardsGroup'
import { PieChart } from '@mui/x-charts/PieChart'
import MovingIcon from '@mui/icons-material/Moving'
import DateRangeIcon from '@mui/icons-material/DateRange'

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
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full md:w-1/2">
          <div className="flex items-center gap-2 pb-2">
            <MovingIcon />
            <div className="text-gray-800 text-lg font-semibold">
              Distribuição de Receita
            </div>
          </div>
          <PieChart
            series={[
              {
                innerRadius: 100,
                outerRadius: 70,
                data,
              },
            ]}
            height={300}
            slotProps={{
              legend: {
                position: { vertical: 'bottom', horizontal: 'middle' },
                direction: 'row',
                itemGap: 10,
                padding: {
                  top: 20,
                },
              },
            }}
          />
        </div>

        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full md:w-1/2">
          <div className="flex items-center gap-2 pb-2">
            <DateRangeIcon />
            <div className="text-gray-800 text-lg font-semibold">
              Tendência Mensal
            </div>
          </div>
          <PieChart
            series={[
              {
                innerRadius: 100,
                outerRadius: 70,
                data,
              },
            ]}
            height={300}
            slotProps={{
              legend: {
                position: { vertical: 'bottom', horizontal: 'middle' },
                direction: 'row',
                itemGap: 10,
                padding: {
                  top: 20,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default FinancialContent
