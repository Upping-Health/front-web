'use client'
import MovingIcon from '@mui/icons-material/Moving'
import {
  PieChart,
  pieArcClasses,
  pieArcLabelClasses,
} from '@mui/x-charts/PieChart'
import PaidIcon from '@mui/icons-material/Paid'
const TransactionsType = () => {
  const data = [
    { id: 0, value: 10, label: 'Assinaturas', color: '#3b82f6' },
    { id: 1, value: 15, label: 'Pagamentos únicos', color: '#fb923c' },
    { id: 2, value: 20, label: 'Reembolsos', color: '#f87171' },
  ]

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[370px]">
      <div className="flex items-center gap-2 pb-2">
        <PaidIcon />
        <div className="text-gray-800 text-lg font-semibold">
          Tipos de transação
        </div>
      </div>
      <PieChart
        series={[
          {
            innerRadius: 0,
            outerRadius: 110,
            data,
            arcLabel: 'value',
          },
        ]}
        height={300}
        margin={{ top: 20, bottom: 40, left: 50 }}
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
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 14,
          },
        }}
      />
    </div>
  )
}

export default TransactionsType
