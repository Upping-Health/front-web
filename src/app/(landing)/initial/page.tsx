import React from 'react'
import HeaderLanding from './_components/Header'
import HeroLanding from './_components/Hero'
import Benefits from './_components/Benefits'
import Plans from './_components/Plans'
import Avaliations from './_components/Avaliations'
import Footer from './_components/Footer'

const Initial = () => {
  return (
    <main className="font-sans">
      <HeaderLanding />
      <HeroLanding />
      <Benefits />
      <Plans />
      <Avaliations />
      <Footer />
    </main>
  )
}

export default Initial
