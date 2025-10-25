'use client'
import MovingIcon from '@mui/icons-material/Moving'
import { BarChart } from '@mui/x-charts/BarChart'

const RevenueGrowth = () => {
  const data = [
    { period: 'Período Anterior', receita: 12000 },
    { period: 'Período Atual', receita: 18000 },
  ]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[370px]">
      <div className="flex items-center gap-2 pb-2">
        <MovingIcon />
        <div className="text-gray-800 text-lg font-semibold">
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
            valueFormatter: (value) => `R$ ${value / 100}`,
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'middle' },
            direction: 'row',
            itemGap: 10,
            padding: { top: 20 },
          },
        }}
      />
    </div>
  )
}

export default RevenueGrowth
