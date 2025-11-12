import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DashboardLayoutClient from './dashboardLayoutClient'

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
    <div className={`bg-light dark:bg-gray-900`}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </div>
  )
}
