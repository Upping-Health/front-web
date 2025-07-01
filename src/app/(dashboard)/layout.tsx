import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DashboardLayoutClient from './dashboardLayoutClient'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard | NutriTECH',
  description: 'Gestão para nutriocionistas',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-light dark:bg-gray-900`}>
        <DashboardLayoutClient>{children}</DashboardLayoutClient>
      </body>
    </html>
  )
}
