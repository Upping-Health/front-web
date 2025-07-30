import { Drawer, IconButton, Divider, Avatar } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'

const NotificationDrawer: React.FC<{
  open: boolean
  onClose: () => void
  onOpen: () => void
}> = ({ open, onClose }) => {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      title: 'Um teste',
      description: 'Descrição de um teste',
      time: 'há 2 min',
    },
    {
      id: 1,
      title: 'Um teste',
      description: 'Descrição de um teste',
      time: 'há 2 min',
    },

    {
      id: 1,
      title: 'Um teste',
      description: 'Descrição de um teste',
      time: 'há 2 min',
    },
    {
      id: 1,
      title: 'Um teste',
      description: 'Descrição de um teste',
      time: 'há 2 min',
    },
  ])

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-80 flex flex-col h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Notificações</h2>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-gray-800 dark:text-white" />
          </IconButton>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notif) => (
                <li key={notif.id} className="flex items-center p-4 space-x-3">
                  <Avatar>
                    <NotificationsIcon className="text-gray-800" />
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{notif.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notif.description}
                    </p>
                    <small className="text-xs text-gray-500 dark:text-gray-400">
                      {notif.time}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Nenhuma notificação
            </div>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default NotificationDrawer
