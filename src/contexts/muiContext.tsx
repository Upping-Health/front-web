'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const cache = createCache({ key: 'mui', prepend: true })

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  )
}
