'use client'
import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [themeDark, setThemeDark] = useState<boolean>(false)

  const updateHtmlClass = (enableDark: boolean) => {
    const root = document.documentElement
    if (enableDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const shouldUseDark = storedTheme === 'dark' || !storedTheme
    setThemeDark(shouldUseDark)
    updateHtmlClass(shouldUseDark)
  }, [])

  useEffect(() => {
    updateHtmlClass(themeDark)
    localStorage.setItem('theme', themeDark ? 'dark' : 'light')
  }, [themeDark])

  const toggleTheme = () => setThemeDark((prev) => !prev)

  return {
    themeDark,
    toggleTheme,
  }
}
