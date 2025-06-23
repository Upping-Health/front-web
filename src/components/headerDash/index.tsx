'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { useTab } from '@/contexts/tabContext'
import { TABS_DASH_PTBR } from '@/utils/types/tabs'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import Cookies from 'js-cookie'
import { ROLE } from '@/utils/types/roles'
import { useRouter } from 'next/navigation'

const HeaderDash = () => {
  const { user } = useContext(DefaultContext)
  const { tabDashSelected } = useTab()
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <div className="flex border-b border-b-gray justify-between items-center px-4 py-5 relative bg-white shadow-lg"></div>
  )
}

export default HeaderDash
