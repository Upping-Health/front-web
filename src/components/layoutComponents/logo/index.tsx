import Image from 'next/image'
import React from 'react'
import logoImg from '@/assets/logo.png'

const Logo = ({ minimal }: any) => {
  // const textColorClass = type === 'white' ? 'text-white' : 'text-black';
  // const className = `text-4xl font-bold text-center ${textColorClass} ${styles}`;
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={logoImg}
        alt="Logo"
        width={minimal ? 50 : 100}
        height={minimal ? 80 : 100}
      />
      <h1
        className={`${minimal ? 'text-xl' : 'text-4xl'} dark:text-white font-bold text-center`}
      >
        UPPING<span className="text-primary ">HEALTH</span>
      </h1>
    </div>
  )
}

export default Logo
