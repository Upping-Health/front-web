'use client'
import { dashboardTabs } from '@/constants/dashboardTabs'
import { colors } from '@/utils/colors/colors'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import AddIcon from '@mui/icons-material/Add';

interface IAsideNavParams {
  isCollapsed: boolean
  openTabs: string[]
  setOpenTabs: React.Dispatch<React.SetStateAction<string[]>>
}

interface IAsideNavItemProps {
  tab: typeof dashboardTabs[0]
  isCollapsed: boolean
  isExpanded: boolean
  toggleTab: (value: string) => void
  isCurrentPath: boolean
}

interface IAsideNavSubItemProps {
  subtab: {
    icon?: any
    name: string
    path: string
  }
  isCollapsed: boolean
  isSubActive: boolean
  onClick: () => void
}

const AsideNavSubItem = ({ subtab, isCollapsed, isSubActive, onClick }: IAsideNavSubItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-300 w-full ${
        isCollapsed ? 'justify-center' : ''
      } ${isSubActive ? 'bg-primary text-white' : 'text-primary hover:bg-[#CCF5D7]'}`}
    >
      <div
        className={`flex items-center gap-3 ${
          isCollapsed ? 'justify-center w-full' : ''
        }`}
      >
        {subtab.icon &&
          React.cloneElement(subtab.icon, {
            style: {
              fontSize: 20,
              color: isSubActive ? colors.white : colors.primary,
            },
          })}
        {!isCollapsed && <span className="text-sm font-medium">{subtab.name}</span>}
      </div>
    </button>
  )
}

const AsideNavItem = ({
  tab,
  isCollapsed,
  isExpanded,
  toggleTab,
  isCurrentPath,
}: IAsideNavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const selectMenu = useCallback(() => {
    router.push(tab.path)
  }, [router, tab.path])

  return (
    <div key={tab.value}>
      <button
        onClick={() => {
          if (tab.children) {
            toggleTab(tab.value)
          } else {
            selectMenu()
          }
        }}
        className={`flex items-center justify-between px-2 py-2 rounded-xl transition-all duration-300 w-full ${
          isCollapsed ? 'justify-center' : ''
        } ${isCurrentPath ? 'bg-primary text-white' : 'text-primary hover:bg-[#CCF5D7]'}`}
      >
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? 'justify-center w-full' : ''
          }`}
        >
          {React.cloneElement(tab.icon, {
            style: {
              fontSize: 24,
              color: isCurrentPath ? colors.white : colors.primary,
            },
          })}
          {!isCollapsed && <span className="text-sm font-medium">{tab.name}</span>}
        </div>

        {!isCollapsed && tab.children && (
          <KeyboardArrowDown
            style={{
              fontSize: 16,
              color: isCurrentPath ? colors.white : colors.primary,
              transition: 'transform 0.3s',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      </button>

      {tab.children &&  isExpanded && (
        <div className={`${isCollapsed ? '' : 'ml-4'} flex flex-col gap-1 mt-2`}>
          {tab.children.map((subtab) => {
            const isSubActive = pathname === subtab.path
            return (
              <AsideNavSubItem
                key={subtab.path}
                subtab={subtab}
                isCollapsed={isCollapsed}
                isSubActive={isSubActive}
                onClick={() => router.push(subtab.path)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const AsideNav = ({ isCollapsed, openTabs, setOpenTabs }: IAsideNavParams) => {
  const pathname = usePathname()

  const toggleTab = (tabValue: string) => {
    setOpenTabs((prev) =>
      prev.includes(tabValue) ? prev.filter((v) => v !== tabValue) : [...prev, tabValue],
    )
  }

  return (
    <nav className="flex flex-col gap-2">
      {dashboardTabs.map((tab) => {
        const isCurrentPath =
          pathname === tab.path || !!tab.children?.some((child) => pathname === child.path)
        const isExpanded = openTabs.includes(tab.value)

        return (
          <AsideNavItem
            key={tab.value}
            tab={tab}
            isCollapsed={isCollapsed}
            isExpanded={isExpanded}
            toggleTab={toggleTab}
            isCurrentPath={isCurrentPath}
          />
        )
      })}
    </nav>
  )
}

export default AsideNav
