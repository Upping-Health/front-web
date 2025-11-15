'use client'
import { ReportsDash } from '@/interfaces/api-response/reports-dash.interface'
import Money from '@/lib/masks/money'
import MovingIcon from '@mui/icons-material/Moving'
import {
  PieChart,
  pieArcClasses,
  pieArcLabelClasses,
} from '@mui/x-charts/PieChart'
import { useMemo } from 'react'

interface RevenueDistribuitionProps {
  data: ReportsDash | null
}

const RevenueDistribuition = ({ data }: RevenueDistribuitionProps) => {
  const labels = useMemo(() => {
    return [
      {
        id: 0,
        value: data?.overview?.total_income ?? 0.01,
        label: 'Receita Total',
        color: '#3b82f6',
      },
      {
        id: 1,
        value: data?.overview?.total_expenses ?? 0.01,
        label: 'Despesas',
        color: '#f87171',
      },
      {
        id: 2,
        value: data?.overview?.net_amount ?? 0.01,
        label: 'Valor Líquido',
        color: '#4ade80',
      },
    ]
  }, [data])

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <MovingIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Distribuição de Receita
        </div>
      </div>
      <PieChart
        series={[
          {
            innerRadius: 80,
            outerRadius: 110,
            arcLabelRadius: 95,
            data: labels,
            cornerRadius: 5,
            paddingAngle: 2,
            valueFormatter: (item) => Money.centsToMaskMoney(item.value),
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            position: { vertical: 'bottom', horizontal: 'center' },
            direction: 'horizontal',
          },
        }}
        sx={(theme) => ({
          [`& .${pieArcClasses.root}`]: {
            stroke: 'none',
          },
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 12,
            transform: 'none !important',
          },

          '& .MuiChartsLegend-root': {
            gap: theme.spacing(1.25),
            paddingTop: theme.spacing(2.5),
          },
          '.dark & .MuiChartsLegend-label': {
            color: '#FFFFFF',
          },
        })}
      />
    </div>
  )
}

export default RevenueDistribuition
