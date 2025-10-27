'use client'
import MovingIcon from '@mui/icons-material/Moving'
import { BarChart } from '@mui/x-charts/BarChart'

const RevenueGrowth = () => {
  const data = [
    { period: 'Período Anterior', receita: 12000 },
    { period: 'Período Atual', receita: 18000 },
  ]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <MovingIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Crescimento da Receita
        </div>
      </div>
      <BarChart
        series={[
          {
            data: data.map((item) => item.receita),
            label: 'Receita',
            color: '#4ade80',
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value: any) => `R$ ${value / 100}`,
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

export default RevenueGrowth
