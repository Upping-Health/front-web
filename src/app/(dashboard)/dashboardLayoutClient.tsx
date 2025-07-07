'use client'

import AsideBar from '@/components/layoutComponents/asideBar'
import FooterDash from '@/components/layoutComponents/footerDash'
import HeaderDash from '@/components/layoutComponents/headerDash'
import MenuMobile from '@/components/layoutComponents/menuMobile'
import { DefaultContext } from '@/contexts/defaultContext'
import { Providers } from '@/contexts/providers/provider'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import NextTopLoader from 'nextjs-toploader'
import { colors } from '@/utils/colors/colors'

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <NextTopLoader color={colors.primary} height={4} showSpinner={false} />
      <main className="flex h-screen w-screen">
        <AsideBar />
        <div className="flex flex-col h-full w-full">
          <HeaderDash />

          <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-4 pb-10 md:pb-0 overflow-auto scroll-custom">
            <div className="flex h-full justify-center w-full">{children}</div>
          </div>

          <div className="s:hidden">
            <FooterDash />
          </div>

          {/* <div className="t:hidden d:hidden">
            <MenuMobile />
          </div> */}
        </div>
      </main>
    </Providers>
  )
}
