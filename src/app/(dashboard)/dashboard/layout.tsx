import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import DashboardLayoutClient from './dashboardLayoutClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard | NutriTECH',
  description: 'Gestão para nutriocionistas',
}



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-light`}>
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </body>
    </html>
  )
}
