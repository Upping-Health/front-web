'use client'
import { useGetDarkTheme } from '@/hooks/theme/useGetDarkTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Person from '@mui/icons-material/Person'
import { ReactNode, useEffect, useState } from 'react'
import NotificationDrawer from '../notificationsDrawer'
import ProfileDrawer from '../profileDrawer'
interface HeaderButtonProps {
  onClick?: () => void
  children: ReactNode
}

const HeaderButton = ({ onClick, children }: HeaderButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        relative flex gap-2 p-2 border rounded-6
        dark:bg-gray-700 dark:border-slate-600
        items-center justify-center
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors
      "
    >
      {children}
    </button>
  )
}

const HeaderDash = () => {
  const { themeDark, toggleTheme } = useGetDarkTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [openNotifications, setOpenNotifications] = useState(false)
  // const pathname = usePathname()
  // const pathnames = pathname.split('/').filter((x) => x)

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="flex h-14 border-b border-b-gray items-center px-4 py-2 relative bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg gap-4">
        <div className="flex-grow">
          <p className="text-sm text-slate-500 dark:text-white">
            {currentTime}
          </p>
        </div>

        <HeaderButton onClick={toggleTheme}>
          {themeDark ? (
            <LightModeIcon className="text-white text-lg" />
          ) : (
            <DarkModeIcon className="text-gray-600 text-lg" />
          )}
        </HeaderButton>

        <HeaderButton onClick={() => setOpenNotifications(true)}>
          <NotificationsIcon className="text-gray-600 text-lg dark:text-white" />
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
            {5}
          </span>
        </HeaderButton>

        <HeaderButton onClick={() => setOpenMenu(true)}>
          <Person className="text-gray-600 text-lg dark:text-white" />
        </HeaderButton>
      </div>

      <ProfileDrawer setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <NotificationDrawer
        open={openNotifications}
        onOpen={() => setOpenNotifications(true)}
        onClose={() => setOpenNotifications(false)}
      />
    </>
  )
}

export default HeaderDash
