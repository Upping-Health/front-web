import { DefaultContext } from '@/contexts/defaultContext'
import { useContext, useEffect, useState } from 'react'

export function useDarkMode() {
  const { themeDark, toggleTheme } = useContext(DefaultContext)

  return { themeDark, toggleTheme }
}
