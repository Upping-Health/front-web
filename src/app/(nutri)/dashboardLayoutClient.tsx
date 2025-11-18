'use client'
import AsideBar from '@/components/layout/asideBar'
import FooterDash from '@/components/layout/footerDash'
import HeaderDash from '@/components/layout/headerDash'
import TopLoader from '@/components/layout/topLoader'

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <TopLoader />
      <main className="flex h-screen w-screen">
        <AsideBar />

        <div className="flex flex-col w-full">
          <HeaderDash />

          <div className="flex-grow bg-gray-200 dark:bg-gray-900 p-4 overflow-auto scroll-custom">
            <div className="flex h-full justify-center w-full">{children}</div>
          </div>

          <FooterDash />
        </div>
      </main>
    </>
  )
}
