'use client'
import { useState } from 'react'
import AsideFooter from './asideFooter'
import AsideHeader from './asideHeader'
import AsideNav from './asideNav'

const AsideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openTabs, setOpenTabs] = useState<string[]>([])



  return (
    <aside
      className={`flex relative flex-col justify-between h-screen bg-white dark:bg-gray-800 dark:border-gray-700 dark:border-r p-5 shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-56'
      }`}
    >
      <div>
        <AsideHeader 
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
    
        <AsideNav 
          isCollapsed={isCollapsed}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
        />
      </div>

      <AsideFooter isCollapsed={isCollapsed} />
    </aside>
  )
}

export default AsideBar
