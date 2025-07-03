'use client'
import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [themeDark, setThemeDark] = useState<boolean | null>(null)

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
    let shouldUseDark: boolean

    if (storedTheme === 'dark') {
      shouldUseDark = true
    } else if (storedTheme === 'light') {
      shouldUseDark = false
    } else {
      shouldUseDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    setThemeDark(shouldUseDark)
    updateHtmlClass(shouldUseDark)
  }, [])

  useEffect(() => {
    if (themeDark === null) return
    updateHtmlClass(themeDark)
    localStorage.setItem('theme', themeDark ? 'dark' : 'light')
  }, [themeDark])

  const toggleTheme = () => {
    setThemeDark((prev) => !prev)
  }

  return {
    themeDark: themeDark ?? false,
    toggleTheme,
  }
}
