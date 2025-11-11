'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DefaultProvider from '../defaultContext'
import { TabProvider } from '../tabContext'
import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultProvider>
        <TabProvider>{children}</TabProvider>
      </DefaultProvider>
    </QueryClientProvider>
  )
}
