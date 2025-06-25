'use client'
import React, { useState, useContext, useMemo } from 'react'
import { useTab } from '@/contexts/tabContext'
import { DefaultContext } from '@/contexts/defaultContext'
import { TABS_DASH } from '@/utils/types/tabs'
import { ROLE } from '@/utils/types/roles'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'
import logoimg from '../../assets/logo.png'
import { dashboardTabs } from '@/routes'
import { colors } from '@/utils/colors/colors'

export default function MenuMobile() {
  const { tabDashSelected, setTabDashSelected } = useTab()
  const { user } = useContext(DefaultContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    Cookies.remove('token')
    router.push('/login')
  }

  const visibleTabs = useMemo(() => {
    return Object.values(dashboardTabs).filter((tab) => {
      // você pode filtrar por role aqui se quiser
      return true
    })
  }, [user?.role])

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-black px-4 py-2 flex justify-between items-center md:hidden z-50 shadow-lg border-b border-darkGray">
        <Image src={logoimg} alt="Logo" width={30} height={30} />
        <div />
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? (
            <CloseIcon style={{ fontSize: 30 }} />
          ) : (
            <MenuIcon style={{ fontSize: 30 }} />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-12 left-0 w-full bg-black shadow-md flex flex-col justify-center items-center py-3 md:hidden z-40 border-b border-darkGray gap-4">
          {visibleTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setTabDashSelected(tab.value)
                setIsOpen(false)
              }}
              className={`flex flex-row gap-4 items-center justify-center text-sm hover:text-primary ${
                tabDashSelected === tab.value ? 'text-primary' : 'text-light'
              }`}
            >
              {React.cloneElement(tab.icon, {
                style: {
                  fontSize: 24,
                  color:
                    tabDashSelected === tab.value
                      ? colors.primary
                      : colors.white,
                },
              })}
              {tab.name}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex flex-row gap-4 items-center justify-center text-xs text-light hover:text-primary"
          >
            <LogoutIcon style={{ fontSize: 24 }} />
            Sair
          </button>
        </div>
      )}
    </>
  )
}
