'use client'

import AsideBar from '@/components/layout/asideBar'
import FooterDash from '@/components/layout/footerDash'
import HeaderDash from '@/components/layout/headerDash'
import { Providers } from '@/contexts/providers/provider'
import { colors } from '@/lib/colors/colors'
import NextTopLoader from 'nextjs-toploader'

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

        <div className="flex flex-col w-full">
          <HeaderDash />

          <div className="flex-grow bg-gray-200 dark:bg-gray-900 p-4 pb-10  overflow-auto scroll-custom">
            <div className="flex h-full justify-center w-full">{children}</div>
          </div>

          <FooterDash />
        </div>
      </main>
    </Providers>
  )
}
