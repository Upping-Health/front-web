'use client'

import { dashboardTabs } from '@/routes'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { useDarkMode } from '@/hooks/theme/useDarkTheme'

interface IAsideNavParams {
  isCollapsed: boolean
  openTabs: string[]
  setOpenTabs: React.Dispatch<React.SetStateAction<string[]>>
}

interface SubTab {
  icon: JSX.Element
  name: string
  path: string
}

interface Tab {
  name: string
  icon: JSX.Element
  value: string
  path: string
  children?: Record<string, SubTab>
}

interface IAsideNavItemProps {
  tab: Tab
  isCollapsed: boolean
  isExpanded: boolean
  toggleTab: (value: string) => void
  isCurrentPath: boolean
  themeDark: boolean
}

interface IAsideNavSubItemProps {
  subtab: SubTab
  isCollapsed: boolean
  isSubActive: boolean
}

const AsideNavSubItem = ({
  subtab,
  isCollapsed,
  isSubActive,
}: IAsideNavSubItemProps) => {
  return (
    <Link
      href={subtab.path}
      className={`group flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-300 w-full ${
        isCollapsed ? 'justify-center' : ''
      } ${isSubActive ? 'bg-primary text-white' : 'text-primary hover:text-white dark:text-white hover:bg-primary'}`}
    >
      <div
        className={`flex items-center gap-3 ${
          isCollapsed ? 'justify-center w-full' : ''
        }`}
      >
        {React.cloneElement(subtab.icon, {
          className: `
            text-[24px]
            ${isSubActive ? 'text-white' : 'text-primary dark:text-white'}
            group-hover:text-white
          `,
        })}
        {!isCollapsed && (
          <span className="text-sm font-medium">{subtab.name}</span>
        )}
      </div>
    </Link>
  )
}

const AsideNavItem = ({
  tab,
  isCollapsed,
  isExpanded,
  toggleTab,
  isCurrentPath,
}: IAsideNavItemProps) => {
  return (
    <div key={tab.value}>
      {tab.children ? (
        <button
          onClick={() => toggleTab(tab.value)}
          className={`group flex items-center justify-between px-2 py-2 rounded-xl transition-all duration-300 hover:text-white w-full ${
            isCollapsed ? 'justify-center' : ''
          } ${isCurrentPath ? 'bg-primary text-white' : 'text-primary dark:text-white hover:bg-primary'}`}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            {React.cloneElement(tab.icon, {
              className: `
                text-[24px]
                ${isCurrentPath ? 'text-white' : 'text-primary dark:text-white'}
                group-hover:text-white
              `,
            })}
            {!isCollapsed && (
              <span className="text-sm font-medium">{tab.name}</span>
            )}
          </div>

          {!isCollapsed && (
            <KeyboardArrowDown
              className={`
                text-[16px]
                transition-transform duration-300
                ${isCurrentPath ? 'text-white' : 'text-primary dark:text-white'}
                ${isExpanded ? 'rotate-180' : 'rotate-0'}
                group-hover:text-white
              `}
            />
          )}
        </button>
      ) : (
        <Link
          href={tab.path}
          className={`group flex items-center justify-between px-2 py-2 rounded-xl transition-all duration-300 hover:text-white w-full ${
            isCollapsed ? 'justify-center' : ''
          } ${isCurrentPath ? 'bg-primary text-white' : 'text-primary dark:text-white hover:bg-primary'}`}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? 'justify-center w-full' : ''
            }`}
          >
            {React.cloneElement(tab.icon, {
              className: `
                text-[24px]
                ${isCurrentPath ? 'text-white' : 'text-primary dark:text-white'}
                group-hover:text-white
              `,
            })}
            {!isCollapsed && (
              <span className="text-sm font-medium">{tab.name}</span>
            )}
          </div>
        </Link>
      )}

      {tab.children && isExpanded && (
        <div
          className={`${isCollapsed ? '' : 'ml-4'} flex flex-col gap-1 mt-2`}
        >
          {Object.values(tab.children).map((subtab) => {
            const pathname = usePathname()
            const isSubActive = pathname === subtab.path
            return (
              <AsideNavSubItem
                key={subtab.path}
                subtab={subtab}
                isCollapsed={isCollapsed}
                isSubActive={isSubActive}
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
  const { themeDark } = useDarkMode()

  const toggleTab = (tabValue: string) => {
    setOpenTabs((prev) =>
      prev.includes(tabValue)
        ? prev.filter((v) => v !== tabValue)
        : [...prev, tabValue],
    )
  }

  return (
    <nav className="flex flex-col gap-2">
      {Object.values(dashboardTabs).map((tab) => {
        const getFirstPathSegment = (path: string) => path.split('/')[1] || ''
        const currentSegment = getFirstPathSegment(pathname)
        const tabSegment = getFirstPathSegment(tab.path)
        const isCurrentPath = currentSegment === tabSegment
        const isExpanded = openTabs.includes(tab.value)

        return (
          <AsideNavItem
            key={tab.value}
            tab={tab}
            isCollapsed={isCollapsed}
            isExpanded={isExpanded}
            toggleTab={toggleTab}
            isCurrentPath={isCurrentPath}
            themeDark={themeDark}
          />
        )
      })}
    </nav>
  )
}

export default AsideNav
