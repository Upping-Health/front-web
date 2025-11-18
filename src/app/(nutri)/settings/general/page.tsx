'use client'
import MenuSettings from '../_components/menu'
import TopDash from '@/components/layout/topDash'
import { Person, Settings } from '@mui/icons-material'

const SettingsContent = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <TopDash
        title="Configurações Gerais"
        description="Gerencie seus horários e preferências de agendamento."
        icon={Settings}
      />
      <div className="h-full w-full flex gap-4">
        <div className="flex flex-col gap-4 w-full h-full rounded-xl px-4 bg-white shadow-sm dark:bg-gray-800 "></div>
        <div className="h-full flex justify-end">
          <MenuSettings />
        </div>
      </div>
    </div>
  )
}

export default SettingsContent
