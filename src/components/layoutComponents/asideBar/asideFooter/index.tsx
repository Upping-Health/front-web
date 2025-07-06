'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { colors } from '@/utils/colors/colors'
import { ROLE_PTBR } from '@/utils/types/roles'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

const AsideFooter = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter()
  const { user, setloadingGlobal, setLabelLoading } = useContext(DefaultContext)
  return (
    <div>
      <div className="flex items-center gap-3">
        <div
          className={`bg-black dark:bg-gray-600 ${
            isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
          } rounded-full flex items-center justify-center`}
        >
          <PersonIcon style={{ fontSize: 30, color: colors.white }} />
        </div>
        {!isCollapsed && (
          <div>
            <p className="text-black dark:text-white text-sm font-semibold">
              {user?.name?.substring(0, 17)}
            </p>
            <p className="text-black dark:text-white text-sm font-light">
              {user?.role?.name ?? 'SuperAdmin'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AsideFooter
