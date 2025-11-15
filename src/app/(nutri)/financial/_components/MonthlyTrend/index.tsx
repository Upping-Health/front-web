'use client'
import { LineChart } from '@mui/x-charts/LineChart'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { ReportsDash } from '@/interfaces/api-response/reports-dash.interface'
import Money from '@/lib/masks/money'

interface MonthlyTrendProps {
  data: ReportsDash | null
}

const MonthlyTrend = ({ data }: MonthlyTrendProps) => {
  if (!data?.monthly_trends) {
    return null
  }

  const monthsArray = Object.values(data.monthly_trends.months).sort(
    (a, b) => new Date(a.period).getTime() - new Date(b.period).getTime(),
  )
  const labels = monthsArray.map((m) => m.period)
  const receita = monthsArray.map((m) => m.summary.total_income)
  const despesas = monthsArray.map((m) => m.summary.total_expenses)

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-[420px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-4">
        <CalendarMonthIcon className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Tendência Mensal
        </div>
      </div>

      <LineChart
        xAxis={[
          {
            data: labels,
            scaleType: 'point',
            label: 'Mês',

            valueFormatter: (v: string) => {
              const date = new Date(v)
              return date.toLocaleDateString('pt-BR', {
                month: 'short',
                year: '2-digit',
              })
            },
          },
        ]}
        series={[
          {
            data: receita,
            label: 'Receita Total',
            color: '#4ade80',
            valueFormatter: (item) => Money.centsToMaskMoney(item ?? 0),
          },
          {
            data: despesas,
            label: 'Despesas',
            color: '#f87171',
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
        sx={{
          '.MuiLineElement-root': { strokeWidth: 3 },
          '.MuiChartsLegend-root': { mt: 2 },
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

export default MonthlyTrend
