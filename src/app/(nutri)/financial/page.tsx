'use client'
import TopDash from '@/components/layout/topDash'
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined'
import CardsGroup from './_components/CardsGroup'
const FinancialContent = () => {
  return (
    <div className="w-full ">
      <TopDash
        title="Financeiro"
        description="Analise os principais indicadores financeiros."
        icon={AccountBalanceOutlinedIcon}
      />

      <CardsGroup />
    </div>
  )
}

export default FinancialContent
