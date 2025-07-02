'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import { colors } from '@/utils/colors/colors'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Drawer, List } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import PaymentsIcon from '@mui/icons-material/Payments'
const ProfileDrawer = ({ openMenu, setOpenMenu }: any) => {
  const { user, onLogout } = useContext(DefaultContext)
  const router = useRouter()

  const menuItems = [
    {
      name: 'Perfil',
      icon: <AccountBoxIcon />,
      href: '/perfil',
    },
    {
      name: 'Assinatura',
      icon: <PaymentsIcon />,
      href: '/perfil',
    },
    {
      name: 'Configurações',
      icon: <SettingsIcon />,
      href: '/perfil',
    },
  ]

  return (
    <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
      <div className="w-72 flex flex-col h-full bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center pt-8 pb-4 border-b">
          <div
            className={`bg-black dark:bg-gray-600 rounded-full flex items-center justify-center w-16 h-16`}
          >
            <PersonIcon style={{ fontSize: 48, color: colors.white }} />
          </div>
          <p className="mt-2 text-gray-900 dark:text-white font-medium">
            {user?.name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Nutricionista
          </p>
        </div>

        <List className="flex-1">
          <div className="px-5 flex flex-col gap-3">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                className={`group flex items-center justify-between px-2 py-2 rounded-xl transition-all duration-300 hover:text-white w-full text-primary dark:text-white hover:bg-primary`}
              >
                <div className={`flex items-center gap-3`}>
                  {React.cloneElement(item.icon, {
                    className: `
                      text-primary dark:text-white
                        group-hover:text-white
                    `,
                  })}

                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </List>
        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex justify-center items-center gap-2 shadow transition"
          >
            <LogoutIcon className="text-white" />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </Drawer>
  )
}

export default ProfileDrawer
