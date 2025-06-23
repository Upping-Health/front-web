
import { Providers } from '@/contexts/providers/provider'
import AsideBar from '@/components/asideBar'
import HeaderDash from '@/components/headerDash'
import FooterDash from '@/components/footerDash'
import MenuMobile from '@/components/menuMobile'

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <main className="flex h-screen w-screen">
        <div className="s:hidden">
          <AsideBar />
        </div>

        <div className="flex flex-col h-full w-full">
          <HeaderDash />

          <div className="flex-grow bg-gray-100 p-4 pb-10 md:pb-0 overflow-auto scroll-custom">
            <div className="flex h-full justify-center w-full">{children}</div>
          </div>

          <div className="s:hidden">
            <FooterDash />
          </div>

          <div className="t:hidden d:hidden">
            <MenuMobile />
          </div>
        </div>
      </main>
    </Providers>
  )
}
