'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { colors } from '@/utils/colors/colors'
import { ROLE_PTBR } from '@/utils/types/roles'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import Cookies from 'js-cookie'
import api from '@/services/api'

const AsideFooter = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { user, setloadingGlobal, setLabelLoading } = useContext(DefaultContext)
  const router = useRouter()
  const handleLogout = async () => {
    setloadingGlobal(true)
    setLabelLoading('Fazendo logout...')
    await api
      .post('/logout')
      .then(() => {
        Cookies.remove('token')
        router.push('/login')
      })
      .finally(() => {
        setloadingGlobal(false)
        setLabelLoading(null);
      })
  }
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
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
              {ROLE_PTBR[user?.role || 'admin']}
            </p>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className={`w-full py-2 rounded-xl shadow-lg transition flex justify-center items-center gap-2  bg-black dark:bg-gray-700 ${
          isCollapsed ? 'text-center px-0' : ''
        }`}
      >
        <LogoutIcon style={{ color: colors.white }} />
        {!isCollapsed && (
          <p className="text-white text-sm font-semibold">Logout</p>
        )}
      </button>
    </div>
  )
}

export default AsideFooter
