'use client'
import Money from '@/lib/masks/money'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import RestoreIcon from '@mui/icons-material/Restore'
import TimelineIcon from '@mui/icons-material/Timeline'
import CardValues from '../CardValues'

const CardsGroup = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-6">
      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex-1 min-w-[250px]">
          <CardValues
            className="bg-blue-500"
            icon={<AttachMoneyIcon />}
            title="Receita total"
            value={371 * 100}
            isMoney
            percent={10}
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <CardValues
            className="bg-red-400"
            icon={<RestoreIcon />}
            title="Despesas/reembolsos"
            value={371 * 100}
            isMoney
            percent={-50}
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <CardValues
            className="bg-green-400"
            icon={<AttachMoneyIcon />}
            title="Valor Líquido"
            value={371 * 100}
            isMoney
            percent={50}
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <CardValues
            className="bg-orange-400"
            icon={<TimelineIcon />}
            title="Total de Transações"
            value={8}
            isMoney={false}
            percent={-2}
          />
        </div>
      </div>
    </div>
  )
}

export default CardsGroup
