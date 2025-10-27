'use client'
import MovingIcon from '@mui/icons-material/Moving'
import {
  PieChart,
  pieArcClasses,
  pieArcLabelClasses,
} from '@mui/x-charts/PieChart'

const RevenueDistribuition = () => {
  const data = [
    { id: 0, value: 10, label: 'Receita Total', color: '#3b82f6' },
    { id: 1, value: 15, label: 'Despesas', color: '#f87171' },
    { id: 2, value: 20, label: 'Valor Líquido', color: '#4ade80' },
  ]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <MovingIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Distribuição de Receita
        </div>
      </div>
      <PieChart
        series={[
          {
            innerRadius: 110,
            outerRadius: 80,
            data,
            cornerRadius: 5,
            paddingAngle: 2,
            arcLabel: 'value',
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
            fontSize: 14,
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
