'use client'
import Money from '@/lib/masks/money'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import RestoreIcon from '@mui/icons-material/Restore'
import TimelineIcon from '@mui/icons-material/Timeline'
import CardValues from '../CardValues'
import { ReportsDash } from '@/interfaces/reports-dash.interface'

interface CardsGroupProps {
  data: ReportsDash | null
}

const CardsGroup = ({ data }: CardsGroupProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex-1 min-w-[300px]">
          <CardValues
            className="bg-blue-500"
            icon={<AttachMoneyIcon />}
            title="Receita total"
            value={data?.overview?.total_income ?? 0}
            isMoney
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <CardValues
            className="bg-red-400"
            icon={<RestoreIcon />}
            title="Despesas/reembolsos"
            value={data?.overview?.total_expenses ?? 0}
            isMoney
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <CardValues
            className="bg-green-400"
            icon={<AttachMoneyIcon />}
            title="Valor Líquido"
            value={data?.overview?.net_amount ?? 0}
            isMoney
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <CardValues
            className="bg-orange-400"
            icon={<TimelineIcon />}
            title="Total de Transações"
            value={data?.overview?.transaction_count ?? 0}
            isMoney={false}
          />
        </div>
      </div>
    </div>
  )
}

export default CardsGroup
