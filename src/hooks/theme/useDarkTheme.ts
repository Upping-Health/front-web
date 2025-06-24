import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [themeDark, setThemeDark] = useState<boolean>(false)
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldUseDark = storedTheme === 'dark' || (!storedTheme && prefersDark)
    setThemeDark(shouldUseDark)
    updateHtmlClass(shouldUseDark)
  }, [])

  useEffect(() => {
    console.log(themeDark);
    updateHtmlClass(themeDark)
    localStorage.setItem('theme', themeDark ? 'dark' : 'light')
  }, [themeDark])

  const toggleTheme = () => setThemeDark((prev) => !prev)

  const updateHtmlClass = (enableDark: boolean) => {
    const root = document.documentElement
    if (enableDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  return { themeDark, toggleTheme }
}
