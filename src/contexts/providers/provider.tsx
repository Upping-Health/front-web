'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DefaultProvider from '../defaultContext'
import { TabProvider } from '../tabContext'
import { MuiProvider } from '../muiContext'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MuiProvider>
      <QueryClientProvider client={queryClient}>
        <DefaultProvider>
          <TabProvider>{children}</TabProvider>
        </DefaultProvider>
      </QueryClientProvider>
    </MuiProvider>
  )
}
