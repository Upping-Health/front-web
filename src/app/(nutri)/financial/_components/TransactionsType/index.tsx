'use client'
import PaidIcon from '@mui/icons-material/Paid'
import {
  PieChart,
  pieArcClasses,
  pieArcLabelClasses,
} from '@mui/x-charts/PieChart'
const TransactionsType = () => {
  const data = [
    { id: 0, value: 10, label: 'Assinaturas', color: '#3b82f6' },
    { id: 1, value: 15, label: 'Pagamentos únicos', color: '#fb923c' },
    { id: 2, value: 20, label: 'Reembolsos', color: '#f87171' },
  ]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <PaidIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Tipos de transação
        </div>
      </div>
      <PieChart
        className="text-white"
        series={[
          {
            innerRadius: 0,
            outerRadius: 110,
            data,
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
        sx={{
          [`& .${pieArcClasses.root}`]: {
            stroke: 'none',
          },
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
          '.dark & .MuiChartsLegend-label': {
            color: '#FFFFFF',
          },
        }}
      />
    </div>
  )
}

export default TransactionsType
