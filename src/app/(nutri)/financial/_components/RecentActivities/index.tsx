'use client'

import Money from '@/lib/masks/money'
import { History } from '@mui/icons-material'

const RecentActivities = () => {
  const Card = ({ title, observation, date, value }: any) => {
    const isPositive = value !== undefined && value >= 0
    return (
      <div className="flex justify-between border-b-gray-100 border-b-2 pb-1">
        <div>
          <p className="font-bold">{title}</p>
          <p className="font-extralight">{observation}</p>
          <p className="font-extralight">{date}</p>
        </div>

        <p
          className={`flex items-center font-medium ${
            isPositive ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {Money.centsToMaskMoney(value * 100)}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-full h-[370px]">
      <div className="flex items-center gap-2 pb-2">
        <History />
        <div className="text-gray-800 text-lg font-semibold">
          Atividades recentes
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto h-[300px] pr-2">
        <Card
          title="Credit Note"
          observation="Consulta/Agendamento"
          date="23/10/2025"
          value={-10}
        />
        <Card
          title="Credit Note"
          observation="Consulta/Agendamento"
          date="23/10/2025"
          value={-10}
        />
        <Card
          title="Credit Note"
          observation="Consulta/Agendamento"
          date="23/10/2025"
          value={10}
        />
        <Card
          title="Credit Note"
          observation="Consulta/Agendamento"
          date="23/10/2025"
          value={10}
        />
      </div>
    </div>
  )
}

export default RecentActivities
