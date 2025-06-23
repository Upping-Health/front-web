'use client'
import { TABS_DASH } from '@/utils/types/tabs'
import { createContext, useContext, useEffect, useState } from 'react'
import { DefaultContext } from './defaultContext'
import { ROLE } from '@/utils/types/roles'
import TabContextInterface from '@/interfaces/tab.interface'

const TabContext = createContext<TabContextInterface>({} as any)

export const TabProvider = ({ children }: any) => {
  const { user } = useContext(DefaultContext)
  const [tabDashSelected, setTabDashSelected] = useState<string>(TABS_DASH.DASH)

  return (
    <TabContext.Provider
      value={{
        tabDashSelected,
        setTabDashSelected,
      }}
    >
      {children}
    </TabContext.Provider>
  )
}

export const useTab = () => useContext(TabContext)
