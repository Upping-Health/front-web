'use client'
import MovingIcon from '@mui/icons-material/Moving'
import { BarChart } from '@mui/x-charts/BarChart'
import { ReportsDash } from '@/interfaces/api-response/reports-dash.interface'
import Money from '@/lib/masks/money'

interface RevenueGrowthProps {
  data: ReportsDash | null
}

const RevenueGrowth = ({ data }: RevenueGrowthProps) => {
  if (!data?.revenue_growth) return null

  const { previous_period, current_period } = data.revenue_growth

  const diff = current_period - previous_period
  const percentage = previous_period > 0 ? (diff / previous_period) * 100 : 0

  const chartData = [
    { label: 'Período Anterior', value: previous_period },
    { label: 'Período Atual', value: current_period },
  ]

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <MovingIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Crescimento da Receita
        </div>
      </div>

      <BarChart
        xAxis={[
          {
            data: chartData.map((item) => item.label),
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: chartData.map((item) => item.value),
            label: 'Receita',
            color: '#4ade80',
            valueFormatter: (item) => Money.centsToMaskMoney(item ?? 0),
          },
        ]}
        yAxis={[
          {
            width: 60,
            valueFormatter: (value: number) => `R$ ${value / 100}`,
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
            direction: 'horizontal',
          },
        }}
        sx={{
          '.dark & .MuiChartsLegend-label': { color: '#FFFFFF' },
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

export default RevenueGrowth
