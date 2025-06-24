'use client'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import { colors } from '@/utils/colors/colors'
import { useDarkMode } from '@/hooks/theme/useDarkTheme'

const HeaderDash = () => {
  const {themeDark, toggleTheme} = useDarkMode();
  const router = useRouter()



  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  return (
    <div className="flex border-b border-b-gray justify-end items-center px-4 py-5 relative h-[40px] bg-white dark:bg-black shadow-lg">
      <button onClick={toggleTheme}>
        {themeDark ? (
          <LightModeIcon style={{ color: colors.white }} />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </button>
    </div>
  )
}

export default HeaderDash
