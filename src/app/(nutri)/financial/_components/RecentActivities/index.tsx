'use client'

import Money from '@/lib/masks/money'
import { History } from '@mui/icons-material'
import { ReportsDash } from '@/interfaces/reports-dash.interface'

interface RecentActivitiesProps {
  data: ReportsDash | null
}

const RecentActivities = ({ data }: RecentActivitiesProps) => {
  const Card = ({
    title,
    observation,
    date,
    value,
  }: {
    title: string
    observation: string
    date: string
    value: number
  }) => {
    const isPositive = value >= 0

    return (
      <div className="flex justify-between border-b-gray-100 dark:border-b-gray-600 border-b-2 pb-1">
        <div>
          <p className="font-bold dark:text-white">{title}</p>
          <p className="font-extralight dark:text-white">{observation}</p>
          <p className="font-extralight dark:text-white">
            {new Date(date).toLocaleDateString('pt-BR')}
          </p>
        </div>

        <p
          className={`flex items-center font-bold ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {Money.centsToMaskMoney(value)}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full h-[370px] dark:bg-gray-700">
      <div className="flex items-center gap-2 pb-2">
        <History className="dark:text-white" />
        <div className="text-gray-800 text-lg font-semibold dark:text-white">
          Atividades recentes
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto h-[300px] pr-2">
        {data?.recent_activity?.last_transactions?.length ? (
          data.recent_activity.last_transactions.map((item) => (
            <Card
              key={item.uuid}
              title={'Teste'}
              observation={'teste 2'}
              date={item.created_at}
              value={
                item.type === 'in' ? item.amount_cents : -item.amount_cents
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-300">
            <History fontSize="large" />
            <p className="text-sm mt-2">Sem atividades recentes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentActivities
