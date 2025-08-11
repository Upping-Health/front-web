'use client'
import React from 'react'
import Image from 'next/image'
import logoImg from '@/assets/upping_light.png'
import ButtonStyled from '@/components/buttons/button'
import ArrowUpRightIcon from '@mui/icons-material/ArrowUpwardOutlined'

const navItems = ['Início', 'Módulos', 'Preços', 'Benefícios']

const HeaderLanding = () => {
  return (
    <header className="w-full bg-white shadow-md h-20">
      <div className="flex items-center h-full px-6 mx-auto justify-between max-w-6xl">
        <Image src={logoImg} alt="Logo" width={60} height={51} />
        <div className="flex items-center gap-10">
          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-1 text-gray-700 hover:text-primary transition-colors duration-200 group font-medium"
              >
                <span className="text-lg fonmt-semibold">{item}</span>
              </a>
            ))}
          </nav>
        </div>
        <ButtonStyled
          title={'Acessar'}
          bgColor="bg-gradient-primary"
          type="button"
          styles="px-6 text-lg"
        />
      </div>
    </header>
  )
}

export default HeaderLanding
