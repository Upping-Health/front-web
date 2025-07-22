import { Providers } from '@/contexts/providers/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import { colors } from '@/utils/colors/colors'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NutriTECH',
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
        <NextTopLoader color={colors.primary} height={4} showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
