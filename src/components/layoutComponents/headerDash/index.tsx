'use client'
import { useGetDarkTheme } from '@/hooks/theme/useGetDarkTheme'
import { colors } from '@/utils/colors/colors'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Person from '@mui/icons-material/Person'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProfileDrawer from '../profileDrawer'

const HeaderDash = () => {
  const { themeDark, toggleTheme } = useGetDarkTheme()
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
          <div
            className={`bg-black dark:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center`}
          >
            <Person style={{ fontSize: 30, color: colors.white }} />
          </div>
        </button>
      </div>

      <ProfileDrawer setOpenMenu={setOpenMenu} openMenu={openMenu} />
    </>
  )
}

export default HeaderDash
