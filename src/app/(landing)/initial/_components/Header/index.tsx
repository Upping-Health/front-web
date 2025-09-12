'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logoImg from '@/assets/upping_light.png'
import ButtonStyled from '@/components/buttons/button'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = [
  { text: 'Início', id: 'inicio' },
  { text: 'Módulos', id: 'modulos' },
  { text: 'Benefícios', id: 'beneficios' },
  { text: 'Planos', id: 'planos' },
]

const HeaderLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80 // altura do header h-20
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <header className="w-full bg-white shadow-md h-20 sticky top-0 left-0 z-50">
      <div className="flex items-center h-full px-6 mx-auto justify-between max-w-6xl">
        <Image src={logoImg} alt="Logo" width={60} height={51} />

        <nav className="hidden lg:flex gap-8 items-center justify-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(item.id)
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors duration-200 group font-medium text-lg"
            >
              {item.text}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Abrir menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div
          className={`fixed top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-6 lg:hidden z-40 transition-all duration-300 ease-in-out ${
            menuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-5 pointer-events-none'
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(item.id)
                setMenuOpen(false)
              }}
              className="text-gray-700 hover:text-primary text-lg font-medium"
            >
              {item.text}
            </a>
          ))}

          <ButtonStyled
            title="Acessar"
            bgColor="bg-gradient-primary"
            type="button"
            styles="px-6 text-lg"
            onClick={() => {
              setMenuOpen(false)
              router.push('/login')
            }}
          />
        </div>

        <div className="hidden lg:block">
          <ButtonStyled
            title="Acessar"
            bgColor="bg-gradient-primary"
            type="button"
            styles="px-6 text-lg"
            onClick={() => router.push('/login')}
          />
        </div>
      </div>
    </header>
  )
}

export default HeaderLanding
