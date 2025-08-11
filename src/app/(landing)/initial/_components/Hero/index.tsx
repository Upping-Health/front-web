import Logo from '@/components/layout/logo'
;('use client')
import React from 'react'
import logoImg from '@/assets/upping_dark.png'
import Image from 'next/image'
import ButtonStyled from '@/components/buttons/button'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
const HeroLanding = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center bg-gradient-hero overflow-hidden pt-10"
    >
      <div className="absolute inset-0 bg-grid-white/10 bg-grid" />
      <div className="absolute top-20 left-10 opacity-20">
        <FavoriteBorderOutlinedIcon className="h-16 w-16 text-white animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <PeopleAltOutlinedIcon className="h-12 w-12 text-white animate-pulse delay-1000" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-20">
        <ShieldOutlinedIcon className="h-8 w-8 text-white animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        {/* <h1 className="text-white text-6xl md:text-8xl font-extrabold mb-6 leading-tight drop-shadow-lg">
  UppingHealth
</h1> */}

        <div className="mb-8 flex justify-center">
          <Image
            src={logoImg}
            alt="Logo"
            className="h-32 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h1 className="text-7xl font-bold mb-6">
          Gestão Completa
          <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text">
            para Profissionais de Saúde
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
          O UppingHealth revoluciona a gestão de consultórios e clínicas com
          módulos especializados para nutricionistas, personal trainers e outros
          profissionais da saúde.
        </p>

        <div className="mt-16 flex flex-row pb-5 sm:flex-row items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <ShieldOutlinedIcon className="h-5 w-5" />
            <span>100% Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <PeopleAltOutlinedIcon className="h-5 w-5" />
            <span>+1000 Profissionais</span>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteBorderOutlinedIcon className="h-5 w-5" />
            <span>Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroLanding
