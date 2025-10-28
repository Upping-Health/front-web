'use client'
import { LineChart } from '@mui/x-charts/LineChart'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Money from '@/lib/masks/money'

const MonthlyTrend = () => {
  const months = ['Jan/2025', 'Ago/2025', 'Set/2025', 'Out/2025']

  const receita = [0, 3000, 4000, 13500]
  const despesas = [0, 2000, 5000, 9700]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-4">
        <CalendarMonthIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
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
            width: 50,
            valueFormatter: (value: number) => `R$ ${value / 100}`,
          },
        ]}
        height={300}
        sx={{
          '.MuiLineElement-root': { strokeWidth: 3 },
          '.MuiChartsLegend-root': { mt: 2 },
          '.dark & .MuiChartsLegend-label': {
            color: '#FFFFFF',
          },
          '.dark & .MuiChartsAxis-tickLabel tspan': {
            fill: '#FFFFFF !important',
          },
          '.dark & .MuiChartsAxis-label tspan': {
            fill: '#FFFFFF !important',
          },
          '.dark & .MuiChartsAxis-line': {
            stroke: '#FFFFFF !important',
          },
          '.dark & .MuiChartsAxis-tick': {
            stroke: '#FFFFFF !important',
          },
        }}
      />
    </div>
  )
}

export default MonthlyTrend
