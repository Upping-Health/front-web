'use client'
import Logo from '@/components/layout/logo'
import React from 'react'
import logoImg from '@/assets/upping_light.png'
import Image from 'next/image'
import ButtonStyled from '@/components/buttons/button'
const HeaderLanding = () => {
  return (
    <header className="w-full bg-white shadow-md h-20">
      <div className="flex items-center h-full flex-1 px-2 mx-auto justify-between max-w-6xl">
        <Image src={logoImg} alt="Logo" width={60} height={510} />

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
