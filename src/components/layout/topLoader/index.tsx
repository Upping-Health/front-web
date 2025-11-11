'use client'

import NextTopLoader from 'nextjs-toploader'
import { colors } from '@/lib/colors/colors'

export default function TopLoader() {
  return <NextTopLoader color={colors.primary} height={4} showSpinner={false} />
}
