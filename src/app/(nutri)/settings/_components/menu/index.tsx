'use client'

import { CalendarMonth, Settings } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const consultTabs = {
  general: {
    name: 'Gerais',
    icon: <Settings />,
    path: '/settings/general',
  },
  schedule: {
    name: 'Agenda',
    icon: <CalendarMonth />,
    path: '/settings/schedule',
  },
}

const MenuSettings = () => {
  const currentPath = usePathname()

  return (
    <aside className="flex flex-col bg-white dark:bg-gray-800 h-full w-56 rounded-xl p-2 gap-2 shadow-sm">
      {Object.entries(consultTabs).map(([key, tab]) => {
        const isActive = currentPath === tab.path
        return (
          <Link
            key={key}
            href={tab.path}
            className={`
              group flex items-center gap-3 px-3 py-2 rounded-md
              transition-colors duration-200
              ${isActive ? 'bg-primary text-white dark:text-white' : 'text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}
            `}
          >
            {React.cloneElement(tab.icon, {
              className: `
                text-[20px]
                ${isActive ? 'text-white dark:text-white' : 'text-black dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white'}
              `,
            })}
            <span className="text-sm font-medium">{tab.name}</span>
          </Link>
        )
      })}
    </aside>
  )
}

export default MenuSettings
