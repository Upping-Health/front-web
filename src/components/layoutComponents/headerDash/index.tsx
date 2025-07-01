'use client'
import { useDarkMode } from '@/hooks/theme/useDarkTheme'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useRouter } from 'next/navigation'
const HeaderDash = () => {
  const { themeDark, toggleTheme } = useDarkMode()
  const router = useRouter()

  return (
    <div className="flex border-b border-b-gray justify-end items-center px-4 py-2 relative bg-white dark:bg-gray-800  dark:border-gray-700 dark:border-b shadow-lg">
      <button
        onClick={toggleTheme}
        className="flex gap-2 p-2 border rounded-6 dark:bg-gray-700 dark:border-slate-600 items-center justify-center"
      >
        {themeDark ? (
          <LightModeIcon className="text-white text-lg" />
        ) : (
          <DarkModeIcon className="text-gray-600 text-lg" />
        )}

        <p className="dark:text-white text-sm font-light">
          {themeDark ? 'Escuro' : 'Claro'}
        </p>
      </button>
    </div>
  )
}

export default HeaderDash
