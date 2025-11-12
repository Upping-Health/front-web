import { Providers } from '@/contexts/providers/provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
