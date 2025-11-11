import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DashboardLayoutClient from './dashboardLayoutClient'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UppingHealth',
  description: 'Gestão para nutriocionistas',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} bg-light dark:bg-gray-900`}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </div>
  )
}
