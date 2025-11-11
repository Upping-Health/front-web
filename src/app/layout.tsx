import { Providers } from '@/contexts/providers/provider'
import { colors } from '@/lib/colors/colors'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'
import TopLoader from '@/components/layout/topLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UppingHealth',
  description: 'Gestão para nutriocionistas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-light flex flex-col h-full relative`}
      >
        <TopLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
