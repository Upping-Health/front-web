'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'
import ButtonStyled from '@/components/buttons/button'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = ['Início', 'Módulos', 'Preços', 'Benefícios']

const HeaderLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white shadow-md h-20 sticky top-0 left-0 z-50">
      <div className="flex items-center h-full px-6 mx-auto justify-between max-w-6xl">
        <Image src={logoImg} alt="Logo" width={60} height={51} />

        <nav className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors duration-200 group font-medium text-lg"
            >
              {item}
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
        {menuOpen && (
          <nav className="fixed top-20 left-0 w-full bg-white shadow-md flex flex-col items-center py-6 gap-6 lg:hidden z-40">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-primary text-lg font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        <div className="hidden lg:block">
          <ButtonStyled
            title={'Acessar'}
            bgColor="bg-gradient-primary"
            type="button"
            styles="px-6 text-lg"
          />
        </div>
      </div>
    </header>
  )
}

export default HeaderLanding
