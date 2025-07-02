'use client'
import ProfileRounded from '@/components/profileRounded'
import { useDarkMode } from '@/hooks/theme/useDarkTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import ProfileDrawer from '../profileDrawer'

const HeaderDash = () => {
  const { themeDark, toggleTheme } = useDarkMode()
  const [openMenu, setOpenMenu] = useState(false)
  const router = useRouter()

  return (
    <>
      <div className="flex border-b border-b-gray justify-end items-center px-4 py-2 relative bg-white dark:bg-gray-800 dark:border-gray-700 dark:border-b shadow-lg gap-4">
        <button
          onClick={toggleTheme}
          className="flex gap-2 p-2 border rounded-6 dark:bg-gray-700 dark:border-slate-600 items-center justify-center"
        >
          {themeDark ? (
            <LightModeIcon className="text-white text-lg" />
          ) : (
            <DarkModeIcon className="text-gray-600 text-lg" />
          )}
          <p className="dark:text-white text-sm font-light">
            {themeDark ? 'Escuro' : 'Claro'}
          </p>
        </button>

        <button onClick={() => setOpenMenu(true)}>
          <ProfileRounded />
        </button>
      </div>

      <ProfileDrawer setOpenMenu={setOpenMenu} openMenu={openMenu} />
    </>
  )
}

export default HeaderDash
