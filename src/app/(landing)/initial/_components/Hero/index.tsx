'use client'
import React from 'react'
import Image from 'next/image'
import logoImg from '@/assets/upping_dark.png'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import ButtonStyled from '@/components/buttons/button'
import { ArrowBack } from '@mui/icons-material'

const HeroBackground = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-white/10 bg-grid"
      />
      <div aria-hidden="true" className="absolute top-20 left-10 opacity-20">
        <FavoriteBorderOutlinedIcon className="h-16 w-16 text-white animate-pulse" />
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-20 right-10 opacity-20"
      >
        <PeopleAltOutlinedIcon className="h-12 w-12 text-white animate-pulse delay-1000" />
      </div>
      <div aria-hidden="true" className="absolute top-0 right-1/4 opacity-20">
        <ShieldOutlinedIcon className="h-8 w-8 text-white animate-pulse delay-500" />
      </div>
    </>
  )
}

const HeroLogo = () => (
  <div className="mb-8 flex justify-center">
    <Image
      src={logoImg}
      alt="Logo da UppingHealth, sistema de gestão em saúde"
      className="h-32 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
    />
  </div>
)

const HeroStats = () => {
  const stats = [
    { icon: ShieldOutlinedIcon, text: '100% Seguro' },
    { icon: PeopleAltOutlinedIcon, text: '+1000 Profissionais' },
    { icon: FavoriteBorderOutlinedIcon, text: 'Suporte 24/7' },
  ]

  return (
    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-white/80 pb-5">
      {stats.map((item, i) => {
        const Icon = item.icon
        return (
          <div key={i} className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            <span>{item.text}</span>
          </div>
        )
      })}
    </div>
  )
}

const HeroLanding = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center bg-gradient-hero overflow-hidden pt-10"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <HeroBackground />
        <HeroLogo />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Gestão Completa
          <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text">
            para Profissionais de Saúde
          </span>
        </h1>

        <p className="text-lg md:text-xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
          A UppingHealth revoluciona a gestão de consultórios e clínicas com
          módulos especializados para nutricionistas, personal trainers e outros
          profissionais da saúde.
        </p>

        <button
          type="button"
          aria-label="Comece gratuitamente com UppingHealth"
          className="py-3 mx-auto bg-white hover:scale-105 shadow-xl rounded-xl px-10 font-semibold flex justify-center items-center gap-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => {}}
        >
          <span className="text-primary font-semibold">
            Comece Gratuitamente
          </span>
          <ArrowBack
            className="text-primary transform -scale-x-100"
            aria-hidden="true"
          />
        </button>

        <HeroStats />
      </div>
    </section>
  )
}

export default HeroLanding
