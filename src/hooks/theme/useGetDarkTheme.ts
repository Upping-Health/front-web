import { DefaultContext } from '@/contexts/defaultContext'
import { useContext, useEffect, useState } from 'react'

export function useGetDarkTheme() {
  const { themeDark, toggleTheme } = useContext(DefaultContext)

  return { themeDark, toggleTheme }
}
