'use client'
import { LineChart } from '@mui/x-charts/LineChart'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Money from '@/lib/masks/money'

const MonthlyTrend = () => {
  const months = ['Jan/2025', 'Ago/2025', 'Set/2025', 'Out/2025']

  const receita = [0, 3000, 4000, 13500]
  const despesas = [0, 2000, 5000, 9700]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[370px]">
      <div className="flex items-center gap-2 pb-4">
        <CalendarMonthIcon />
        <div className="text-gray-800 text-lg font-semibold">
          Tendência Mensal
        </div>
      </div>

      <LineChart
        xAxis={[{ data: months, scaleType: 'point', label: 'Mês' }]}
        series={[
          { data: receita, label: 'Receita Total', color: '#4ade80' },
          { data: despesas, label: 'Despesas', color: '#f87171' },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `R$ ${value / 100}`,
          },
        ]}
        height={300}
        margin={{
          left: 60,
        }}
        sx={{
          '.MuiLineElement-root': { strokeWidth: 3 },
          '.MuiChartsLegend-root': { mt: 2 },
        }}
      />
    </div>
  )
}

export default MonthlyTrend
