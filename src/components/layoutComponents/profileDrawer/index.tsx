'use client'
import { DefaultContext } from '@/contexts/defaultContext'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import Cookies from 'js-cookie'

const ProfileDrawer = ({ openMenu, setOpenMenu }: any) => {
  const { user, onLogout } = useContext(DefaultContext)
  const router = useRouter()

  const menuItems = [
    {
      text: 'Perfil',
      icon: <PersonIcon />,
      action: () => {
        setOpenMenu(false)
        router.push('/perfil')
      },
    },
  ]

  return (
    <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
      <div className="w-72 flex flex-col h-full bg-white dark:bg-gray-800">
        <div className="flex flex-col items-center py-8 border-b">
          <Avatar sx={{ width: 64, height: 64, background: colors.black }} />
          <p className="mt-2 text-gray-900 dark:text-white font-medium">
            {user?.name}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Nutricionista
          </p>
        </div>

        <List className="flex-1">
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={item.action}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ListItemIcon className="text-gray-600 dark:text-gray-300">
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  className: 'text-gray-900 dark:text-white',
                }}
              />
            </ListItem>
          ))}
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
